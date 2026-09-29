# Curriculum & Structure Redesign: Data Literacy Skill Tree

This document outlines the strategic redesign of the **Data Literacy** curriculum into an interactive, modular, skill-tree driven website.

---

## 1. Core Architecture Decisions

### A. Format: Website (`type: website`) with Explicit Numbering
- **No cascade breakage**: In `type: book`, Quarto sequentially numbers chapters 1..N. Adding or splitting a chapter renumbers all subsequent chapters, breaking course syllabi. In `type: website`, module numbers (e.g., `4.1`, `4.2`, `18.1`) are hardcoded in titles and URLs.
- **Multi-Level Navigation**: Nested sidebars allow organizing modules into clean thematic categories without cluttering the screen.
- **Interactive Landing Dashboard**: `index.qmd` serves as a visual curriculum dashboard where students can filter by topic, track, or research design.

### B. Unit Terminology: "Module"
- We standardize on **"Module"** for individual units (e.g., *Module 04: Working with R*, *Module 16: T-Test*).
- We refer to **"Learning Trajectories"** for sequential pathways through modules.

### C. Dependency Philosophy: Strict & Isolated
- **Only true parent dependencies**: We do **not** add incidental references as tree dependencies. If a visualization example uses `pivot_longer()`, the module simply notes: *"See the transformations module for more details on pivoting"*, rather than cluttering the skill tree with an artificial prerequisite arrow.
- **Zero false blockers**: Data Cleaning is useful in practice, but a student does not need to learn Data Cleaning before running their first $t$-test.

---

## 2. Visual Representation: Ditching Mermaid for a Responsive Tiered HTML/CSS Tree

### Why Mermaid Fails for Skill Trees:
1. **Unpredictable Auto-Layout (`dagre`)**: Mermaid aggressively pushes siblings horizontally across infinite width rather than prioritizing vertical tier progression.
2. **Microscopic Text Distortion**: Because Mermaid wraps diagrams in a fixed SVG `viewBox` scaled to container width, wide diagrams get squished until text becomes completely unreadable, leaving massive vertical whitespace below.
3. **Inflexible Styling**: Subgraphs, padding, and responsive mobile layouts cannot be styled cleanly with CSS.

### The Solution: Responsive Tiered HTML/CSS Grid
Like game-style skill trees (e.g. Tondello et al., 2019), the tree is built with native HTML cards and CSS Grid/Flexbox:
- **Consistent body typography** (14px–16px), guaranteed crisp and readable on desktop and mobile.
- **Explicit vertical Tiers (1 to 5)** with clear downward connectors ($\downarrow$).
- **Color-coded badges** for domain recognition (Foundations, Data Prep, Measurement, Statistics, Modeling).
- **Embedded metadata**: Each card explicitly states `Requires: ...` and `Unlocks: ...`.
- **Card-level hover states**: Elevation shadow, border highlighting, and direct navigation links.

---

## 3. The 5-Tier Skill Tree Architecture

```text
[Tier 1: Root Foundations]
  ├── 04. Working with R (Required Starting Point)
  ├── 05. RStudio Projects & Paths
  └── 06. Quarto Reproducible Reports
       │
       ▼
[Tier 2: Central Gateway Hub]
  └── 07. Data Frames & Tidyverse (The single prerequisite for all data work)
       │
       ▼
[Tier 3: Specialized Branches (Unlatched by Data Frames)]
  ├── Branch A: Data Hygiene ── 08. Data Cleaning (NA, Recoding, Types)
  ├── Branch B: Reshaping    ── 09. Transformations (Z-scores, Pivoting)
  ├── Branch C: Measurement  ── 10a. Latent Variables ──┬── 10b. Factor Analysis (EFA)
  │                                                      └── 11. Scale Construction (Alpha)
  └── Branch D: Summarizing  ── 07b. Summarizing Data ──┬── 12. Descriptive Statistics
                                                         └── 13. Data Visualization (ggplot2)
       │
       ▼
[Tier 4: Statistical Inference Gateway]
  ├── 21. Hypothesis Testing (H0, H1, Alpha, p-values)
  └── 14. Choosing a Statistical Test (Decision Tree)
       │
       ▼
[Tier 5: Statistical Testing & Modeling Trajectories]
  ├── Categorical: 15. Chi-Square Test
  ├── Group Comparisons: 16. T-Test ──▶ 19. ANOVA ──▶ 20. ANCOVA
  └── Continuous Modeling: 17. Correlation ──▶ 18. Linear Regression (Simple → Multiple → Moderation)
```

---

## 4. Chapter Splitting Roadmap

### A. Measurement & Latent Variables
- **Module 10a (New)**: *Latent Variables & Measurement Theory*. Introduces constructs vs. items, why single items have error, and reflective vs. formative measurement.
- **Module 10b**: *Exploratory Factor Analysis*. Dimensionality, factor extraction, rotation, factor loadings.
- **Module 11**: *Scale Construction & Reliability*. Reverse coding, Cronbach's $\alpha$, computing mean composite scores.

### B. Data Management
- **Module 07**: *Data Frames with Tidyverse*. Reading data, `select()`, `filter()`, `arrange()`, `mutate()`.
- **Module 07b**: *Summarizing Data*. `group_by()`, `summarize()`, counting, computing grouped aggregates.
- **Module 08**: *Data Cleaning*. Diagnosing data issues, handling `NA`s, recoding edge cases, fixing column types.
- **Module 09**: *Transformations*. Standardizing (z-scores), pivoting (`pivot_longer`/`pivot_wider`).

### C. Linear Regression
- **Module 18a**: *Simple Linear Regression*. Concept, line of best fit, $R^2$, `lm()`, APA reporting.
- **Module 18b**: *Multiple Regression & Dummies*. Multiple IVs, controlling for variables, categorical predictors.
- **Module 18c**: *Interactions & Diagnostics*. Moderation, simple slopes, checking residual assumptions.
