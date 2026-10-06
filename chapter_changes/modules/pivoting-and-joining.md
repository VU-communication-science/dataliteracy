# Pivoting and joining (`dfs-2`) → `chapters/pivoting-and-joining.qmd`

- **Status:** New (stub)
- **Section:** Data Management
- **Parents:** `summa` (Grouping and summarizing)
- **Children:** `vis-a` (Advanced Visualization), `ma-co` (Manual Coding)
- **Source:** none (new module)

## Planned content

- Wide vs. long data and tidy data principles
- `pivot_longer()` and `pivot_wider()` with examples from repeated-measures survey data
- Combining data frames: keys and `left_join()`, `inner_join()`, `bind_rows()`
- Checking a join: duplicated keys and unmatched rows

## Possible source material

- `_potential_modules/R-tidy-13a-joining.qmd` (joining)
- Old 2.4 *Transformations & Reshaping* has 'Reshaping' in its title but contains no reshaping content (it only covers standardization, now in `descriptive-statistics`).

## To do

- [ ] Write the module (new). Pivoting content needs to be written; joining can be adapted from the potential module.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full module written
- Wrote full new content per the planned outline: wide vs. long data and tidy-data principles, `pivot_longer()`/`pivot_wider()` using a small repeated-measures trust survey, and the `*_join()` family (`left_join()`, `inner_join()`, `full_join()`) joining a respondent table to a media-outlet table, plus a section on checking a join for unmatched rows and duplicated keys.
- Replaced the old "Under construction" banner with the standard "AI-assisted draft" callout.
- Applied the new unboxed intro paragraph + hook (a finished `pivot_longer()` call) and added the skill-tree deep link (`curriculum.qmd?module=dfs-2`).
- Added `webr: {packages: [tidyverse]}` to the frontmatter and a "Try it yourself" webR box reusing the chapter's own survey data.
- Added a "Further resources" section linking to the R4DS tidying and joins chapters (both verified live).
