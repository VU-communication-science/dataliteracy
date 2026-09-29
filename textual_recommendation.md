# Textual Recommendations for Curriculum & Content Refinements

This document tracks pedagogical and structural suggestions for future content updates across the Data Literacy course. **None of these changes are applied to active course chapters without explicit approval.**

---

## 1. Statistical Foundations: Module 5.1 (`5.1-statistical-concepts.qmd`)

### Current State
- The chapter directly contains the text from `21-hypothesis-testing.qmd`.
- Focuses primarily on deriving hypotheses from theories with media psychology examples (violent video games & aggression, citing Griffiths, Lin, Lynch, Scott).
- Covers the concept of "evidence $\neq$ proof", randomized controlled trials, and statistical control.

### Recommendation [accept]
1. **Broader Introductory Bridge**:
   - Currently, students jump directly from summarizing data (`group_by`, `summarize`) into NHST.
   - Expand 5.1 to briefly introduce the core intuition of **inferential statistics**:
     - **Population vs. Sample**: Why sample statistics vary across samples (sampling variability).
     - **Null Hypothesis Significance Testing (NHST)**: Explicitly explain $H_0$ (null) vs. $H_1$ (alternative).
     - **$p$-values**: Demystify what a $p$-value actually is ($P(\text{data or more extreme} \mid H_0)$), avoiding the common student misconception that $p = P(H_0 \text{ is true})$.
     - **Effect Size vs. Statistical Significance**: Emphasize that a tiny $p$-value with a massive sample does not imply a practically meaningful effect.
     - **Confidence Intervals**: Introduce 95% CIs as a range of plausible values for the population parameter.
2. **Pedagogical Benefit**:
   - Gives students the necessary conceptual vocabulary before they see their first $p$-value and $t$-statistic in Module 6.1 ($t$-test).

---

## 2. Mediation Analysis: Module 7.4 (`7.4-mediation.qmd`)

### Current State
- Contains the simulated dataset ($N=500$), DAG visualizations with `ggdag`, manual extraction of regression coefficients $a$, $b$, and $c'$, and manual calculation of the Sobel $z$-statistic with `pnorm()`.
- Includes callouts for full mediation and no mediation simulations.

### Recommendation [partial accept; we do need to show the simple calculation for the indirect effect, just for intuition. But agree that we should just drop the sobel test. Though perhaps instead of bda use the mediation package, and do include lavaan.]
1. **Modernizing Indirect Effect Testing (Sobel vs. Bootstrapping)**:
   - The current text already notes that the Sobel test is "somewhat outdated" due to assuming normal distribution for the product of two coefficients ($a \times b$).
   - When teachers are ready, add a section demonstrating either:
     - Bootstrapped mediation via the `bda` package (`mediation.test()` or `boot.mediation.test()`), or
     - Modern path modeling with `lavaan`:
       ```r
       model <- '
         M ~ a*X
         Y ~ b*M + c*X
         indirect := a*b
         total := c + (a*b)
       '
       fit <- sem(model, data = d, se = "bootstrap", bootstrap = 1000)
       summary(fit)
       ```
2. **Pedagogical Benefit**:
   - Aligns students with modern publication standards in communication science (where reviewers routinely require 95% bootstrapped confidence intervals for indirect effects rather than Sobel tests).

---

## 3. Controlling for Confounders: Module 7.3 (`7.3-controlling.qmd`)

### Current State
- Uses the classic storks, birth rate, and land area dataset ($N=17$) to demonstrate how controlling for country area eliminates the spurious stork effect.
- Features nice DAG visualizations showing the spurious path vs. the confounder path.

### Recommendation [accept]
1. **Unstandardized vs. Standardized Interpretation**:
   - The current tutorial standardizes all variables before regression so that beta coefficients match correlation coefficients.
   - Consider adding a callout or short section interpreting raw metric units:
     - e.g., "In the unstandardized model, each stork corresponds to +0.03 births/year. When country area (km²) is held constant, storks drop to 0, while area explains 1.94 births per 1,000 km²."
2. **Collider & Mediator Cautions**:
   - Add a brief warning that "controlling" is not always good: controlling for a *collider* creates bias, and controlling for a *mediator* blocks the causal mechanism. This creates an organic bridge to 7.4 (Mediation).

---

## 4. Pending Modules & Fillers

### Modules Needing Content: [accept (also see TODO below)]
1. **2.2 Summarizing Data (`2.2-summarizing.qmd`)**:
   - Needs dedicated coverage of `group_by()` and `summarize()` with `mean()`, `sd()`, `median()`, `n()`.
   - Currently, students see `summarize()` inside `07-data-frames.qmd`, but having it isolated as 2.2 clarifies the progression to 4.1 Descriptives.
2. **3.1 Latent Variables (`3.1-latent-variables.qmd`)**:
   - Needs conceptual grounding on constructs vs. indicators, operationalization, and measurement error before students perform Factor Analysis (3.2) and Reliability / Cronbach's Alpha (3.3).

## [TODO]

I maintain another repository with a lot of random R content. 

https://github.com/ccs-amsterdam/r-course-material/tree/master/tutorials

Please scan the repository, and identify any content that could be relevant to the Data Literacy course. For each relevant piece of content, copy it to a potential_modules folder in the Data Literacy repository in a Quarto format. Also create a file in this directory in which we can discuss the relevance of each piece of content, and whether it should be included in the course. The file should be called `potential_modules.md`.
