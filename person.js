const archiveData = window.archiveData;
const params = new URLSearchParams(window.location.search);
const personId = params.get("id");
const person = archiveData.nodes.find((node) => node.id === personId) || archiveData.nodes[0];
const nodeById = new Map(archiveData.nodes.map((node) => [node.id, node]));

document.title = `${person.name} | Familjearkivet Lindoff`;
document.querySelector("#person-side").textContent = person.side;
document.querySelector("#person-name").textContent = person.name;
document.querySelector("#person-meta").textContent = `${person.role} • ${person.meta}`;
document.querySelector("#person-presentation").textContent = person.presentation || person.description;
document.querySelector("#person-description").textContent = person.description;

const documentContainer = document.querySelector("#person-documents");
documentContainer.replaceChildren(...(person.documents || []).map(createDocumentCard));

const galleryContainer = document.querySelector("#person-gallery");
galleryContainer.replaceChildren(...(person.images || []).map(createGalleryImage));

const familyContainer = document.querySelector("#person-family");
familyContainer.replaceChildren(...(person.family || []).map(createFamilySection).filter(Boolean));

const storyContainer = document.querySelector("#person-story");
storyContainer.replaceChildren(...buildStorySections(person).map(createStoryCard));

const portraitPlaceholder = document.querySelector("#portrait-placeholder");

if (person.portrait) {
  const image = document.createElement("img");
  image.className = "portrait-image";
  image.src = toFileUrl(person.portrait);
  image.alt = person.name;
  portraitPlaceholder.replaceChildren(image);
}

function createDocumentCard(documentItem) {
  const article = document.createElement("article");
  article.className = "document-card";
  article.innerHTML = `
    <h3>${escapeHtml(documentItem.title)}</h3>
    <p>${escapeHtml(documentItem.note || "")}</p>
    <p class="source-path">${escapeHtml(documentItem.path)}</p>
  `;
  return article;
}

function createGalleryImage(path) {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";
  const image = document.createElement("img");
  image.src = toFileUrl(path);
  image.alt = person.name;
  image.className = "gallery-image";
  const caption = document.createElement("figcaption");
  caption.textContent = path.split("\\").at(-1);
  figure.append(image, caption);
  return figure;
}

function createFamilySection(group) {
  const relatives = (group.ids || [])
    .map((id) => nodeById.get(id))
    .filter(Boolean);

  if (!relatives.length) {
    return null;
  }

  const section = document.createElement("section");
  section.className = "family-section";

  const heading = document.createElement("h3");
  heading.textContent = group.label;

  const list = document.createElement("div");
  list.className = "family-link-list";

  relatives.forEach((relative) => {
    const link = document.createElement("a");
    link.className = "family-link-card";
    link.href = `person.html?id=${encodeURIComponent(relative.id)}`;
    link.innerHTML = `
      <span class="family-link-role">${escapeHtml(relative.role)}</span>
      <strong>${escapeHtml(relative.name)}</strong>
      <span class="family-link-meta">${escapeHtml(relative.meta || "")}</span>
    `;
    list.append(link);
  });

  section.append(heading, list);
  return section;
}

function buildStorySections(node) {
  if (Array.isArray(node.storySections) && node.storySections.length) {
    return node.storySections;
  }

  const sections = [];

  sections.push({
    title: "Översikt",
    text: node.presentation || node.description || "Profilen är under uppbyggnad."
  });

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

function createStoryCard(section) {
  const article = document.createElement("article");
  article.className = "story-card";
  article.innerHTML = `
    <p class="story-label">${escapeHtml(section.title)}</p>
    <p class="person-body">${escapeHtml(section.text)}</p>
  `;
  return article;
}

function describeFamily(node) {
  const groups = (node.family || [])
    .map((group) => {
      const names = (group.ids || [])
        .map((id) => nodeById.get(id))
        .filter(Boolean)
        .map((relative) => relative.name);

      if (!names.length) {
        return "";
      }

      return `${group.label}: ${names.join(", ")}.`;
    })
    .filter(Boolean);

  return groups.join(" ");
}

function describeArchive(node) {
  const parts = [];

  if (node.documents?.length) {
    const titles = node.documents
      .slice(0, 3)
      .map((item) => item.title);
    parts.push(`I arkivet finns bland annat ${titles.join(", ")}.`);
  }

  if (node.images?.length) {
    parts.push(`Det finns ${node.images.length} bild${node.images.length === 1 ? "" : "er"} kopplade till profilen.`);
  }

  return parts.join(" ");
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
