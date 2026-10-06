# Data Visualization (`visua`) → `chapters/data-visualization.qmd`

- **Status:** New (stub)
- **Section:** Exploration and Measurement
- **Parents:** `summa` (Grouping and summarizing)
- **Children:** `vis-a` (Advanced Visualization)
- **Source:** `4.2-visualization.qmd (empty)`

## Planned content

- The grammar of graphics: data, aesthetics, geoms
- Plots for one variable (histogram, bar chart, density) and two variables (scatterplot, boxplot)
- Labels, themes, and saving plots
- Choosing the right plot for the variable type

## Possible source material

- Old 4.2 was empty. Plots appear in many chapters (e.g. old 6.1, 7.1, 7.2) and could be used as examples.

## To do

- [ ] Write the module (new).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full content written
- Replaced the "Under construction" stub with full content: grammar of graphics basics (`aes`, geoms), one-variable plots (histogram/density/bar), two-variable plots (scatterplot/boxplot), choosing the right plot by variable type, and titles/labels/themes.
- Used `practice_data.csv` (political_interest, political_orientation, trust_t1, experiment_group) for all examples, per the shared comm-sci framing.
- Added the new intro paragraph + code hook + skill-tree link (`?module=visua`), the "AI-assisted draft" notice, a "Try it yourself" webR box, and "Further resources" (R4DS visualization chapter, ggplot2 reference).
