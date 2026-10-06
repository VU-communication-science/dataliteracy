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

### Follow-up pass: reordering + format standardization

- **Reflects the user-approved reordering decision**: `statistical-control` now comes *after* `regression` (not before), so the intro paragraph's only prerequisite is `linear-models`; the old "You arrive here from Linear Models and Statistical control" framing is gone.
- Replaced the boxed "learning journey" callout with the new unboxed intro paragraph + skill-tree deep link (`curriculum.qmd?module=regre`); dropped the "Where it leads" sentence (no more forward link to `mediation-analysis` in the running text).
- Added a code hook at the top (`tab_model()` of a two-predictor model) previewing the module's payoff.
- Added a "Try it yourself" webR box and `webr: packages` frontmatter.
