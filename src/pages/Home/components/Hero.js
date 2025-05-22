import React, { useState } from 'react';
import '../homePage.scss';
import { CreateBookModal } from '../../../components/CreateBookModal';

export const Hero = () => {
  const [showCreateBook, setShowCreateBook] = useState(false);

  return (
    <>
      <div className="text-center py-5 bg-light">
        <h1 className="fw-bold display-5">Seek your book</h1>
        <p className="text-muted fs-5 mb-4">
          Find, organize, and start working on your next book project.
        </p>
        <button
          className="btn btn-primary btn-lg px-4"
          onClick={() => setShowCreateBook(true)}
        >
          Create a Book
        </button>
      </div>

      {showCreateBook && (
        <CreateBookModal
          onClose={() => setShowCreateBook(false)}
        />
      )}
    </>
  );
};
