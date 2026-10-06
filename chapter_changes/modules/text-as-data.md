# Text as Data (`te-an`) → `chapters/text-as-data.qmd`

- **Status:** Migrated
- **Section:** Content Analysis
- **Parents:** `strng` (String processing)
- **Children:** `class` (Text Classification)
- **Source:** `8.1-content-analysis.qmd`

## Changes made

- Moved unchanged from old 8.1 *Content Analysis & Text as Data*.

## To do

- [ ] This chapter also contains an overview of dictionary-based analysis, supervised ML, and LLMs. Consider moving the ML/LLM parts to `text-classification` / `machine-learning`.
- [ ] `_potential_modules/tidytext*.qmd`, `sentiment_analysis.qmd` and `R_text_3_quanteda.qmd` are possible extensions.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: style harmonization

- Replaced the old boxed "learning journey" callout with the new unboxed intro paragraph, a code hook (a one-liner `tidytext` tokenize → stopword-remove → count pipe), and a skill-tree deep link (`?module=te-an`).
- Added a "🧪 Try it yourself" webR box (reuses the chapter's own `statements` example; `tidytext` confirmed available in the webR package repo) and a short "Further resources" section (r4css.vanatteveldt.com, tidytextmining.com).
- Added forward links to `manual-coding.qmd`, `machine-learning.qmd`, `text-classification.qmd` at the end of the "Measurement Approaches" section; body content otherwise left as-is (no AI-draft notice added, since this was a format pass, not new substantive content).
