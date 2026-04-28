# Data Literacy

The R textbook for the Communication Science program at Vrije Universiteit Amsterdam.

**[dataliteracy.cc](https://dataliteracy.cc)**

---

## Getting started

### 1. Install the tools

- [R](https://cloud.r-project.org/)
- [RStudio](https://posit.co/download/rstudio-desktop/)
- [Quarto](https://quarto.org/docs/get-started/)
- [Git](https://git-scm.com/downloads)

### 2. Clone the repository

In RStudio: **File → New Project → Version Control → Git**

Repository URL: `https://github.com/VU-communication-science/dataliteracy`

### 3. Restore packages

This project uses [renv](https://rstudio.github.io/renv/) to keep R package versions consistent across all contributors and CI. After cloning, run this once in the R console:

```r
renv::restore()
```

This installs all packages at the exact versions recorded in `renv.lock`. You're now ready to preview the book.

---

## Working on the book

### Preview locally

Open any `.qmd` file in RStudio and press **Ctrl+Shift+K** (or click Render). To preview the full book, use:

```r
quarto::quarto_preview()
```

### Publish changes

1. **Pull** the latest changes before you start (`Git` tab → Pull).
2. Edit the `.qmd` source files.
3. **Stage**, **commit**, and **push** your changes via the Git tab in RStudio.

GitHub Actions will automatically render and deploy the book. Expect the live site to update within a few minutes of pushing. If the build fails you'll get an email from GitHub.

---

## Managing packages

### Adding a package

Install it normally, then record it in the lockfile:

```r
install.packages("somepackage")
renv::snapshot()
```

Commit the updated `renv.lock` alongside your changes.

### Updating packages

[![Update R packages](https://github.com/VU-communication-science/dataliteracy/actions/workflows/update-packages.yml/badge.svg)](https://github.com/VU-communication-science/dataliteracy/actions/workflows/update-packages.yml)

There are two ways to update packages.

**Option 1 — locally.** This gives you full control and lets you verify everything works before anyone else sees the change.

1. Clone the repository and restore packages as described above.
2. Run the update in the R console:
   ```r
   renv::update()   # or renv::update("somepackage") for a single package
   renv::snapshot()
   ```
3. Check that the book still renders correctly:
   ```r
   quarto::quarto_render()
   ```
4. Commit the updated `renv.lock` and push.

**Option 2 — via GitHub Actions.** This runs the update in the cloud without needing a local setup. Packages are updated automatically every Monday, but you can also trigger it manually: click the badge above to open the workflow page, then use the **Run workflow** button.

Either way, the result is a **pull request** — a proposed change that shows exactly what updated before anything goes live. Think of it as a draft that sits for review: you can inspect which packages changed, check whether all chapters still rendered correctly, and only merge it into the live book once you're happy. If something breaks, you simply close the pull request without merging.

---

## Book structure

The book is configured in `_quarto.yml`. Chapters live in the `chapters/` directory and are numbered (`01-`, `02-`, …) to match the order in the sidebar.

To add a chapter, create a new `.qmd` file in `chapters/` and add it to the `chapters:` list in `_quarto.yml`.