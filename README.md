# Data Literacy
The R textbook for the Communication Science program at Vrije Universiteit Amsterdam.

---

## Getting Started

### 1. Requirements

- [R](https://cloud.r-project.org/) (>= 4.3)
- [RStudio](https://posit.co/download/rstudio-desktop/)
- [Quarto](https://quarto.org/docs/get-started/) (>= 1.4)

---

### 2. Clone the repository

Can also be done in RStudio: **File → New Project → Version Control → Git**

Repository URL: `https://github.com/VU-communication-science/dataliteracy`

---

### 3. Restore the R environment

Open the project in RStudio (or open an R console in the project root) and run:

```r
renv::restore()
```

```r
renv::snapshot()
```

This installs all packages at the exact versions recorded in `renv.lock`. You're now ready to preview the book.

---

## Working on the book

To preview the book locally while editing:

```bash
quarto preview
```

To render the complete book:

```bash
quarto render
```

### Checking for silent drift

To check for chapter output drift and generate the status dashboard:

```bash
Rscript scripts/check_drift.R
```

The live health dashboard is available at [dev.dataliteracy.cc/status](https://dev.dataliteracy.cc/status).
