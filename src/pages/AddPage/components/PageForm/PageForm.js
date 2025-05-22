import React, { useEffect, useState } from 'react';
import { addPage, getBooks, getPagesByBookId, getPageById, updatePage } from '../../../../data';
import { useNavigate } from 'react-router-dom';

import PageFields from './PageFields';
import BookSelector from './BookSelector';
import ParentSelector from './ParentSelector';
import WeightSelector from './WeightSelector';
import FormActions from './FormActions';
import { useTheme } from '../../../../context/theme-context';

const PageForm = ({ pageId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [pages, setPages] = useState([]);
  const [books, setBooks] = useState([]);
  const {darkMode} = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPageData = async () => {
      if (!pageId) return;
      const page = await getPageById(parseInt(pageId));
      if (page) {
        setTitle(page.title);
        setDescription(page.description);
        setWeight(page.weight);
        setSelectedBookId(page.bookId ?? null);
        setParentId(page.parentId ?? null);
      }
    };
    fetchPageData();
  }, [pageId]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchPages = async () => {
      if (selectedBookId) {
        const data = await getPagesByBookId(parseInt(selectedBookId));
        setPages(data);
      } else {
        setPages([]);
      }
    };
    fetchPages();
  }, [selectedBookId]);

  const handleSave = async () => {
    if (!title || !selectedBookId) {
      alert('Title and Book are required.');
      return;
    }

    const newPage = {
      title,
      description,
      weight,
      bookId: parseInt(selectedBookId),
      parentId: parentId ? parseInt(parentId) : null
    };

    if (pageId) {
      await updatePage(parseInt(pageId), newPage);
      alert('Page updated successfully!');
    } else {
      await addPage(newPage);
      alert('Page added successfully!');
    }

    resetForm();
    navigate('/');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setWeight(0);
    setSelectedBookId(null);
    setParentId(null);
  };

  return (
    <div className={`col-md-7 mt-4 p-3 custom-bg-gray-300 ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`} style={{ minHeight: '500px' }}>
      <PageFields title={title} setTitle={setTitle} description={description} setDescription={setDescription} darkMode={darkMode}/>
      <BookSelector books={books} selectedBookId={selectedBookId} setSelectedBookId={setSelectedBookId}  darkMode={darkMode}/>
      <ParentSelector pages={pages} parentId={parentId} setParentId={setParentId}  darkMode={darkMode}/>
      <WeightSelector weight={weight} setWeight={setWeight}  darkMode={darkMode}/>
      <FormActions onSave={handleSave}  darkMode={darkMode}/>
    </div>
  );
};

export default PageForm;