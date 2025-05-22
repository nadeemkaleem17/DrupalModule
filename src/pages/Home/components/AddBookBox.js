import React from 'react';
import { Link } from 'react-router-dom';
import "../homePage.scss";

const AddBookBox = () => {
  return (
    <div className="col custom-bg-gray-300 p-4 text-dark bg-opacity-10 mb-3">
      <h6>Tools</h6>
      <hr className="my-2" />
      <div className='mt-4'>
        <Link to="/add-book" className="text-primary text-decoration-underline">
          Add Book
        </Link>
      </div>

    </div>
  );
};

export default AddBookBox;
