
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

2. **Splitting the Two Faces of "Hypothesis Testing"**:
   - **Hypothesis Formulation (Research Design)**: Moving from theoretical mechanisms and constructs to falsifiable, directional propositions. It does not require mathematical distributions or $p$-values.
   - **Hypothesis Testing (Statistical Foundations)**: The formal probabilistic framework of null vs. alternative hypotheses, $\alpha$ levels, Type I and Type II errors, and frequentist decision criteria.

3. **Dual Tracks into Hypothesis Testing**:
   - **Probability Track**: `Probability` $\rightarrow$ `Sampling` $\rightarrow$ `Hypothesis Testing`.
   - **Descriptive / Effect Track**: `Means & Variance` $\rightarrow$ `Correlation & Covariance` $\rightarrow$ `Effect Sizes` $\rightarrow$ `Hypothesis Testing`.
   - `Effect Sizes` explicitly bridges descriptive magnitude (how big an observed pattern is) to inferential questions (could this effect simply be due to sample noise?). Frequentist confidence intervals and significance are integrated into this unified framework.

4. **The "Simple Regression" Bridge to Modeling**:
   - Both the categorical comparison track (`t-test`) and the continuous association track (`correlation test`) converge into **Simple Regression** (the foundation of the General Linear Model).
   - From **Simple Regression**, branches extend cleanly:
     - $\rightarrow$ **ANOVA**: Extending categorical group comparisons to $k > 2$ factors.
     - $\rightarrow$ **Multiple Regression**: Adding multiple and continuous predictors $\rightarrow$ **Controlling** $\rightarrow$ **Mediation**.
     - $\rightarrow$ **Model Diagnostics**: Residual inspection, homoscedasticity, and leverage (which apply equally to both ANOVA and regression).
     - $\rightarrow$ **Power Analysis**: Sample size planning and power calculations for experimental and regression designs.

5. **Decoupled Auxiliary Tracks**:
   - **Computational Skills**: Progresses from `Computational Skills` $\rightarrow$ `Files & Folders` $\rightarrow$ `R language` $\rightarrow$ `Data Management` $\rightarrow$ `Data Frames` $\rightarrow$ `Data Frames Advanced` $\rightarrow$ `Strings`.
   - **Data Law & Ethics**: Independent track (`Data Stewardship` $\rightarrow$ `Data Management Plan`).
   - **Measurement & Content**: Independent track (`Measurement` $\rightarrow$ `Factor Analysis` $\rightarrow$ `Scale Construction` $\rightarrow$ `Manual Coding` $\rightarrow$ `Content Analysis`).
