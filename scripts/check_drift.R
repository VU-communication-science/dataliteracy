#!/usr/bin/env Rscript
# scripts/check_drift.R
#
# Detects silent drift in Quarto book chapters:
# - Computes source hash for each .qmd file
# - Computes content hash of rendered chapter HTML (stripping volatile timestamps/headers)
# - If source changed: updates hashes and records last_updated date
# - If source unchanged but rendered content changed: flags silent drift WITHOUT overwriting expected content hash
# - Generates a standalone status dashboard at docs/status/index.html and docs/status.html
# - Outputs GitHub Actions summaries, annotations, and marker files when drift is detected

suppressPackageStartupMessages({
  requireNamespace("yaml", quietly = TRUE)
  requireNamespace("xml2", quietly = TRUE)
  requireNamespace("digest", quietly = TRUE)
  requireNamespace("jsonlite", quietly = TRUE)
})

# Command line arguments parsing
args <- commandArgs(trailingOnly = TRUE)
bless_all <- "--bless" %in% args

get_arg_val <- function(flag, default_val) {
  idx <- which(args == flag)
  if (length(idx) > 0 && idx < length(args)) {
    return(args[idx + 1])
  }
  default_val
}

hashes_file <- get_arg_val("--hashes-file", "_chapter_hashes.json")
docs_dir    <- get_arg_val("--docs-dir", "docs")
site_url    <- get_arg_val("--site-url", "https://dev.dataliteracy.cc")
quarto_yml  <- get_arg_val("--config", "_quarto.yml")

if (!file.exists(quarto_yml)) {
  stop("Quarto config file not found: ", quarto_yml)
}

# 1. Extract chapter list from _quarto.yml
cfg <- yaml::read_yaml(quarto_yml)

extract_qmd <- function(x) {
  if (is.null(x)) return(character())
  if (is.character(x)) return(x[grepl("\\.qmd$", x)])
  chaps <- character()
  for (item in x) {
    if (is.character(item)) {
      chaps <- c(chaps, item)
    } else if (is.list(item)) {
      if (!is.null(item[["chapters"]])) {
        chaps <- c(chaps, unlist(item[["chapters"]]))
      } else if (!is.null(item[["file"]])) {
        chaps <- c(chaps, item[["file"]])
      }
    }
  }
  chaps <- unname(chaps)
  unique(chaps[grepl("\\.qmd$", chaps)])
}

chapter_files <- unique(c(extract_qmd(cfg$book$chapters), extract_qmd(cfg$book$appendices)))

if (length(chapter_files) == 0) {
  stop("No .qmd chapters found in ", quarto_yml)
}

# 2. Load existing hash database
hash_db <- list()
if (file.exists(hashes_file)) {
  tryCatch({
    hash_db <- jsonlite::fromJSON(hashes_file, simplifyVector = FALSE)
  }, error = function(e) {
    warning("Could not parse existing ", hashes_file, ": ", e$message)
    hash_db <<- list()
  })
}

# Helper to safely extract string values
safe_str <- function(val, default = "") {
  if (is.null(val) || length(val) == 0 || is.na(val)) return(default)
  as.character(val)
}

safe_short_hash <- function(h) {
  s <- safe_str(h, default = "")
  if (nzchar(s)) substr(s, 1, 8) else "-"
}

# 3. Helper to compute source hash
compute_source_hash <- function(path) {
  if (!file.exists(path)) return(NA_character_)
  lines <- readLines(path, warn = FALSE, encoding = "UTF-8")
  text <- paste(lines, collapse = "\n")
  digest::digest(text, algo = "sha256")
}

