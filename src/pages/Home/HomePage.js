// src/pages/Home/HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './homePage.scss';

import BookNavigation from './components/BookNavigation';
import AddBookBox from './components/AddBookBox';

import BookDetailsDisplay from '../../components/BookDetailsDisplay/BookDetailsDisplay';
import { PageDetailsDisplay } from '../../components';

import { getBookById, getBooks, getPagesByBookId } from '../../data/booksData';
import { Hero } from './components/Hero';
import { LatestBooks } from './components/LatestBooks';
import { Navbar } from '../../components/Navbar/Navbar';
import WhyBookModule from './components/WhyBookModule';
import AuthContext from '../../context/AuthContext';

export const HomePage = () => {
  const [booksList, setBooksList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchBooks = async () => {
      if(token && user){
      const books = await getBooks(token, user.id);
      setBooksList(books);
      }

      
    };
    fetchBooks();
  }, []);

  const handleBookSelection = (bookId) => {
    const book = getBookById(bookId);
    setCurrentBook(book);
    setCurrentPage(null);
  };

  const handlePageSelection = (page) => {
    setCurrentPage(page);
  };

  const handleBookDeleted = async () => {
    const updatedBooks = await getBooks();
    setBooksList(updatedBooks);
    setCurrentBook(null);
  };

  const handlePageDeleted = () => {
    setCurrentPage(null);
  };

  const renderMainContent = () => {
    if (currentPage) {
      return (
        <PageDetailsDisplay
          page={currentPage}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          onSelectPage={handlePageSelection}
          onPageDeleted={handlePageDeleted}
        />
      );
    }

    if (currentBook) {
      return (
        <BookDetailsDisplay
          book={currentBook}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          onSelectPage={handlePageSelection}
          onBookDeleted={handleBookDeleted}
        />
      );
    }

    return (
      <>
        <h3 className="fw-medium">Welcome To Drupal Book Module</h3>
        <p className="fs-6">
          No front page content has been created yet. Follow the User Guide to start building your site.
        </p>
        <Link to="/add-book" className="text-primary">
          Add Book
        </Link>
      </>
    );
  };
  return (
  <>
    <Navbar />
    <Hero />
    <LatestBooks/>
    <WhyBookModule /> 
    {/* <ExploreThemes /> 
    <Testimonial /> 
    <Footer /> */}
  </>
);




/*
  return (
    <div className="mt-5">
      <Navbar/>
      <div className="row">
      <Hero/>
      <LatestBooks/>
      <div className="col-auto mb-4">
        <Link to="/add-book" className="btn btn-primary btn-md">
          Add Book
        </Link>
      </div>
      </div>
    </div>
  );
*/
};
