# Chapter changes: aligning the book with the skill tree

The book is now organised around `components/skill-tree/curriculum.json`:

- **One module = one file** in `chapters/` (33 modules + `curriculum.qmd`). File names are descriptive slugs without numbers (e.g. `5.03-linear-models.qmd`). Module `url`s in `curriculum.json` were updated to match.
- **Sidebar sections = categories** in `curriculum.json` (`_quarto.yml`). Within a section, modules are ordered so that parents come before children (following the grid). Categories without modules (`design`, `causality`) have no section.
- **Backup of the old book**: every old chapter is in [`_potential_modules/previous_chapters/`](../_potential_modules/previous_chapters/) (unchanged). Nothing has been deleted.
- **Per-module notes** are in [`modules/`](modules/): what changed, what is new, and a to-do list per module.

## The standard intro (updated — no longer a box)

The intro is no longer a callout box. Every module now opens with:

1. **A hook**, where it helps: a short, finished example (code or a one-line scenario) that previews what the module is building towards, *before* any step-by-step explanation.
2. **One flowing, italicised paragraph** (not bullets) that naturally covers where the student is coming from, what the module adds, and why it is worth learning. There is no "where it leads" sentence any more — forward links only live in the skill tree, not the running text.
3. **A one-line deep link back to the skill tree**: `→ [See this module in the skill tree](curriculum.qmd?module=<id>)`. The skill tree (`curriculum.qmd`) now reads a `?module=<id>` URL parameter, highlights that node, and scrolls it into view (`components/skill-tree/skill-tree.js`/`.css`).

This replaces the three-bullet callout box from the previous round. The rationale: show students early where they're headed (solves "this isn't relevant to me"), and keep the intro visually small (an abstract, not a wall of boxes).

Each module's `chapter_changes/modules/<slug>.md` notes which hook/example was used.

## Overview

| Section | Module (id) | File | Status |
| :-- | :-- | :-- | :-- |
| Computational Skills | Basic Computer Skills (`compu`) | `1.01-basic-computer-skills.qmd` | written (1.1) |
| | R language (`rlang`) | `1.02-r-language.qmd` | merged old 1.1 + 1.2 |
| | Reproducible Reports (`quart`) | `1.03-reproducible-reports.qmd` | old 1.3 |
| Data Management | Data Frames (`dfs-1`) | `2.01-data-frames.qmd` | old 2.1 |
| | Grouping and summarizing (`summa`) | `2.02-grouping-and-summarizing.qmd` | old 2.2 |
| | Data Cleaning (`clean`) | `2.03-data-cleaning.qmd` | old 2.3 |
| | Pivoting and joining (`dfs-2`) | `2.04-pivoting-and-joining.qmd` | written (2.4) |
| | String processing (`strng`) | `2.05-string-processing.qmd` | old 2.5 |
| Statistical Foundations | Means & Variance (`me-va`) | `3.01-means-and-variance.qmd` | written (3.1) |
| | Probability & Sampling (`probs`) | `3.02-probability-and-sampling.qmd` | written (3.2) |
| | Correlation & Covariance (`co-co`) | `3.03-correlation-and-covariance.qmd` | split from old 7.1 |
| | Effects (`ef-si`) | `3.04-effects.qmd` | written (3.4) |
| | Hypothesis Testing (`hy-te`) | `3.05-hypothesis-testing.qmd` | old 5.1 + new null-hypothesis/p-value/CI sections (3.5, complete) |
| | Causality (`causa`) | `3.06-causality.qmd` | old 5.2 |
| | Experimental control (`con-e`) | `5.05-experimental-control.qmd` | written (5.5), now parented by `anova` |
| | Statistical control (`con-s`) | `5.07-statistical-control.qmd` | old 7.3, reframed as coming after `regression` (5.7) |
| Exploration and Measurement | Descriptive Statistics (`de-st`) | `4.01-descriptive-statistics.qmd` | old 4.1 (empty) + old 2.4 |
| | Data Visualization (`visua`) | `4.02-data-visualization.qmd` | written (4.2) |
| | Advanced Visualization (`vis-a`) | `4.03-advanced-visualization.qmd` | written (4.3) |
| | Factor Analysis (`fa-an`) | `4.04-factor-analysis.qmd` | old 3.2 |
| | Scale Construction (`scale`) | `4.05-scale-construction.qmd` | old 3.3 |
| Inferential Statistics | Comparing two Groups (`com-g`) | `5.01-comparing-two-groups.qmd` | old 6.1 |
| | Testing Associations (`te-as`) | `5.02-testing-associations.qmd` | split from old 7.1 (+ new text) |
| | Linear Models (`lin-m`) | `5.03-linear-models.qmd` | split from old 7.2 (+ new text) |
| | ANOVA (`anova`) | `5.04-anova.qmd` | old 6.2 |
| | Regression (`regre`) | `5.06-regression.qmd` | split from old 7.2 |
| | Linear Model Assumptions (`diagn`) | `5.08-linear-model-assumptions.qmd` | split from old 7.2 |
| | Power Analysis (`power`) | `5.09-power-analysis.qmd` | old 5.3 |
| | Mediation Analysis (`media`) | `5.10-mediation-analysis.qmd` | old 7.4 |
| Content Analysis | Text as Data (`te-an`) | `6.01-text-as-data.qmd` | old 8.1 |
| | Manual Coding (`ma-co`) | `6.02-manual-coding.qmd` | written, kept short (6.2) |
| | Machine Learning (`ma-le`) | `6.03-machine-learning.qmd` | written, kept short (6.3, no parent yet) |
| | Text Classification (`class`) | `6.04-text-classification.qmd` | written, kept short (6.4) |

