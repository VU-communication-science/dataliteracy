# Power Analysis (`power`) → `chapters/power-analysis.qmd`

- **Status:** Migrated
- **Section:** Inferential Statistics
- **Parents:** `lin-m` (Linear Models)
- **Children:** none
- **Source:** `5.3-power-analysis.qmd`

## Changes made

- Moved unchanged from old 5.3 *Statistical Power & Sample Size*.

## To do

- [ ] Contains t-test and regression power examples. Consider linking to `comparing-two-groups`, `regression`, and `effects`, and using `_potential_modules/r-power_*.qmd` to extend.
- [ ] Check position: parent is `linear-models`, but the t-test power example needs `comparing-two-groups` (an ancestor, so fine) and the regression example needs `regression` (not an ancestor).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: format standardization

- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + skill-tree deep link (`curriculum.qmd?module=power`).
- Added a code hook at the top (`pwr.t.test()` output) previewing the module's payoff.
- Added a "Try it yourself" webR box and a "Further resources" section (rpsychologist.com/viz and the `pwr` CRAN vignette, both link-checked).
