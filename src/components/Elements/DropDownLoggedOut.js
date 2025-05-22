import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export const DropdownLoggedOut = ({ setDropDown }) => {
  const dropdownRef = useRef(null);

  return (
    <div
      ref={dropdownRef}
      id="dropdownAvatar"
      className="position-absolute w-100 bg-white rounded shadow"
      style={{
        width: "220px",
        top: "100%", // Position it directly below the button
        left: "0", // Align it with the left side of the button
      }}
    >
      <ul
        className="list-unstyled p-1 m-0 text-dark"
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <Link
            onClick={() => setDropDown(false)}
            to="/books"
            className="dropdown-item py-2 px-4 text-dark hover-bg-light"
          >
            All eBooks
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setDropDown(false)}
            to="/login"
            className="dropdown-item py-2 px-4 text-dark hover-bg-light"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setDropDown(false)}
            to="/register"
            className="dropdown-item py-2 px-4 text-dark hover-bg-light"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
