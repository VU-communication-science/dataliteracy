args <- commandArgs(trailingOnly = TRUE)

if (is.null(getOption("repos")) || identical(unname(getOption("repos")["CRAN"]), "@CRAN@")) {
  options(repos = c(CRAN = "https://cloud.r-project.org"))
}
options(pak.sysreqs = TRUE)
Sys.setenv(PKG_SYSREQS = "true")

if (!length(find.package('renv', quiet = TRUE))) install.packages('renv')
if (!length(find.package('yaml', quiet = TRUE))) install.packages('yaml')

# Pak automatically resolves system requirements (libv8, etc.)
if (!length(find.package('pak', quiet = TRUE))) install.packages('pak')

# Ensure core Quarto/R packages are always installed
base_quarto_pkgs <- c("rmarkdown", "knitr")
missing_base <- base_quarto_pkgs[!base_quarto_pkgs %in% installed.packages()[,"Package"]]
if (length(missing_base) > 0) {
  cat("Installing base Quarto dependencies (rmarkdown, knitr)...\n")
  pak::pkg_install(missing_base, ask = FALSE)
}

if (length(args) == 0) {
  cat("No specific files provided. Scanning the entire project for dependencies...\n")
  files_to_check <- list.files(pattern = "\\.(qmd|Rmd|R)$", recursive = TRUE, full.names = TRUE)
} else {
  files_to_check <- args[file.exists(args)]
}

if (length(files_to_check) > 0) {
  cat("Found", length(files_to_check), "files to check.\n")

  deps <- renv::dependencies(path = files_to_check, quiet = TRUE)

  if (nrow(deps) > 0) {
    udeps <- unique(deps$Package)
    udeps <- udeps[!udeps %in% c("renv", "yaml", "pak")]

    if (length(udeps) > 0) {
      to_install <- udeps[!udeps %in% installed.packages()[,"Package"]]
      if(length(to_install) > 0) {
        cat("Installing packages using pak:\n", paste(paste('-', to_install), collapse='\n'), "\n")
        pak::pkg_install(to_install, ask = FALSE)
      } else {
        cat("All dependencies (", length(udeps), "packages ) are already installed.\n")
      }
    }
  } else {
    cat("No external dependencies found in these files.\n")
  }
} else {
  cat("No files found to check.\n")
}
