import React from 'react';
import { useAddBook } from '../../../context/EditBookContext';
import { parseHTMLContent, processChapters } from '../../../helpers/bookContentBuilder';
import { getPagesByBookId } from '../../../data';

const SaveButton = () => {
  const { editor, bookChapters, sections, bookId, setBookChapters,  setSections} = useAddBook();

  const handleSave = async () => {
    const html = editor.getHTML();
    const parsedChapters = parseHTMLContent(html);

    await processChapters({
      parsedChapters,
      existingChapters: bookChapters,
      existingSections: sections,
      bookId,
    });

    alert('Changes saved successfully!');
  };

  return (
    <button onClick={handleSave} className="btn btn-primary">
      Save Changes
    </button>
  );
};

export default SaveButton;