# 4. Helper to compute rendered content hash
compute_content_hash <- function(html_path) {
  if (!file.exists(html_path)) return(list(hash = NA_character_, title = basename(html_path)))
  doc <- xml2::read_html(html_path, encoding = "UTF-8")

  # Extract title
  title_node <- xml2::xml_find_first(doc, "//h1[contains(@class, 'title') or contains(@class, 'chapter-title')] | //h1 | //title")
  title <- if (!is.null(title_node)) trimws(xml2::xml_text(title_node)) else basename(html_path)
  title <- gsub("\u00a0", " ", title)
  title <- sub("\\s*(\u2013|--|-)\\s*Data Literacy.*$", "", title)
  title <- trimws(title)

  # Extract main content
  main <- xml2::xml_find_first(doc, "//main[@id='quarto-document-content'] | //main")
  if (is.null(main)) {
    main <- xml2::xml_find_first(doc, "//body")
  }

  if (is.null(main)) {
    return(list(hash = digest::digest(xml2::xml_text(doc), algo = "sha256"), title = title))
  }

  # Strip volatile elements (title-block-header, dates, navigation, scripts)
  volatile <- xml2::xml_find_all(main, ".//header[@id='title-block-header'] | .//div[contains(@class, 'quarto-title-meta')] | .//script | .//style")
  xml2::xml_remove(volatile)

  text <- trimws(gsub("\\s+", " ", xml2::xml_text(main)))

  # Also capture hashes of any referenced local images
  img_nodes <- xml2::xml_find_all(main, ".//img")
  img_srcs <- xml2::xml_attr(img_nodes, "src")
  img_hashes <- character()

  for (src in img_srcs) {
    if (!grepl("^https?://", src)) {
      img_file <- file.path(dirname(html_path), src)
      if (file.exists(img_file)) {
        img_hashes <- c(img_hashes, digest::digest(file = img_file, algo = "sha256"))
      }
    }
  }

  combined <- paste0(text, "||IMAGES:", paste(sort(img_hashes), collapse = ";"))
  list(hash = digest::digest(combined, algo = "sha256"), title = title)
}

# 5. Process all chapters
today_str <- as.character(Sys.Date())
updated_db <- list()
drifted_chapters <- list()
healthy_count <- 0
updated_count <- 0

cat("Checking chapters for drift...\n")

for (qmd in chapter_files) {
  cur_src_hash <- compute_source_hash(qmd)
  html_rel <- sub("\\.qmd$", ".html", qmd)
  html_full <- file.path(docs_dir, html_rel)

  prev <- hash_db[[qmd]]

  if (!file.exists(html_full)) {
    cat(sprintf("  [SKIP] %s (rendered html not found at %s)\n", qmd, html_full))
    if (!is.null(prev)) {
      if (bless_all) {
        prev$drift_detected <- FALSE
        prev$drift_date <- NULL
      }
      updated_db[[qmd]] <- prev
      if (isTRUE(prev$drift_detected)) {
        drifted_chapters[[qmd]] <- list(
          qmd = qmd,
          title = safe_str(prev$title, qmd),
          drift_date = safe_str(prev$drift_date, today_str),
          html_path = html_rel
        )
      } else {
        healthy_count <- healthy_count + 1
      }
    }
    next
  }

  content_res <- compute_content_hash(html_full)
  cur_cnt_hash <- content_res$hash
  chapter_title <- content_res$title

  if (bless_all) {
    # Re-bless / force update all hashes
    updated_db[[qmd]] <- list(
      title = chapter_title,
      source_hash = cur_src_hash,
      content_hash = cur_cnt_hash,
      last_updated = today_str,
      drift_detected = FALSE,
      drift_date = NULL,
      html_path = html_rel
    )
    healthy_count <- healthy_count + 1
  } else if (is.null(prev)) {
    # New chapter
    cat(sprintf("  [NEW] %s\n", qmd))
    updated_db[[qmd]] <- list(
      title = chapter_title,
      source_hash = cur_src_hash,
      content_hash = cur_cnt_hash,
      last_updated = today_str,
      drift_detected = FALSE,
      drift_date = NULL,
      html_path = html_rel
    )
    updated_count <- updated_count + 1
    healthy_count <- healthy_count + 1
  } else if (!identical(cur_src_hash, prev$source_hash)) {
    # Source was deliberately edited by author
    cat(sprintf("  [EDITED] %s (source updated)\n", qmd))
    updated_db[[qmd]] <- list(
      title = chapter_title,
      source_hash = cur_src_hash,
      content_hash = cur_cnt_hash,
      last_updated = today_str,
      drift_detected = FALSE,
      drift_date = NULL,
      html_path = html_rel
    )
    updated_count <- updated_count + 1
    healthy_count <- healthy_count + 1
  } else {
    # Source has NOT changed: check for silent drift
    if (identical(cur_cnt_hash, prev$content_hash)) {
      # Content matches expected
      updated_db[[qmd]] <- list(
        title = chapter_title,
        source_hash = prev$source_hash,
        content_hash = prev$content_hash,
        last_updated = safe_str(prev$last_updated, today_str),
        drift_detected = FALSE,
        drift_date = NULL,
        html_path = html_rel
      )
      healthy_count <- healthy_count + 1
    } else {
      # SILENT DRIFT DETECTED!
      # DO NOT update content_hash! Retain original expected hash so drift persists across future runs.
      existing_drift_date <- safe_str(prev$drift_date, "")
      drift_date <- if (nzchar(existing_drift_date)) existing_drift_date else today_str

      cat(sprintf("  [DRIFT] %s (output changed without source edit since %s)\n", qmd, drift_date))
      drifted_chapters[[qmd]] <- list(
        qmd = qmd,
        title = chapter_title,
        drift_date = drift_date,
        html_path = html_rel
      )

      updated_db[[qmd]] <- list(
        title = chapter_title,
        source_hash = prev$source_hash,
        content_hash = prev$content_hash,
        last_updated = safe_str(prev$last_updated, today_str),
        drift_detected = TRUE,
        drift_date = drift_date,
        html_path = html_rel
      )
    }
  }
}

