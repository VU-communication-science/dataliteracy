# Data Cleaning (`clean`) → `chapters/data-cleaning.qmd`

- **Status:** Migrated
- **Section:** Data Management
- **Parents:** `dfs-1` (Data Frames)
- **Children:** none
- **Source:** `2.3-data-cleaning.qmd`

## Changes made

- Moved unchanged from old 2.3 *Data Cleaning*.

## To do

- [ ] Check that datasets used here are consistent with the 'practice data' of `data-frames`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: intro format + try-it box
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph, opening with a finished `summarize(min_age, max_age)` hook that previews the bad `age` values the chapter goes on to fix, plus the skill-tree deep link (`curriculum.qmd?module=clean`).
- Added `webr: {packages: [tidyverse]}` to the frontmatter and a "Try it yourself" webR box reusing the chapter's own `practice_data.csv` and age-cleaning logic (kept to `tidyverse` only, since `summarytools` isn't needed for the exercise).
- No "Further resources" added and body content untouched — pre-existing, human-authored material.
