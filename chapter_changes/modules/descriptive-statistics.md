# Descriptive Statistics (`de-st`) → `chapters/descriptive-statistics.qmd`

- **Status:** Merged
- **Section:** Exploration and Measurement
- **Parents:** `summa` (Grouping and summarizing), `co-co` (Correlation & Covariance)
- **Children:** `fa-an` (Factor Analysis)
- **Source:** `4.1-descriptive-statistics.qmd (empty)`, `2.4-transformations.qmd`

## Changes made

- Old 4.1 was empty. Old 2.4 *Transformations & Reshaping* (which only contained standardization) was added as the section 'Standardizing variables' (heading levels adjusted).
- Added a placeholder section 'Describing variables'.

## To do

- [ ] Write the 'Describing variables' section: frequency tables, mean/median/mode, SD/IQR, skewness, by variable type.
- [ ] Check whether standardization belongs better in `means-and-variance` or `effects`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: style/format update
- Replaced the old boxed "Where you are in your learning journey" callout with the new unboxed intro paragraph, a code hook (frequency table via `count()`), and a skill-tree deep link (`?module=de-st`).
- Filled the previously-empty "Describing variables" placeholder: frequency tables for categorical variables, central tendency (mean/median/mode) and spread (range/sd/IQR/`summary()`) for numeric variables, using `practice_data.csv`.
- Added a "Try it yourself" webR box (mean/median/z-score on `trust_t1`) and a "Further resources" entry (StatQuest mean/variance/SD video).
