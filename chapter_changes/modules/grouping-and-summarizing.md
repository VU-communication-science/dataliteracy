# Grouping and summarizing (`summa`) → `chapters/grouping-and-summarizing.qmd`

- **Status:** Migrated
- **Section:** Data Management
- **Parents:** `dfs-1` (Data Frames)
- **Children:** `dfs-2` (Pivoting and joining), `de-st` (Descriptive Statistics), `visua` (Data Visualization)
- **Source:** `2.2-summarizing.qmd`

## Changes made

- Moved unchanged from old 2.2 *Summarizing Data*.

## To do

- [ ] Chapter is short (~100 lines); could be enriched with `_potential_modules/R-tidy-5b-groupby.qmd`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: intro format + try-it box
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph, opening with a finished `group_by()`/`summarize()` hook reusing the chapter's own guns-polls dataset, plus the skill-tree deep link (`curriculum.qmd?module=summa`).
- Added `webr: {packages: [tidyverse]}` to the frontmatter and a "Try it yourself" webR box at the end of the chapter, reusing the same dataset.
- No "Further resources" added and body content untouched — pre-existing, human-authored material.
