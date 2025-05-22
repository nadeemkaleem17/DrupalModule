import { Link } from "react-router-dom";
import BookImage from "../../assets/images/book.jpeg";
import { useTheme } from "../../context/theme-context";

export const BookCard = ({ book }) => {
  const { id, title, description } = book;
  const { darkMode } = useTheme();
  console.log(book);
  return (
    <div
      className={`card my-2 shadow-sm ${darkMode ? "bg-dark text-white border-secondary" : "bg-white text-dark border-light"}`}
      style={{ width: "17rem", minHeight: "230px" }}
    >
      <Link to={`/books/edit/${id}`} className="position-relative">
        <img
          src={BookImage}
          className="card-img-top"
          alt="Book cover"
          style={{ height: "120px", objectFit: "cover" }}
        />
      </Link>

      <div className="px-3 pt-3">
        <Link
          to={`/books/edit/${id}`}
          className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
        >
          <h5 className="mb-2">{title}</h5>
        </Link>
      </div>

     <div className="card-body pt-2 pb-3">
        <Link to={`/books/${id}`} className="text-decoration-none">
            <p
              className={`card-text ${darkMode ? "text-light" : "text-muted"} small mb-0`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
            >
              {description}
            </p>
        </Link>
    </div>

    </div>
  );
};
