// components/skill-tree/skill-tree.js

(function () {
  const NODE_WIDTH = 100;
  const NODE_HEIGHT = 40;
  const COL_GAP = 20;
  const ROW_GAP = 28;
  const PAD_X = 14;
  const PAD_Y = 14;

  function initSkillTree(containerId, rawData) {
    try {
      console.log("[SkillTree] Initializing in container:", containerId);
      const rootEl = document.getElementById(containerId);
      if (!rootEl) {
        console.error("[SkillTree] Container element not found:", containerId);
        return;
      }

      rootEl.innerHTML = "";
      rootEl.classList.add("st-wrapper");

      // 1. Normalize Modules & Parse Positions
      const moduleMap = new Map();
      if (Array.isArray(rawData.modules)) {
        rawData.modules.forEach((mod) => {
          if (mod.id) moduleMap.set(mod.id, { ...mod });
        });
      } else if (rawData.modules && typeof rawData.modules === "object") {
        Object.entries(rawData.modules).forEach(([id, mod]) => {
          moduleMap.set(id, { id, ...mod });
        });
      }

      // Loop over positions matrix to set col & row
      if (Array.isArray(rawData.positions)) {
        rawData.positions.forEach((rowArr, rowIndex) => {
          if (Array.isArray(rowArr)) {
            rowArr.forEach((modId, colIndex) => {
              if (modId && typeof modId === "string" && modId.trim() !== "") {
                const id = modId.trim();
                if (moduleMap.has(id)) {
                  const m = moduleMap.get(id);
                  m.row = rowIndex;
                  m.col = colIndex;
                }
              }
            });
          }
        });
      }

      const allModules = Array.from(moduleMap.values());

      // Determine static board dimensions based on positions or modules
      let maxCol = 0;
      let maxRow = 0;
      if (Array.isArray(rawData.positions) && rawData.positions.length > 0) {
        maxRow = rawData.positions.length - 1;
        maxCol = rawData.positions.reduce((max, r) => Math.max(max, Array.isArray(r) ? r.length - 1 : 0), 0);
      } else {
        allModules.forEach((m) => {
          if ((m.col || 0) > maxCol) maxCol = m.col;
          if ((m.row || 0) > maxRow) maxRow = m.row;
        });
      }

      const boardWidth = PAD_X * 2 + (maxCol + 1) * NODE_WIDTH + maxCol * COL_GAP;
      const boardHeight = PAD_Y * 2 + (maxRow + 1) * NODE_HEIGHT + maxRow * ROW_GAP;

      // Assign pixel coordinates
      allModules.forEach((mod) => {
        const c = mod.col !== undefined ? mod.col : 0;
        const r = mod.row !== undefined ? mod.row : 0;
        mod.x = PAD_X + c * (NODE_WIDTH + COL_GAP);
        mod.y = PAD_Y + r * (NODE_HEIGHT + ROW_GAP);
      });

      // 2. Course Configuration
      const courses = rawData.courses || {};
      const courseKeys = Object.keys(courses);
      const courseGroups = rawData.course_groups || {
        all: { name: "All", courses: courseKeys }
      };

      // State: Set of selected course IDs
      let selectedCourses = new Set(courseKeys);
      let isAllSelected = true;

      // 3. Controls Bar
      const controlsEl = document.createElement("div");
      controlsEl.className = "st-controls-bar";

      // Course Filter Section
      const filterSection = document.createElement("div");
      filterSection.className = "st-filter-section";

      const filterHeader = document.createElement("div");
      filterHeader.className = "st-filter-header";
      filterHeader.innerHTML = `
        <span class="st-filter-title">Course View</span>
        <span class="st-module-count" id="st-module-count"></span>
      `;
      filterSection.appendChild(filterHeader);

      const filterRow = document.createElement("div");
      filterRow.className = "st-filter-row";

      // Preset Pills
      const presetContainer = document.createElement("div");
      presetContainer.className = "st-preset-pills";

      Object.entries(courseGroups).forEach(([groupId, group]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "st-btn-pill" + (groupId === "all" ? " active" : "");
        btn.setAttribute("data-group", groupId);
        btn.textContent = group.name;
        btn.addEventListener("click", () => {
          if (groupId === "all") {
            selectedCourses = new Set(courseKeys);
            isAllSelected = true;
          } else {
            selectedCourses = new Set(group.courses || []);
            isAllSelected = selectedCourses.size === courseKeys.length;
          }
          updateControlsUI();
          renderTree();
        });
        presetContainer.appendChild(btn);
      });
      filterRow.appendChild(presetContainer);

      // Custom Dropdown for Multi-Course Selection
      if (courseKeys.length > 0) {
        const dropdownWrapper = document.createElement("div");
        dropdownWrapper.className = "st-dropdown-wrapper";

        const dropdownBtn = document.createElement("button");
        dropdownBtn.type = "button";
        dropdownBtn.className = "st-btn-dropdown";
        dropdownBtn.id = "st-course-dropdown-btn";
        dropdownBtn.innerHTML = `
          <span>Custom</span>
          <span class="st-dropdown-arrow">▾</span>
        `;

        const dropdownMenu = document.createElement("div");
        dropdownMenu.className = "st-dropdown-menu";
        dropdownMenu.id = "st-course-dropdown-menu";

        const dropdownHeading = document.createElement("div");
        dropdownHeading.className = "st-dropdown-heading";
        dropdownHeading.textContent = "Select Courses:";
        dropdownMenu.appendChild(dropdownHeading);

        const checkboxList = document.createElement("div");
        checkboxList.className = "st-checkbox-list";

        courseKeys.forEach((cId) => {
          const course = courses[cId];
          const label = document.createElement("label");
          label.className = "st-checkbox-item";

          const input = document.createElement("input");
          input.type = "checkbox";
          input.value = cId;
          input.checked = true;

          const span = document.createElement("span");
          span.textContent = course.name || cId;

          label.appendChild(input);
          label.appendChild(span);

          input.addEventListener("change", () => {
            if (input.checked) {
              selectedCourses.add(cId);
            } else {
              selectedCourses.delete(cId);
            }
            isAllSelected = selectedCourses.size === courseKeys.length;
            updateControlsUI();
            renderTree();
          });
          checkboxList.appendChild(label);
        });
        dropdownMenu.appendChild(checkboxList);

        // Actions: Select All / Clear
        const actionsRow = document.createElement("div");
        actionsRow.className = "st-dropdown-actions";

        const btnAll = document.createElement("button");
        btnAll.type = "button";
        btnAll.className = "st-btn-action";
        btnAll.textContent = "Select All";
        btnAll.addEventListener("click", () => {
          selectedCourses = new Set(courseKeys);
          isAllSelected = true;
          updateControlsUI();
          renderTree();
        });

        const btnClear = document.createElement("button");
        btnClear.type = "button";
        btnClear.className = "st-btn-action";
        btnClear.textContent = "Clear";
        btnClear.addEventListener("click", () => {
          selectedCourses = new Set();
          isAllSelected = false;
          updateControlsUI();
          renderTree();
        });

        actionsRow.appendChild(btnAll);
        actionsRow.appendChild(btnClear);
        dropdownMenu.appendChild(actionsRow);

        dropdownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdownMenu.classList.toggle("open");
          dropdownBtn.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
          if (!dropdownWrapper.contains(e.target)) {
            dropdownMenu.classList.remove("open");
            dropdownBtn.classList.remove("open");
          }
        });

        dropdownWrapper.appendChild(dropdownBtn);
        dropdownWrapper.appendChild(dropdownMenu);
        filterRow.appendChild(dropdownWrapper);
      }

      filterSection.appendChild(filterRow);
      controlsEl.appendChild(filterSection);

      // Legend Section
      const legendEl = document.createElement("div");
      legendEl.className = "st-legend";
      Object.entries(rawData.categories || {}).forEach(([key, cat]) => {
        const item = document.createElement("div");
        item.className = "st-legend-item";
        item.innerHTML = `<span class="st-legend-dot" style="background:${cat.color}"></span><span>${cat.name}</span>`;
        legendEl.appendChild(item);
      });

      // Prerequisite indicator in legend
      const prereqLegend = document.createElement("div");
      prereqLegend.className = "st-legend-item st-legend-item-prereq";
      prereqLegend.innerHTML = `
        <span class="st-legend-badge-prereq">Prereq</span>
        <span>Prior knowledge</span>
      `;
      legendEl.appendChild(prereqLegend);

      controlsEl.appendChild(legendEl);
      rootEl.appendChild(controlsEl);

      // 4. Board Container
      const boardContainer = document.createElement("div");
      boardContainer.className = "st-board-container";
      rootEl.appendChild(boardContainer);

      // 5. Global Floating Popover attached to rootEl (outside boardContainer)
      // This guarantees the popover NEVER triggers scrollbars inside st-board-container
      const popover = document.createElement("div");
      popover.className = "st-popover";
      rootEl.appendChild(popover);

      // Function to calculate visibility and roles
      function calculateActiveModules() {
        if (isAllSelected || courseKeys.length === 0) {
          return {
            visibleModules: allModules,
            coveredSet: new Set(allModules.map((m) => m.id)),
            prereqSet: new Set()
          };
        }

        // 1. Modules directly covered in any selected course
        const coveredSet = new Set();
        allModules.forEach((m) => {
          if (m.courses && m.courses.some((c) => selectedCourses.has(c))) {
            coveredSet.add(m.id);
          }
        });

        // 2. Ancestors / prerequisites of covered modules
        const prereqSet = new Set();
        function addAncestors(modId) {
          const mod = moduleMap.get(modId);
          if (!mod || !Array.isArray(mod.parents)) return;
          mod.parents.forEach((parentId) => {
            if (!coveredSet.has(parentId)) {
              prereqSet.add(parentId);
            }
            addAncestors(parentId);
          });
        }

        coveredSet.forEach((modId) => addAncestors(modId));

        // Visible = covered + prerequisites
        const visibleModules = allModules.filter(
          (m) => coveredSet.has(m.id) || prereqSet.has(m.id)
        );

        return { visibleModules, coveredSet, prereqSet };
      }

      function updateControlsUI() {
        // Update checkboxes
        const checkboxes = rootEl.querySelectorAll(".st-checkbox-item input");
        checkboxes.forEach((cb) => {
          cb.checked = selectedCourses.has(cb.value);
        });

        // Match active preset
        const presetBtns = rootEl.querySelectorAll(".st-btn-pill");
        let matchedGroup = null;

        if (isAllSelected) {
          matchedGroup = "all";
        } else {
          for (const [groupId, group] of Object.entries(courseGroups)) {
            if (groupId === "all") continue;
            const gCourses = group.courses || [];
            if (
              gCourses.length === selectedCourses.size &&
              gCourses.every((c) => selectedCourses.has(c))
            ) {
              matchedGroup = groupId;
              break;
            }
          }
        }

        presetBtns.forEach((btn) => {
          if (btn.getAttribute("data-group") === matchedGroup) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });

        const customBtn = rootEl.querySelector("#st-course-dropdown-btn");
        if (customBtn) {
          if (!matchedGroup && selectedCourses.size > 0) {
            customBtn.classList.add("active");
          } else {
            customBtn.classList.remove("active");
          }
        }
      }

      // 6. Render Board
      function renderTree() {
        boardContainer.innerHTML = "";

        const { visibleModules, coveredSet, prereqSet } = calculateActiveModules();

        // Update module count badge
        const countEl = rootEl.querySelector("#st-module-count");
        if (countEl) {
          if (isAllSelected || selectedCourses.size === 0) {
            countEl.textContent = `${visibleModules.length} modules`;
          } else {
            countEl.textContent = `${visibleModules.length} modules (${coveredSet.size} in course, ${prereqSet.size} prereq)`;
          }
        }

        if (visibleModules.length === 0) {
          const emptyNotice = document.createElement("div");
          emptyNotice.className = "st-empty-notice";
          emptyNotice.innerHTML = `
            <div class="st-empty-title">No modules match current selection</div>
            <div class="st-empty-desc">Please choose at least one course or click <strong>All</strong> to view the full skill tree.</div>
          `;
          boardContainer.appendChild(emptyNotice);
          return;
        }

        const visibleMap = new Map();
        visibleModules.forEach((m) => visibleMap.set(m.id, m));

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
            const parent = visibleMap.get(parentId);
            if (!parent) return; // Only draw if parent is also visible

            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("class", "st-link");

            // Mark link as prerequisite if parent or child is outside current course
            const isPrereqLink = prereqSet.has(parent.id) || prereqSet.has(child.id);
            if (isPrereqLink) {
              path.classList.add("st-link-prereq");
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

        visibleModules.forEach((mod) => {
          const isPrereq = prereqSet.has(mod.id);
          const cat = (rawData.categories && rawData.categories[mod.category]) || {
            name: mod.category || "General",
            color: "#475569",
            bg: "#f8fafc",
            border: "#cbd5e1"
          };

          const nodeEl = document.createElement("a");
          nodeEl.className = "st-node";
          if (isPrereq) {
            nodeEl.classList.add("st-node-prereq");
          }

          nodeEl.href = mod.url || "#";
          nodeEl.setAttribute("data-id", mod.id);
          nodeEl.style.left = mod.x + "px";
          nodeEl.style.top = mod.y + "px";

          if (isPrereq) {
            nodeEl.style.backgroundColor = "#f8fafc";
            nodeEl.style.borderColor = "#94a3b8";
          } else {
            nodeEl.style.backgroundColor = cat.bg;
            nodeEl.style.borderColor = cat.border;
          }

          // 2-line title support with fixed height and prereq corner indicator
          nodeEl.innerHTML = `
            <div class="st-title" title="${mod.title}">${mod.title}</div>
            ${isPrereq ? '<span class="st-prereq-badge" title="Prerequisite assumed from prior courses">Prereq</span>' : ""}
          `;

          nodeEl.addEventListener("mouseenter", (e) => {
            highlightAncestors(mod.id);
            showPopover(mod, isPrereq, e.currentTarget, popover, rawData, courses);
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

      // Highlight ancestor path leading up to activeId
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

        allLinks.forEach((link) => {
          const p = link.getAttribute("data-parent");
          const c = link.getAttribute("data-child");

          const isDirectIncoming = c === activeId && ancestors.has(p);
          const isUpstreamChain = ancestors.has(p) && ancestors.has(c);

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

      function showPopover(mod, isPrereq, targetEl, popoverEl, rawData, coursesMap) {
        const parentTitles = (mod.parents || [])
          .map((pid) => {
            const p = moduleMap.get(pid);
            return p ? `${p.number} ${p.title}` : pid;
          })
          .filter(Boolean);

        const cat = (rawData.categories && rawData.categories[mod.category]) || {
          name: mod.category || "General",
          color: "#475569"
        };

        const courseNames = (mod.courses || [])
          .map((cId) => (coursesMap[cId] ? coursesMap[cId].name : cId))
          .filter(Boolean);

        let statusBadge = "";
        if (isPrereq) {
          statusBadge = `
            <div class="st-popover-prereq-alert">
              ⚠️ <strong>Prerequisite Module:</strong> Assumed prior knowledge; not taught directly in selected course(s).
            </div>
          `;
        }

        let coursesHtml = "";
        if (courseNames.length > 0) {
          coursesHtml = `
            <div class="st-popover-courses">
              <strong>Covered in:</strong> ${courseNames.join(", ")}
            </div>
          `;
        }

        popoverEl.innerHTML = `
          <div class="st-popover-header">
            <span class="st-popover-badge" style="background:${cat.color}">${mod.number}</span>
            <span class="st-popover-title">${mod.title}</span>
          </div>
          <div class="st-popover-category" style="color:${cat.color}">
            ${cat.name}
          </div>
          ${statusBadge}
          <div class="st-popover-summary">
            ${mod.summary || "No description available."}
          </div>
          ${coursesHtml}
          ${
            parentTitles.length > 0
              ? `<div class="st-popover-rel"><strong>Prerequisites:</strong> ${parentTitles.join(", ")}</div>`
              : `<div class="st-popover-rel"><strong>Prerequisites:</strong> None (Starting module)</div>`
          }
        `;

        popoverEl.style.display = "block";

        // Position relative to rootEl to avoid ever overflowing st-board-container
        const nodeRect = targetEl.getBoundingClientRect();
        const rootRect = rootEl.getBoundingClientRect();
        const POPOVER_WIDTH = 220;

        // Try placing to the right of node
        let left = nodeRect.right - rootRect.left + 8;
        let top = nodeRect.top - rootRect.top - 4;

        // If overflowing right side of window or rootEl, flip to the left
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        if (nodeRect.right + POPOVER_WIDTH + 16 > windowWidth || left + POPOVER_WIDTH > rootRect.width) {
          left = nodeRect.left - rootRect.left - POPOVER_WIDTH - 8;
        }

        // Clamp horizontally within rootEl
        left = Math.max(6, Math.min(left, rootRect.width - POPOVER_WIDTH - 6));

        // Clamp vertically within rootEl / viewport
        const popoverHeight = popoverEl.offsetHeight || 180;
        if (top + popoverHeight > rootRect.height) {
          top = Math.max(6, rootRect.height - popoverHeight - 6);
        }
        top = Math.max(6, top);

        popoverEl.style.left = `${Math.round(left)}px`;
        popoverEl.style.top = `${Math.round(top)}px`;
      }

      function hidePopover(popoverEl) {
        popoverEl.style.display = "none";
      }

      // Initial render with All courses
      updateControlsUI();
      renderTree();

      console.log("[SkillTree] Rendered successfully.");
    } catch (err) {
      console.error("[SkillTree] Error during initialization:", err);
    }
  }

  // Export to window
  window.initSkillTree = initSkillTree;
})();
