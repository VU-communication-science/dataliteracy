# Chapter changes: aligning the book with the skill tree

The book is now organised around `components/skill-tree/curriculum.json`:

- **One module = one file** in `chapters/` (33 modules + `curriculum.qmd`). File names are descriptive slugs without numbers (e.g. `linear-models.qmd`). Module `url`s in `curriculum.json` were updated to match.
- **Sidebar sections = categories** in `curriculum.json` (`_quarto.yml`). Within a section, modules are ordered so that parents come before children (following the grid). Categories without modules (`design`, `causality`) have no section.
- **Backup of the old book**: every old chapter is in [`_potential_modules/previous_chapters/`](../_potential_modules/previous_chapters/) (unchanged). Nothing has been deleted.
- **Per-module notes** are in [`modules/`](modules/): what changed, what is new, and a to-do list per module.

## The standard intro box

Every module now starts with a callout *"Where you are in your learning journey"*, generated from the skill tree:

1. **Where you come from**: links to the parent module(s) and a one-sentence recap of what the student can do now.
2. **What this module adds**
3. **Why it is valuable**
4. **Where it leads**: links to the child modules.

Parent and child links come from `parents` in `curriculum.json`. If you change the tree, update the links in the box by hand (the text is plain markdown).

## Overview

| Section | Module (id) | File | Status |
| :-- | :-- | :-- | :-- |
| Computational Skills | Basic Computer Skills (`compu`) | `basic-computer-skills.qmd` | **new stub** |
| | R language (`rlang`) | `r-language.qmd` | merged old 1.1 + 1.2 |
| | Reproducible Reports (`quart`) | `reproducible-reports.qmd` | old 1.3 |
| Data Management | Data Frames (`dfs-1`) | `data-frames.qmd` | old 2.1 |
| | Grouping and summarizing (`summa`) | `grouping-and-summarizing.qmd` | old 2.2 |
| | Data Cleaning (`clean`) | `data-cleaning.qmd` | old 2.3 |
| | Pivoting and joining (`dfs-2`) | `pivoting-and-joining.qmd` | **new stub** |
| | String processing (`strng`) | `string-processing.qmd` | old 2.5 |
| Statistical Foundations | Means & Variance (`me-va`) | `means-and-variance.qmd` | **new stub** |
| | Probability & Sampling (`probs`) | `probability-and-sampling.qmd` | **new stub** |
| | Correlation & Covariance (`co-co`) | `correlation-and-covariance.qmd` | split from old 7.1 |
| | Effects (`ef-si`) | `effects.qmd` | **new stub** |
| | Hypothesis Testing (`hy-te`) | `hypothesis-testing.qmd` | old 5.1 (incomplete) |
| | Causality (`causa`) | `causality.qmd` | old 5.2 |
| | Experimental control (`con-e`) | `experimental-control.qmd` | **new stub** |
| | Statistical control (`con-s`) | `statistical-control.qmd` | old 7.3 |
| Exploration and Measurement | Descriptive Statistics (`de-st`) | `descriptive-statistics.qmd` | old 4.1 (empty) + old 2.4 |
| | Data Visualization (`visua`) | `data-visualization.qmd` | **new stub** (old 4.2 was empty) |
| | Advanced Visualization (`vis-a`) | `advanced-visualization.qmd` | **new stub** |
| | Factor Analysis (`fa-an`) | `factor-analysis.qmd` | old 3.2 |
| | Scale Construction (`scale`) | `scale-construction.qmd` | old 3.3 |
| Inferential Statistics | Comparing two Groups (`com-g`) | `comparing-two-groups.qmd` | old 6.1 |
| | Testing Associations (`te-as`) | `testing-associations.qmd` | split from old 7.1 (+ new text) |
| | Linear Models (`lin-m`) | `linear-models.qmd` | split from old 7.2 (+ new text) |
| | ANOVA (`anova`) | `anova.qmd` | old 6.2 |
| | Regression (`regre`) | `regression.qmd` | split from old 7.2 |
| | Linear Model Assumptions (`diagn`) | `linear-model-assumptions.qmd` | split from old 7.2 |
| | Power Analysis (`power`) | `power-analysis.qmd` | old 5.3 |
| | Mediation Analysis (`media`) | `mediation-analysis.qmd` | old 7.4 |
| Content Analysis | Text as Data (`te-an`) | `text-as-data.qmd` | old 8.1 |
| | Manual Coding (`ma-co`) | `manual-coding.qmd` | **new stub** |
| | Machine Learning (`ma-le`) | `machine-learning.qmd` | **new stub** |
| | Text Classification (`class`) | `text-classification.qmd` | **new stub** |

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
- All stubs (`new`) contain only the intro box and a planned outline (and an HTML comment pointing to possible source material).

## Open questions / issues in the skill tree

1. **`statistical-control` before `regression`**: the chapter uses `lm()` to demonstrate control (see [modules/statistical-control.md](modules/statistical-control.md)).
2. **`hypothesis-testing` is incomplete**: the old 5.1 only discusses deriving hypotheses. The core (null hypothesis, p-value, CI, alpha, errors) still has to be written; and parts of old 6.1 overlap with it.
3. **`machine-learning` has no parent** in `curriculum.json`.
4. **`power-analysis`** has `linear-models` as parent but its chapter includes regression power examples; and effect sizes (`effects`) are prerequisites of power analysis conceptually (it is an ancestor via `hy-te`, so fine).
5. **`number` fields in `curriculum.json`** are stale (old numbering, e.g. `0.0`, `7.3`) but are still shown in the skill-tree popovers. Titles no longer carry numbers. Decide whether to remove the number badge or to keep numbers.
6. **Unused categories** `design` and `causality` have no modules, so they have no sidebar section. All causality modules are currently in `foundations`.
7. **Package conventions** (`module_standard.md`): to be checked per module (`sjPlot`, `pwr`, `lavaan`, `tidytext`).
8. **`module_standard.md`** was updated: no more `X.Y` numbered titles, and the skill-tree intro box is now a required part (Part 1b). The remaining parts (Key Takeaways, data callout, etc.) are not yet applied to the modules.

## Style harmonization to do for every module

Each per-module file ends with the same checklist. Summary of the target style (from `module_standard.md`, adapted to the new setup):

- [x] Skill-tree intro box (done for all modules)
- [ ] 'Key Takeaways' callout (core concept, key functions)
- [ ] 'Required Packages & Data' callout with a standard dataset (`practice_data.csv`) loaded identically in every module
- [ ] Conceptual intuition before code, with minimal math
- [ ] APA reporting block where relevant
- [ ] Optional further reading

## Other changes in this reorganisation

- `_quarto.yml`: sidebar rebuilt from `curriculum.json` categories (see above). Optional section removed.
- `components/skill-tree/curriculum.json`: only the `url` of each module was changed (to the new file names).
- `_chapter_hashes.json` has to be re-blessed after this change (`Rscript scripts/check_drift.R --bless`).
- The old numbered file names (`7.2-linear-regression.html` etc.) no longer exist; old links to them will break.
