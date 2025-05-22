import React from 'react';

const BookSelector = ({ books, selectedBookId, setSelectedBookId, darkMode }) => (
  <div className={`mb-3 ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}>
    <label htmlFor="bookSelect" className="form-label">Select Book</label>
    <select
      className={`form-select ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}
      id="bookSelect"
      value={selectedBookId || ''}
      onChange={(e) => setSelectedBookId(e.target.value)}
    >
      <option value="" disabled>-- None --</option>
      {books.map(book => (
        <option key={book.id} value={book.id}>{book.title}</option>
      ))}
    </select>
  </div>
);

export default BookSelector;
