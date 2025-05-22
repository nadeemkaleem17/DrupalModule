import React from 'react';

const FormActions = ({ onSave }) => (
  <div className="mb-3">
    <button className="btn btn-secondary me-2" onClick={onSave}>Save</button>
    <button className="btn btn-secondary">Preview</button>
  </div>
);

export default FormActions;
