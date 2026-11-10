#!/usr/bin/env node

/**
 * components/skill-tree/apply-positions.js
 *
 * Loops over the 2D "positions" grid in curriculum.json, maps (row, col)
 * coordinates to each module, and validates grid layout and dependencies.
 *
 * Usage:
 *   node components/skill-tree/apply-positions.js           # Display layout & validate
 *   node components/skill-tree/apply-positions.js --check   # CI check mode
 *   node components/skill-tree/apply-positions.js --export  # Print resolved JSON with row/col
 */

const fs = require("fs");
const path = require("path");

function loadCurriculum(jsonPath) {
  const resolvedPath = path.resolve(jsonPath || path.join(__dirname, "curriculum.json"));
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`curriculum.json not found at: ${resolvedPath}`);
  }
  return JSON.parse(fs.readFileSync(resolvedPath, "utf-8"));
}

function applyPositions(curriculumData) {
  const errors = [];
  const warnings = [];

  // 1. Normalize modules map
  const moduleMap = new Map();
  if (Array.isArray(curriculumData.modules)) {
    curriculumData.modules.forEach((mod) => {
      if (!mod.id) {
        errors.push("Module in array is missing 'id'");
      } else {
        moduleMap.set(mod.id, { ...mod });
      }
    });
  } else if (curriculumData.modules && typeof curriculumData.modules === "object") {
    Object.entries(curriculumData.modules).forEach(([id, mod]) => {
      moduleMap.set(id, { id, ...mod });
    });
  } else {
    errors.push("'modules' field is neither an array nor an object");
    return { modules: [], errors, warnings };
  }

  // 2. Loop over positions matrix to set col and row
  const placedIds = new Set();
  const positions = curriculumData.positions || [];

  positions.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) {
      errors.push(`positions[${rowIndex}] is not an array`);
      return;
    }
    row.forEach((cell, colIndex) => {
      if (cell === null || cell === undefined) return;
      const modId = typeof cell === "string" ? cell.trim() : "";
      if (modId === "") return;

      if (placedIds.has(modId)) {
        errors.push(`Duplicate placement of module "${modId}" at row ${rowIndex}, col ${colIndex}`);
        return;
      }
      placedIds.add(modId);

      if (moduleMap.has(modId)) {
        const mod = moduleMap.get(modId);
        mod.row = rowIndex;
        mod.col = colIndex;
      } else {
        errors.push(`Module ID "${modId}" in positions[${rowIndex}][${colIndex}] does not exist in 'modules'`);
      }
    });
  });

  // 3. Check for unplaced modules
  for (const [id, mod] of moduleMap.entries()) {
    if (!placedIds.has(id)) {
      if (mod.row !== undefined && mod.col !== undefined) {
        warnings.push(`Module "${id}" not in positions matrix, keeping fallback (row ${mod.row}, col ${mod.col})`);
      } else {
        errors.push(`Module "${id}" is defined in 'modules' but missing from positions matrix`);
      }
    }
  }

  // 4. Validate prerequisite references
  for (const [id, mod] of moduleMap.entries()) {
    if (Array.isArray(mod.parents)) {
      mod.parents.forEach((parentId) => {
        if (!moduleMap.has(parentId)) {
          errors.push(`Module "${id}" references non-existent parent "${parentId}"`);
        }
      });
    }
  }

  const resolvedModules = Array.from(moduleMap.values());
  const maxCols = positions.reduce((max, r) => Math.max(max, Array.isArray(r) ? r.length : 0), 0);

  return {
    modules: resolvedModules,
    moduleMap,
    errors,
    warnings,
    gridSize: {
      rows: positions.length,
      cols: maxCols
    }
  };
}

function printAsciiGrid(positions, moduleMap) {
  const maxCols = positions.reduce((max, r) => Math.max(max, Array.isArray(r) ? r.length : 0), 0);
  const cellWidth = 7;
  const dividerLength = 6 + maxCols * (cellWidth + 3);

  console.log("\n📐 Skill Tree Mosaic Layout:");
  console.log("=".repeat(dividerLength));
  positions.forEach((row, r) => {
    const rowStr = row.map((cell) => {
      if (!cell || cell.trim() === "") return ".".padEnd(cellWidth);
      const trimmed = cell.trim();
      const mod = moduleMap.get(trimmed);
      const label = mod ? trimmed : `?${trimmed}`;
      return label.slice(0, cellWidth).padEnd(cellWidth);
    }).join(" | ");
    console.log(`R${r.toString().padStart(2, "0")} | ${rowStr}`);
  });
  console.log("=".repeat(dividerLength));
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const data = loadCurriculum();
  const result = applyPositions(data);

  if (args.includes("--export")) {
    const output = {
      ...data,
      modules: result.modules
    };
    console.log(JSON.stringify(output, null, 2));
    process.exit(0);
  }

  printAsciiGrid(data.positions || [], result.moduleMap);

  console.log(`\nGrid Dimensions : ${result.gridSize.rows} rows × ${result.gridSize.cols} columns`);
  console.log(`Total Modules   : ${result.modules.length}`);

  if (result.warnings.length > 0) {
    console.log("\n⚠️ Warnings:");
    result.warnings.forEach((w) => console.log(`  - ${w}`));
  }

  if (result.errors.length > 0) {
    console.log("\n❌ Errors:");
    result.errors.forEach((e) => console.log(`  - ${e}`));
    process.exit(1);
  } else {
    console.log("\n✅ All positions and module references are valid!\n");
  }
}

module.exports = { applyPositions, loadCurriculum };
