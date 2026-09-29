suppressPackageStartupMessages({
  requireNamespace("yaml", quietly = TRUE)
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

# 1. Extract chapter list from _quarto.yml (supports both website and book formats)
cfg <- yaml::read_yaml(quarto_yml)

extract_qmd <- function(x) {
  if (is.null(x)) return(character())
  chaps <- character()
  recurse <- function(item) {
    if (is.character(item)) {
      chaps <<- c(chaps, item[grepl("\\.qmd$", item)])
    } else if (is.list(item)) {
      if (!is.null(item$href) && is.character(item$href) && grepl("\\.qmd$", item$href)) {
        chaps <<- c(chaps, item$href)
      }
      for (sub in item) {
        recurse(sub)
      }
    }
  }
  recurse(x)
  unique(chaps)
}

chapter_files <- unique(c(
  extract_qmd(cfg$website$sidebar$contents),
  extract_qmd(cfg$book$chapters),
  extract_qmd(cfg$book$appendices)
))

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
  if (is.null(val) || length(val) == 0 || is.na(val[[1]])) return(default)
  as.character(val[[1]])
}

# 3. Helper to extract chapter title from .qmd file
get_chapter_title <- function(qmd_path) {
  if (!file.exists(qmd_path)) return(basename(qmd_path))
  lines <- readLines(qmd_path, n = 25, warn = FALSE)
  title_line <- grep("^title:\\s*", lines, value = TRUE)
  if (length(title_line) > 0) {
    title <- sub("^title:\\s*[\"']?(.*?)[\"']?\\s*$", "\\1", title_line[1])
    return(title)
  }
  basename(qmd_path)
}

# 4. Helper to extract clean body content from rendered HTML
extract_body_content <- function(html_path) {
  if (!file.exists(html_path)) return(NULL)
  raw_html <- paste(readLines(html_path, warn = FALSE), collapse = "\n")
  
  # Strip dynamic Quarto runtime artifacts
  cleaned <- gsub('<meta name="quarto:offset"[^>]*>', '', raw_html)
  cleaned <- gsub('<script id="quarto-search-options"[^>]*>.*?</script>', '', cleaned)
  cleaned <- gsub('<script src="[^"]*site_libs/[^"]*"></script>', '', cleaned)
  cleaned <- gsub('<link href="[^"]*site_libs/[^"]*"[^>]*>', '', cleaned)
  cleaned <- gsub('<div id="quarto-search-results"></div>', '', cleaned)
  
  # Extract main content container if present
  main_match <- regexpr('<main class="content"[^>]*>(.*?)</main>', cleaned, perl = TRUE)
  if (main_match != -1) {
    content <- regmatches(cleaned, main_match)
  } else {
    content <- cleaned
  }
  content
}

# 5. Process each chapter
updated_db <- list()
drift_detected <- character()
drift_details <- list()
today <- format(Sys.Date(), "%Y-%m-%d")

message("Checking chapters for drift...")

for (qmd in chapter_files) {
  if (!file.exists(qmd)) {
    warning("Chapter file missing: ", qmd)
    next
  }
  
  title <- get_chapter_title(qmd)
  
  # Map .qmd to rendered .html
  html_rel <- sub("\\.qmd$", ".html", qmd)
  html_path <- file.path(docs_dir, html_rel)
  
  # Compute source hash (SHA-256)
  curr_source_hash <- digest::digest(file = qmd, algo = "sha256")
  
  # Compute rendered content hash (SHA-256)
  curr_content_hash <- ""
  if (file.exists(html_path)) {
    body_content <- extract_body_content(html_path)
    if (!is.null(body_content)) {
      curr_content_hash <- digest::digest(body_content, algo = "sha256", serialize = FALSE)
    }
  }
  
  # Look up existing entry
  prev <- hash_db[[qmd]]
  
  prev_source_hash   <- safe_str(prev$source_hash)
  prev_content_hash  <- safe_str(prev$content_hash)
  prev_status        <- safe_str(prev$status, "healthy")
  prev_drifted_date  <- safe_str(prev$drifted_date, "")
  prev_last_modified <- safe_str(prev$last_modified, today)
  
  if (bless_all) {
    # --bless mode: force all healthy with current state
    updated_db[[qmd]] <- list(
      title = title,
      source_hash = curr_source_hash,
      content_hash = curr_content_hash,
      last_modified = today,
      status = "healthy",
      drifted_date = ""
    )
    message("  [BLESSED] ", qmd)
  } else if (prev_source_hash == "") {
    # New chapter: initialize baseline
    updated_db[[qmd]] <- list(
      title = title,
      source_hash = curr_source_hash,
      content_hash = curr_content_hash,
      last_modified = today,
      status = "healthy",
      drifted_date = ""
    )
    message("  [NEW] ", qmd)
  } else if (curr_source_hash != prev_source_hash) {
    # Source was deliberately modified: update baseline and mark healthy
    updated_db[[qmd]] <- list(
      title = title,
      source_hash = curr_source_hash,
      content_hash = curr_content_hash,
      last_modified = today,
      status = "healthy",
      drifted_date = ""
    )
    message("  [EDITED] ", qmd, " (source updated)")
  } else {
    # Source was NOT modified: check for output drift
    if (curr_content_hash != "" && prev_content_hash != "" && curr_content_hash != prev_content_hash) {
      # Silent drift occurred!
      drift_date <- if (nzchar(prev_drifted_date)) prev_drifted_date else today
      updated_db[[qmd]] <- list(
        title = title,
        source_hash = prev_source_hash,
        content_hash = prev_content_hash,
        last_modified = prev_last_modified,
        status = "drifted",
        drifted_date = drift_date
      )
      drift_detected <- c(drift_detected, qmd)
      drift_details[[qmd]] <- list(title = title, date = drift_date)
      message("  [DRIFT] ", qmd, " (output changed without source edit since ", drift_date, ")")
    } else {
      # Output matches baseline or previous drift state persists
      updated_db[[qmd]] <- list(
        title = title,
        source_hash = prev_source_hash,
        content_hash = prev_content_hash,
        last_modified = prev_last_modified,
        status = prev_status,
        drifted_date = prev_drifted_date
      )
      if (prev_status == "drifted") {
        drift_detected <- c(drift_detected, qmd)
        drift_details[[qmd]] <- list(title = title, date = prev_drifted_date)
        message("  [DRIFT PERSISTED] ", qmd, " (drifted on ", prev_drifted_date, ")")
      } else {
        message("  [OK] ", qmd)
      }
    }
  }
}

# 6. Save updated hash database
writeLines(jsonlite::toJSON(updated_db, pretty = TRUE, auto_unbox = TRUE), hashes_file)
message("Saved chapter hashes to ", hashes_file)

# 7. Generate status page
status_dir <- file.path(docs_dir, "status")
dir.create(status_dir, recursive = TRUE, showWarnings = FALSE)

total_count   <- length(updated_db)
drifted_count <- length(drift_detected)
healthy_count <- total_count - drifted_count

overall_badge <- if (drifted_count == 0) {
  '<span style="background-color:#198754;color:white;padding:4px 10px;border-radius:4px;font-weight:bold;">All Chapters Clean</span>'
} else {
  sprintf('<span style="background-color:#dc3545;color:white;padding:4px 10px;border-radius:4px;font-weight:bold;">%d Drifted Chapter(s)</span>', drifted_count)
}

rows_html <- character()
for (qmd in names(updated_db)) {
  entry <- updated_db[[qmd]]
  html_rel <- sub("\\.qmd$", ".html", qmd)
  chap_url <- paste0(site_url, "/", html_rel)
  
  if (entry$status == "drifted") {
    status_td <- sprintf('<span style="color:#dc3545;font-weight:bold;">⚠️ Drifted</span> (since %s)', entry$drifted_date)
    row_style <- 'background-color:#fff3cd;'
  } else {
    status_td <- '<span style="color:#198754;font-weight:bold;">✓ Healthy</span>'
    row_style <- ''
  }
  
  row <- sprintf(
    '<tr style="%s"><td><a href="%s" target="_blank">%s</a></td><td><code>%s</code></td><td>%s</td><td>%s</td></tr>',
    row_style, chap_url, htmltools::htmlEscape(entry$title), qmd, status_td, entry$last_modified
  )
  rows_html <- c(rows_html, row)
}

status_html <- sprintf('<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter Build Status — Data Literacy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #212529; background-color: #f8f9fa; }
    .container { max-width: 960px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { margin-top: 0; font-size: 1.8rem; }
    .summary { margin: 20px 0; font-size: 1.1rem; }
    table { width: 100%%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dee2e6; }
    th { background-color: #f1f3f5; }
    code { background: #e9ecef; padding: 2px 5px; border-radius: 3px; font-size: 0.9em; }
    .timestamp { font-size: 0.85em; color: #6c757d; margin-top: 25px; }
    a { color: #0d6efd; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Chapter Output Drift Status</h1>
    <div class="summary">
      Overall Status: %s
      <p>Total Chapters: <strong>%d</strong> | Healthy: <strong style="color:#198754;">%d</strong> | Drifted: <strong style="color:#dc3545;">%d</strong></p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Chapter</th>
          <th>Source File</th>
          <th>Status</th>
          <th>Last Verified</th>
        </tr>
      </thead>
      <tbody>
        %s
      </tbody>
    </table>
    <div class="timestamp">
      Generated on: %s UTC &bull; Repository: <a href="https://github.com/vu-communication-science/dataliteracy">vu-communication-science/dataliteracy</a>
    </div>
  </div>
</body>
</html>', overall_badge, total_count, healthy_count, drifted_count, paste(rows_html, collapse = "\n"), format(Sys.time(), "%Y-%m-%d %H:%M:%S"))

writeLines(status_html, file.path(status_dir, "index.html"))
writeLines(status_html, file.path(docs_dir, "status.html"))
message("Status page generated at docs/status/index.html and docs/status.html")

# 8. GitHub Action Output & Warning Annotations
if (drifted_count > 0) {
  for (qmd in drift_detected) {
    info <- drift_details[[qmd]]
    cat(sprintf("::warning file=%s,title=Silent Drift Detected::Output of '%s' changed without source edit (drifted on %s). See %s/status\n",
                qmd, info$title, info$date, site_url))
  }
}

message(sprintf("\nDone. %d chapters processed: %d healthy, %d drifted.\n", total_count, healthy_count, drifted_count))
