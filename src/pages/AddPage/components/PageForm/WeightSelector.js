import React from 'react';
import { generateWeightOptions } from '../../../../helpers';

const WeightSelector = ({ weight, setWeight, darkMode }) => (
  <div className="mb-3">
    <label htmlFor="weightSelect" className="form-label">Weight</label>
    <select
     className={`form-control ${
      darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}

      id="weightSelect"
      value={weight}
      onChange={(e) => setWeight(Number(e.target.value))}
    >
      {generateWeightOptions()}
    </select>
  </div>
);

export default WeightSelector;
