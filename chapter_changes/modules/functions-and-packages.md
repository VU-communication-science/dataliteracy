# Functions and Packages (`rfunc`) → `chapters/1.06-functions-and-packages.qmd`

- **Status:** Split from `r-language.qmd`
- **Section:** Computational Skills
- **Parents:** `rdata` (Data in R)
- **Children:** `quart` (Reproducible Reports), `dfs-1` (Data Frames), `me-va` (Means & Variance) — repointed from the old `rlang`
- **Source:** old `1.02-r-language.qmd`, sections "Functions", "Packages", "Viewing Function Documentation in R", "Using tab completion"

## Changes made

- Kept "What is a function?", optional arguments, and pipe syntax largely as-is.
- Kept "Packages" (what is a package, install/load, "install from source" callout) as-is.
- Merged "Viewing Function Documentation in R" and "Using tab completion" (both previously top-level sections) into one new common section, **"Working with functions and packages without memorizing everything"** — the idea being students shouldn't have to memorize every function/argument, and this section is their toolbox for looking things up instead.
- **New**: added a "Troubleshooting: what if a package won't install?" subsection inside that same section, covering reading the actual error, restarting R, updating R, and introducing `pak::pkg_install()` as a more robust alternative to `install.packages()`.
- Tab completion for file paths (previously its own "Try using tab completion everywhere" subsection) was folded into the tab-completion subsection here, since it's the same underlying trick.
- Updated the intro paragraph and skill-tree link (`module=rfunc`).
- Updated downstream "learning journey" intros in `1.03-reproducible-reports.qmd`, `2.01-data-frames.qmd`, and `3.01-means-and-variance.qmd` to arrive from this module instead of the old `rlang`.

## To do

- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout and a standard 'Required Packages & Data' callout.
- [ ] Consider a short worked troubleshooting example (a real failing `install.packages()` error message) rather than only describing the steps abstractly.
