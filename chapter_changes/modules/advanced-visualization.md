# Advanced Visualization (`vis-a`) → `chapters/advanced-visualization.qmd`

- **Status:** New (stub)
- **Section:** Exploration and Measurement
- **Parents:** `visua` (Data Visualization), `dfs-2` (Pivoting and joining)
- **Children:** none
- **Source:** none (new module)

## Planned content

- Faceting and small multiples
- Combining layers: points, lines, error bars
- Plotting repeated measures and groups (needs long data)
- Interactive plots (e.g. `plotly`) and publication-ready styling

## To do

- [ ] Write the module (new).
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full content written
- Replaced the "Under construction" stub with full content: faceting (`facet_wrap`, incl. with `pivot_longer`-reshaped data), combining multiple geoms (points + smooth, raw + group-mean summary), and accessibility/clarity (viridis palettes, avoiding chartjunk, direct labeling), plus a short note on interactive plots (`plotly`).
- Used `practice_data.csv` throughout (trust_t1/trust_t2, experiment_group, political_orientation).
- Added the new intro paragraph + code hook + skill-tree link (`?module=vis-a`), the "AI-assisted draft" notice, a "Try it yourself" webR box, and "Further resources" (facet_wrap and viridis scale docs).