# 6. Save updated hash database
jsonlite::write_json(updated_db, hashes_file, pretty = TRUE, auto_unbox = TRUE, null = "null")
cat(sprintf("Saved chapter hashes to %s\n", hashes_file))

# 7. Generate Status Page HTML (docs/status/index.html & docs/status.html)
status_dir <- file.path(docs_dir, "status")
if (!dir.exists(status_dir)) dir.create(status_dir, recursive = TRUE)

drift_count <- length(drifted_chapters)
total_count <- length(chapter_files)

banner_class <- if (drift_count > 0) "alert-danger" else "alert-success"
status_title <- if (drift_count > 0) {
  sprintf("⚠️ Silent Drift Detected in %d Chapter%s", drift_count, if (drift_count == 1) "" else "s")
} else {
  "✅ All Chapters Healthy & Verified"
}

table_rows <- character()
for (qmd in names(updated_db)) {
  info <- updated_db[[qmd]]
  is_drift <- isTRUE(info$drift_detected)

  status_badge <- if (is_drift) {
    sprintf("<span class='badge badge-drift'>⚠️ Drift (since %s)</span>", safe_str(info$drift_date, "unknown"))
  } else {
    "<span class='badge badge-ok'>✅ Healthy</span>"
  }

  row_class <- if (is_drift) "row-drift" else ""
  title_display <- safe_str(info$title, qmd)
  rel_path <- safe_str(info$html_path, sub("\\.qmd$", ".html", qmd))
  live_link <- sprintf("<a href='/%s' target='_blank'>%s</a>", rel_path, title_display)
  short_src_hash <- safe_short_hash(info$source_hash)
  short_cnt_hash <- safe_short_hash(info$content_hash)
  last_up <- safe_str(info$last_updated, "-")

  table_rows <- c(table_rows, sprintf(
    "<tr class='%s'><td>%s</td><td><code>%s</code></td><td>%s</td><td>%s</td><td><code>%s</code></td><td><code>%s</code></td></tr>",
    row_class, live_link, qmd, status_badge, last_up, short_src_hash, short_cnt_hash
  ))
}

