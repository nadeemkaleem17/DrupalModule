import { useContext, useEffect, useState } from "react";
import { BookCard } from "../../../components/Elements/BookCard";
import { getBooks } from "../../../data";
import { ThemeCard } from "../../../components/Elements/ThemeCard";
import AuthContext from "../../../context/AuthContext";
// import { ProductCard } from "../../../components/Elements/ProductCard";
// import { getFeaturedList } from "../../../services";
export const LatestBooks = () => {
  const [booksList, setBooksList] = useState([]);
  const themes = [{id: 1, title:'Romance', image: 'romance.jpg'},{id: 2, title: 'Scifi', image:'scifi.jpg' }, {id: 3, title:'Thriller', image:'thriller.jpg' },{id: 4,title:'Memoir', image: 'memoir.jpg'}]
  return (
    <section className="my-5">
      <div className="container px-4">
        <h1 className="fw-semibold fs-3 mb-3 ms-4">
          Explore Creative Themes
        </h1>

        <div className="row justify-content-center gx-10 gy-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <ThemeCard theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};
