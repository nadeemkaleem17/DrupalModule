import React, { useContext, useState } from 'react';
import { addBook, getBooks } from '../data';
import AuthContext from '../context/AuthContext';

export const CreateBookModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');

 
  // Mock API call - replace with your real backend function
  async function saveBook(book) {
    // Example: use fetch or axios here to POST to backend
    return new Promise((resolve) => setTimeout(() => resolve(book), 1000));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Book name is required');
      return;
    }
      if (!token || !user) {
        setError('You must be logged in to create a book.');
        return;
      }
    const books = await getBooks(token, user.id);
    const booksLength = books.length;
    const data = {title: title, description: description, weight: booksLength + 1, userId: user.id}
    setLoading(true);
    try {
      await addBook(data, token);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Failed to save book. Please try again.');
    }
  };

  return (
    <div
      className="modal-backdrop d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1050,
      }}
      onClick={onClose} // close modal on backdrop click
    >
      <div
        className="card p-4"
        style={{ width: '400px', maxWidth: '90%' }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside card
      >
        <h4 className="mb-3">Create New Book</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bookTitle" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              id="bookTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              autoFocus
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bookDescription" className="form-label">
              Description
            </label>
            <textarea
              id="bookDescription"
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-1 mb-3" role="alert">
              {error}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
