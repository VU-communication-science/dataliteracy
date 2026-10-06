# Standard Dataset Documentation Specification (`data_standard.md`)

This specification defines how datasets used in the Data Literacy book are documented, generated, hosted, and referenced from chapters. It mirrors `module_standard.md`, but for data instead of content.

---

## 1. Design Philosophy

- **One page per dataset**: every dataset a chapter uses gets its own short, rendered codebook page, so a chapter can link to "this data" instead of just dropping a bare URL.
- **Same domain as the book**: datasets are served from the same site as the book, not a separate repo/domain. This used to be split out to satisfy webR's CORS requirement; now that webR is gone, same-origin hosting works and is simpler to maintain.
- **No data files committed to the repo**: simulated datasets are never committed as CSVs. Instead, the repo contains only the R script that simulates each dataset (with a fixed `set.seed()`), and the CSV is regenerated automatically every time the book is built — see §2.
- **Transitional by design**: some datasets still live only in the separate `dataliteracy-data` repo (hosted on Cloudflare Pages) while they're being reviewed/simulated-in-repo one at a time. A dataset's codebook page tracks this with a `status` field (see §3), so it's always clear whether `read_csv()` in a chapter points at the old external host or the new build-time-generated one.

---

## 2. Build-time generation

```
data/
  data_standard.md          # this file
  datasets.qmd               # rendered catalog page, lists & links every dataset
  practice-data.qmd          # one rendered codebook page per dataset
  polcomm-data.qmd
  simulation_scripts/
    newspaper_trust.r        # simulates practice_data.csv, set.seed() fixed
scripts/
  generate_data.R             # Quarto pre-render hook, see below
```

- Codebook pages are `.qmd` files directly under `data/` (not `data/<slug>/index.qmd`), so each gets a short, stable URL: `dataliteracy.cc/data/<slug>.html`.
- Every dataset that's been migrated in has a simulation script under `data/simulation_scripts/`, named after the dataset, ending with `set.seed(...)` for reproducibility. The script does not need to know about Quarto at all — it just writes its CSV to whatever directory the `DATALITERACY_DATA_OUTPUT_DIR` environment variable points at (defaulting to `data/generated/`, which is gitignored, so the script is still directly runnable standalone for local testing: `Rscript data/simulation_scripts/newspaper_trust.r`).
- `_quarto.yml` configures `scripts/generate_data.R` as a `project: pre-render:` hook. Quarto runs this automatically before every render (and before `quarto preview`). It sources every script in `data/simulation_scripts/`, with `DATALITERACY_DATA_OUTPUT_DIR` set to Quarto's own resolved output directory (`QUARTO_PROJECT_OUTPUT_DIR`, e.g. `docs/`). The generated CSVs therefore land directly at the root of the built site (e.g. `docs/practice_data.csv`) and get deployed/served from exactly the same domain as the book (e.g. `https://dataliteracy.cc/practice_data.csv`) with zero extra CI changes needed.
- Datasets without a simulation script yet (e.g. `polcomm_data.csv`) stay `external`, served from the old `dataliteracy-data` repo/domain, until someone writes one.

---

## 3. Codebook page structure

Every `data/<slug>.qmd` follows this structure:

```yaml
---
title: "Practice Data"
subtitle: "One-line description of what the dataset is for."
---
```

```markdown
::: {.callout-note title="Dataset status"}
**Status**: migrated *(generated at build time from `data/simulation_scripts/newspaper_trust.r`)*
**Access**: `read_csv("https://dataliteracy.cc/practice_data.csv")`
:::

## What this dataset is for

A short paragraph: what the data represents, which chapters use it, and why (e.g. "a simulated newspaper-trust survey used throughout the Statistical Foundations and Inferential Statistics sections to illustrate t-tests, ANOVA, and regression on the same variables").

## Columns

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | integer | Respondent ID. |
| `age` | integer | Age in years (18–65). |
| ... | | |

## Simulation notes

A short note on how the data is simulated (`set.seed()` used, link to the script under `data/simulation_scripts/`), and what relationships were deliberately built in (e.g. "`trust_t2` is lower in the `negative` group than `control`, to illustrate a significant ANOVA contrast"). If real data: a note on source, consent/anonymisation, and licensing instead.

## Used in

- [Comparing two Groups](../chapters/5.01-comparing-two-groups.qmd)
- [ANOVA](../chapters/5.04-anova.qmd)
```

A dataset's `status` field is one of:
- **external** — still only hosted in the old `dataliteracy-data` repo/domain, with no simulation script in this repo yet. The codebook documents it for reference, but the access URL still points externally.
- **migrated** — a simulation script now lives under `data/simulation_scripts/` in this repo, and the CSV is generated at build time and served from the same domain as the book. The access URL has been updated in both the codebook and every chapter that uses it.
- **under review** — flagged for possible replacement/retirement rather than migration as-is (e.g. because it's a weak fit, or a nicer real/simulated dataset should replace it).
- **retired** — no longer used by any chapter; kept only for historical reference.

---

## 4. Referencing a dataset from a chapter

Instead of a bare `read_csv("https://...")` with no context, link to the dataset's codebook page the first time a chapter uses it, e.g.:

```markdown
We'll use the [practice dataset](../data/practice-data.qmd) throughout this chapter:

\```{r, message=FALSE}
library(tidyverse)
d <- read_csv("https://dataliteracy.cc/practice_data.csv")
\```
```

Keep the actual `read_csv()` URL as whatever the dataset's codebook page currently lists as its access URL (external or migrated) — don't hardcode a future path before migration is done.

---

## 5. Migration workflow (per dataset)

1. Decide: migrate as-is, replace with something better, or retire.
2. If migrating: write a simulation script in `data/simulation_scripts/<name>.r`, with a fixed `set.seed()`, writing its CSV to `file.path(Sys.getenv("DATALITERACY_DATA_OUTPUT_DIR", "data/generated"), "<name>.csv")`. No changes to `_quarto.yml` or CI are needed — the existing `pre-render` hook picks up any script added to that folder automatically.
3. Test standalone first: `Rscript data/simulation_scripts/<name>.r` and inspect `data/generated/<name>.csv`.
4. Update the dataset's codebook page: `status: migrated`, access URL → `https://dataliteracy.cc/<name>.csv`.
5. Update every chapter's `read_csv()` call that used the old external URL.
6. Re-render and re-bless (`Rscript scripts/check_drift.R --bless`), since the chapter's rendered output/chunk hashes will change.
7. Once every dataset in the old repo has either been migrated or explicitly marked `retired`, the `dataliteracy-data` repo/Cloudflare site can be taken down.
