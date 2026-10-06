# Skill Tree Component

This directory contains the data-driven interactive skill tree used on the curriculum overview page (`chapters/curriculum.qmd`).

## Directory Structure

- `curriculum.json` — **Single source of truth** defining categories, courses, the 2D layout mosaic, and all module metadata.
- `apply-positions.js` — CLI utility that maps the 2D `positions` matrix to (row, col) coordinates, validates prerequisites, and renders an ASCII grid.
- `skill-tree.js` — Client-side renderer that draws the interactive grid, SVG connection curves, course filter controls, and floating popovers.
- `skill-tree.css` — Compact, responsive styling for pills, filter controls, custom multi-select dropdown, legend, and prerequisite badges.

---

## 1. Visual 2D Grid Arrangement (`positions`)

Instead of manually maintaining `col` and `row` numbers on each individual module, `curriculum.json` uses a visual 2D matrix (`"positions"`). Each row corresponds to a tier in the tree, and each column position holds a compact module ID (maximum 5 characters) or `""` for an empty space:

```json
"positions": [
  ["",      "r-bas", "",      "",      "latnt"],
  ["proj",  "dfs",   "baser", "",      "fact" ],
  ["quart", "sumar", "clean", "str",   "scale"],
  ["viz",   "",      "trans", "text",  ""     ],
  ["",      "desc",  "",      "",      ""     ],
  ["",      "",      "cncpt", "",      ""     ],
  ["cause", "ttest", "corr",  "power", ""     ],
  ["",      "anova", "regr",  "",      ""     ],
  ["",      "ancov", "ctrl",  "",      ""     ],
  ["",      "",      "med",   "",      ""     ],
  ["",      "",      "adv",   "",      ""     ]
]
```

When the page loads, `skill-tree.js` automatically loops over this matrix and assigns `row` and `col` to each module.

To inspect the layout and validate that all modules and prerequisites exist, run:
```bash
node components/skill-tree/apply-positions.js
```

---

## 2. Module Definition (`modules`)

`"modules"` is an object keyed directly by module ID (max 5 chars):

```json
"modules": {
  "r-bas": {
    "number": "1.1",
    "title": "Working with R",
    "category": "workflow",
    "courses": ["bachelor-y1"],
    "parents": [],
    "summary": "Vectors, object types, functions, console vs. script, and basic syntax.",
    "url": "1.1-working-with-r.html"
  }
}
```

### Module Properties:
- `id` (key): Short slug (max 5 chars, e.g. `"r-bas"`, `"dfs"`, `"ttest"`).
- `number`: Display number/code (e.g. `"1.1"`).
- `title`: Compact title shown on the node (supports up to 2 wrapped lines with fixed 40px node height).
- `category`: Matching a category defined in `"categories"`.
- `courses`: Array of course IDs in which this module is taught (e.g. `["bachelor-y1", "bachelor-y2"]`).
- `parents`: Array of prerequisite module IDs that must be completed before this module.
- `summary`: Short summary shown in the hover popover card.
- `url`: Link to the lesson page.

---

## 3. Course-Based Filtering & Groupings

Courses and preset groups are configured in `curriculum.json`:

```json
"courses": {
  "bachelor-y1": { "name": "Bachelor Year 1", "group": "bachelor" },
  "bachelor-y2": { "name": "Bachelor Year 2", "group": "bachelor" },
  "master": { "name": "Master", "group": "master" }
},
"course_groups": {
  "all": { "name": "All", "courses": ["bachelor-y1", "bachelor-y2", "master"] },
  "bachelor": { "name": "All Bachelor", "courses": ["bachelor-y1", "bachelor-y2"] },
  "year-1": { "name": "Bachelor Year 1", "courses": ["bachelor-y1"] },
  "year-2": { "name": "Bachelor Year 2", "courses": ["bachelor-y2"] },
  "master": { "name": "Master", "courses": ["master"] }
}
```

### Prerequisite Handling:
When filtering by a course (e.g. *Bachelor Year 2*):
1. **Modules taught in that course** are shown in full category colors.
2. **Prerequisites from earlier courses** required by those modules (e.g. *Working with R*, *Data Frames*, *T-Test*) remain visible to maintain learning continuity, but are styled with dashed borders, muted tones, and a **Prereq** badge.
3. **Unrelated modules** outside the course and not needed as prerequisites are hidden.
4. The **Custom** dropdown allows selecting any combination of courses with instant live updates.
