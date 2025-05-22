import { createContext, useContext, useState, useEffect } from 'react';
import {getBookById, getChildPages, getPagesByBookId } from "../data";
import { useParams } from 'react-router-dom';
import { buildBookContentHTML } from '../helpers';

const AddBookContext = createContext();

export const AddBookProvider = ({ children }) => {
  const { id: bookId } = useParams();
  const [bookName, setBookName] = useState('');
  const [chapters, setChapters] = useState([]);
  const [chapterStates, setChapterStates] = useState({});
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [showBody, setShowBody] = useState(true);
  const [pages, setPages] = useState([]);
  const [bookChapters, setBookChapters] = useState([]);
  const [sections, setSections] = useState({});
  const [editorContents, setEditorContents] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [dirtySectionIds, setDirtySectionIds] = useState(new Set());
  const [editor, setEditor] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Reedsy'); // default
  const [editorFontSize, setEditorFontSize] = useState(16);
  const [editorLineHeight, setEditorLineHeight] = useState(1.5);
  const [contentSet, setContentSet] = useState(false);
  const fontMap = {
    Normal: '"Open Sans", sans-serif',
    Classic: '"Merriweather", serif',
    Romance: '"EB Garamond", serif'
  };

  const markSectionAsDirty = (sectionId) => {
    setDirtySectionIds(prev => new Set(prev).add(sectionId));
  };
  
  const fetchBookContent = async () => {
    setIsLoading(true);
    const _pages = await getPagesByBookId(parseInt(bookId));
    const topLevel = _pages.filter(p => p.parentId === null);
    const sectionMap = {};
    topLevel.forEach(ch => {
      sectionMap[ch.id] = getChildPages(ch.id);
    });
    setPages([]);
    setBookChapters([]);
    setSections([]);
    setPages(_pages);
    setBookChapters(topLevel);
    console.log("EditBookContext Chapters: ", topLevel);
    console.log("EditBookContext Sections: ", sectionMap);
    setSections(sectionMap);
    const content = buildBookContentHTML(topLevel, sectionMap);
    setEditorContents(content);
    setContentSet(false);
    setIsLoading(false);


    const book = await getBookById(parseInt(bookId));
    console.log("book: ", book);
    setBookName(book.title);
  };

  useEffect(() => {
    fetchBookContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, setBookChapters]);

  return (
    <AddBookContext.Provider value={{
      bookId,
      chapters, setChapters,
      chapterStates, setChapterStates,
      selectedChapterId, setSelectedChapterId,
      showBody, setShowBody,
      pages, setPages,
      bookChapters, setBookChapters,
      sections, setSections,
      editorContents, setEditorContents,
      fetchBookContent,
      isLoading,
      selectedSectionId,
      setSelectedSectionId,
      dirtySectionIds,
      setDirtySectionIds,
      markSectionAsDirty,
      editor, setEditor,
      bookName,
      selectedFont, setSelectedFont, fontMap,
      editorFontSize, setEditorFontSize,
      editorLineHeight, setEditorLineHeight,
      contentSet, setContentSet,
    }}>
      {children}
    </AddBookContext.Provider>
  );
};

export const useAddBook = () => useContext(AddBookContext);
