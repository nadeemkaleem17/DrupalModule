import React from 'react';
import './TemplatesPage.css'; // Custom styles
import { Navbar } from '../../components/Navbar/Navbar';

const templates = [
  {
    title: 'Novel template',
    img: 'https://img.icons8.com/ios-filled/100/feather.png',
    btnStyle: 'btn-primary',
  },
  {
    title: 'Nonfiction template',
    img: 'https://img.icons8.com/ios-filled/100/glasses.png',
    btnStyle: 'btn-primary',
  },
  {
    title: 'Academic template',
    img: 'https://img.icons8.com/ios-filled/100/graduation-cap.png',
    btnStyle: 'btn-outline-dark',
  },
  {
    title: 'Poetry template',
    img: 'https://img.icons8.com/ios-filled/100/musical-notes.png',
    btnStyle: 'btn-outline-dark',
  }
];

const TemplatesPage = () => {
  return (
    <>
    <Navbar />
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Book templates</h2>
        <p className="text-muted">Choose a template to format your book.<br />Customize styles and settings as you prefer.</p>
        <button className="btn btn-primary mt-2">Use Template</button>
      </div>

      <div className="row g-4 justify-content-center">
        {templates.map((template, idx) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 border-1" key={idx}>
            <div className="template-card p-4 text-center h-100">
              <div className="mb-3">
                <img src={template.img} alt={template.title} className="template-icon" />
              </div>
              <h5 className="mb-3">{template.title}</h5>
              <button className={`btn ${template.btnStyle}`}>Use Template</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TemplatesPage;