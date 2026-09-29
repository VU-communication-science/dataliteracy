// components/skill-tree/skill-tree.js

(function () {
  const NODE_WIDTH = 130;
  const NODE_HEIGHT = 36;
  const COL_GAP = 24;
  const ROW_GAP = 28;
  const PAD_X = 14;
  const PAD_Y = 14;

  function initSkillTree(containerId, data) {
    try {
      console.log("[SkillTree] Initializing in container:", containerId);
      const rootEl = document.getElementById(containerId);
      if (!rootEl) {
        console.error("[SkillTree] Container element not found:", containerId);
        return;
      }

      rootEl.innerHTML = "";
      rootEl.classList.add("st-wrapper");

      const hasOptional = data.modules.some((m) => m.optional === true);

      // 1. Controls Bar (Legend + Optional Toggle)
      const controlsEl = document.createElement("div");
      controlsEl.className = "st-controls-bar";

      const legendEl = document.createElement("div");
      legendEl.className = "st-legend";
      Object.entries(data.categories).forEach(([key, cat]) => {
        const item = document.createElement("div");
        item.className = "st-legend-item";
        item.innerHTML = `<span class="st-legend-dot" style="background:${cat.color}"></span><span>${cat.name}</span>`;
        legendEl.appendChild(item);
      });
      controlsEl.appendChild(legendEl);

      // Toggle button if optional modules exist
      if (hasOptional) {
        const toggleWrapper = document.createElement("div");
        toggleWrapper.className = "st-toggle-wrapper";
        toggleWrapper.innerHTML = `
          <label class="st-toggle-label">
            <input type="checkbox" id="st-optional-toggle" checked />
            <span>Show Optional Modules</span>
          </label>
        `;
        controlsEl.appendChild(toggleWrapper);
      }

      rootEl.appendChild(controlsEl);

      // 2. Render Board Function
      const boardContainer = document.createElement("div");
      boardContainer.className = "st-board-container";
      rootEl.appendChild(boardContainer);

      function renderTree(showOptional) {
        boardContainer.innerHTML = "";

        // Filter modules
        const visibleModules = data.modules.filter((m) => {
          if (!showOptional && m.optional === true) return false;
          return true;
        });

        let maxCol = 0;
        let maxRow = 0;
        const nodeMap = new Map();

        visibleModules.forEach((mod) => {
          if (mod.col > maxCol) maxCol = mod.col;
          if (mod.row > maxRow) maxRow = mod.row;
          nodeMap.set(mod.id, mod);
        });

        const boardWidth = PAD_X * 2 + (maxCol + 1) * NODE_WIDTH + maxCol * COL_GAP;
        const boardHeight = PAD_Y * 2 + (maxRow + 1) * NODE_HEIGHT + maxRow * ROW_GAP;

        visibleModules.forEach((mod) => {
          mod.x = PAD_X + mod.col * (NODE_WIDTH + COL_GAP);
          mod.y = PAD_Y + mod.row * (NODE_HEIGHT + ROW_GAP);
        });

        const board = document.createElement("div");
        board.className = "st-board";
        board.style.width = boardWidth + "px";
        board.style.height = boardHeight + "px";

        // SVG Link Layer
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "st-svg-layer");
        svg.setAttribute("width", boardWidth);
        svg.setAttribute("height", boardHeight);

        // Render Connections
        visibleModules.forEach((child) => {
          if (!child.parents || child.parents.length === 0) return;

          child.parents.forEach((parentId) => {
            const parent = nodeMap.get(parentId);
            if (!parent) return;

            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("class", "st-link");
            if (child.optional || parent.optional) {
              path.classList.add("st-link-optional");
            }
            path.setAttribute("data-parent", parent.id);
            path.setAttribute("data-child", child.id);

            let x1, y1, x2, y2, d;

            if (parent.row === child.row) {
              x1 = parent.x + NODE_WIDTH;
              y1 = parent.y + NODE_HEIGHT / 2;
              x2 = child.x;
              y2 = child.y + NODE_HEIGHT / 2;
              const mx = (x1 + x2) / 2;
              d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            } else if (parent.col === child.col) {
              x1 = parent.x + NODE_WIDTH / 2;
              y1 = parent.y + NODE_HEIGHT;
              x2 = child.x + NODE_WIDTH / 2;
              y2 = child.y;
              d = `M ${x1} ${y1} L ${x2} ${y2}`;
            } else if (child.row === parent.row + 1) {
              x1 = parent.x + NODE_WIDTH / 2;
              y1 = parent.y + NODE_HEIGHT;
              x2 = child.x + NODE_WIDTH / 2;
              y2 = child.y;
              const my = (y1 + y2) / 2;
              d = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
            } else {
              x1 = parent.x + NODE_WIDTH / 2;
              y1 = parent.y + NODE_HEIGHT;
              x2 = child.x + NODE_WIDTH / 2;
              y2 = child.y;
              const gutterY = y1 + ROW_GAP / 2;
              d = `M ${x1} ${y1} L ${x1} ${gutterY} L ${x2} ${gutterY} L ${x2} ${y2}`;
            }

            path.setAttribute("d", d);
            svg.appendChild(path);
          });
        });

        board.appendChild(svg);

        // Nodes Layer
        const nodesLayer = document.createElement("div");
        nodesLayer.className = "st-nodes-layer";

        // Popover
        const popover = document.createElement("div");
        popover.className = "st-popover";
        board.appendChild(popover);

        visibleModules.forEach((mod) => {
          const cat = data.categories[mod.category] || {
            color: "#475569",
            bg: "#f8fafc",
            border: "#cbd5e1"
          };

          const nodeEl = document.createElement("a");
          nodeEl.className = "st-node";
          if (mod.optional) nodeEl.classList.add("st-node-optional");
          nodeEl.href = mod.url || "#";
          nodeEl.setAttribute("data-id", mod.id);
          nodeEl.style.left = mod.x + "px";
          nodeEl.style.top = mod.y + "px";
          nodeEl.style.backgroundColor = cat.bg;
          nodeEl.style.borderColor = cat.border;

          // Pure title - no number pill
          nodeEl.innerHTML = `
            <div class="st-title" title="${mod.title}">
              ${mod.title}
            </div>
          `;

          nodeEl.addEventListener("mouseenter", (e) => {
            highlightAncestors(mod.id);
            showPopover(mod, e.currentTarget, popover, data);
          });

          nodeEl.addEventListener("mouseleave", () => {
            clearHighlights();
            hidePopover(popover);
          });

          nodesLayer.appendChild(nodeEl);
        });

        board.appendChild(nodesLayer);
        boardContainer.appendChild(board);
      }

      // Highlight ONLY the path towards the module (ancestors/prerequisites)
      function highlightAncestors(activeId) {
        const allLinks = rootEl.querySelectorAll(".st-link");
        const allNodes = rootEl.querySelectorAll(".st-node");

        const ancestors = new Set();

        function findAncestors(id) {
          allLinks.forEach((link) => {
            if (link.getAttribute("data-child") === id) {
              const parent = link.getAttribute("data-parent");
              ancestors.add(parent);
              findAncestors(parent);
            }
          });
        }

        findAncestors(activeId);

        // Only highlight incoming links in the prerequisite chain leading up to activeId
        allLinks.forEach((link) => {
          const p = link.getAttribute("data-parent");
          const c = link.getAttribute("data-child");

          const isDirectIncoming = (c === activeId && ancestors.has(p));
          const isUpstreamChain = (ancestors.has(p) && ancestors.has(c));

          if (isDirectIncoming || isUpstreamChain) {
            link.classList.add("st-link-highlight");
          } else {
            link.classList.add("st-link-dimmed");
          }
        });

        allNodes.forEach((node) => {
          const id = node.getAttribute("data-id");
          if (id === activeId) {
            node.classList.add("st-active-target");
          } else if (ancestors.has(id)) {
            node.classList.add("st-node-ancestor");
          } else {
            node.classList.add("st-node-dimmed");
          }
        });
      }

      function clearHighlights() {
        rootEl.querySelectorAll(".st-link").forEach((l) => {
          l.classList.remove("st-link-highlight", "st-link-dimmed");
        });
        rootEl.querySelectorAll(".st-node").forEach((n) => {
          n.classList.remove("st-active-target", "st-node-ancestor", "st-node-dimmed");
        });
      }

      function showPopover(mod, targetEl, popover, rawData) {
        const parentTitles = (mod.parents || [])
          .map((pid) => {
            const p = rawData.modules.find((m) => m.id === pid);
            return p ? `${p.number} ${p.title}` : pid;
          })
          .filter(Boolean);

        const childTitles = rawData.modules
          .filter((m) => m.parents && m.parents.includes(mod.id))
          .map((m) => `${m.number} ${m.title}`);

        const cat = rawData.categories[mod.category] || { name: mod.category, color: "#475569" };

        popover.innerHTML = `
          <div class="st-popover-header">
            <span class="st-popover-badge" style="background:${cat.color}">${mod.number}</span>
            <span class="st-popover-title">${mod.title}</span>
          </div>
          <div class="st-popover-category" style="color:${cat.color}">
            ${cat.name} ${mod.optional ? "• Optional" : ""}
          </div>
          <div class="st-popover-summary">
            ${mod.summary || "No description available."}
          </div>
          ${
            parentTitles.length > 0
              ? `<div class="st-popover-rel"><strong>Prerequisites:</strong> ${parentTitles.join(", ")}</div>`
              : `<div class="st-popover-rel"><strong>Prerequisites:</strong> None (Starting module)</div>`
          }
        `;

        popover.style.display = "block";

        const nodeRect = targetEl.getBoundingClientRect();
        const boardRect = targetEl.closest(".st-board").getBoundingClientRect();

        let left = nodeRect.left - boardRect.left + NODE_WIDTH + 10;
        let top = nodeRect.top - boardRect.top - 8;

        if (left + 230 > boardRect.width) {
          left = nodeRect.left - boardRect.left - 230 - 10;
        }

        popover.style.left = `${Math.max(8, left)}px`;
        popover.style.top = `${Math.max(8, top)}px`;
      }

      function hidePopover(popover) {
        popover.style.display = "none";
      }

      // Initial render
      renderTree(true);

      const optToggle = document.getElementById("st-optional-toggle");
      if (optToggle) {
        optToggle.addEventListener("change", (e) => {
          renderTree(e.target.checked);
        });
      }
      console.log("[SkillTree] Rendered successfully.");
    } catch (err) {
      console.error("[SkillTree] Error during initialization:", err);
    }
  }

  // Export to window
  window.initSkillTree = initSkillTree;
})();
