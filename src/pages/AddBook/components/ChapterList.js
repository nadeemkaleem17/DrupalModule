import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ChapterItem from './ChapterItem';
import { useAddBook } from '../../../context/EditBookContext'; 


export const ChapterList = ({ toggleChapter }) => {
  const {
    bookChapters,
    setBookChapters,
  } = useAddBook();

  if (!bookChapters || bookChapters.length === 0) {
    return <div className="text-white px-3">No chapters yet.</div>;
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(bookChapters);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setBookChapters(reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapter-list" type="CHAPTER">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {bookChapters.map((ch, idx) => (
              <Draggable key={ch.id} draggableId={`chapter-${ch.id}`} index={idx}>
                {(provided, snapshot) => (
                  <ChapterItem
                    provided={provided}
                    snapshot={snapshot}
                    chapter={ch}
                    chapterNumber = {idx}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};


export default ChapterList;
