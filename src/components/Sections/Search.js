import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-context"; // Import the useTheme hook

export const Search = ({ setSearch }) => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const { darkMode } = useTheme(); // Use darkMode from context

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/books?q=${searchRef.current.value}`);
    setSearch(false);
  }

  return (
    <div className={`container my-5 ${darkMode ? "text-white" : "text-dark"}`}>
      <form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
        <div className="position-relative w-100">
          <i className={`bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 ${darkMode ? "text-light" : "text-secondary"}`}></i>
          <input
            name="search"
            type="text"
            className={`form-control ps-5 py-2 ${darkMode ? "bg-dark text-light" : "bg-white text-dark"}`}
            placeholder="Search"
            autoComplete="off"
            required
            ref={searchRef}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary ms-2 d-flex align-items-center justify-content-center ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
        >
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};
