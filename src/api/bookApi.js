import { fetchBookDocumentId } from "../helpers/apiHelpers";
const _addBook = async (book, token) => {
  const jwt_token = token || localStorage.getItem('token'); // Prefer passed token

  try {
    const response = await fetch('http://localhost:1337/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt_token}`,
      },
      body: JSON.stringify({
        data: {
          title: book.title,
          description: book.description || '',
          weight: book.weight,
          OwnerUser: book.userId,  // <-- use correct relation field name
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};


const _getBooks = async (token, userId) => {
  if (!token || !userId) {
    console.error("Missing token or userId");
    return [];
  }
  try {
    const response = await fetch(
      `http://localhost:1337/api/books?filters[OwnerUser][id][$eq]=${userId}&sort=weight:asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch books from backend. Status:", response.status);
      return [];
    }
    const data = await response.json();
    return data.data.map((book) => ({
      id: book.id,
      title: book.title,
      description: book.description || "",
      weight: book.weight,
    }));
  } catch (error) {
    console.error("Error fetching books from backend:", error);
    return [];
  }
};



const _deleteBook = async (bookId) => {
  try {
    const pagesResponse = await fetch(
      `http://localhost:1337/api/pages?filters[bookId][id][$eq]=${bookId}`
    );

    if (!pagesResponse.ok) {
      console.error("Failed to fetch pages before deleting book.");
      return;
    }

    const pagesData = await pagesResponse.json();

    if (pagesData.data?.length > 0) {
      for (const page of pagesData.data) {
        const pageDeleteResponse = await fetch(
          `http://localhost:1337/api/pages/${page.id}`,
          { method: "DELETE" }
        );

        if (pageDeleteResponse.ok) {
          console.log(`Page ${page.id} deleted.`);
        } else {
          console.error(`Failed to delete page ${page.id}`);
        }
      }
    }

    const documentId = await fetchBookDocumentId(bookId);
    const bookResponse = await fetch(
      `http://localhost:1337/api/books/${documentId}`,
      { method: "DELETE" }
    );

    if (bookResponse.ok) {
      console.log("Book deleted from backend.");
    } else {
      console.error("Failed to delete book.");
    }
  } catch (error) {
    console.error("Error deleting book and its pages from backend:", error);
  }
};

export { _addBook, _getBooks, _deleteBook };