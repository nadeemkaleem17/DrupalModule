import { Accordion } from "./Accordion";
import { useTheme } from "../../context/theme-context";
import { useEffect, useState } from "react";
import { deletePage, getPagesByBookId } from "../../data";
import { useNavigate } from "react-router-dom";

export const Pages = ({ book }) => {
    const { darkMode } = useTheme();
    const [pages, setPages] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (book?.id) {
        const bookPages = getPagesByBookId(book.id);
        setPages(bookPages);
      }
    }, [book]);
    const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this page and all its children?')) {
        deletePage(id);
        alert('Page deleted successfully!');
    }
    };
    const renderPageTree = (parentId = null, renderedPages = new Set()) => {
      const childPages = pages.filter(
        (page) => page.parentId === parentId && page.bookId === book.id
      );
  
      return childPages.map((page) => {
        // Skip rendering if the page has already been rendered
        if (renderedPages.has(page.id)) return null;
  
        // Mark the current page as rendered
        renderedPages.add(page.id);
  
        return (
            <Accordion
            key={page.id}
            faq={{
              question: page.title,
              answer: page.description,
            }}
            onEdit={() => navigate(`/pages/edit/${page.id}`)}
            onDelete={() => handleDelete(page.id)}
            //         <Route path="/pages/edit/:id" element={<AddPage />} />

          >
            {renderPageTree(page.id)}
          </Accordion>
        );
      });
    };
  
    return (
      <section
        className={`my-5 p-4 border rounded shadow-sm ${
          darkMode ? "bg-dark text-white border-secondary" : "bg-white text-dark"
        }`}
      >
        <h1 className="text-center fs-4 fw-semibold text-decoration-underline mb-4">
          Pages
        </h1>
  
        {renderPageTree()}
      </section>
    );
  };
  