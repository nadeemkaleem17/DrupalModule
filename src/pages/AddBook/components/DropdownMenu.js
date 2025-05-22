import React, { forwardRef } from 'react';
import { useAddBook } from '../../../context/EditBookContext';

const DropdownMenu = forwardRef(({ open, setOpen, onAddChapter, onAddSection }, ref) => {
  const { selectedChapterId } = useAddBook();

  return (
    <div ref={ref}>
      <button
        className="d-flex align-items-center gap-2 bg-secondary text-white rounded-pill border-0"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>Add</span>
        <span
          className="d-inline-flex justify-content-center align-items-center text-white rounded-circle"
          style={{
            backgroundColor: '#00BFFF',
            width: '24px',
            height: '24px',
            fontSize: '16px'
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div
          className="bg-dark text-light rounded shadow"
          style={{
            position: 'fixed',
            left: '220px',
            zIndex: 100,
            minWidth: '160px',
            padding: '0.5rem 0',
          }}
        >
          <div
            className="px-3 py-2"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
              onAddChapter();
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Add Chapter
          </div>

          <div
            className="px-3 py-2"
            style={{
              cursor: selectedChapterId ? 'pointer' : 'not-allowed',
              opacity: selectedChapterId ? 1 : 0.5,
            }}
            onClick={() => {
              if (!selectedChapterId) return;
              setOpen(false);
              onAddSection(selectedChapterId); // Pass selectedChapterId
            }}
            onMouseEnter={(e) => {
              if (selectedChapterId) e.currentTarget.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              if (selectedChapterId) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Add Section
          </div>
        </div>
      )}
    </div>
  );
});

export default DropdownMenu;
