args <- commandArgs(trailingOnly = TRUE)

if (!length(find.package('renv', quiet = T))) install.packages('renv')
if (!length(find.package('yaml', quiet = T))) install.packages('yaml')

# If no specific files are passed, you could decide to check all files or none.
# We will only check the files passed via command line (the changed ones).
files_to_check <- args[file.exists(args)]

if (length(files_to_check) > 0) {
  cat("Checking dependencies for changed files:\n", paste(files_to_check, collapse="\n"), "\n")
  
  # Find dependencies in the changed files
  deps <- renv::dependencies(path = files_to_check, quiet = TRUE)
  
  if (nrow(deps) > 0) {
    udeps <- unique(deps$Package)
    udeps <- udeps[!udeps %in% c("renv", "yaml")]
    
    if (length(udeps) > 0) {
      cat("Installing packages:\n", paste(paste('-', udeps), collapse='\n'), "\n")
      install.packages(udeps)
    } else {
      cat("No external packages to install for the changed files.\n")
    }
  } else {
    cat("No dependencies found in the changed files.\n")
  }
} else {
  cat("No changed files required dependency installation.\n")
}
