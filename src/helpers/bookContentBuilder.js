import { addPage, getChildPages, updatePage } from "../data";

// Convert structured content to HTML
function buildBookContentHTML(chapters, sectionsMap) {
  let content = '';

  chapters.forEach((chapter, chapterIndex) => {
    const chapterNumber = chapterIndex + 1;

    // Chapter Title — no numbering
   content += `
      <div style="margin: 3rem 0;">
        <div style="font-size: 2rem; font-weight: bold;">
          <h1 style="margin: 0; font-size: 2rem;">${escapeHTML(chapter.title)}</h1>
        </div>
        <p style="margin-top: 1rem;">${escapeHTML(chapter.description)}</p>
      </div>
    `;

    // Section Titles with smaller font size
    const sections = sectionsMap[chapter.id] || [];
    sections.forEach((section, sectionIndex) => {
      const sectionNumber = `${chapterNumber}.${sectionIndex + 1}`;
     content += `
      <div style="margin-top: 1rem;">
        <h2 style="font-size: 0.9rem; font-weight: 600; margin: 0;">
          ${sectionNumber} ${escapeHTML(section.title)}
        </h2>
        <p style="margin-top: 0.25rem;">${escapeHTML(section.description)}</p>
      </div>
    `;

    });
  });

  return content;
}








// Escaping HTML content
function escapeHTML(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Parse HTML string to structured chapter/section objects
function parseHTMLContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const nodes = Array.from(doc.body.childNodes);
  const chapters = [];

  let currentChapter = null;
  let currentSection = null;

  for (const node of nodes) {
    if (node.tagName === 'H1') {
      if (currentChapter) chapters.push(currentChapter);

      currentChapter = {
        title: node.textContent.trim(),
        description: '',
        sections: []
      };
      currentSection = null;
    } else if (node.tagName === 'H2') {
      if (!currentChapter) continue;

      currentSection = {
        title: node.textContent.trim(),
        description: ''
      };
      currentChapter.sections.push(currentSection);
    } else if (node.tagName === 'P') {
      const text = node.textContent.trim();
      if (currentSection) {
        currentSection.description += (currentSection.description ? ' ' : '') + text;
      } else if (currentChapter) {
        currentChapter.description += (currentChapter.description ? ' ' : '') + text;
      }
    }
  }

  if (currentChapter) chapters.push(currentChapter);
  return chapters;
}

// Main entry point
const processChapters = async ({ parsedChapters, existingChapters, existingSections, bookId }) => {
  for (const parsed of parsedChapters) {
    const existing = existingChapters.find(ch => ch.title === parsed.title);

    if (existing) {
      const oldChapterId = existing.id;
      const updatedChapter = await updateChapterIfNeeded(existing, parsed, bookId);

      const newChapterId = updatedChapter.id;
      const parsedSections = parsed.sections;

      const currentSections = getChildPages(oldChapterId);

      await processSections({
        chapterId: newChapterId,
        parsedSections,
        existingSections: currentSections,
        bookId
      });

    } else {

      const newChapter = await addPage({
        title: parsed.title,
        description: parsed.description,
        bookId,
        parentId: null,
        weight: 0
      });

      for (const section of parsed.sections) {
        console.log("section:", section);
        await addPage({
          title: section.title,
          description: section.description,
          bookId,
          parentId: newChapter.id,
          weight: 0
        });
      }
    }
  }
};

const updateChapterIfNeeded = async (original, parsed, bookId) => {
  if (original.title !== parsed.title || original.description !== parsed.description) {
    const updated = await updatePage(original.id, {
      title: parsed.title,
      description: parsed.description,
      bookId,
      parentId: null,
      weight: original.weight,
    });
    return updated;
  }
  return original;
};

const processSections = async ({ chapterId, parsedSections, existingSections, bookId }) => {
  for (const parsed of parsedSections) {
    const existing = existingSections.find(sec => sec.title === parsed.title);

    if (existing) {
        await updatePage(existing.id, {
          title: parsed.title,
          description: parsed.description,
          bookId,
          parentId: chapterId,
          weight: existing.weight
        });
      }
    }
};

export {
  buildBookContentHTML,
  parseHTMLContent,
  processChapters,
  processSections,
  updateChapterIfNeeded
};