## Old chapters and where they went

| Old chapter | Now |
| :-- | :-- |
| 1.1 Working with R | `r-language` |
| 1.2 RStudio Projects | appended to `r-language` |
| 1.3 Quarto Reports | `reproducible-reports` |
| 1.4 Base R Fundamentals | **no module** (only in the backup). Optional; could become an optional module or an appendix |
| 2.1 Data Frames | `data-frames` |
| 2.2 Summarizing Data | `grouping-and-summarizing` |
| 2.3 Data Cleaning | `data-cleaning` |
| 2.4 Transformations & Reshaping | standardization part in `descriptive-statistics` (no reshaping content existed) |
| 2.5 String Processing | `string-processing` |
| 3.1 Latent Variables | **no module** (empty stub; see below) |
| 3.2 Factor Analysis | `factor-analysis` |
| 3.3 Scale Construction | `scale-construction` |
| 4.1 Descriptive Statistics | empty; replaced by `descriptive-statistics` |
| 4.2 Visualization | empty; replaced by `data-visualization` (stub) |
| 5.1 Key Statistical Concepts | `hypothesis-testing` |
| 5.2 Causality & Experiments | `causality` |
| 5.3 Power Analysis | `power-analysis` |
| 6.1 T-Test | `comparing-two-groups` |
| 6.2 ANOVA | `anova` |
| 6.3 ANCOVA | **no module** (only in the backup; see below) |
| 7.1 Covariance & Correlation | split: `correlation-and-covariance` + `testing-associations` |
| 7.2 Linear Regression | split: `linear-models` + `regression` + `linear-model-assumptions` |
| 7.3 Controlling for Confounders | `statistical-control` |
| 7.4 Mediation | `mediation-analysis` |
| 8.1 Content Analysis & Text as Data | `text-as-data` |
| 9.1 Advanced Modeling Overview | **no module** (only in the backup) |

Material that is only in the backup: **1.4 Base R**, **3.1 Latent Variables**, **6.3 ANCOVA**, **9.1 Advanced Modeling**. Suggestions: ANCOVA fits in `anova` or `regression`; Latent Variables could be a conceptual module before `factor-analysis`; Base R and Advanced Modeling could be optional/extension modules or appendices if you want them back in the sidebar.

## Big textual changes (details in the per-module notes)

