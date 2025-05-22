import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faLayerGroup,
  faSearch,
  faUser,
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Logo from "../../assets/images/logo.png";
import { Search } from "../Sections/Search";
import { DropdownLoggedIn } from "../Elements/DropdownLoggedIn";
import { DropdownLoggedOut } from "../Elements/DropDownLoggedOut";
import './Navbar.scss';

export const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const token = sessionStorage.getItem("token");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <img src={Logo} alt="BookModule Logo" width="28" />
            <Link to="/" className="navbar-brand fw-bold fs-5 text-dark">BookModule</Link>
          </div>

          {/* Navigation and Icons */}
          <div className="d-flex align-items-center gap-4 position-relative">
            <Link className="text-dark" to="/books">Books</Link>
            <Link to='/templates' className="text-dark">Templates</Link>

            <FontAwesomeIcon
              icon={faSearch}
              className="text-dark cursor-pointer"
              onClick={() => setSearchVisible(!searchVisible)}
            />

            <FontAwesomeIcon icon={faMoon} className="text-dark cursor-pointer" />
            <Link to="/shared-books">
              <FontAwesomeIcon icon={faBell} className="text-dark cursor-pointer" />
            </Link>

            {/* User Icon + Dropdown */}
            <FontAwesomeIcon
              icon={faUser}
              className="text-dark fs-5 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />

            {dropdownVisible &&
              (token ? (
                <DropdownLoggedIn setDropDown={setDropdownVisible} />
              ) : (
                <DropdownLoggedOut setDropDown={setDropdownVisible} />
              ))}
          </div>
        </div>
      </nav>

      {/* Search Component */}
      {searchVisible && <Search setSearch={setSearchVisible} />}
    </>
  );
};
