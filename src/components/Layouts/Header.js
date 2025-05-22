import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/theme-context";
import { Search } from "../Sections/Search";
import { DropdownLoggedIn } from "../Elements/DropdownLoggedIn";
import { DropdownLoggedOut } from "../Elements/DropDownLoggedOut";

// import { Search } from "../Sections/Search";
// import { DropdownLoggedIn } from "../index";
// import { DropdownLoggedOut } from "../index";
// import { useCart } from "../../context";

export const Header = () => {
//   const { cartList } = useCart();
const { darkMode, setDarkMode } = useTheme();
const [dropDown, setDropDown] = useState(false);
  const token = sessionStorage.getItem("token");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header>
      <nav className={`container navbar navbar-expand-lg ${darkMode ? "dark bg-dark" : "bg-white"} border-bottom`}>
        <div className="container-fluid px-4 py-3">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={Logo} alt="BookModule Logo" className="me-3" height="40" />
            <span className={`fs-4 fw-semibold ${darkMode ? "text-white" : "text-dark"}`}>BookModule</span>
          </Link>

          <div className="d-flex align-items-center position-relative">
            <i
              className={`bi bi-gear-wide-connected fs-5 me-4 cursor-pointer ${darkMode ? "text-white" : "text-dark"}`}
              onClick={() => setDarkMode(!darkMode)}
            ></i>
            <i
              className={`bi bi-search fs-5 me-4 cursor-pointer ${darkMode ? "text-white" : "text-dark"}`}
              onClick={() => setSearch(!search)}
            ></i>
            <Link to="/" className={`text-decoration-none me-4 position-relative ${darkMode ? "text-white" : "text-dark"}`}>
              <i className="bi bi-cart-fill fs-5"></i>
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {10}
              </span>
            </Link>
            <i
              className={`bi bi-person-circle fs-4 cursor-pointer ${darkMode ? "text-white" : "text-dark"}`}
              onClick={() => setDropDown(!dropDown)}
            ></i>
            {dropDown &&
              (token ? (
                <DropdownLoggedIn setDropDown={setDropDown} />
              ) : (
                <DropdownLoggedOut setDropDown={setDropDown} />
              ))}
          </div>
        </div>
      </nav>
      {search && <Search setSearch={setSearch} />}
    </header>
  );
};
