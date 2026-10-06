# Statistical control (`con-s`) → `chapters/statistical-control.qmd`

- **Status:** Migrated
- **Section:** Statistical Foundations
- **Parents:** `causa` (Causality)
- **Children:** `regre` (Regression)
- **Source:** `7.3-controlling.qmd`

## Changes made

- Moved from old 7.3 *Controlling for Confounders*; links updated.

## To do

- [ ] **Order conflict**: in the skill tree `statistical-control` comes *before* `regression`, but this chapter uses multiple regression (`lm()`) to demonstrate control. Options: (a) make this module conceptual (partial correlation / comparing within strata) and keep the `lm()` examples in `regression`; or (b) change the tree so `regression` is the parent of `statistical-control`.
- [ ] Student-facing intro currently assumes the reader can already read a regression table.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.
