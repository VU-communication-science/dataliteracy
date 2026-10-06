# Standard Module Structure Specification (`module_standard.md`)

This specification defines the unified design, pedagogical anatomy, and structural convention for all modules in the Data Literacy curriculum.

---

## 1. Design Philosophy

The Data Literacy book serves as the **curriculum canon** for Communication Science methods at VU Amsterdam.
- **Guideline over exhaustive manual**: Prescribes the core competencies, conventions, tidyverse patterns, and standard packages expected across the program.
- **Scannable & Modular**: Students should immediately know what prerequisites are expected, what skills will be learned, and how to verify their code.
- **Reproducible**: Every module should be self-contained, reproducible, and verifiable under drift checking.

---

## 2. Standard Document Architecture

Every module (`.qmd`) must follow this 6-part structure:

### Part 1: Frontmatter
```yaml
---
title: "Module Title"  # same as the title in curriculum.json
subtitle: "One-line description of the specific skill or analysis"
---
```
- Modules are identified by their skill-tree ID (`curriculum.json`) and a stable file name (`chapters/<slug>.qmd`), not by chapter numbers. Chapter titles and subtitles (summary) are taken from `curriculum.json`.

---

### Part 1b: Skill-tree intro box (required)
Every module opens with a short callout that places it in the student's learning journey, using the parent/child structure of `curriculum.json`:
```markdown
::: {.callout-note title="Where you are in your learning journey" icon=false}
**Where you come from.** You arrive here from [Parent](parent.qmd). One sentence on what the student can do now.

**What this module adds.** One or two sentences, in simple terms.

**Why it is valuable.** One or two sentences.

**Where it leads.** Next up: [Child](child.qmd).
:::
```
See `chapter_changes/README.md` for details.

---

### Part 2: Quick Start / Key Takeaways Callout
Immediately following the title, a prominent callout box outlines the core principles and functions learned:
```markdown
::: {.callout-tip title="Key Takeaways"}
- **Core Concept**: What theoretical question does this analysis answer?
- **Key Functions**: The essential functions introduced (e.g., `group_by()`, `summarize()`).
- **Prerequisites**: Link back to parent modules (e.g., "Assumes familiarity with [2.1 Data Frames](2.1-data-frames.qmd)").
:::
```

---

### Part 3: Environment & Data Loading Callout
Standardized data and package requirements placed inside a collapsible or clean callout:
```markdown
::: {.callout-note title="Required Packages & Data" collapse="true"}
```{r, message=FALSE, warning=FALSE}
library(tidyverse)
library(sjPlot)

d <- read_csv("https://dataliteracy.cc/data/practice_data.csv")
```
:::
```
- Eliminates messy package startup messages (`message=FALSE`, `warning=FALSE`).
- Relies on hosted clean datasets or deterministic `set.seed()` simulations.

---

### Part 4: Conceptual Intuition (Before Code)
- Plain English explanation of the problem, ideally illustrated with a conceptual diagram (DAG, flowchart, or visual comparison).
- **No wall of math formulas without intuitive translation**.
- Explains the difference between statistical significance and substantive relevance.

---

### Part 5: Applied Walkthrough (Step-by-Step R Code)
Divided into consistent pedagogical sub-sections:
1. **Model Specification & Execution**: Fitting the model using canonical packages.
2. **Reading the Output**: Explaining how to interpret tables (e.g., coefficients, $p$-values, $R^2$, degrees of freedom).
3. **Assumptions & Diagnostic Checks**: Quick sanity checks (normality, collinearity, outliers).
4. **Visualization**: Standardized publication-ready plotting with `ggplot2` or `sjPlot`.

---

### Part 6: Reporting & Companion References
Concludes with concrete guidance on writing up results:
1. **APA-Style Reporting Template**:
   > *"An independent-samples t-test indicated that participants in the interactive condition reported significantly higher knowledge (M = 7.2, SD = 1.1) than those in the static condition (M = 5.8, SD = 1.4), t(126) = 6.24, p < .001, d = 1.11."*
2. **Further Reading**: Links to companion materials (e.g., *[R for Communication Science](https://r4css.vanatteveldt.com/)*, 3Blue1Brown, StatQuest).

---

## 3. Package Harmonization Table

To avoid confusing students with competing packages, each domain has an officially prescribed toolkit:

| Analysis Domain | Prescribed Package | Avoid / Deprecate |
| :--- | :--- | :--- |
| **Data Manipulation** | `dplyr`, `tidyr`, `readr` | Base `subset()`, `reshape()` |
| **String Manipulation** | `stringr` | Base `grep()`, `gsub()` |
| **Visualization** | `ggplot2` | Base `plot()`, `hist()` |
| **Model Presentation** | `sjPlot` (`tab_model()`, `plot_model()`) | Raw `summary(lm)` printouts |
| **Statistical Power** | `pwr` | Manual power tables |
| **Content Analysis** | `tidytext` | `quanteda` (reserved for electives) |
| **SEM & Path Models** | `lavaan` | Custom manual regressions |
| **Diagnostics & Tests** | `car` (`leveneTest`) | Unverified manual recipes |

---

## 4. Rollout Strategy

1. **Phase 1 (Completed)**: Core modules migrated, drift-checked, and backed up in `_potential_modules/previous_chapters/` (the book was later reorganised around the skill tree; see `chapter_changes/`).
2. **Phase 2**: Add Key Takeaways and APA Reporting blocks systematically across chapters during the annual summer syllabus revision.
