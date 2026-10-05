
Here I will document a new structure for the modules, for a more modular approach that aligns with the skill tree.

## Sections vs. Modules

To maintain clarity across the curriculum:
- **Sections** are overarching pedagogical themes / categories (e.g., *Statistical Foundations*, *Research Design*, *Computational Skills*). Sections serve as groupings in the sidebar, navigation, and skill tree legend. They do **not** need dedicated Quarto landing files; if an orientation is necessary, it is provided via an introductory module within that section.
- **Modules** are the concrete Quarto chapters (`.qmd` files) containing lessons, code walkthroughs, exercises, or conceptual guides.

### Current Sections
1. **Statistical Foundations**
2. **Research Design**
3. **Computational Skills**
4. **Data Law & Ethics**
5. **Measurement & Content**
6. **Descriptive Statistics & Exploration**
7. **Inferential Statistics & Modeling**

---

## Pedagogical Principles for the Skill Tree

1. **Recommended Learning Paths & Strict Prerequisite Logic**:
   - The tree represents *"what do you need to understand before you can understand this module?"* rather than rigid syllabus schedules.
   - We avoid drawing edges if a topic is merely recommended or co-taught in a particular week.
   - Model diagnostics follows model fitting because evaluating assumptions and residuals only makes sense once students understand fitted values and parameters.

2. **Statistical Foundations: The Dual-Track Convergence**:
   - **Chance / Uncertainty Track**: `Probability & Sampling` $\rightarrow$ `Normal Distribution` $\rightarrow$ `Sampling Error`.
     - Contextualizes randomness around repeated sampling.
     - `Normal Distribution` unifies probability density with central tendency and dispersion ($\mu$, $\sigma$, $z$-scores).
     - `Sampling Error` applies the distribution to sample statistics ($SE = s / \sqrt{N}$ and the Central Limit Theorem).
   - **Observed Quantities & Effects Track**: `Means & Variance` $\rightarrow$ `Correlation & Covariance` $\rightarrow$ `Effect Sizes`.
     - Quantifies sample-level differences and relationships before introducing inferential testing.
   - **Convergence at Hypothesis Testing**:
     - Test statistics represent $\frac{\text{Observed Effect}}{\text{Standard Error}}$.
     - By feeding `Sampling Error` and `Effect Sizes` directly into `Hypothesis Testing`, the logic of $p$-values, Type I/II errors, and frequentist decision criteria becomes intuitive.

3. **The "Simple Regression" Bridge to Modeling**:
   - Both the categorical comparison track (`t-test`) and the continuous association track (`correlation test`) converge into **Simple Regression** (the foundation of the General Linear Model).
   - From **Simple Regression**, branches extend cleanly:
     - $\rightarrow$ **ANOVA**: Extending categorical group comparisons to $k > 2$ factors.
     - $\rightarrow$ **Multiple Regression**: Adding multiple and continuous predictors $\rightarrow$ **Controlling** $\rightarrow$ **Mediation**.
     - $\rightarrow$ **Model Diagnostics**: Residual inspection, homoscedasticity, and leverage (which apply equally to both ANOVA and regression).
     - $\rightarrow$ **Power Analysis**: Sample size planning and power calculations for experimental and regression designs.

4. **Decoupled Auxiliary Tracks**:
   - **Research Design**: Independent track (`Causality & DAGs`).
   - **Computational Skills**: Progresses from `Computational Skills` $\rightarrow$ `Files & Folders` $\rightarrow$ `R language` $\rightarrow$ `Data Management` $\rightarrow$ `Data Frames` $\rightarrow$ `Data Frames Advanced` $\rightarrow$ `Strings`.
   - **Data Law & Ethics**: Independent track (`Data Stewardship` $\rightarrow$ `Data Management Plan`).
   - **Measurement & Content**: Independent track (`Measurement` $\rightarrow$ `Factor Analysis` $\rightarrow$ `Scale Construction` $\rightarrow$ `Manual Coding` $\rightarrow$ `Content Analysis`).
