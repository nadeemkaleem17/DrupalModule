import React from 'react';
import PageListItem from './PageListItem';

const PageList = ({
  parentId,
  bookId,
  expandedItems,
  setExpandedItems,
  pages,
  onSelectPage,
  level = 0
}) => {
  const childPages = pages.filter(p => p.parentId === parentId && p.bookId === bookId);

  if (childPages.length === 0) return null;

  return (
    <ul className="m-0 p-0" style={{ paddingLeft: `${level * 20}px`, listStyle: 'none' }}>
      {childPages.map(page => (
        <PageListItem
          key={page.id}
          page={page}
          bookId={bookId}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          pages={pages}
          onSelectPage={onSelectPage}
          level={level}
        />
      ))}
    </ul>
  );
};

export { PageList };