- `r-language`: merge of old 1.1 and 1.2, no text changes.
- `correlation-and-covariance` / `testing-associations`: old 7.1 split at the `cor.test()` section. New text in `testing-associations`: setup chunk and a subsection explaining that `cor.test()` is a t-test on *r*.
- `linear-models` / `regression` / `linear-model-assumptions`: old 7.2 split in three. New text: rewritten intro paragraphs and step list, "What's next" section, "Setting up" section in `regression`, and an intro and data-loading chunk in `linear-model-assumptions`. Heading levels in `regression` were promoted one level.
- `descriptive-statistics`: old 2.4 standardization text wrapped in new headings, plus a placeholder section.
- All 11 stubs now have full content (see the overview table above); each module note explains what was written and still flags anything left for an instructor to check.
- `hypothesis-testing`: the old 5.1 (deriving hypotheses) now also covers the null/alternative hypothesis, p-values (including common misreadings), and confidence intervals. Marked with an AI-assisted-draft notice since the added sections haven't been reviewed by course staff yet.
- `experimental-control` / `statistical-control`: rewritten to come *after* `anova` / `regression` respectively (see "Reordering" below).

## Reordering: `experimental-control` and `statistical-control` now come after their statistical-model siblings

Resolved per instructor decision: both control modules are now taught *after* the model they'd otherwise anticipate, since the goal is to revisit control conceptually/mechanically once students already understand the model (ANOVA, regression) being controlled for.

- `curriculum.json`: `con-e` (experimental-control) parents are now `['causa', 'anova']`; `con-s` (statistical-control) parents are now `['causa', 'regre']`. `anova`/`regre` no longer list `con-e`/`con-s` as parents. Both moved category from `foundations` to `inferential`, matching their new sidebar section.
- `_quarto.yml`: "Inferential Statistics" section order is now `comparing-two-groups, testing-associations, linear-models, anova, experimental-control, regression, statistical-control, linear-model-assumptions, power-analysis, mediation-analysis`.
- `5.04-anova.qmd` / `5.06-regression.qmd`: intro paragraphs rewritten so their only stated prerequisite is `linear-models` (no longer reference the control modules as something the student needs first).
- `5.05-experimental-control.qmd` (written from stub) and `5.07-statistical-control.qmd` (existing content, reframed) both explicitly build on the statistical model taught just before them.

## Numbering

Every module now has a `number` field in `curriculum.json` of the form `{section}.{index}` (section = sidebar section order, index = position within it), matching the book's final section order (Computational Skills, Data Management, Statistical Foundations, Exploration and Measurement, Inferential Statistics, Content Analysis). Every chapter's frontmatter `title:` is prefixed with this number (e.g. `"3.5 Hypothesis Testing"`), and the skill-tree popovers read the same field — so the stale pre-reorg numbers (`0.0`, `7.3`, etc.) are gone and both places now agree.

**File names also carry this number** (e.g. `3.05-hypothesis-testing.qmd`), so `ls chapters/` sorts in reading order. The index is zero-padded to two digits in the *file name only* (`5.10-mediation-analysis.qmd`, not `5.1-mediation-analysis.qmd`) so section 5's ten modules still sort correctly as plain text; the `number` field and the title prefix stay unpadded (`5.10`). These module numbers are now considered stable — don't renumber/reorder modules casually, since it means a rename across `curriculum.json`, every chapter's frontmatter, every cross-chapter link, and `_quarto.yml`.

## Deep-linking into the skill tree

`curriculum.qmd` reads a `?module=<id>` URL query parameter (`components/skill-tree/skill-tree.js`), persistently highlights that node (`.st-node-selected`, `components/skill-tree/skill-tree.css`), and scrolls it into view. Every module now ends its intro with `→ [See this module in the skill tree](curriculum.qmd?module=<id>)`, so chapters can always link back to themselves in context.

## New intro format, "Try it yourself", and "Further resources"

- The old three-bullet callout box is gone (see "The standard intro" above).
- Any module containing R code had a "🧪 Try it yourself" collapsible block with a small, editable `{webr}` exercise students could run in-browser (no install needed), reusing the chapter's own example/dataset wherever possible. **This has since been removed project-wide** (see "webR removal" below) — the notes in `modules/*.md` still describe it historically.
- Several modules now end with a short "Further resources" section (2–5 links), using only video links verified via the YouTube oEmbed API and stable documentation URLs — never invented links.
- Stub modules now show an "AI-assisted draft" warning (replacing the old "under construction" notice) since their content hasn't been checked by course staff yet.

