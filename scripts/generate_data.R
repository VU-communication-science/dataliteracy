#!/usr/bin/env Rscript
# Quarto pre-render hook (see `project: pre-render:` in _quarto.yml).
#
# Regenerates every simulated dataset from its simulation script in
# data/simulation_scripts/, writing the resulting CSVs straight into the
# Quarto output directory. This way the generated data is served from the
# same domain as the book itself (e.g. https://dataliteracy.cc/practice_data.csv)
# with no data files committed to the repo at all -- only the scripts that
# produce them (each with a fixed seed, so output is deterministic).
#
# Can also be run standalone for local testing/debugging a simulation script:
#   Rscript scripts/generate_data.R
# In that case (no QUARTO_PROJECT_OUTPUT_DIR set), CSVs land in
# data/generated/ instead, which is gitignored.

output_dir <- Sys.getenv("QUARTO_PROJECT_OUTPUT_DIR", unset = "data/generated")
dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)

# Simulation scripts read this to know where to write their output, so they
# stay runnable standalone too, independent of Quarto's own env vars.
Sys.setenv(DATALITERACY_DATA_OUTPUT_DIR = output_dir)

scripts <- list.files("data/simulation_scripts", pattern = "\\.[Rr]$", full.names = TRUE)

if (length(scripts) == 0) {
  message("No simulation scripts found in data/simulation_scripts/, nothing to generate.")
}

for (script in scripts) {
  message("Generating data from ", script, " -> ", output_dir)
  # Source in a fresh environment so scripts can't leak variables into each other.
  source(script, local = new.env())
}
