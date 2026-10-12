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
