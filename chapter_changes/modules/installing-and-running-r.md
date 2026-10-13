# Installing and Running R (`rbas`) → `chapters/1.02-installing-and-running-r.qmd`

- **Status:** Split from `r-language.qmd`
- **Section:** Computational Skills
- **Parents:** `compu` (Basic Computer Skills)
- **Children:** `rdata` (Data in R)
- **Source:** old `1.02-r-language.qmd` (itself a merge of `1.1-working-with-r.qmd` + `1.2-projects.qmd`)

## Changes made

- Split the old `r-language` module (`rlang`, ~840 lines) into three: this module, `Data in R` (`rdata`), and `Functions and Packages` (`rfunc`).
- This module now keeps: Installation, the RStudio tour, Running code, RStudio projects, Names and objects/assignment, and a trimmed "Keeping track of your data" section.
- Added one bridging sentence after the "Running code" example, framing R as a calculator and functions (`sum()`) as mini-programs, to set up Names and objects.
- Trimmed "Keeping track of your data": kept `getwd()`/`setwd()`, writing/reading a file in the working directory, `list.files()`, and `Choosing your working directory` (now also mentioning RStudio projects as the recommended first option, and Quarto's fixed working directory with a forward link to Reproducible Reports).
- **Removed** the entire "Optional: working with absolute paths" deep-dive (file-system tree diagram, Windows path example, right-click-properties tip, tab-completion-for-paths tip): this is now covered thoroughly and visually (interactive file explorer) in `1.01-basic-computer-skills.qmd`. Kept only a one-line pointer back to that chapter, plus `file.choose()` as a short R-specific trick for grabbing an absolute path without typing it.
- Updated the intro paragraph and skill-tree link (`module=rbas`).
- Updated downstream links in `2.01-data-frames.qmd` and `1.03-reproducible-reports.qmd` that pointed at `1.02-r-language.qmd#working-directory`/`#choosing-working-directory` (the former anchor didn't actually exist in the old file — fixed to point at real anchors in this file).

## To do

- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout and a standard 'Required Packages & Data' callout.
- [ ] Consider adding a short "what if installation fails" note here too (currently troubleshooting only covers packages, in `functions-and-packages.md`), for R/RStudio installation itself.

### Follow-up pass: swapped Files-pane screenshot for a Session-menu one

- Replaced the Files-pane screenshot with a new one of the `Session` menu's `Set Working Directory` submenu, moved to illustrate the "RStudio menu" bullet instead (where it belongs content-wise). Old file (`files-pane-set-working-directory.png`) deleted since it's no longer referenced.
- Also added `create-rstudio-project.png` (New Project dropdown) to the images folder, not yet placed in the text — a sensible spot would be the "RStudio projects" subsection. Note: this screenshot's recent-projects list shows a few real personal project names (`master_thesis`, `tim_data_donations`, `dataliteracy-data`); flagged to the user, no action taken yet pending their call on cropping/blurring.

### Follow-up pass: added a Files-pane screenshot

- Added `chapters/images/1.02-installing-and-running-r/files-pane-set-working-directory.png` (optimized to ~13KB with `magick -colors 64`), illustrating a GUI method for setting the working directory that wasn't previously documented: the Files pane's gear/"More" icon → "Set As Working Directory". Added as the first bullet in "Choosing your working directory", ahead of the `Session` menu and `setwd()` options.

### Follow-up pass: reorganised projects/working-directory, added two plot examples

- Moved **RStudio projects** out of "Using RStudio" (where it awkwardly sat right after "Running code") and into "Keeping track of your data", as its own subsection right before "Your working directory" — it's introduced as the easy, recommended way to get a working directory set up automatically, before "Choosing your working directory" covers the manual alternatives (menu, `setwd()`).
- Strengthened the back-references to `basic-computer-skills`: the "Keeping track of your data" intro now explicitly recalls the file-system/responsible-data-handling framing from that chapter before introducing the working directory as R's more convenient alternative, and the relative/absolute path mentions both now point back there too.
- Added two "R is cool" moments, both using only base R (no packages needed yet at this point in the book):
  - After "Running code", a one-liner `plot(AirPassengers)` using a dataset already built into R, to show a plot can come from a single function call.
  - A new "Why bother naming things?" subsection opening "Names and objects": downloads the book's own `practice_data.csv` with base `read.csv()` and plots `trust_t1` vs `trust_t2`, to motivate *why* naming an object matters (you can reuse `d$...` a line later) before teaching the `<-` syntax itself. Deliberately reuses the same dataset introduced properly in `data-in-r.md`/`functions-and-packages.md`, so it's a preview rather than a one-off example.
