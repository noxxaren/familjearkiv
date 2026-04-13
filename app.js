const archiveData = window.archiveData;
const nodes = archiveData.nodes;
const nodesById = new Map(nodes.map((node) => [node.id, node]));

const state = {
  selectedNodeId: "karin",
  searchQuery: "",
  scale: 1,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0
};

const refs = {
  treeCount: document.querySelector("#tree-count"),
  storyCount: document.querySelector("#story-count"),
  searchInput: document.querySelector("#tree-search"),
  searchResults: document.querySelector("#search-results"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomOut: document.querySelector("#zoom-out"),
  centerSelected: document.querySelector("#center-selected"),
  resetView: document.querySelector("#reset-view"),
  viewport: document.querySelector("#tree-viewport"),
  canvas: document.querySelector("#tree-canvas"),
  treeLines: document.querySelector("#tree-lines"),
  rootSlot: document.querySelector("#root-node-slot"),
  parentSlot: document.querySelector("#parent-node-slot"),
  janSlot: document.querySelector("#jan-branch-slot"),
  karinSlot: document.querySelector("#karin-branch-slot"),
  detailName: document.querySelector("#detail-name"),
  detailPageLink: document.querySelector("#detail-page-link"),
  detailLineage: document.querySelector("#detail-lineage"),
  detailPortrait: document.querySelector("#detail-portrait"),
  detailSide: document.querySelector("#detail-side"),
  detailTitle: document.querySelector("#detail-title"),
  detailMeta: document.querySelector("#detail-meta"),
  detailPresentation: document.querySelector("#detail-presentation"),
  detailFacts: document.querySelector("#detail-facts"),
  detailStory: document.querySelector("#detail-story"),
  detailFamily: document.querySelector("#detail-family"),
  detailGallery: document.querySelector("#detail-gallery"),
  detailDocuments: document.querySelector("#detail-documents")
};

initialize();

function initialize() {
  refs.treeCount.textContent = String(nodes.length);
  refs.storyCount.textContent = String(nodes.filter(hasStory).length);

  renderTree();
  renderInspector();
  bindEvents();
  applyTransform();

  requestAnimationFrame(() => {
    drawTreeLines();
    centerSelectedNode();
  });

  window.addEventListener("resize", drawTreeLines);
}

function bindEvents() {
  refs.searchInput.addEventListener("input", handleSearchInput);
  refs.searchInput.addEventListener("focus", renderSearchResults);

  document.addEventListener("click", (event) => {
    if (!refs.searchResults.contains(event.target) && event.target !== refs.searchInput) {
      refs.searchResults.hidden = true;
    }
  });

  refs.zoomIn.addEventListener("click", () => changeScale(0.12));
  refs.zoomOut.addEventListener("click", () => changeScale(-0.12));
  refs.centerSelected.addEventListener("click", centerSelectedNode);
  refs.resetView.addEventListener("click", resetView);

  refs.viewport.addEventListener("mousedown", handleDragStart);
  window.addEventListener("mousemove", handleDragMove);
  window.addEventListener("mouseup", handleDragEnd);
}

function renderTree() {
  refs.rootSlot.replaceChildren(createTreeCard(findNodeById("du"), "root"));
  refs.parentSlot.replaceChildren(...["jan", "karin"].map((id) => createTreeCard(findNodeById(id), "parent")));
  refs.janSlot.replaceChildren(...getBranchNodes("jan").map((node) => createTreeCard(node, "branch")));
  refs.karinSlot.replaceChildren(...getBranchNodes("karin").map((node) => createTreeCard(node, "branch")));
  updateSelectedState();
}

function renderInspector() {
  const node = findNodeById(state.selectedNodeId);
  const storySections = getStorySections(node);
  const galleryImages = node.images?.length ? node.images : node.portrait ? [node.portrait] : [];

  document.title = `${node.name} | Familjearkivet Lindoff`;
  refs.detailName.textContent = node.name;
  refs.detailPageLink.href = `person.html?id=${encodeURIComponent(node.id)}`;
  refs.detailSide.textContent = node.side;
  refs.detailTitle.textContent = node.name;
  refs.detailMeta.textContent = `${node.role} • ${node.meta}`;
  refs.detailPresentation.textContent = node.presentation || node.description;

  renderLineage(node);
  renderPortrait(node);
  renderFacts(node);
  refs.detailStory.replaceChildren(...storySections.map(createStoryCard));
  refs.detailFamily.replaceChildren(...(node.family || []).map(createRelationGroup).filter(Boolean));
  refs.detailGallery.replaceChildren(...galleryImages.slice(0, 4).map((path) => createMiniGalleryItem(node, path)));
  refs.detailDocuments.replaceChildren(...(node.documents || []).slice(0, 5).map(createDocumentCard));
}

function renderLineage(node) {
  const path = buildLineage(node).map((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lineage-link${item.id === node.id ? " current" : ""}`;
    button.textContent = item.name;
    button.addEventListener("click", () => selectNode(item.id, { shouldCenter: true }));
    return button;
  });

  refs.detailLineage.replaceChildren(...path);
}

function renderPortrait(node) {
  refs.detailPortrait.replaceChildren();

  if (node.portrait) {
    const image = document.createElement("img");
    image.className = "detail-portrait-image";
    image.src = toFileUrl(node.portrait);
    image.alt = node.name;
    refs.detailPortrait.append(image);
    return;
  }

  const fallback = document.createElement("div");
  fallback.className = "portrait-fallback";
  fallback.textContent = getInitials(node.name);
  refs.detailPortrait.append(fallback);
}

function renderFacts(node) {
  const facts = [
    node.role,
    node.side,
    node.meta,
    hasStory(node) ? "Har berättelse" : "Profil under uppbyggnad",
    node.documents?.length ? `${node.documents.length} arkivspår` : "",
    node.images?.length ? `${node.images.length} bilder` : node.portrait ? "1 porträtt" : ""
  ].filter(Boolean);

  refs.detailFacts.replaceChildren(...facts.map((fact) => {
    const span = document.createElement("span");
    span.className = "fact-chip";
    span.textContent = fact;
    return span;
  }));
}

function createTreeCard(node, variant) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = [
    "tree-card",
    `tree-card-${variant}`,
    node.side === "Jans sida" ? "is-jan" : node.side === "Karins sida" ? "is-karin" : "is-root"
  ].join(" ");
  button.dataset.nodeId = node.id;
  button.addEventListener("click", () => selectNode(node.id, { shouldCenter: false }));

  const portrait = document.createElement("div");
  portrait.className = "tree-card-portrait";

  if (node.portrait) {
    const image = document.createElement("img");
    image.src = toFileUrl(node.portrait);
    image.alt = node.name;
    portrait.append(image);
  } else {
    portrait.textContent = getInitials(node.name);
  }

  const content = document.createElement("div");
  content.className = "tree-card-copy";
  content.innerHTML = `
    <div class="tree-card-topline">
      <span class="tree-card-role">${escapeHtml(node.role)}</span>
      ${hasStory(node) ? '<span class="story-badge">Berättelse</span>' : ""}
    </div>
    <strong>${escapeHtml(node.name)}</strong>
    <p>${escapeHtml(node.meta)}</p>
  `;

  button.append(portrait, content);
  return button;
}

function createStoryCard(section) {
  const article = document.createElement("article");
  article.className = "story-card";
  article.innerHTML = `
    <p class="story-card-label">${escapeHtml(section.title)}</p>
    <p class="story-card-text">${escapeHtml(section.text)}</p>
  `;
  return article;
}

function createRelationGroup(group) {
  const relatedNodes = (group.ids || []).map((id) => findNodeById(id)).filter(Boolean);

  if (!relatedNodes.length) {
    return null;
  }

  const article = document.createElement("article");
  article.className = "relation-group";

  const heading = document.createElement("h4");
  heading.textContent = group.label;

  const grid = document.createElement("div");
  grid.className = "relation-grid";

  relatedNodes.forEach((node) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "relation-card";
    button.innerHTML = `
      <span class="relation-role">${escapeHtml(node.role)}</span>
      <strong>${escapeHtml(node.name)}</strong>
      <span class="relation-meta">${escapeHtml(node.meta)}</span>
    `;
    button.addEventListener("click", () => selectNode(node.id, { shouldCenter: true }));
    grid.append(button);
  });

  article.append(heading, grid);
  return article;
}

function createMiniGalleryItem(node, path) {
  const figure = document.createElement("figure");
  figure.className = "mini-gallery-item";

  const image = document.createElement("img");
  image.src = toFileUrl(path);
  image.alt = node.name;
  image.className = "mini-gallery-image";

  const caption = document.createElement("figcaption");
  caption.textContent = path.split("\\").at(-1);

  figure.append(image, caption);
  return figure;
}

function createDocumentCard(item) {
  const article = document.createElement("article");
  article.className = "document-card";
  article.innerHTML = `
    <h4>${escapeHtml(item.title)}</h4>
    <p>${escapeHtml(item.note || "")}</p>
    <p class="document-path">${escapeHtml(item.path)}</p>
  `;
  return article;
}

function handleSearchInput(event) {
  state.searchQuery = event.target.value.trim();
  renderSearchResults();
}

function renderSearchResults() {
  const query = state.searchQuery.toLowerCase();

  if (!query) {
    refs.searchResults.hidden = true;
    refs.searchResults.replaceChildren();
    return;
  }

  const matches = nodes
    .filter((node) => {
      const haystack = [node.name, node.role, node.meta, node.side].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .sort(bySortOrderThenName)
    .slice(0, 8);

  refs.searchResults.replaceChildren(...matches.map((node) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";
    button.innerHTML = `
      <strong>${escapeHtml(node.name)}</strong>
      <span>${escapeHtml(node.role)} • ${escapeHtml(node.meta)}</span>
    `;
    button.addEventListener("click", () => {
      refs.searchInput.value = node.name;
      state.searchQuery = node.name;
      refs.searchResults.hidden = true;
      selectNode(node.id, { shouldCenter: true });
    });
    return button;
  }));

  refs.searchResults.hidden = matches.length === 0;
}

function selectNode(nodeId, options = {}) {
  const { shouldCenter = true } = options;

  state.selectedNodeId = nodeId;
  updateSelectedState();
  renderInspector();

  if (shouldCenter) {
    requestAnimationFrame(centerSelectedNode);
  }
}

function updateSelectedState() {
  document.querySelectorAll(".tree-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.nodeId === state.selectedNodeId);
  });

  drawTreeLines();
}

function drawTreeLines() {
  const canvasRect = refs.canvas.getBoundingClientRect();

  const pathMarkup = archiveData.links.map(([fromId, toId]) => {
    const from = document.querySelector(`.tree-card[data-node-id="${fromId}"]`);
    const to = document.querySelector(`.tree-card[data-node-id="${toId}"]`);

    if (!from || !to) {
      return "";
    }

    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    const startX = fromRect.left - canvasRect.left + fromRect.width / 2;
    const startY = fromRect.top - canvasRect.top + fromRect.height / 2;
    const endX = toRect.left - canvasRect.left + toRect.width / 2;
    const endY = toRect.top - canvasRect.top + toRect.height / 2;
    const midY = (startY + endY) / 2;
    const isActive = isActiveLink(fromId, toId);
    const stroke = getLineStroke(toId, isActive);

    return `<path class="${isActive ? "active" : ""}" style="stroke:${stroke}" d="M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}" />`;
  }).filter(Boolean);

  refs.treeLines.setAttribute("viewBox", `0 0 ${refs.canvas.scrollWidth} ${refs.canvas.scrollHeight}`);
  refs.treeLines.setAttribute("width", String(refs.canvas.scrollWidth));
  refs.treeLines.setAttribute("height", String(refs.canvas.scrollHeight));
  refs.treeLines.innerHTML = pathMarkup.join("");
}

function getLineStroke(nodeId, isActive) {
  if (isActive) {
    return "rgba(111, 47, 27, 0.72)";
  }

  if (nodeId.startsWith("jan")) {
    return "var(--line-jan)";
  }

  if (nodeId.startsWith("karin")) {
    return "var(--line-karin)";
  }

  return "var(--line-root)";
}

function isActiveLink(fromId, toId) {
  const activePathIds = buildLineage(findNodeById(state.selectedNodeId)).map((node) => node.id);
  return activePathIds.includes(fromId) && activePathIds.includes(toId);
}

function getBranchNodes(parentId) {
  return nodes
    .filter((node) => node.parentId === parentId)
    .sort(bySortOrderThenName);
}

function getStorySections(node) {
  if (Array.isArray(node.storySections) && node.storySections.length) {
    return node.storySections;
  }

  const sections = [
    {
      title: "Översikt",
      text: node.presentation || node.description || "Profilen är under uppbyggnad."
    }
  ];

  if (node.description && node.description !== node.presentation) {
    sections.push({
      title: "Livshistoria",
      text: node.description
    });
  }

  const familyText = describeFamily(node);
  if (familyText) {
    sections.push({
      title: "Familj",
      text: familyText
    });
  }

  const archiveText = describeArchive(node);
  if (archiveText) {
    sections.push({
      title: "Arkivspår",
      text: archiveText
    });
  }

  return sections;
}

function describeFamily(node) {
  const text = (node.family || [])
    .map((group) => {
      const names = (group.ids || [])
        .map((id) => findNodeById(id))
        .filter(Boolean)
        .map((relative) => relative.name);

      return names.length ? `${group.label}: ${names.join(", ")}.` : "";
    })
    .filter(Boolean)
    .join(" ");

  return text;
}

function describeArchive(node) {
  const parts = [];

  if (node.documents?.length) {
    parts.push(`I arkivet finns ${node.documents.length} dokument eller mappar kopplade till personen.`);
  }

  if (node.images?.length || node.portrait) {
    const count = node.images?.length || (node.portrait ? 1 : 0);
    parts.push(`Profilen har ${count} bild${count === 1 ? "" : "er"} att visa.`);
  }

  return parts.join(" ");
}

function buildLineage(node) {
  const path = [];
  let current = node;

  while (current) {
    path.unshift(current);
    current = current.parentId ? findNodeById(current.parentId) : null;
  }

  return path;
}

function hasStory(node) {
  return Boolean((node.storySections && node.storySections.length) || (node.description && node.description.length > 120));
}

function findNodeById(nodeId) {
  return nodesById.get(nodeId) || nodes[0];
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function centerSelectedNode() {
  const card = document.querySelector(`.tree-card[data-node-id="${state.selectedNodeId}"]`);

  if (!card) {
    return;
  }

  const viewportRect = refs.viewport.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const deltaX = viewportRect.left + viewportRect.width / 2 - (cardRect.left + cardRect.width / 2);
  const deltaY = viewportRect.top + viewportRect.height / 2 - (cardRect.top + cardRect.height / 2);

  state.panX += deltaX;
  state.panY += deltaY;
  applyTransform();
}

function changeScale(delta) {
  state.scale = clamp(state.scale + delta, 0.7, 1.45);
  applyTransform();
}

function resetView() {
  state.scale = 1;
  state.panX = 0;
  state.panY = 0;
  applyTransform();
  requestAnimationFrame(centerSelectedNode);
}

function applyTransform() {
  refs.canvas.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
}

function handleDragStart(event) {
  if (event.target.closest(".tree-card")) {
    return;
  }

  state.isDragging = true;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  refs.viewport.classList.add("is-dragging");
}

function handleDragMove(event) {
  if (!state.isDragging) {
    return;
  }

  const deltaX = event.clientX - state.dragStartX;
  const deltaY = event.clientY - state.dragStartY;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.panX += deltaX;
  state.panY += deltaY;
  applyTransform();
}

function handleDragEnd() {
  state.isDragging = false;
  refs.viewport.classList.remove("is-dragging");
}

function bySortOrderThenName(a, b) {
  const orderA = a.sortOrder ?? 999;
  const orderB = b.sortOrder ?? 999;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return a.name.localeCompare(b.name, "sv");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toFileUrl(path) {
  return encodeURI(`file:///${path.replaceAll("\\", "/").split(":").join("|")}`.replace("|", ":"));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
