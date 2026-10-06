# Testing Associations (`te-as`) → `chapters/testing-associations.qmd`

- **Status:** Split
- **Section:** Inferential Statistics
- **Parents:** `hy-te` (Hypothesis Testing)
- **Children:** `lin-m` (Linear Models)
- **Source:** `7.1-covariance-and-correlation.qmd (second half)`

## Changes made

- New module made from the `cor.test()` section at the end of old 7.1 (heading level adjusted).
- Added: example-data setup chunk (the toy `d` was previously defined earlier in 7.1), and a short subsection 'The test behind cor.test()' that explains that the test is a t-test on r (new text).

## To do

- [ ] Short module (~40 lines). Add: confidence interval for r, effect size interpretation (see `effects`), Spearman/Kendall alternative, caveats about outliers, a real-data example with the practice data.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.
