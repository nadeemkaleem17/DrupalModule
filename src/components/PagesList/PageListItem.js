import React from 'react';
import { toggleItem } from '../../helpers';
import { PageList } from './PagesList';

const PageListItem = ({
  page,
  bookId,
  expandedItems,
  setExpandedItems,
  pages,
  onSelectPage,
  level
}) => {
  const pageKey = `page-${page.id}`;
  const isExpanded = expandedItems.has(pageKey);

  const handleClick = () => {
    toggleItem(pageKey, expandedItems, setExpandedItems, pages);
    onSelectPage(page);
  };

  return (
    <li style={{ cursor: 'pointer' }}>
      <div className="fs-6 d-flex align-items-center gap-1" onClick={handleClick}>
        <span>{isExpanded ? '▼' : '▶'}</span>
        <span>{page.title}</span>
      </div>
      {isExpanded && (
        <PageList
          parentId={page.id}
          bookId={bookId}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          pages={pages}
          onSelectPage={onSelectPage}
          level={level + 1}
        />
      )}
    </li>
  );
};

export default PageListItem;