status_html <- sprintf('<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Data Literacy — Book Status</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 2rem; background: #f8fafc; color: #1e293b; line-height: 1.5; }
    .container { max-width: 1000px; margin: 0 auto; background: #ffffff; padding: 2rem 2.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 1.75rem; margin-top: 0; margin-bottom: 0.5rem; color: #0f172a; }
    .subtitle { color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; }
    .banner { padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 2rem; font-size: 1.05rem; }
    .alert-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .alert-danger { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    .stats { display: flex; gap: 1rem; margin-bottom: 2rem; }
    .stat-card { flex: 1; padding: 1rem; background: #f1f5f9; border-radius: 6px; text-align: center; }
    .stat-val { font-size: 1.75rem; font-weight: 700; color: #0f172a; }
    .stat-label { font-size: 0.85rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    table { width: 100%%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem; }
    th { text-align: left; padding: 0.65rem 0.75rem; background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #475569; font-weight: 600; }
    td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #f1f5f9; }
    tr.row-drift { background: #fff5f5; }
    .badge { display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600; }
    .badge-ok { background: #dcfce7; color: #166534; }
    .badge-drift { background: #fee2e2; color: #991b1b; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.85em; background: #f1f5f9; padding: 0.15em 0.35em; border-radius: 3px; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .info-footer { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Data Literacy &mdash; Book Health & Chapter Status</h1>
    <div class="subtitle">Last checked: %s | <a href="/index.html">&larr; Back to Book</a></div>

    <div class="banner %s">
      <strong>%s</strong>
      %s
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-val">%d</div>
        <div class="stat-label">Total Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" style="color: #16a34a;">%d</div>
        <div class="stat-label">Healthy Chapters</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" style="color: %s;">%d</div>
        <div class="stat-label">Drifted Chapters</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Chapter</th>
          <th>Source File</th>
          <th>Status</th>
          <th>Last Source Edit</th>
          <th>Source Hash</th>
          <th>Expected Content Hash</th>
        </tr>
      </thead>
      <tbody>
        %s
      </tbody>
    </table>

    <div class="info-footer">
      <p><strong>What is Silent Drift?</strong> A chapter drifts when its rendered output (text, statistics, tables, or plots) changes without the chapter source file having been edited. This typically happens when external data imports change upstream or an R package is updated.</p>
      <p><strong>How to resolve:</strong> Review the chapter to ensure descriptions and calculations remain accurate. Once verified, simply commit an edit to the chapter (or re-run CI with <code>--bless</code>) to establish the new baseline.</p>
    </div>
  </div>
</body>
</html>',
  format(Sys.time(), "%Y-%m-%d %H:%M:%S UTC"),
  banner_class,
  status_title,
  if (drift_count > 0) {
    "<p style='margin: 0.5rem 0 0 0;'>One or more chapters produced different output without the chapter source having been edited. Review the drifted chapters below.</p>"
  } else {
    "<p style='margin: 0.5rem 0 0 0;'>All rendered chapter outputs match their recorded baselines.</p>"
  },
  total_count,
  healthy_count,
  if (drift_count > 0) "#dc2626" else "#64748b",
  drift_count,
  paste(table_rows, collapse = "\n        ")
)

# Write both docs/status/index.html and docs/status.html
writeLines(status_html, file.path(status_dir, "index.html"), useBytes = TRUE)
writeLines(status_html, file.path(docs_dir, "status.html"), useBytes = TRUE)
cat("Status page generated at docs/status/index.html and docs/status.html\n")

# 8. GitHub Actions Summary & Annotations
step_summary_file <- Sys.getenv("GITHUB_STEP_SUMMARY")
if (nzchar(step_summary_file)) {
  summary_lines <- c(
    "## 📊 Book Build & Chapter Drift Summary",
    "",
    sprintf("- **Total Chapters**: %d", total_count),
    sprintf("- **Healthy Chapters**: %d", healthy_count),
    sprintf("- **Drifted Chapters**: %d", drift_count),
    "",
    sprintf("🔗 **[View Live Status Dashboard](%s/status)**", site_url),
    ""
  )

  if (drift_count > 0) {
    summary_lines <- c(
      summary_lines,
      "### ⚠️ Silent Drift Detected",
      "",
      "The following chapters produced different output without their `.qmd` source being edited:",
      ""
    )
    for (item in drifted_chapters) {
      summary_lines <- c(summary_lines, sprintf("- **%s** (`%s`): drifted on %s", item$title, item$qmd, item$drift_date))
    }
  } else {
    summary_lines <- c(summary_lines, "✅ All chapters match their recorded baselines.")
  }

  cat(paste(summary_lines, collapse = "\n"), file = step_summary_file, append = TRUE)
}

# Output GitHub Actions workflow command annotations
if (drift_count > 0) {
  for (item in drifted_chapters) {
    cat(sprintf("::warning file=%s,title=Silent Drift Detected::Output of '%s' changed without source edit (drifted on %s). See %s/status\n",
                item$qmd, item$title, item$drift_date, site_url))
  }
}

# Output drift marker and details files for GitHub workflow steps
drift_marker_file <- "drift_detected.txt"
drift_details_file <- "drift_details.md"
if (drift_count > 0) {
  writeLines(as.character(drift_count), drift_marker_file)
  drift_md <- c(
    sprintf("### ⚠️ Silent Drift Detected in %d chapter(s):", drift_count),
    "",
    sapply(drifted_chapters, function(item) {
      sprintf("- **%s** (`%s`): drifted on %s", item$title, item$qmd, item$drift_date)
    }),
    "",
    sprintf("🔗 See full report on [dev.dataliteracy.cc/status](%s/status)", site_url)
  )
  writeLines(drift_md, drift_details_file)
} else {
  if (file.exists(drift_marker_file)) unlink(drift_marker_file)
  if (file.exists(drift_details_file)) unlink(drift_details_file)
}

cat(sprintf("\nDone. %d chapters processed: %d healthy, %d drifted.\n", total_count, healthy_count, drift_count))
