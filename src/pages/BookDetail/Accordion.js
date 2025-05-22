import { useState } from "react";
import { useTheme } from "../../context/theme-context";

export const Accordion = ({ faq, children, onEdit, onDelete }) => {
  const { question, answer } = faq;
  const [show, setShow] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div
      className={`border-bottom ${darkMode ? "dark bg-dark border-secondary" : "bg-light border-muted"}`}
    >

      <h2 className="d-flex justify-content-between align-items-center py-3 px-2">
        <button
          onClick={() => setShow(!show)}
          type="button"
          className={`w-100 d-flex align-items-center justify-content-between border-0 bg-transparent text-start ${
            darkMode ? "text-light" : "text-dark"
          }`}
          aria-expanded={show}
        >
          <span className="fs-5 fw-medium">{question}</span>
          <div className = "d-flex gap-2"> 
          <button
            className={`btn btn-sm ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={onEdit}
          >
            Edit Page
          </button>
          <button
            className={`btn btn-sm ${darkMode ? "btn-outline-danger text-light" : "btn-outline-danger"}`}
            onClick={onDelete}
          >
            Delete Page
          </button>
        </div>
          <span>
            <svg
              className={`ms-2 ${show ? "rotate-180" : ""}`}
              style={{ transform: show ? "rotate(180deg)" : "none" }}
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
       
      </h2>

      {show && (
        <div className={`py-3 px-2 border-top ${darkMode ? "border-secondary" : "border-muted"}`}>
          <p className={`fs-6 mb-2 ${darkMode ? "text-light" : "text-muted"}`}>{answer}</p>

          <div className="ms-3">{children}</div>
        </div>
      )}
    </div>
  );
};
