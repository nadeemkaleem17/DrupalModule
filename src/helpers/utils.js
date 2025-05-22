const toggleItem = (itemId, expandedItems, setExpandedItems, pages) => {
    const newExpandedItems = new Set(expandedItems);
  
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
  
      // Recursively collapse all children of this item
      const collapseChildren = (parentId) => {
        pages.filter(page => page.parentId === parentId).forEach(childPage => {
          const childId = `page-${childPage.id}`;
          newExpandedItems.delete(childId);
          collapseChildren(childPage.id);  // Recursively collapse nested children
        });
      };
  
      if (itemId.startsWith('page-')) {
        const pageId = parseInt(itemId.split('-')[1]);
        collapseChildren(pageId);
      }
    } else {
      newExpandedItems.add(itemId);
    }
  
    setExpandedItems(newExpandedItems);
};


const generateWeightOptions = () => {
  return Array.from({ length: 100 }, (_, i) => (
    <option key={i} value={i}>{i}</option>
  ));
};


export {toggleItem, generateWeightOptions};
