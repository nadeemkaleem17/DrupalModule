import { Link } from "react-router-dom";
import BookImage from "../../assets/images/book.jpeg";
import { useTheme } from "../../context/theme-context";

export const SharedBookCard = ({ book }) => {
  const { id, title, description, author } = book;
  const { darkMode } = useTheme();

  return (
    <div
      className={`card my-3 shadow-sm ${
        darkMode ? "bg-dark text-white border-secondary" : "bg-white text-dark border-light"
      }`}
      style={{
        width: "30rem",
        minHeight: "180px",
        display: "flex",            // Make flex container explicitly
        flexDirection: "row",       // Horizontal layout
        overflow: "hidden",         // To clip rounded corners
        borderRadius: "0.25rem",    // Ensure rounded corners on entire card
      }}
    >
      {/* Left side: Image */}
      <Link
        to={`/books/${id}`}
        className="position-relative"
        style={{ flex: "0 0 50%" }}
      >
        <img
          src={BookImage}
          alt="Book cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",         // Remove any inline spacing
            borderTopLeftRadius: "0.25rem",
            borderBottomLeftRadius: "0.25rem",
          }}
        />
      </Link>

      {/* Right side: Text */}
      <div
        className="px-4 py-3 d-flex flex-column justify-content-between"
        style={{ flex: "1 1 50%" }}
      >
        <div>
          <Link
            to={`/books/${id}`}
            className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
          >
            <h5 className="mb-3">{title}</h5>
          </Link>

          <Link to={`/books/edit/${id}`} className="text-decoration-none">
            <p
              className={`card-text ${darkMode ? "text-light" : "text-muted"} small mb-3`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          </Link>
        </div>

        <p
          className={`mb-0 fw-semibold ${darkMode ? "text-light" : "text-secondary"}`}
          style={{ fontSize: "0.9rem" }}
        >
          Author: {author || "Unknown"}
        </p>
      </div>
    </div>
  );
};
