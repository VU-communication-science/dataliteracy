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

### Follow-up pass: reordering + format standardization

- **Reflects the user-approved reordering decision**: `statistical-control` now has parents `causality` AND `regression`, i.e. it comes *after* regression rather than before it. This resolves the previously-noted "order conflict" to-do: the chapter already used `lm()` to demonstrate control, and now the intro paragraph matches that by framing the module as "you now know how to fit and interpret a regression model; here's how to use that same tool to adjust for confounders statistically."
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + skill-tree deep link (`curriculum.qmd?module=con-s`); dropped the "Where it leads" sentence pointing to `regression` (no forward link in the running text anymore).
- Body content (storks/babies walkthrough) left untouched as instructed.
- Added a "Try it yourself" webR box reusing the existing storks data/two-model comparison, and `webr: packages` frontmatter.
