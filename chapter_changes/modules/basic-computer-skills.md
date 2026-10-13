# Basic Computer Skills (`compu`) → `chapters/basic-computer-skills.qmd`

- **Status:** New (stub)
- **Section:** Computational Skills
- **Parents:** none
- **Children:** `rlang` (R language)
- **Source:** none (new module)

## Planned content

- Files, folders, and paths (absolute vs. relative); file extensions and why they matter
- Downloading, unzipping, and organising course files and datasets
- Installing and updating software (R, RStudio) and what to do when something goes wrong
- Keyboard shortcuts, copy/paste, and searching for help effectively
- Keeping work safe: backups, cloud storage, and handling sensitive data

## Possible source material

- Partly overlaps with the 'Keeping track of your data' section of the old 1.2 RStudio Projects (now in `r-language`) and the 'Installation' section of old 1.1.

## To do

- [ ] Write the module (new).
- [ ] Decide which general file-management text from `r-language` (old 1.1 Installation, old 1.2 file management) should move here.
- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout, a standard 'Required Packages & Data' callout, plain-language conceptual intuition before code, and an APA reporting block where relevant.
- [ ] Review whether the skill-tree intro box at the top still matches the content after edits.

### Follow-up pass: full module written
- Wrote full new content per the planned outline: command line basics, working directories, absolute vs. relative paths, installing R and RStudio, scripts vs. the console, keyboard shortcuts, and saving/running scripts.
- Replaced the old "Under construction" banner with the standard "AI-assisted draft" callout (content has not yet been reviewed by course staff).
- Applied the new unboxed intro paragraph + hook framing and added the skill-tree deep link (`curriculum.qmd?module=compu`).
- Added a small "Try it yourself" webR box (`1 + 1`) since there's no other executable R content yet in this module.
- Did not move/remove the overlapping Installation or file-management text in `r-language.qmd` — left that deduplication decision for a future pass as noted above.

### Follow-up pass: removed R/command-line content, reframed intro
- Per feedback: this module should not cover R or the command line at all (that's `r-language`'s job) — removed the "command line" framing from the files/folders section, and removed the "Installing R and RStudio", "Scripts versus the console", and "Running and saving a script" sections entirely (all fully R/RStudio-specific, and the installation steps were already duplicated in `r-language.qmd`).
- Reframed the intro: dropped the "this is the first module, we assume nothing" framing. New intro instead just states that basic computer skills underpin everything in the book, most students already have a lot of experience but may have gaps (e.g. the file system), and recommends reading through once to self-check.
- Kept: files/folders as a tree, file extensions, absolute vs. relative paths, working directory concept — all still phrased generally, not tied to R.
- Replaced the removed shortcuts table with a general-purpose one (save/undo/copy-paste/find), not RStudio-specific, plus two general habits (naming files, managing Downloads).
- Updated the chapter subtitle to match ("The file system, paths, and general computer habits.").
- Rendered clean, hashes re-blessed.

### Follow-up pass: added file-system tree diagram, file types, zip files, and privacy framing
- Added a highlighted file-system tree diagram (via `dag_helpers.R`, extended with a new `highlight` option on nodes/edges for this) tracing one absolute path from root to a file, to make "every file has a unique path" concrete before explaining absolute/relative paths.
- Added a "Why this matters: handling data responsibly" subsection explicitly connecting paths to (a) how programming languages like R locate files, and (b) the ethical/privacy responsibility of knowing where downloaded data about real people lives on your computer and being able to delete it.
- Added a "File types and extensions" section with a table of the most common extensions used in this course (`.csv`, `.xlsx`/`.xls`, `.txt`, `.r`/`.R`, `.json`, `.pdf`, `.docx`, `.zip`).
- Added a new "Zip files" section explaining what an archive is and how to extract one, since many students no longer know this.
- `scripts/dag_helpers.R`: added a `highlight` parameter to both `dag_node()` and `dag_edge()` (accent-colored fill / bold accent-colored line) to support tracing a path through a tree; fully backward compatible (defaults to `FALSE`, no effect on existing diagrams).
- Rendered clean, verified the tree diagram visually via screenshot, hashes re-blessed.

### Follow-up pass: consolidated "why" vs. "what/how" ordering, added interactive file explorer
- Restructured the files/folders intro: a single short sentence up front states why the file system matters (R needs paths to read/write data; you're responsible for knowing where data lives), with the fuller explanation (merged with the user's own draft) placed right after the tree diagram, before the mechanics of absolute/relative paths.
- Removed the now-redundant "Why this matters" subsection that had been placed later under "Understanding file paths".
- Replaced the static bullet-list mockup of a file explorer with a new interactive, clickable widget (`components/file-explorer/file-explorer.js` + `.css`): a Finder-style window with expandable/collapsible folders and file-type icons. Built as a standalone, reusable component (not tied to this chapter) following the same pattern as `components/skill-tree/`.
- Rendered clean, verified the widget visually and interactively (folder expand/collapse) via screenshot, hashes re-blessed.
- Updated the file explorer widget to mirror the exact same tree as the "File System" diagram further down (`/ > Users > yourname > Projects/master_thesis` and `Downloads/data`), with the same files highlighted (`survey_data.csv` x2, `analysis.r`, `data.zip`), so the two examples are now consistent. Rendered clean, verified via screenshot, hashes re-blessed.
- Added click-to-reveal full path: clicking a file in the widget now shows a small popup below it with its full path (computed from its position in the tree), and highlights the selected row; clicking elsewhere or the same file again dismisses it. Implemented in `components/file-explorer/file-explorer.js`/`.css` (path computed per-node during render, no dependency on the specific tree content). Verified via screenshot (show, move, and dismiss), hashes re-blessed. Note: the chapter's `fe_tree` JSON was independently edited by the author between sessions (root `/` and highlight flags removed); the popup feature works regardless of tree content, so it was left as-is.
- Extended the popup with file information: added a generic, extension-based description (e.g. CSV, R script, ZIP archive, PDF, etc. — `EXTENSION_DESCRIPTIONS` map in `file-explorer.js`) shown automatically for any file without a custom one, and a new per-node `description` field in `fe_tree` for overriding it with something specific (e.g. a privacy/sensitivity note). Added one example (`survey_data.csv` under `master_thesis`) with a custom description. Rendered clean, verified via screenshot, hashes re-blessed.
- Fixed the "File types and extensions" table so the Extension column no longer takes up half the row width: pandoc sizes pipe-table columns from the relative length of the header separator's dashes, so made the Extension separator short and the "What it is" separator long (`|-----------|---...---|`) instead of two equal `---`. Column widths now render ~5% / ~94% instead of 50/50. Rendered clean, verified via screenshot, hashes re-blessed.
- Added a short, collapsed-by-default callout right after the Windows absolute-path example, covering how to copy a file's absolute path on macOS (`Cmd+Option+C` / "Copy as Pathname") and Windows (`Shift`+right-click → "Copy as path"), and noting that RStudio-specific tricks for this come later in the book. Rendered clean, verified collapsed/expanded via screenshot, hashes re-blessed.
