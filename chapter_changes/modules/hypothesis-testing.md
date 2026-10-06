# Hypothesis Testing (`hy-te`) → `chapters/hypothesis-testing.qmd`

- **Status:** Migrated
- **Section:** Statistical Foundations
- **Parents:** `ef-si` (Effects)
- **Children:** `com-g` (Comparing two Groups), `te-as` (Testing Associations), `causa` (Causality)
- **Source:** `5.1-statistical-concepts.qmd`

## Changes made

- Moved from old 5.1 *Key Statistical Concepts* (only the 'Deriving hypotheses from theories' section existed); link updated.

## To do

- [ ] **Major gap**: old 5.1 only covers hypotheses. Still to write: null hypothesis, p-value, significance level (alpha), confidence intervals, Type I/II errors, one- vs. two-sided.
- [ ] Part of that may come from old 6.1 ('What is a t-test?', one/two-sided plots), which is now in `comparing-two-groups`.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: added the missing sections

- Added the null hypothesis / alternative hypothesis, the p-value (including common misinterpretations to avoid), and confidence intervals (intuitive interpretation), as natural continuations of the existing "Deriving hypotheses from theories" section, using the violent/non-violent video game heart-rate example already used elsewhere in the book (`comparing-two-groups`).
- Applied the new intro format (hook + merged paragraph + skill-tree link) and the AI-assisted-draft notice (placed after the intro, since the added sections are new, AI-drafted content).
- Added a "Try it yourself" webR box (`t.test()` on simulated heart-rate data) and a Further resources entry (StatQuest p-values video).
