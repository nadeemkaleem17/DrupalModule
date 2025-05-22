import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { useTitle } from "../hooks/useTitle";
// import { toast } from "react-toastify";
import { deleteBook, getBooks } from "../../data";
import bookPoster from "../../assets/images/book.jpeg"
import { Pages } from "./PagesList";
import AuthContext from "../../context/AuthContext";
export const BookDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useContext(AuthContext);
//   useTitle(book.title);
useEffect(() => {
    async function fetchBook() {
      console.log(token," user: ", user);
      try {
        if(token && user.id){
        const books = await getBooks(token, user.id);
        const book = books.find((b) => String(b.id) === String(id));
        setBook(book);
        }
        
      } catch (error) {
        // toast.error(error.message, {
        //   closeButton: true,
        //   position: "bottom-center",
        // });
      }
    }
  
    fetchBook();
  }, [id]);

  function handleDeleteBook(){
    if (window.confirm('Are you sure you want to delete this page and all its children?')) {
    deleteBook(book.id);
    navigate("/");
    }
  }
  const handleEdit = () => navigate(`/books/edit/${book.id}`);

  return (
    <main className="container my-5">
      <section>
        <h1 className="text-center fw-bold display-6 mb-4">{book.title}</h1>
        <p className="text-center lead mb-4">
        {book.description?.split(" ").slice(0, 10).join(" ")}
        {book.description?.split(" ").length > 10 && "..."}
        </p>


        <div className="row justify-content-center g-0">
          <div className="col-md-5 mb-4">
            <img
              className="img-fluid rounded"
              src={bookPoster}
              alt={`poster ${book.id}`}
            />
          </div>

          <div className="col-md-6 mb-4">
            <div className="d-flex gap-2 mb-3">
                <button
                onClick={handleDeleteBook}
                className="btn btn-danger btn-sm"
                >
                Delete Book <i className="bi bi-trash3 ms-1"></i>
                </button>
                <button
                onClick={handleEdit}
                className="btn btn-secondary btn-sm"
                >
                Edit Book <i className="bi bi-pencil ms-1"></i>
                </button>
                {/* <Link to="/add-page">
                <button
                // onClick={handleAddChildPage}
                className="btn btn-primary btn-sm"
                >
                Add Child Page <i className="bi bi-pencil ms-1"></i>
                </button>
                </Link> */}
            </div>
            <p className="fs-5">{book.description}</p>
        </div>
        </div>
      </section>
      {/* <Pages book = {book}/> */}
    </main>
  );
};
