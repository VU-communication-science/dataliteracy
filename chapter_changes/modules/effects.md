# Effects (`ef-si`) → `chapters/effects.qmd`

- **Status:** New (stub)
- **Section:** Statistical Foundations
- **Parents:** `co-co` (Correlation & Covariance), `probs` (Probability & Sampling)
- **Children:** `hy-te` (Hypothesis Testing)
- **Source:** none (new module)

## Planned content

- What counts as an effect: mean differences, correlations, regression slopes
- Raw vs. standardized effect sizes (Cohen's d, r, R²) and rules of thumb
- Effect size vs. uncertainty: the same effect can be precise or noisy
- Interpreting effects substantively: is it practically meaningful?

## Possible source material

- Standardization text now in `descriptive-statistics` (from old 2.4).
- Effect-size passages in `power-analysis` (old 5.3) and `regression` ('Standardized coefficients').

## To do

- [ ] Write the module (new).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full content written

- Wrote the full module: what counts as an effect, why raw effects are hard to compare, Cohen's d (by hand + `effectsize::cohens_d()` mention), r as an effect size, and effect size vs. statistical significance (foreshadowing power-analysis).
- Used a newspaper-subscription / political-interest comm-sci example, consistent with terminology in `comparing-two-groups` and `correlation-and-covariance`.
- Applied new intro format (hook + merged paragraph + skill-tree link) and the AI-assisted-draft notice.
- Added a "Try it yourself" webR box (computing Cohen's d) and a Further resources entry (StatQuest p-values video).
