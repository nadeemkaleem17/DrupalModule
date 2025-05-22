import React from 'react';
import { generateWeightOptions } from '../../../helpers';

const AccordionSection = ({ section, index, weight, setWeight }) => {
  const isOutlineSection = section === 'BOOK OUTLINE';

  return (
    <div className="custom-bg-gray-300 accordion-item">
      <h2 className="accordion-header" id={`heading${index}`}>
        <button 
          className="custom-bg-gray-300 accordion-button collapsed" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#collapse${index}`}
          aria-expanded="false" 
          aria-controls={`collapse${index}`}
        >
          {section}
        </button>
      </h2>

      <div 
        id={`collapse${index}`} 
        className="accordion-collapse collapse" 
        data-bs-parent="#addPageAccordion"
      >
        <div className="accordion-body">
          {isOutlineSection ? (
            <div className="mb-3">
              <label htmlFor="weightSelect" className="form-label fw-bold">Weight</label>
              <select 
                className="form-select" 
                id="weightSelect" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
              >
                {generateWeightOptions()}
              </select>
            </div>
          ) : (
            <p>This is the content for {section}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