## webR removal

The `{webr}` "Try it yourself" blocks (via the `r-wasm/quarto-live` extension) were removed project-wide: every chapter's `{webr}` block and `webr:` frontmatter key is gone, `_quarto.yml`'s format reverted from `live-html` to `html`, and the extension-install steps were dropped from `.github/workflows/deploy.yml`/`update.yml`. Reasons: (1) the runtime downloads ~30MB of WebAssembly on every page load regardless of whether a reader ever runs the exercise, with no supported way to defer it (`r-wasm/quarto-live` issue #61, open/unresolved upstream); and (2) `read_csv()` couldn't fetch the remote practice dataset from inside webR despite CORS being configured, with no clean fix available. If in-browser R exercises are revisited later, treat it as a fresh decision rather than restoring this implementation.

## Open questions / issues in the skill tree

1. ~~**`statistical-control` before `regression`**~~ — resolved, see "Reordering" above.
2. ~~**`hypothesis-testing` is incomplete**~~ — resolved, see above.
3. **`machine-learning` has no parent** in `curriculum.json` — left unparented deliberately for now (instructor hasn't decided where it should sit in the tree); its chapter is written but short, per instructor guidance to keep content-analysis modules brief.
4. **`power-analysis`** has `linear-models` as parent but its chapter includes regression power examples; and effect sizes (`effects`) are prerequisites of power analysis conceptually (it is an ancestor via `hy-te`, so fine). Not changed this round.
5. ~~**`number` fields in `curriculum.json` are stale**~~ — resolved, see "Numbering" above.
6. **Unused categories** `design` and `causality` have no modules, so they have no sidebar section. All causality modules are currently in `foundations`.
7. **Package conventions** (`module_standard.md`): to be checked per module (`sjPlot`, `pwr`, `lavaan`, `tidytext`).
8. **`module_standard.md`** was updated again this round: Part 1b (intro) now specifies the unboxed single-paragraph format, hook-first ordering, and the skill-tree deep link; new Part 7 ("Try it yourself") and Part 8 ("Further resources"); new §5 (Numbering) and §6 (AI-assisted content notice). The remaining style items (Key Takeaways, shared data/packages box, APA reporting blocks) are still not applied — see below.

## Style harmonization to do for every module

Each per-module file ends with the same checklist. Summary of the target style (from `module_standard.md`, adapted to the new setup):

- [x] Skill-tree intro (unboxed paragraph + hook + deep link — done for all modules)
- [x] ~~"Try it yourself" webR block~~ — removed project-wide, see "webR removal" above
- [x] "Further resources" section (done where a genuinely relevant, verified link exists)
- [x] "AI-assisted draft" notice on all new/substantially-rewritten content (stubs + the new hypothesis-testing sections)
- [ ] 'Key Takeaways' callout (core concept, key functions)
- [ ] 'Required Packages & Data' callout with a standard dataset (`practice_data.csv`) loaded identically in every module
- [ ] Conceptual intuition before code, with minimal math
- [ ] APA reporting block where relevant

## Other changes in this reorganisation

- `_quarto.yml`: sidebar rebuilt from `curriculum.json` categories (see above). Optional section removed. Reordered again this round for the experimental-control/statistical-control move.
- `components/skill-tree/curriculum.json`: `url`s updated to the new file names (previous round); this round added renumbering and the experimental-control/statistical-control reparenting.
- `_chapter_hashes.json` has to be re-blessed after this change (`Rscript scripts/check_drift.R --bless`).
- The old numbered file names (`7.2-linear-regression.html` etc.) no longer exist; old links to them will break.
- `recommended_materials.md`: fixed a mislabeled video (a "StatsCast" video was wrongly attributed to StatQuest) and added a verified StatQuest video for `means-and-variance`.
