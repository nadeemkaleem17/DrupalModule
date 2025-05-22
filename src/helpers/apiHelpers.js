const fetchBookDocumentId = async (bookId) => {
    try {
      const response = await fetch("http://localhost:1337/api/books");
      if (!response.ok) return null;
  
      const data = await response.json();
      const match = data.data.find(book => book.id === bookId);
      console.log("match.documentId", match.documentId)
      return match ? match.documentId : null;
    } catch (error) {
      console.error("Error fetching book document ID:", error);
      return null;
    }
  };
  
  const fetchPageDocumentId = async (pageId) => {
    try {
      const response = await fetch("http://localhost:1337/api/pages");
      if (!response.ok) return null;
  
      const data = await response.json();
      const match = data.data.find(page => page.id === pageId);
      
      return match ? match.documentId : null;
    } catch (error) {
      console.error("Error fetching page document ID:", error);
      return null;
    }
  };
  
  const collectDescendantPageIds = (parentId, allPages) => {
    const directChildren = allPages.filter(p => p.parentId === parentId);
    return directChildren.flatMap(child => [
      child.id,
      ...collectDescendantPageIds(child.id, allPages),
    ]);
  };
  
  export {
    fetchBookDocumentId,
    fetchPageDocumentId,
    collectDescendantPageIds
  };
  