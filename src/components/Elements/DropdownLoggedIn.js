import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const DropdownLoggedIn = ({ setDropDown }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data here (if needed)
      } catch (error) {
        // Handle errors if any
      }
    }
    fetchData();
  }, []); // eslint-disable-line

  function handleLogOut() {
    setDropDown(false);
    navigate("/");
  }

  return (
    <div
      id="dropdownAvatar"
      className="position-absolute top-10 end-0 z-index-10 w-100 bg-white rounded shadow"
      style={{ width: "220px" }}
    >
      <div className="py-3 px-4 text-muted">
        <div className="font-weight-bold text-truncate">{user.email}</div>
      </div>
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
            to="/dashboard"
            className="dropdown-item py-2 px-4 text-dark hover-bg-light"
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <span
          onClick={handleLogOut}
          className="dropdown-item py-2 px-4 text-dark cursor-pointer hover-bg-light"
        >
          Log out
        </span>
      </div>
    </div>
  );
};
