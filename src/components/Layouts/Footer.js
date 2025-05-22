import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme-context";

export const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`container py-4 ${darkMode ? "dark bg-dark text-light" : "bg-light text-muted"}`}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <span className="text-sm">
          © 2025{" "}
          <Link to="/" className={`text-decoration-none ${darkMode ? "text-light" : "text-muted"} fw-semibold`}>
            BookModule
          </Link>
          . All Rights Reserved.
        </span>
        <div className="d-flex mt-3 mt-md-0 gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className={`${darkMode ? "text-light" : "text-muted"} text-decoration-none`}
          >
            <i className="bi bi-instagram fs-5"></i>
            <span className="visually-hidden">Instagram page</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className={`${darkMode ? "text-light" : "text-muted"} text-decoration-none`}
          >
            <i className="bi bi-twitter fs-5"></i>
            <span className="visually-hidden">Twitter page</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className={`${darkMode ? "text-light" : "text-muted"} text-decoration-none`}
          >
            <i className="bi bi-github fs-5"></i>
            <span className="visually-hidden">GitHub account</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
