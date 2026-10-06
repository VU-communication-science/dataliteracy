source("renv/activate.R")
set.seed(42)

# --- Local-first data loading for book builds --------------------------
# Chapters load datasets via read_csv() from this project's own published
# URLs (e.g. https://dev.dataliteracy.cc/practice_data.csv). Those files
# are generated at build time by scripts/generate_data.R straight into the
# Quarto output dir - they are never committed to the repo, so the live
# URL is not guaranteed to reflect the current build (first deploy, or any
# time a simulation script changes before the next deploy goes out). To
# keep the book's own build correct and independent of network/deploy
# timing, any read_csv() call on a known dataliteracy.cc dataset URL is
# redirected here to the just-generated local file when it exists;
# otherwise it falls through to a normal download. This only applies
# inside this project (via .Rprofile) - students run the same read_csv()
# line in their own session, where no such override exists.
local({
  if (!requireNamespace("readr", quietly = TRUE)) return(invisible())

  output_dir <- "docs"
  if (file.exists("_quarto.yml") && requireNamespace("yaml", quietly = TRUE)) {
    cfg <- tryCatch(yaml::read_yaml("_quarto.yml"), error = function(e) NULL)
    if (!is.null(cfg$project[["output-dir"]])) output_dir <- cfg$project[["output-dir"]]
  }

  real_read_csv <- readr::read_csv
  assign("read_csv", function(file, ...) {
    if (is.character(file) && length(file) == 1 &&
        grepl("^https?://(dev\\.)?dataliteracy\\.cc/", file)) {
      local_path <- file.path(output_dir, sub("^https?://[^/]+/", "", file))
      if (file.exists(local_path)) file <- local_path
    }
    real_read_csv(file, ...)
  }, envir = globalenv())
})
