# Factor Analysis (`fa-an`) → `chapters/factor-analysis.qmd`

- **Status:** Migrated
- **Section:** Exploration and Measurement
- **Parents:** `de-st` (Descriptive Statistics)
- **Children:** `scale` (Scale Construction)
- **Source:** `3.2-factor-analysis.qmd`

## Changes made

- Moved unchanged from old 3.2 *Factor Analysis*.

## To do

- [ ] Old 3.1 *Latent Variables* (stub, 'under construction') was intended as the conceptual lead-in; it has no node in the tree. Consider adding one (e.g. a `latent` module before factor analysis) or folding a short intro into this module.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: style/format update
- Replaced the old boxed intro with the new unboxed intro paragraph, a code hook (a finished `fa.diagram()` for the three-factor Media Literacy solution), and a skill-tree deep link (`?module=fa-an`). Body content (EFA walkthrough) left unchanged.
- Added a "Try it yourself" webR box (re-running `fa()` with different `nfactors`/rotation) and a "Further resources" entry pointing to `lavaan` for confirmatory factor analysis as a natural next step.
