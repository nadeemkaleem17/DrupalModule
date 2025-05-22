import { fetchPageDocumentId, collectDescendantPageIds } from "../helpers/apiHelpers";

const _addPage = async (page) => {
  try {
    const response = await fetch("http://localhost:1337/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          title: page.title,
          weight: page.weight,
          bookId: page.bookId,
          book_uid: page.bookId,
          description: page.description,
          parent: page.parentId || null,
          parent_uid: page.parentId || null,
        },
      }),
    });
    const data = await response.json();
    console.log("Page added to backend:", data);
    return data.data;
  } catch (error) {
    console.error("Error adding page to backend:", error);
  }
};

const _updatePage = async (id, data) => {
  const documentId = await fetchPageDocumentId(id);
  const res = await fetch(`http://localhost:1337/api/pages/${documentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title: data.title,
        weight: data.weight,
        bookId: data.bookId,
        book_uid: data.bookId,
        description: data.description,
        parent: data.parentId || null,
        parent_uid: data.parentId || null,
      },
    }),
  });
  const _data = await res.json();
  return _data.data;
};

const _getPages = async (token, userId) => {
  try {
    const response = await fetch("http://localhost:1337/api/pages");

    if (!response.ok) {
      console.error("Failed to fetch pages from backend.");
      return [];
    }

    const data = await response.json();
    return data.data.map((page) => ({
      id: page.id,
      title: page.title,
      description: page.description || "",
      parentId: page.parent_uid,
      bookId: page.book_uid,
      weight: page.weight,
    }));
  } catch (error) {
    console.error("Error fetching pages from backend:", error);
    return [];
  }
};

const _deletePage = async (pageId) => {
  try {
    const allPages = await _getPages();
    const descendantIds = collectDescendantPageIds(pageId, allPages);

    for (const childId of descendantIds.reverse()) {
      const docId = await fetchPageDocumentId(childId);
      const res = await fetch(`http://localhost:1337/api/pages/${docId}`, {
        method: "DELETE" });

      if (res.ok) {
        console.log(`Deleted child page ${childId}`);
      } else {
        console.error(`Failed to delete child page ${childId}`);
      }
    }

    const rootDocId = await fetchPageDocumentId(pageId);
    const rootRes = await fetch(`http://localhost:1337/api/pages/${rootDocId}`, {
      method: "DELETE" });

    if (rootRes.ok) {
      console.log(`Deleted main page ${pageId}`);
    } else {
      console.error(`Failed to delete main page ${pageId}`);
    }
  } catch (error) {
    console.error("Error during recursive page deletion:", error);
  }
};

export { _addPage, _updatePage, _getPages, _deletePage };
