# Linear Model Assumptions (`diagn`) → `chapters/linear-model-assumptions.qmd`

- **Status:** Split
- **Section:** Inferential Statistics
- **Parents:** `lin-m` (Linear Models)
- **Children:** none
- **Source:** `7.2-linear-regression.qmd (assumptions section)`

## Changes made

- Created from the section 'Conditions and assumptions' of old 7.2; added a short intro and the data-loading chunk so the module runs on its own.

## To do

- [ ] Some checks refer to multiple regression (multicollinearity, `vif`); note that these apply once `regression` is read.
- [ ] Add a short 'what to do if an assumption fails' summary (robust SEs, transformation).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: format standardization

- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + skill-tree deep link (`curriculum.qmd?module=diagn`).
- Added a code hook at the top (linear vs. quadratic fit comparison plot, reusing the chapter's own later example) previewing why assumptions matter before the formal build-up.
- Added a "Try it yourself" webR box and `webr: packages` frontmatter.
