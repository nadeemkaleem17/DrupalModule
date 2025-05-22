import React, { useState } from 'react';
import { getPagesByBookId } from '../../../data';
import { PageList } from '../../../components';
import "../homePage.scss";

const BookNavigation = ({ books, onSelectBook, onSelectPage, expandedItems, setExpandedItems }) => {
  const [bookPages, setBookPages] = useState({}); // Store book pages in state

  const handleBookClick = (bookId) => {
    onSelectBook(bookId); 

    const bookKey = `book-${bookId}`; // Fix the incorrect space issue
    const newExpandedItems = new Set(expandedItems);

    if (newExpandedItems.has(bookKey)) {
      newExpandedItems.delete(bookKey);
    } else {
      newExpandedItems.clear();  // Collapse all other books
      newExpandedItems.add(bookKey);

      // Fetch pages when expanding a book
      if (!bookPages[bookId]) {
        const pages = getPagesByBookId(bookId);
        setBookPages((prev) => ({ ...prev, [bookId]: pages }));
      }
    }
    
    setExpandedItems(newExpandedItems);
  };

  return (
    <div className="col custom-bg-gray-300 p-4 mb-3">
      <h5>Book Navigation</h5>
      <hr />
      {books.map((book) => {
        const bookKey = `book-${book.id}`; // Fix space issue
        const pages = getPagesByBookId(book.id) || []; // Use state to persist pages

        return (
          <div key={book.id}>
            <div
              onClick={() => handleBookClick(book.id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {expandedItems.has(bookKey) ? "▼" : "▶"} {book.title}
            </div>
            {expandedItems.has(bookKey) && (
              <div style={{ paddingLeft: '20px' }}>
                <PageList 
                  parentId={null} // Show top-level pages only
                  bookId={book.id}
                  expandedItems={expandedItems}
                  setExpandedItems={setExpandedItems}
                  pages={pages} // Pass pages from state
                  onSelectPage={onSelectPage}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookNavigation;
