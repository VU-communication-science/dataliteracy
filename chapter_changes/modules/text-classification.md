# Text Classification (`class`) → `chapters/text-classification.qmd`

- **Status:** New (stub)
- **Section:** Content Analysis
- **Parents:** `te-an` (Text as Data), `ma-co` (Manual Coding), `ma-le` (Machine Learning)
- **Children:** none
- **Source:** none (new module)

## Planned content

- From tokens to a document-term matrix (bag of words)
- Training and evaluating a classifier against manual coding
- Dictionaries and sentiment analysis as a simpler alternative
- Embeddings and large language models (overview)

## Possible source material

- `_potential_modules/sentiment_analysis.qmd`, `tidytext-dictionary.qmd`, `tidytext-topicmodel.qmd`, `R_text_3_quanteda.qmd`
- The 'Measurement Approaches' section of `text-as-data` (old 8.1).

## To do

- [ ] Write the module (new).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: written

- Wrote the full module (previously a stub): a dictionary-based classification hook, the dictionary vs. supervised classifier vs. LLM-based classification trichotomy, bag-of-words / document-term matrices via `tidytext::unnest_tokens()` + `pivot_wider()`, and a short note on evaluating a classifier against manual coding (confusion matrix, conceptual).
- Added the new unboxed intro + code hook + skill-tree link (`?module=class`; links to `text-as-data`, `manual-coding`, `machine-learning` moved into body prose, not the intro), the "AI-assisted draft" notice, a webR "Try it yourself" box (reuses `tidytext`, confirmed webR-compatible), and a "Further resources" section.
