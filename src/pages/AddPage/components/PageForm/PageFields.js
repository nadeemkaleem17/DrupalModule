import React from 'react';

const PageFields = ({ title, setTitle, description, setDescription, darkMode }) => (
  <>
    <div className={`mb-3 ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}>
      <label htmlFor="title" className="form-label">Title</label>
      <input
        type="text"
        className={`form-control ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea
          className={`form-control ${
            darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}
        id="description"
        rows="8"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  </>
);

export default PageFields;
