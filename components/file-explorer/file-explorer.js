// components/file-explorer/file-explorer.js
//
// A tiny, dependency-free "file explorer" widget used to give students a
// more realistic (and clickable) sense of what a Finder/File Explorer
// window looks like, instead of a static bullet list.
//
// Usage:
//   window.initFileExplorer("some-div-id", treeData, { title: "Macintosh HD" });
//
// `treeData` is a single node (the root), where a node looks like:
//   {
//     name: "Documents",
//     type: "folder" | "file",      // defaults to "folder" if `children` is present, else "file"
//     open: true,                   // whether a folder starts expanded (folders only)
//     highlight: true,              // optional accent styling, e.g. to trace a path
//     note: "a short note",         // optional grey annotation shown after the name
//     icon: "\uD83D\uDCC1",         // optional custom icon override
//     description: "a sentence",    // optional custom text shown in the path popup; falls back
//                                    // to a generic explanation based on the file extension
//     children: [ ... ]             // nested nodes (folders only)
//   }

(function () {
  const DEFAULT_FOLDER_ICON = "\uD83D\uDCC1"; // 📁
  const DEFAULT_OPEN_FOLDER_ICON = "\uD83D\uDCC2"; // 📂
  const FILE_ICONS = {
    csv: "\uD83D\uDCCA",
    xlsx: "\uD83D\uDCCA",
    xls: "\uD83D\uDCCA",
    pdf: "\uD83D\uDCD5",
    png: "\uD83D\uDDBC\uFE0F",
    jpg: "\uD83D\uDDBC\uFE0F",
    jpeg: "\uD83D\uDDBC\uFE0F",
    zip: "\uD83D\uDDDC\uFE0F",
    r: "\u2328\uFE0F",
    docx: "\uD83D\uDCC4",
    txt: "\uD83D\uDCC4",
    json: "\uD83D\uDCC4",
  };
  const DEFAULT_FILE_ICON = "\uD83D\uDCC4"; // 📄

  // Short, generic explanations shown in the path popup when a file has no
  // custom `description` of its own, keyed by (lowercased) extension.
  const EXTENSION_DESCRIPTIONS = {
    csv: "A comma-separated values file: plain-text tabular data, often opened in R or Excel.",
    tsv: "A tab-separated values file: plain-text tabular data, similar to a CSV.",
    xlsx: "An Excel spreadsheet file.",
    xls: "An older-format Excel spreadsheet file.",
    txt: "A plain-text file with no special formatting.",
    r: "An R script: plain-text code that R can run.",
    rmd: "An R Markdown file: text and R code combined into one document.",
    qmd: "A Quarto Markdown file: text and code combined into one document.",
    py: "A Python script.",
    json: "A JSON file: structured, machine-readable text data.",
    pdf: "A PDF document: fixed-layout, for reading or printing.",
    docx: "A Word document.",
    doc: "An older-format Word document.",
    pptx: "A PowerPoint presentation.",
    png: "A PNG image file.",
    jpg: "A JPEG image file.",
    jpeg: "A JPEG image file.",
    gif: "A GIF image file.",
    svg: "An SVG image file: scalable, vector-based graphics.",
    zip: "A ZIP archive: one or more files compressed and bundled together.",
    html: "An HTML file: a web page.",
  };
  const DEFAULT_FILE_DESCRIPTION = "No further information is available for this file type.";

  function extensionOf(name) {
    return name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  }

  function fileIcon(name) {
    return FILE_ICONS[extensionOf(name)] || DEFAULT_FILE_ICON;
  }

  function fileDescription(name) {
    return EXTENSION_DESCRIPTIONS[extensionOf(name)] || DEFAULT_FILE_DESCRIPTION;
  }

  function nodeType(node) {
    if (node.type) return node.type;
    return Array.isArray(node.children) ? "folder" : "file";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function joinPath(parentPath, name) {
    if (!parentPath) return name;
    return parentPath.endsWith("/") ? parentPath + name : parentPath + "/" + name;
  }

  function renderNode(node, parentPath) {
    const type = nodeType(node);
    const isFolder = type === "folder";
    const open = isFolder && node.open !== false;
    const path = joinPath(parentPath || "", node.name);
    const classes = ["fe-node", isFolder ? "fe-folder" : "fe-file"];
    if (open) classes.push("fe-open");
    if (node.highlight) classes.push("fe-highlight");

    const icon = node.icon || (isFolder ? (open ? DEFAULT_OPEN_FOLDER_ICON : DEFAULT_FOLDER_ICON) : fileIcon(node.name));
    const caret = isFolder ? '<span class="fe-caret">\u25B6</span>' : '<span class="fe-caret"></span>';
    const note = node.note ? `<span class="fe-note">${escapeHtml(node.note)}</span>` : "";
    const description = node.description || (isFolder ? "" : fileDescription(node.name));

    let childrenHtml = "";
    if (isFolder && Array.isArray(node.children) && node.children.length) {
      childrenHtml = `<ul>${node.children.map((child) => renderNode(child, path)).join("")}</ul>`;
    }

    return `
      <li class="${classes.join(" ")}">
        <div class="fe-row" data-path="${escapeHtml(path)}" data-description="${escapeHtml(description)}">
          ${caret}
          <span class="fe-icon">${icon}</span>
          <span class="fe-name">${escapeHtml(node.name)}</span>
          ${note}
        </div>
        ${childrenHtml}
      </li>
    `;
  }

  function initFileExplorer(containerId, treeData, options) {
    const opts = options || {};
    const container = document.getElementById(containerId);
    if (!container) return;

    const title = opts.title || "File Explorer";
    const hint = opts.hint !== undefined ? opts.hint : "Click a folder to expand or collapse it, or a file to see its path";

    container.innerHTML = `
      <div class="fe-wrapper">
        <div class="fe-window">
          <div class="fe-titlebar">
            <span class="fe-dots">
              <span class="fe-dot fe-dot-red"></span>
              <span class="fe-dot fe-dot-yellow"></span>
              <span class="fe-dot fe-dot-green"></span>
            </span>
            <span class="fe-titlebar-label">${escapeHtml(title)}</span>
            ${hint ? `<span class="fe-hint">${escapeHtml(hint)}</span>` : ""}
          </div>
          <ul class="fe-tree">${renderNode(treeData, "")}</ul>
        </div>
        <div class="fe-popup" hidden></div>
      </div>
    `;

    const wrapperEl = container.querySelector(".fe-wrapper");
    const popup = container.querySelector(".fe-popup");

    function hidePopup() {
      popup.hidden = true;
      container.querySelectorAll(".fe-row.fe-selected").forEach((el) => el.classList.remove("fe-selected"));
    }

    function showPopup(row) {
      container.querySelectorAll(".fe-row.fe-selected").forEach((el) => el.classList.remove("fe-selected"));
      row.classList.add("fe-selected");

      const description = row.dataset.description
        ? `<div class="fe-popup-description">${escapeHtml(row.dataset.description)}</div>`
        : "";
      popup.innerHTML = `
        <div class="fe-popup-path"><span class="fe-popup-label">Path:</span> <code>${escapeHtml(row.dataset.path)}</code></div>
        ${description}
      `;
      popup.hidden = false;

      const wrapperRect = wrapperEl.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      popup.style.left = `${Math.max(rowRect.left - wrapperRect.left, 0)}px`;
      popup.style.top = `${rowRect.bottom - wrapperRect.top + 4}px`;
    }

    container.addEventListener("click", function (event) {
      const row = event.target.closest(".fe-row");
      if (!row) {
        hidePopup();
        return;
      }
      const node = row.parentElement;
      if (node.classList.contains("fe-folder")) {
        node.classList.toggle("fe-open");
        hidePopup();
        return;
      }
      if (node.classList.contains("fe-file")) {
        if (row.classList.contains("fe-selected")) {
          hidePopup();
        } else {
          showPopup(row);
        }
      }
    });

    document.addEventListener("click", function (event) {
      if (!container.contains(event.target)) hidePopup();
    });
  }

  window.initFileExplorer = initFileExplorer;
})();
