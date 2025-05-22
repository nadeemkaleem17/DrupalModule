import React from 'react';
import AccordionSection from './AccordionSection';

const SidePanel = ({ weight, setWeight }) => {
  const accordionSections = [
    "MENU SETTING",
    "PAGE OUTLINE",
    "URL ALIAS",
    "AUTHORIZATION INFORMATION",
    "PROMOTION OPTIONS"
  ];

  return (
    <div className="col-md-4 mt-1 p-3">
      <div className="custom-bg-gray-300 p-3 mb-3 border rounded">
        <strong>Save Time:</strong> 00/00/0000 - 00:00 <br />
        <strong>Author:</strong> username
        <div className="mt-2">
          <label htmlFor="revisionLog">Revision Log Message</label>
          <textarea 
            className="form-control" 
            id="revisionLog" 
            rows="4" 
            placeholder="Briefly describe the changes you have made."
          ></textarea>
        </div>
      </div>

      <div className="custom-bg-gray-300 accordion" id="addPageAccordion">
        {accordionSections.map((section, index) => (
          <AccordionSection key={index} section={section} index={index} weight={weight} setWeight={setWeight} />
        ))}
      </div>
    </div>
  );
};

export { SidePanel };
