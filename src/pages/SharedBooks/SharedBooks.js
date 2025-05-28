// React Libraries
import { useContext, useEffect, useState } from "react";
import { getBooks } from "../../data"; // You need to define this function
import { BookCard } from "../../components/Elements/BookCard";
import { Navbar } from "../../components/Navbar/Navbar";
import { SharedBookCard } from "../../components/Elements/SharedBookCard";
import AuthContext from "../../context/AuthContext";

export const SharedBooks = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');
  const {user} = useContext(AuthContext);
  console.log("token", token, user.id);
  useEffect(() => {
    async function fetchPublicBooks() {
      try {
          const data = await getBooks(token, user.id);
          setBooks(data);
      } catch (error) {
        console.error("Error fetching public books:", error);
      }
    }

    fetchPublicBooks();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="my-5">
          <div className="container d-flex justify-content-between mb-4">
          </div>
          <div className="row justify-content-center gx-0 gy-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="col-12 col-md-8 col-lg-4 d-flex justify-content-center"
                >
                <SharedBookCard book={book} />
            </div>

        ))}
          </div>
        </section>
      </main>
    </>
  );
};
