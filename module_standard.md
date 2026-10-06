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
title: "3.5 Hypothesis Testing"  # "{number} {title}", number and title from curriculum.json
subtitle: "One-line description of the specific skill or analysis"
---
```
- Modules are identified by their skill-tree ID (`curriculum.json`) and a stable file name (`chapters/<slug>.qmd`). The frontmatter `title` is `"{number} {title}"`, where `number` is the module's local section number (see §5) and `title` is copied verbatim from `curriculum.json`. Subtitles are taken from `curriculum.json`'s `summary` field.

---

### Part 1b: Learning-journey intro (required)
Every module opens with a short, unboxed intro directly under the subtitle — not a callout, so it stays visually light. It is a **single flowing paragraph** (not bullet points) that, using the parent/child structure of `curriculum.json`, answers two questions for the student:
1. *Is this too hard for me right now?* — by naming what they already know coming in.
2. *Why should I care?* — by saying what new thing they can do and why it's useful.

Do **not** include a "where this leads next" sentence — the forward-looking links live in the skill tree, not in the running text. Keep it to 2–4 sentences.

```markdown
*You already know how to describe an effect's size and that a sample result is never
perfectly precise. Here you'll learn the logic that turns that uncertainty into a
yes/no decision — the null hypothesis, the p-value, and the confidence interval —
which is the reasoning every test in the rest of the book relies on.*
```

Whenever it helps, open with a **small concrete hook** instead of (or before) this abstract framing: a short worked example or a one-liner of code that previews the payoff of the module, so the student sees where they are headed before the formal build-up starts. For example, `2.01-data-frames.qmd` opens with a finished `dplyr` pipe before explaining any of its parts.

Immediately below the intro paragraph, add a quiet link back to the skill tree with the module's own id, so a reader can see the module highlighted in context:
```markdown
→ [See this module in the skill tree](curriculum.qmd?module=dfs-1)
```

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

d <- read_csv("https://dataliteracy.cc/practice_data.csv")
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

### Part 7: Further resources (optional, where relevant)
A short, standardized closing section linking to companion material, so students who want more can self-serve:

```markdown
## Further resources

- 🎥 [Video title](https://youtube.com/...) — one-line description of what it covers.
- 📘 [Reading/tool title](https://...) — one-line description.
```
- Keep it to 2–5 entries of real, checked links (see `recommended_materials.md` for a vetted pool). Omit the section entirely if nothing adds value beyond the chapter.

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

---

## 5. Numbering

Modules carry a **local, per-section number** of the form `{section}.{index}`, e.g. `1.1 Basic Computer Skills`, `5.5 Multiple Regression`. The section number follows the sidebar order in `_quarto.yml` (1 Computational Skills, 2 Data Management, 3 Statistical Foundations, 4 Exploration and Measurement, 5 Inferential Statistics, 6 Causality, 7 Content Analysis); the index is the module's position within that section's list. These numbers are stored in `curriculum.json`'s `number` field (also shown on the skill-tree popover badge) and are prefixed onto each `.qmd`'s frontmatter `title` (see Part 1). They are a navigation aid, not a strict teaching order — treat them as stable only within a section, and expect them to be recomputed if modules are added, removed, or reordered. Note that this display number is independent of the `.qmd` filename's leading number, which is a stable file identifier and never changes.

---

## 6. AI-assisted content notice

Where a module's content (or a substantial addition to it) was drafted by an AI assistant and has not yet been manually checked by a course instructor, mark it with a short warning instead of writing "has not been written yet":
```markdown
::: {.callout-warning title="AI-assisted draft"}
This content was drafted by an AI assistant and has not yet been manually checked by course staff. Treat it as a starting point, not a verified source.
:::
```
Remove this callout once a human has reviewed the module's accuracy and style.
