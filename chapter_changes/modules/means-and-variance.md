# Means & Variance (`me-va`) → `chapters/means-and-variance.qmd`

- **Status:** New (stub)
- **Section:** Statistical Foundations
- **Parents:** `rlang` (R language)
- **Children:** `probs` (Probability & Sampling), `co-co` (Correlation & Covariance)
- **Source:** none (new module)

## Planned content

- The mean as a 'balance point'; deviations from the mean
- Variance and standard deviation: why we square, how to interpret
- Computing `mean()`, `var()`, `sd()` in R (and by hand once)
- Median and other robust alternatives (brief)

## Possible source material

- The by-hand calculations in `correlation-and-covariance` (deviation scores) can serve as a model.
- Old 4.1 *Descriptive Statistics* was empty.

## To do

- [ ] Write the module (new).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full content written

- Wrote the full module: the mean as a balance point, variance/SD with a by-hand calculation, an intuitive explanation of why we divide by n-1, and a closing section foreshadowing how variance underlies t-tests/correlation/regression/effect sizes.
- Used a political-interest comm-sci example throughout.
- Applied new intro format (hook + merged paragraph + skill-tree link) and the AI-assisted-draft notice.
- Added a "Try it yourself" webR box and a Further resources entry (StatQuest mean/variance/SD video).
