import { _addBook, _addPage, _deleteBook, _getBooks } from "../api";
import { _deletePage, _getPages, _updatePage } from "../api";
import { fetchBookDocumentId } from "../helpers/apiHelpers";

let books = [];
// id: 85, title: 'BOOK 1', description: 'THIS IS BOOK 1', weight: 7
let pages = [];
  
export const getBooks = async (token, userId) => {
  try {
    const [backendBooks, backendPages] = await Promise.all([_getBooks(token, userId), _getPages(token, userId)]);
    books = backendBooks; // Copy local books
    pages = backendPages; // Copy local pages
    return books;
  } catch (error) {
    console.error("Error fetching books/pages, returning only local data:", error);
    return books; // Return local books in case of an error
  }
};

export const getPagesByBookId = (bookId) => pages.filter((page) => page.bookId === bookId);
export const getBookById = (id) => books.find((book) => book.id === id);
export const getPageById = (id) => pages.find((page) => page.id === id);
export const getChildPages = (parentId) => pages.filter((page) => page.parentId === parentId);

export const updateBook = async (bookId, newBook) => {
  const documentId = await fetchBookDocumentId(bookId);
  const res = await fetch(`http://localhost:1337/api/books/${documentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title: newBook.title,
        description: newBook.description,
        weight: newBook.weight,
      },
    }),
  });
  return await res.json();
};

export const addBook = async (data, token) => {
  const newBook = await _addBook(data, token);
  books.push(newBook);
  books.sort((a, b) => a.weight - b.weight);
};

export const deleteBook = async (bookId) => {
  books = books.filter((book) => book.id !== bookId);
  pages = pages.filter((page) => page.bookId !== bookId);
  await _deleteBook(bookId);
  return books;
};

export const addPage = async (data) => {
  const newPage = await _addPage(data);
  const newPageToPush = {
    id: newPage.id,
    title: newPage.title,
    weight: newPage.weight,
    bookId: newPage.book_uid,
    parentId: newPage.parent_uid,
    description: newPage.description,
  };

  pages.push(newPageToPush);
  pages = reorderPages(newPage.parentId);

  return newPage;
};

const reorderPages = (parentId) => {
  const filteredPages = parentId
    ? pages.filter((page) => page.parentId === parentId)
    : pages.filter((page) => page.parentId === null);
  const sortedPages = filteredPages.sort((a, b) => a.weight - b.weight);
  return pages.filter((page) => page.parentId !== parentId).concat(sortedPages);
};

export const updatePage = async (id, data) => {
  console.log('data before update: ', {id, data});
  const updatedPageData = await _updatePage(id, data);
  console.log('data after update: ', updatedPageData);
  pages = pages.filter((page) => page.id !== id);
  const updatedPageToPush = {
    id: updatedPageData.id,
    title: updatedPageData.title,
    description: updatedPageData.description,
    parentId: updatedPageData.parent_uid,
    bookId: updatedPageData.book_uid,
    weight: updatedPageData.weight,
  };

  pages.push(updatedPageToPush);
  pages = pages.sort((a, b) => a.weight - b.weight);
  pages = reorderPages(updatedPageData.parent_uid);

  return updatedPageData;
};

export const getFirstPageOfBook = (bookId) => {
  const rootPages = pages.filter((page) => page.bookId === bookId && page.parentId === null);
  if (rootPages.length === 0) return null;
  return rootPages.sort((a, b) => a.weight - b.weight)[0];
};

export const deletePage = async (pageId) => {
  const findAllChildren = (id) => {
    const children = pages.filter((page) => page.parentId === id);
    let allChildren = [...children];
    children.forEach((child) => {
      allChildren = [...allChildren, ...findAllChildren(child.id)];
    });
    return allChildren;
  };

  const pagesToDelete = [pageId, ...findAllChildren(pageId).map((page) => page.id)];

  pages = pages.filter((page) => !pagesToDelete.includes(page.id));

  await _deletePage(pageId);
};
