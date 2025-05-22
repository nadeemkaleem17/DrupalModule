import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListCheck,
  faClock,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faUsers,
  faGear
} from '@fortawesome/free-solid-svg-icons';

import { useAddBook } from '../../../context/EditBookContext';
import { deletePage } from '../../../data';

export const RightSidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  const {
    selectedChapterId,
    bookChapters,
    setBookChapters,
    fetchBookContent,
    setSelectedSectionId
  } = useAddBook();

  const handleDeleteChapter = async () => {
    if (!selectedChapterId) {
      alert("Please select a chapter to delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    await deletePage(selectedChapterId);
    await fetchBookContent();
    setSelectedSectionId(null);
  };

  // New handler to submit sharing
  const handleShareSubmit = async () => {
    if (!shareEmail.trim()) {
      alert('Please enter an email address.');
      return;
    }

    // TODO: Call your backend API to share the book here
    console.log(`Sharing book with user: ${shareEmail}`);

    // After sharing, reset input & hide box
    setShareEmail('');
    setIsSharing(false);
  };

  const items = [
    { icon: faListCheck, label: 'Outline' },
    { icon: faClock, label: 'Writing Timeline' },
    { icon: faMagnifyingGlass, label: 'Find and Replace' },
    { icon: faPlus, label: 'Insert' },
    {
      icon: faTrash,
      label: 'Delete Chapter',
      onClick: handleDeleteChapter
    },
    {
      icon: faUsers,
      label: 'Share',
      onClick: () => setIsSharing(!isSharing)
    },
    { icon: faGear, label: 'Settings' }
  ];

  return (
    <>
      {/* Share input box on the left */}
      {isSharing && (
        <div
          style={{
            position: 'fixed',
            right: 160, // to the left of the sidebar (which is 60px wide)
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            padding: '0.5rem',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1100,
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            width: '220px'
          }}
        >
          <input
            type="email"
            placeholder="Enter user email..."
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleShareSubmit();
            }}
            style={{
              flexGrow: 1,
              padding: '0.4rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={handleShareSubmit}
            style={{
              padding: '0.4rem 0.8rem',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Share
          </button>
        </div>
      )}

      {/* The sidebar */}
      <div
        style={{
          width: '60px',
          height: '100vh',
          backgroundColor: '#f8f9fa',
          borderLeft: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 0',
          gap: '1.5rem',
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={item.onClick} // only items with `onClick` defined will respond
            style={{
              position: 'relative',
              padding: '0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              backgroundColor: hoveredIndex === idx ? '#e0e0e0' : 'transparent',
            }}
          >
            <FontAwesomeIcon icon={item.icon} size="lg" />

            {hoveredIndex === idx && (
              <div
                style={{
                  position: 'absolute',
                  right: '110%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
