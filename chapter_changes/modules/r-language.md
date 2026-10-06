# R language (`rlang`) → `chapters/r-language.qmd`

- **Status:** Merged
- **Section:** Computational Skills
- **Parents:** `compu` (Basic Computer Skills)
- **Children:** `quart` (Reproducible Reports), `me-va` (Means & Variance), `dfs-1` (Data Frames)
- **Source:** `1.1-working-with-r.qmd`, `1.2-projects.qmd`

## Changes made

- Merged old 1.1 *Working with R* and old 1.2 *RStudio Projects* into one module (1.2 appended, starting at the section 'Keeping track of your data').
- Updated internal links.

## To do

- [ ] The merged chapter is long (~840 lines). Consider splitting again (e.g. 'Installation & RStudio' vs. 'Objects, functions & packages') or moving file-management parts to `basic-computer-skills`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: intro format + try-it box
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + a tiny teaser snippet (vector + `mean()`), plus the skill-tree deep link (`curriculum.qmd?module=rlang`).
- Added a "Try it yourself" webR box at the end of the chapter, reusing the same `age` vector from the teaser.
- Did not add a "Further resources" section (nothing beyond `r4ds.hadley.nz`, already listed in `recommended_materials.md`, felt genuinely additive here) and left the body content untouched — it's pre-existing, human-authored material.
