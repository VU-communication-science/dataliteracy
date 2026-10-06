# Correlation & Covariance (`co-co`) → `chapters/correlation-and-covariance.qmd`

- **Status:** Split
- **Section:** Statistical Foundations
- **Parents:** `me-va` (Means & Variance)
- **Children:** `de-st` (Descriptive Statistics), `ef-si` (Effects)
- **Source:** `7.1-covariance-and-correlation.qmd`

## Changes made

- Old 7.1 split in two: everything up to (not including) *Testing Correlation: cor.test()* stays here; the `cor.test()` section moved to `testing-associations`.
- Added a closing paragraph linking to `testing-associations`.
- Replaced the in-page `#testing-correlation` link.

## To do

- [ ] Could use a short section on how correlation relates to effect sizes (see `effects`).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: format only

- Replaced the old boxed learning-journey callout with the new unboxed intro paragraph + a one-line code hook (cor() teaser) + skill-tree link, per `module_standard.md`.
- Added a "Try it yourself" webR box (cov/cor on the chapter's own toy data) and a Further resources entry (StatQuest Pearson correlation video).
- No AI-assisted-draft notice added; body content is unchanged, pre-existing material.
