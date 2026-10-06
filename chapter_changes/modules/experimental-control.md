# Experimental control (`con-e`) → `chapters/experimental-control.qmd`

- **Status:** New (stub)
- **Section:** Statistical Foundations
- **Parents:** `causa` (Causality)
- **Children:** `anova` (ANOVA)
- **Source:** none (new module)

## Planned content

- Randomization and why it removes confounding on average
- Control groups, manipulation checks, and blinding
- Between-subjects vs. within-subjects (repeated measures) designs
- Threats to validity in experiments (brief)

## Possible source material

- Section 'How to (better) establish causation' of `causality` (old 5.2).

## To do

- [ ] Write the module (new), moving the design-related part of `causality` here.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full content written + reordering

- **Reflects the user-approved reordering decision**: `experimental-control` now has parents `causality` AND `anova`, i.e. it comes *after* ANOVA rather than before it. The intro paragraph is framed accordingly: students arrive having just learned the ANOVA model for comparing group means, and this module steps back to the *design* side (why randomization makes the groups comparable in the first place).
- Wrote the full module per the planned outline: randomization and why it removes confounding on average (with a `sample()`-based simulation), control groups/manipulation checks/blinding, between- vs. within-subjects designs (with explicit callback to the ANOVA module's robot-design and heart-rate examples), and a brief threats-to-validity section.
- Added the "AI-assisted draft" notice (this is new, un-reviewed content).
- Added a small "Try it yourself" webR box simulating random assignment balance with `sample()`.
- Needed `engine: knitr` explicitly in the frontmatter: with no non-webr R chunks in the file, quarto's engine auto-detection otherwise falls back to a jupyter engine that isn't configured here. Confirmed this renders cleanly with `quarto render ... --to live-html`.
