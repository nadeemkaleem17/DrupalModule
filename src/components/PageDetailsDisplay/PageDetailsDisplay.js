import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getChildPages, getPagesByBookId, getPageById, deletePage } from '../../data';
import { PageList } from '../../components';
import PageHeader from "./PageHeader"
import PageActions from './PageActions';
import PageNavigation from './PageNavigation';
import AddChildLink from './AddChildLink';

const PageDetailsDisplay = ({ page, expandedItems, setExpandedItems, onSelectPage, onPageDeleted }) => {
  const navigate = useNavigate();
  const allPages = getPagesByBookId(page.bookId);
  const childPages = getChildPages(page.id);

  const sortedSiblings = allPages.filter(p => p.parentId === page.parentId).sort((a, b) => a.weight - b.weight);
  const currentIndex = sortedSiblings.findIndex(p => p.id === page.id);
  const previousPage = sortedSiblings[currentIndex - 1] || null;
  const nextPage = sortedSiblings[currentIndex + 1] || null;
  const parentPage = page.parentId ? getPageById(page.parentId) : null;
  const firstPage = allPages.filter(p => p.parentId === null).sort((a, b) => a.weight - b.weight)[0];

  const handleEdit = () => navigate(`/pages/edit/${page.id}`);
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this page and all its children?')) {
      deletePage(page.id);
      alert('Page deleted successfully!');
      onPageDeleted();
    }
  };

  return (
    <div className="container p-4 custom-bg-gray-200">
      <PageHeader title={page.title} />
      <PageActions onEdit={handleEdit} onDelete={handleDelete} />
      <div className="mt-3 mb-5">
        <p className="mb-4">Submitted by username on Thu, 03/23/2025 - 11:02</p>
        <p>{page.description || 'No description available.'}</p>
      </div>
      <PageList
        parentId={page.id}
        bookId={page.bookId}
        expandedItems={expandedItems}
        setExpandedItems={setExpandedItems}
        pages={childPages}
        onSelectPage={onSelectPage}
      />
      <PageNavigation
        previousPage={previousPage}
        nextPage={nextPage}
        parentPage={parentPage}
        firstPage={firstPage}
        onSelectPage={onSelectPage}
      />
      <AddChildLink />
    </div>
  );
};

export { PageDetailsDisplay };
