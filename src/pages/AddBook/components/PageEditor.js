import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useAddBook } from '../../../context/EditBookContext';
import { buildBookContentHTML } from '../../../helpers';

export const PageEditor = () => {
  const {
    bookChapters,
    sections,
    editorContents,
    setEditorContents,
    isLoading,
    selectedSectionId,
    setEditor,
    bookName,
    selectedFont,
    fontMap,
    editorFontSize,
    editorLineHeight,
    fetchBookContent,
    contentSet, setContentSet,
  } = useAddBook();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContents(html);
    },
  });

  useEffect(() => {
  if (editor) setEditor(editor);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [editor]);



  useEffect(() => { 
    if (!isLoading && editor && !contentSet && bookChapters.length > 0 && sections) {
      if (selectedSectionId && editorContents[selectedSectionId]) {
        editor.commands.setContent(editorContents[selectedSectionId]);
      } else if (typeof editorContents === 'string') {
        editor.commands.setContent(editorContents);
      }
      setContentSet(true);
    }
  }, [isLoading, editor, selectedSectionId, bookChapters, sections, editorContents, fetchBookContent]);

  useEffect(() => {
    setContentSet(false); // trigger reload
  }, [editorContents]);

  const [content, setContent] = useState('');
  useEffect(() => {
    if (bookChapters.length > 0 && Object.keys(sections).length > 0) {
      const contentHTML = buildBookContentHTML(bookChapters, sections);
      setContent(contentHTML);
    }
  }, [bookChapters, sections]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading editor...</div>;
  }

  return (
<div className="w-100">
<div className="w-100 px-4 mb-3" style={{
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6',
  fontWeight: 600,
  fontSize: '1.25rem',
  position: 'relative',
  zIndex: 1,
}}>
  {bookName}
</div>

<div className="w-100 d-flex justify-content-center">
  <div style={{
    maxWidth: '800px',
    width: '100%',
    padding: '0 1rem',
    fontFamily: fontMap[selectedFont] || 'inherit',
    fontSize: `${editorFontSize}px`,
    lineHeight: editorLineHeight,
  }}>

    <style>
      {`
        div[contenteditable="true"] {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0;
          margin: 0;
        }
      `}
    </style>
    <EditorContent editor={editor} className="prose" />
  </div>
</div>

</div>

  );
};

export default PageEditor;
