import React from 'react';

const ParentSelector = ({ pages, parentId, setParentId, darkMode }) => {
  if (!pages.length) return null;

  return (
    <div className={`mb-3${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}>
      <label htmlFor="parentIdSelect" className="form-label">Select Parent Page (Optional)</label>
      <select
        className={`form-control ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}
        id="parentIdSelect"
        value={parentId || ''}
        onChange={(e) => setParentId(e.target.value)}
      >
        <option value="">-- None --</option>
        {pages.map(page => (
          <option key={page.id} value={page.id}>{page.title}</option>
        ))}
      </select>
    </div>
  );
};

export default ParentSelector;
