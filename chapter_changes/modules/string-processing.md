# String processing (`strng`) → `chapters/string-processing.qmd`

- **Status:** Migrated
- **Section:** Data Management
- **Parents:** `dfs-1` (Data Frames)
- **Children:** `te-an` (Text as Data)
- **Source:** `2.5-strings.qmd`

## Changes made

- Moved unchanged from old 2.5 *String Processing with stringr*.

## To do

- [ ] Could be enriched with `_potential_modules/R-tidy-14-strings.qmd`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: intro format + try-it box + resources
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph, opening with a finished `str_extract()` hook, plus the skill-tree deep link (`curriculum.qmd?module=strng`).
- Added `webr: {packages: [tidyverse]}` to the frontmatter and a "Try it yourself" webR box reusing the chapter's own `headlines` vector.
- Converted the closing blockquote link into a standard "Further resources" section (verified `r4css.vanatteveldt.com` is still live). Body content otherwise untouched — pre-existing, human-authored material.
