# Potential Modules from `ccs-amsterdam/r-course-material`

This document reviews tutorials identified from [ccs-amsterdam/r-course-material](https://github.com/ccs-amsterdam/r-course-material/tree/master/tutorials) for potential integration into the Data Literacy course curriculum.

All candidates have been downloaded into the `potential_modules/` directory in Quarto format (`.qmd`) for review and piloting.

---

## 1. Base R Foundations (Optional Module)

### [`potential_modules/R_basics_2_data_and_functions.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R_basics_2_data_and_functions.qmd)
- **Source**: `R_basics_2_data_and_functions.Rmd`
- **Topic**: Base R vectors, indexing with `[]` and `$`, data types (`numeric`, `character`, `logical`, `factor`), data frames without dplyr, and writing custom functions (`function(x) { ... }`).
- **Curriculum Fit**:
  - *Recommendation*: **Include as an Optional/Enrichment module (e.g., Module 1.4 or an appendix)**.
  - *Rationale*: While our primary curriculum standardizes on `tidyverse` (`filter`, `select`, `mutate`), students frequently encounter Base R syntax in online documentation, StackOverflow, or advanced statistics packages (`lavaan`, `stats`, base plotting). Having a short optional tutorial explaining `df$col` vs `df["col"]` and basic functions will resolve student confusion without derailing the tidyverse focus.
  - *Skill Tree Status*: Can be marked as `optional: true` in `curriculum.json`.

---

## 2. Power Analysis & Sample Size Planning

The repository contains three tutorials using the `pwr` and `pwr2` packages:

### A. [`potential_modules/r-power_t-tests.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/r-power_t-tests.qmd)
- **Topic**: Power analysis for independent and paired samples $t$-tests using `pwr.t.test()` and Cohen's $d$.
- **Curriculum Fit**:
  - *Recommendation*: **Include as a direct extension / companion to Module 6.1 (T-Test) or in a dedicated "Study Design / Power" track**.
  - *Rationale*: Directly complements Chapter 6.1. Highly practical for thesis students who need to justify their sample sizes before collecting data.

### B. [`potential_modules/r-power_2x2-design.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/r-power_2x2-design.qmd)
- **Topic**: Power analysis for factorial ANOVA ($2 \times 2$ experimental designs) using `pwr.2way()`.
- **Curriculum Fit**:
  - *Recommendation*: **Include as an optional extension to Module 6.2 (ANOVA)**.

### C. [`potential_modules/r-power-bivariate-regression.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/r-power-bivariate-regression.qmd)
- **Topic**: Power and sample size estimation for linear regression using `pwr.f2.test()` with $f^2$ effect size.
- **Curriculum Fit**:
  - *Recommendation*: **Include as an optional extension to Module 7.2 (Linear Regression)**.

---

## 3. Simplified Text Analysis Track

*(Note: Designed to touch upon computational communication methods without duplicating the standalone text analysis course book).*

### A. [`potential_modules/tidytext.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/tidytext.qmd)
- **Topic**: Tidy data principles applied to text: tokenization (`unnest_tokens`), stop word removal (`anti_join(stop_words)`), and word frequency counting (`count`).
- **Curriculum Fit**:
  - *Recommendation*: **Prime candidate for a concise "Introduction to Text as Data" module**.
  - *Rationale*: Uses the exact same `tidyverse` verbs students already know (`dplyr`, `ggplot2`). Very intuitive and accessible.

### B. [`potential_modules/tidytext-dictionary.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/tidytext-dictionary.qmd) & [`potential_modules/sentiment_analysis.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/sentiment_analysis.qmd)
- **Topic**: Dictionary-based text analysis and sentiment analysis (`get_sentiments()`, Bing/NRC/Afinn lexicons).
- **Curriculum Fit**:
  - *Recommendation*: Can be condensed into a single applied case study following `tidytext.qmd` showing how text becomes a numeric variable in a data frame.

### C. [`potential_modules/R_text_3_quanteda.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R_text_3_quanteda.qmd) & [`potential_modules/tidytext-topicmodel.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/tidytext-topicmodel.qmd)
- **Topic**: Corpora, Document-Feature Matrices (DFM), and LDA Topic Modeling.
- **Curriculum Fit**:
  - *Recommendation*: **Keep in repository as optional advanced modules**. Can be linked for students who want to go deeper into computational methods.

---

## 4. Content Suitable for Immediate Use in Existing Modules

### A. Grouping & Summarizing (`2.2-summarizing.qmd`)
- **Found**: [`potential_modules/R-tidy-5b-groupby.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R-tidy-5b-groupby.qmd)
- **Content**: Dedicated walkthrough of `group_by()`, `summarize()`, aggregations (`n()`, `mean()`, `sum()`), and `ungroup()`.
- **Fit**: **Directly fills our active placeholder `chapters/2.2-summarizing.qmd`!**

### B. Moderation & Interactions
- **Found**: [`potential_modules/R_statistics_moderation-analysis.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R_statistics_moderation-analysis.qmd)
- **Content**: Two-way interaction effects in regression (`lm(Y ~ X * Z)`), simple slopes analysis, and interaction plotting with `sjPlot::plot_model()`.
- **Fit**: Fits naturally alongside Module 7.3 (Controlling) and 7.4 (Mediation) in Category 7 (Statistical Modeling).

### C. Scale Construction & Reliability Deep-Dive
- **Found**: [`potential_modules/understanding_alpha.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/understanding_alpha.qmd)
- **Content**: Deep conceptual and mathematical intuition for Cronbach's Alpha (inter-item covariance, scale length, tau-equivalence).
- **Fit**: Can be added as a collapsible callout note or companion reading to Module 3.3 (`3.3-scale-construction.qmd`).

---

## 5. Advanced Modeling Candidates

The following modules cover specialized methods that can be offered as optional modules for master's or honors trajectories:

1. **[`potential_modules/multilevel_models.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/multilevel_models.qmd)**:
   - Hierarchical Linear Models / Mixed Effects using `lme4::lmer()`. Crucial for repeated measures, longitudinal data, and cross-national survey analysis.
2. **[`potential_modules/generalized_linear_models.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/generalized_linear_models.qmd)**:
   - Logistic regression (`glm(..., family = binomial)`) for binary and categorical outcome variables.
3. **[`potential_modules/R_test-theory_1_cfa.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R_test-theory_1_cfa.qmd)**:
   - Confirmatory Factor Analysis (CFA) using `lavaan`. Provides the structural counterpart to Module 3.2 (Exploratory Factor Analysis).
4. **[`potential_modules/R_spec-curve-analysis.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R_spec-curve-analysis.qmd)**:
   - Specification Curve Analysis for open science and robustness testing across analytical decisions.

---

## 6. Data Management Extensions

1. **[`potential_modules/R-tidy-13a-joining.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R-tidy-13a-joining.qmd)**:
   - Relational data joins: `left_join()`, `inner_join()`, `full_join()`, `anti_join()`.
   - Essential for students working with multiple survey waves or merged media datasets.
2. **[`potential_modules/R-tidy-14-strings.qmd`](file:///home/kasper/projects/dataliteracy/potential_modules/R-tidy-14-strings.qmd)**:
   - String manipulation with `stringr`: `str_detect()`, `str_replace()`, `str_extract()`. Bridges data cleaning and text analysis.
