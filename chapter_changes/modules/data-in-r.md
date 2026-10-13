# Data in R (`rdata`) → `chapters/1.04-data-in-r.qmd`

- **Status:** New (split from `r-language.qmd`)
- **Section:** Computational Skills
- **Parents:** `rbas` (Installing and Running R)
- **Children:** `rfunc` (Functions and Packages)
- **Source:** old `1.02-r-language.qmd`, sections "Types of objects" and "Vectors and Data Frames"

## Changes made

- Redesigned to be **dataframe-first**, per the teaching philosophy of showing students what they're working towards before the building blocks: opens directly with a small, real two-column data frame (`country`, `height`), instead of starting from bare single values.
- Vectors are introduced as "what you get when you extract a column" via `$`, using `d$height`, rather than built up independently from scratch. `c()` is still shown, but as a secondary "you can also build one yourself" note.
- Bare single values (`number <- 5`, etc.) were dropped entirely from this module — that framing now lives in "Installing and Running R" as the "R as a calculator" bridge into Names and objects.
- Numeric/character/factor types and coercion (`as.numeric()`) are now taught using the `height`/`country` columns as the running example, instead of introducing new throwaway values.
- Closes with a short "Why this matters" paragraph connecting back to why data frames (not single vectors) are the unit of analysis for the rest of the book.
- New skill-tree link (`module=rdata`).

## To do

- [ ] Style harmonization (see `module_standard.md`): add a 'Key Takeaways' callout and a standard 'Required Packages & Data' callout.
- [ ] Consider adding a logical or date column to the opening data frame example, to preview a wider range of types earlier.
