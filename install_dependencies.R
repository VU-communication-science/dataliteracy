args <- commandArgs(trailingOnly = TRUE)

options(repos = c(CRAN = "https://cloud.r-project.org"))
options(pak.sysreqs = TRUE)
Sys.setenv(PKG_SYSREQS = "true")

if (!length(find.package('renv', quiet = TRUE))) install.packages('renv')
if (!length(find.package('yaml', quiet = TRUE))) install.packages('yaml')

# Pak is incredible for GitHub actions, as it automatically resolves system requirements (libv8, etc.)
if (!length(find.package('pak', quiet = TRUE))) install.packages('pak')

files_to_check <- args[file.exists(args)]

if (length(files_to_check) > 0) {
  cat("Checking dependencies for changed files:
", paste(files_to_check, collapse="
"), "
")
  
  deps <- renv::dependencies(path = files_to_check, quiet = TRUE)
  
  if (nrow(deps) > 0) {
    udeps <- unique(deps$Package)
    udeps <- udeps[!udeps %in% c("renv", "yaml", "pak")]
    
    if (length(udeps) > 0) {
      cat("Installing packages using pak:
", paste(paste('-', udeps), collapse='
'), "
")
      to_install <- udeps[!udeps %in% installed.packages()[,"Package"]]
      if(length(to_install) > 0) {
        # Using pak handles system dependencies (like libv8-dev) safely on linux
        pak::pkg_install(to_install, ask = FALSE)
      } else {
        cat("All dependencies are already installed.
")
      }
    }
  }
} else {
  cat("No changed files required dependency installation.
")
}
