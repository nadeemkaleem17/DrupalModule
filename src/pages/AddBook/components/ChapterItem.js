import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useAddBook } from '../../../context/EditBookContext';

const ChapterItem = ({ provided, snapshot, chapter, chapterNumber }) => {
  const {
    chapterStates,
    setChapterStates,
    selectedChapterId,
    setSelectedChapterId,
    sections
  } = useAddBook();

  const isOpen = chapterStates?.[chapter.id] ?? false;
  const selected = selectedChapterId === chapter.id;

  const toggleChapter = (id) => {
    setChapterStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClick = () => {
    toggleChapter(chapter.id);
    setSelectedChapterId(chapter.id);
  };

  const chapterSections = sections?.[chapter.id] || [];
  const hasSections = chapterSections.length > 0;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`mb-1 ${snapshot.isDragging ? 'dragging' : ''}`}
    >
      <div
        className="d-flex align-items-center justify-content-between px-3"
        style={{
          height: '50px',
          color: 'white',
          cursor: 'pointer',
          backgroundColor: selected ? '#0F71F2' : '',
        }}
        onClick={handleClick}
      >
        <div className="d-flex align-items-center overflow-hidden">
          <span style={{ minWidth: '20px', marginRight: '8px', fontWeight: 'bold' }}>
            {chapterNumber + 1}
          </span>
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 500,
            }}
          >
            {chapter.title}
          </span>
        </div>

        <div
          className="text-light ms-3"
          style={{ fontSize: '1rem', cursor: 'grab' }}
          title="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </div>
      </div>

      {isOpen && hasSections && (
        <ul className="list-unstyled ps-4 mt-2">
          {chapterSections.map((sec) => (
            <li
              key={sec.id}
              className="py-1 px-2 rounded small text-light mr-2"
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                padding: '4px 0',
                maxWidth: '220px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#213448')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FontAwesomeIcon icon={faFileLines} className="me-2" />
              <span className="text-truncate">{sec.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChapterItem;
