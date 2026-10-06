# Regression (`regre`) → `chapters/regression.qmd`

- **Status:** Split
- **Section:** Inferential Statistics
- **Parents:** `lin-m` (Linear Models), `con-s` (Statistical control)
- **Children:** `media` (Mediation Analysis)
- **Source:** `7.2-linear-regression.qmd (middle + end)`

## Changes made

- Created from old 7.2: sections 'Multiple regression', 'Categorical IVs', 'Interaction effects' (heading levels promoted by one) and 'How to report'.
- Added a 'Setting up' section (helper chunk, data loading, and the simple model `m` that is referenced in the standardization example).
- The `[confounding tutorial]` link now points to `statistical-control`.

## To do

- [ ] The multiple-regression text says 'In the previous example we used a single independent variable...': check that it still reads well; add a 3-4 line recap of simple regression.
- [ ] Link ANOVA and ANCOVA (old 6.3) to the categorical-predictor and covariate discussion.
- [ ] `_potential_modules/R_statistics_moderation-analysis.qmd` and `r-power-bivariate-regression.qmd` can enrich interactions and power.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.
