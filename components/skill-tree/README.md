# Skill Tree Component

This directory contains the data-driven interactive skill tree used on the curriculum overview page (`chapters/02-curriculum.qmd`).

## Directory Structure

- `curriculum.json` — **Single source of truth** defining all modules, their coordinates, categories, prerequisites, descriptions, and URLs.
- `skill-tree.js` — Client-side renderer that draws the interactive grid, SVG connection curves, and floating popovers.
- `skill-tree.css` — Compact, responsive styling for pills, legend, and hover states.

## How to Add or Edit a Module

To update the skill tree, simply edit `curriculum.json`. Each entry in `"modules"` has the following schema:

```json
{
  "id": "unique-slug",           // Unique identifier used for linking (e.g. "t-test")
  "number": "16",                // Display number or code (e.g. "16", "10a")
  "title": "T-Test",             // Compact title shown on the node
  "category": "testing",         // Key matching a category in "categories"
  "col": 5,                      // Horizontal column (0 to 6)
  "row": 4,                      // Vertical tier row (0 to 6)
  "parents": ["test-overview"],  // Array of prerequisite module IDs
  "summary": "Comparing...",     // 1-2 sentence description shown in the popover
  "url": "16-t-test.html"        // Link to the rendered chapter
}
```

### Adding a New Category

Categories are defined at the top of `curriculum.json`:

```json
"categories": {
  "workflow": { "name": "R & Workflow", "color": "#2563eb", "bg": "#eff6ff", "border": "#bfdbfe" }
}
```

## Features

- **Compact Grid**: Every module is a compact pill (~136px × 38px), fitting the entire curriculum onto a single bird's-eye canvas.
- **Dynamic SVG Connectors**: Smooth cubic bezier curves link parent prerequisites to downstream unlocked modules.
- **Path Highlighting**: Hovering over any module illuminates its upstream prerequisite chain in blue and downstream unlocked skills in green.
- **Interactive Floating Popovers**: Hovering displays a detailed card with category, description, full prerequisite titles, and a direct link.
- **Zero Build Toolchain**: Compiles directly into the Quarto book without requiring npm, webpack, or external CDNs.
