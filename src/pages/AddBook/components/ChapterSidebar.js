import React, { useState, useRef, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import ChapterList from './ChapterList';
import { useAddBook } from '../../../context/EditBookContext';
import SaveButton from './SaveButton';
import { addPage } from '../../../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "../AddBookPage.scss";

export const ChapterSidebar = () => {
 const { 
  setChapterStates, showBody, setShowBody, 
  bookId, bookChapters, selectedChapterId, 
  setSections, setBookChapters, fetchBookContent, selectedFont, setSelectedFont,
  setEditorFontSize, setEditorLineHeight
} = useAddBook();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleChapter = (id) => {
    setChapterStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

const handleAddChapter = async () => {
  const title = prompt('Enter new chapter title:');
  if (!title) return;

  const newChapter = await addPage({
    title,
    weight: bookChapters.length + 1,
    bookId,
    description: '',
    parentId: null,
  });
   await fetchBookContent();
  // setBookChapters(prev => [...prev, newChapter]);
};

const handleAddSection = async () => {
  if (!selectedChapterId) {
    alert('Please select a chapter first.');
    return;
  }

  const title = prompt('Enter new section title:');
  if (!title) return;

  const newSection = await addPage({
    title,
    weight: 1, // or calculate based on number of sections under selectedChapterId
    bookId,
    description: '',
    parentId: selectedChapterId,
  });

  // // Update sections in context (assuming you use a map: { [chapterId]: [...] })
  // setSections(prev => ({
  //   ...prev,
  //   [selectedChapterId]: [...(prev[selectedChapterId] || []), newSection],
  // }));

  await fetchBookContent();
};


return (
<div
  className="d-flex flex-column text-white"
  style={{
    width: '260px',
    height: '100vh',
    backgroundColor: '#36454F',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  {/* Header */}
  <div
    className="d-flex justify-content-between align-items-center px-3 mb-1"
    style={{
      height: '60px',
      backgroundColor: '#445766',
    }}
  >
    <h5 className="mb-0">Manuscript</h5>
    <DropdownMenu
      ref={menuRef}
      open={menuOpen}
      setOpen={setMenuOpen}
      onAddChapter={handleAddChapter}
      onAddSection={handleAddSection}
    />
  </div>

  {/* Body toggler */}
  <div
    className="d-flex justify-content-between align-items-center px-3 py-2"
    style={{ backgroundColor: '#445766' }}
  >
    <span>
      <i
        className={`me-2 fa-solid fa-caret-${showBody ? 'down' : 'right'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setShowBody(prev => !prev)}
      ></i>
      Body
    </span>
  </div>

  {/* Chapter list */}
  <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
    {showBody && <ChapterList toggleChapter={toggleChapter} />}
  </div>

  {/* Save button */}
  <div className="p-3">
    <SaveButton />
  </div>

  {/* Settings icon pinned near bottom */}
<div
  className="d-flex justify-content-end align-items-end position-relative"
  style={{
    marginTop: 'auto',
    padding: '1rem 1rem',
    backgroundColor: '#2c3e50',
    cursor: 'pointer',
    borderTop: '1px solid #444',
    position: 'relative',
  }}
  title="Settings"
  onClick={() => setShowSettings(prev => !prev)}
>
  <FontAwesomeIcon icon={faGear} style={{ fontSize: '1.5rem', color: '#ccc' }} />

{showSettings && (
  <div
    style={{
      position:'fixed',
      bottom: '80px',
      left:'200px',
      backgroundColor: '#fff',
      color: '#333',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      width: '280px',
      padding: '1.25rem 1.5rem',
      right: '10px',
      zIndex: 100,
    }}
  >
    <h5 style={{ marginBottom: '1rem', fontWeight: '600' }}>Settings</h5>

    {/* Theme */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <label className="mb-0" style={{ fontSize: '1.1rem' }}>Theme</label>
      <select className="form-select form-select-sm"
      value={selectedFont}
      onChange={(e) => setSelectedFont(e.target.value)}
      style={{
        width: '55%',
        fontSize: '1rem',
        borderColor: '#5cb85c',
        color: '#333',
        backgroundColor: '#fff',
        padding: '0.3rem 0.5rem',
      }}>
        <option value="Normal">Normal</option>
        <option value="Classic">Classic</option>
        <option value="Romance">Romance</option>
      </select>
    </div>

    {/* Font Size */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <label className="mb-0" style={{ fontSize: '1.1rem' }}>Font size</label>
      <input  className="green-slider" type="range" min="12" max="24" defaultValue="16" style={{ width: '55%' }}
       onChange={(e) => setEditorFontSize(Number(e.target.value))}
        />
    </div>

    {/* Line Height */}
    <div className="d-flex justify-content-between align-items-center">
      <label className="mb-0" style={{ fontSize: '1.1rem' }}>Line height</label>
      <input className="green-slider" type="range" min="1" max="3" step="0.1" defaultValue="1.5" style={{ width: '55%' }} 
        onChange={(e) => setEditorLineHeight(Number(e.target.value))}/>
    </div>
  </div>
)}

</div>

</div>

);
};
