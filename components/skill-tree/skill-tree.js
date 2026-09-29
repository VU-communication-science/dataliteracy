// components/skill-tree/skill-tree.js

(function () {
  const NODE_WIDTH = 126;
  const NODE_HEIGHT = 34;
  const COL_GAP = 24;
  const ROW_GAP = 24;
  const PAD_X = 14;
  const PAD_Y = 14;

  function initSkillTree(containerId, data) {
    const rootEl = document.getElementById(containerId);
    if (!rootEl) return;

    rootEl.innerHTML = "";
    rootEl.classList.add("st-wrapper");

    // Track visibility filter state: 'all' vs 'mandatory'
    let filterMode = "all"; // default or can be 'mandatory'
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
          if (!parent) return; // skip if parent is filtered out

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
            const my = (y1 + y2) / 2;
            d = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
          } else {
            x1 = parent.x + NODE_WIDTH / 2;
            y1 = parent.y + NODE_HEIGHT;
            x2 = child.x + NODE_WIDTH / 2;
            y2 = child.y;
            const dy = y2 - y1;
            d = `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.55}, ${x2} ${y2 - dy * 0.55}, ${x2} ${y2}`;
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
        nodeEl.style.borderColor = cat.border;

        const optBadge = mod.optional ? `<span class="st-opt-badge" title="Optional module">opt</span>` : "";

        nodeEl.innerHTML = `
          <span class="st-num" style="background:${cat.bg}; color:${cat.color};">${mod.number}</span>
          <span class="st-title" title="${mod.title}">${mod.title}</span>
          ${optBadge}
        `;

        // Hover Interaction
        nodeEl.addEventListener("mouseenter", () => {
          nodeEl.classList.add("st-active-target");

          const ancestors = new Set();
          function collectAncestors(curId) {
            const m = nodeMap.get(curId);
            if (m && m.parents) {
              m.parents.forEach((pId) => {
                ancestors.add(pId);
                collectAncestors(pId);
              });
            }
          }
          collectAncestors(mod.id);

          const descendants = new Set();
          function collectDescendants(curId) {
            visibleModules.forEach((m) => {
              if (m.parents && m.parents.includes(curId)) {
                descendants.add(m.id);
                collectDescendants(m.id);
              }
            });
          }
          collectDescendants(mod.id);

          nodesLayer.querySelectorAll(".st-node").forEach((el) => {
            const id = el.getAttribute("data-id");
            if (id === mod.id) return;
            if (ancestors.has(id)) {
              el.classList.add("st-node-ancestor");
            } else if (descendants.has(id)) {
              el.classList.add("st-node-child");
            } else {
              el.classList.add("st-node-dimmed");
            }
          });

          svg.querySelectorAll(".st-link").forEach((path) => {
            const p = path.getAttribute("data-parent");
            const c = path.getAttribute("data-child");
            if ((ancestors.has(p) && ancestors.has(c)) || (p === mod.id && descendants.has(c)) || (ancestors.has(p) && c === mod.id)) {
              path.classList.add("st-link-highlight");
            } else {
              path.classList.add("st-link-dimmed");
            }
          });

          // Show popover
          popover.innerHTML = `
            <div class="st-popover-cat" style="color: ${cat.color}">${cat.name} ${mod.optional ? "(Optional)" : ""}</div>
            <div class="st-popover-title">${mod.number} ${mod.title}</div>
            <div class="st-popover-desc">${mod.summary || ""}</div>
          `;
          popover.style.display = "block";

          let popLeft = mod.x + NODE_WIDTH + 8;
          let popTop = mod.y - 6;
          if (popLeft + 190 > boardWidth) {
            popLeft = mod.x - 198;
          }
          if (popLeft < 0) popLeft = 8;

          popover.style.left = popLeft + "px";
          popover.style.top = Math.max(4, popTop) + "px";
        });

        nodeEl.addEventListener("mouseleave", () => {
          nodeEl.classList.remove("st-active-target");
          nodesLayer.querySelectorAll(".st-node").forEach((el) => {
            el.classList.remove("st-node-ancestor", "st-node-child", "st-node-dimmed");
          });
          svg.querySelectorAll(".st-link").forEach((path) => {
            path.classList.remove("st-link-highlight", "st-link-dimmed");
          });
          popover.style.display = "none";
        });

        nodesLayer.appendChild(nodeEl);
      });

      board.appendChild(nodesLayer);
      boardContainer.appendChild(board);
    }

    // Initial render
    renderTree(true);

    // Event listener for toggle checkbox if present
    const toggleInput = rootEl.querySelector("#st-optional-toggle");
    if (toggleInput) {
      toggleInput.addEventListener("change", (e) => {
        renderTree(e.target.checked);
      });
    }
  }

  window.initSkillTree = initSkillTree;
})();
