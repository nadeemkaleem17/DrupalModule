import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirstPageOfBook, getPagesByBookId, deleteBook } from '../../data';
import { PageList } from '../../components';
import BookHeader from './BookHeader';
import BookActions from './BookActions';
import BookMetadata from './BookMetadata';
import FirstPageLink from './FirstPageLink';
import AddChildLink from '../PageDetailsDisplay/AddChildLink';
import "../../pages/Home/homePage.scss";

const BookDetailsDisplay = ({ book, expandedItems, setExpandedItems, onSelectPage, onBookDeleted }) => {
  const pages = getPagesByBookId(book.id);
  const firstPage = getFirstPageOfBook(book.id);
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/books/edit/${book.id}`);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book and all its pages?")) {
      await deleteBook(book.id);
      alert("Book deleted successfully!");
      onBookDeleted();
    }
  };
  console.log("getPagesByBookId(bookId): ", getPagesByBookId(book.id));

  return (
    <div className="container p-4 custom-bg-gray-200">
      <BookHeader title={book.title} />
      <BookActions onEdit={handleEdit} onDelete={handleDelete} />
      <BookMetadata description={book.description} />
      <PageList
        parentId={null}
        bookId={book.id}
        expandedItems={expandedItems}
        setExpandedItems={setExpandedItems}
        pages={pages}
        onSelectPage={onSelectPage}
      />
      <FirstPageLink firstPage={firstPage} onSelectPage={onSelectPage} />
      <AddChildLink />
    </div>
  );
};

export default BookDetailsDisplay;
