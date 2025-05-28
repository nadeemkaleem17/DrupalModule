import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBooks } from "../../data";
import { BookCard } from "../../components/Elements/BookCard";
import { Navbar } from "../../components/Navbar/Navbar";
import AuthContext from "../../context/AuthContext";

export const BooksList = () => {
  const [show, setShow] = useState(false);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");
  const [books, setBooks] = useState([]);
  const [publicBooks, setPublicBooks] = useState([]);
  const {user} = useContext(AuthContext);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchPublic() {
      try {
        console.log(token, user.id);
        const data = await getBooks(token, user.id);
        console.log(data);
        setPublicBooks(data);
        setBooks(data);
      } catch (error) {
        // handle error
      }
    }
    fetchPublic();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <main>
        {/* All Books Section */}
        <section className="my-5">
          <div className="container d-flex justify-content-between mb-4">
            <span className="h4 text-dark">All Books ({books.length})</span>
          </div>
          <div className="row justify-content-center gx-10 gy-4">
            {books.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>

        {/* Public Books Section */}
        <section className="my-5">
          <div className="container d-flex justify-content-between mb-4">
            <span className="h4 text-dark">Public Books</span>
          </div>
          <div className="row justify-content-center gx-10 gy-4">
            {publicBooks.map((book) => (
              <div key={book.id} className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
