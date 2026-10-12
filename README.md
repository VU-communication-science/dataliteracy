# Data Literacy
The R textbook for the Communication Science program at Vrije Universiteit Amsterdam.

---

## Getting Started

### Requirements

- [R](https://cloud.r-project.org/) (>= 4.3)
- [RStudio](https://posit.co/download/rstudio-desktop/)
- [Quarto](https://quarto.org/docs/get-started/) (>= 1.4)

---

### Clone the repository

Can also be done in RStudio: **File → New Project → Version Control → Git**

Repository URL: `https://github.com/VU-communication-science/dataliteracy`

---

### Package management

This book uses renv to manage the package versions.
The way renv works is that it records the exact versions of all packages used in the project in a file called `renv.lock`.
This ensures that if you update a chapter, you won't accidentally break other chapters due to package updates.

When you first clone the repository, you need to restore the R environment to install all packages at the versions recorded in `renv.lock`.

```r
renv::restore()
```

#### Add new packages

If you add any packages, you need to make a new snapshot. This will check any packages used in the book that are not in `renv.lock` and add them to the lockfile. You can do this with:

```r
renv::snapshot()
```
#### Update packages

You can update packages to the latest version with:

```r
## update a specific package
renv::update("package_name")

## update all packages
renv::update()
```

However, note that this potentially changes the output of chapters, and could even break them. 
If the update breaks a chapter, you cannot deploy the book until you fix the chapter.
If it only changes the chapter output, you will be notified of chapter "drift", and check the status of each chapter in the health dashboard at [dev.dataliteracy.cc/status](https://dev.dataliteracy.cc/status).

Note that we automatically update all package version every monday, using the [Update](https://github.com/VU-communication-science/dataliteracy/actions/workflows/update.yml) Github Action. 

---

## Working on the book

To preview the book locally while editing:

```bash
quarto preview
```

You do not need to render the book yourself. If you push a change to the repository, the book will be automatically rendered and deployed to [dataliteracy.cc](https://dataliteracy.cc).

### Checking for silent drift

To check for chapter output drift and generate the status dashboard:

```bash
Rscript scripts/check_drift.R
```

The live health dashboard is available at [dev.dataliteracy.cc/status](https://dev.dataliteracy.cc/status).
