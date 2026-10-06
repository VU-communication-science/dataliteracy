# Linear Models (`lin-m`) → `chapters/linear-models.qmd`

- **Status:** Split
- **Section:** Inferential Statistics
- **Parents:** `com-g` (Comparing two Groups), `te-as` (Testing Associations)
- **Children:** `diagn` (Linear Model Assumptions), `power` (Power Analysis), `anova` (ANOVA), `regre` (Regression)
- **Source:** `7.2-linear-regression.qmd (first part)`

## Changes made

- Old 7.2 *Linear Regression* split in three: this module keeps 'What is regression analysis?' (renamed 'What is a linear model?'), 'How does it work?', and 'How to use' up to and including *Simple linear regression*.
- Rewrote the intro paragraph ('This is a long tutorial, split up in three parts...') and the 'How to use' step list for the new scope (new text).
- Added a 'What's next' section.

## To do

- [ ] **Key conceptual addition needed**: show explicitly that the independent-samples t-test and `cor.test()` are special cases of `lm()` (same t and p). This is what justifies the node's position after `comparing-two-groups` and `testing-associations`.
- [ ] Move the (hidden) helper `p_thres()` to a shared place if used by several modules.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: format standardization

- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + skill-tree deep link (`curriculum.qmd?module=lin-m`), per the updated `module_standard.md`.
- Added a code hook at the top (`tab_model()` output of the `age` model) previewing the module's payoff before the step-by-step build-up.
- Removed the "What's next" closing section (forward links now live only in the skill tree, not the running text).
- Added a "Try it yourself" webR box reusing the chapter's own data/model, and a "Further resources" link to the StatQuest R-squared video.
