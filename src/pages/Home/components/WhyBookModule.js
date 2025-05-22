import React from 'react';

const WhyBookModule = () => {
  return (
    <div className="container my-5">
      {/* Left-aligned heading */}
      <h2 className="mb-4 fw-bold text-start">Why BookModule?</h2>

      {/* Cards still centered */}
      <div className="row justify-content-center mb-5 text-center">
        <div className="col-md-4 mb-4">
          <div className="mb-2">
            <i className="bi bi-lightning-charge fs-1"></i>
          </div>
          <h5 className="fw-bold">Powerful editor</h5>
          <p>
            Enhance your writing <br />
            with advanced tools <br />
            and features.
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <div className="mb-2">
            <i className="bi bi-layout-text-sidebar-reverse fs-1"></i>
          </div>
          <h5 className="fw-bold">Chapter by chapter</h5>
          <p>
            Organize your work <br />
            effectively with stru- <br />
            ctured chapters.
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <div className="mb-2">
            <i className="bi bi-type fs-1"></i>
          </div>
          <h5 className="fw-bold">Designed for authors</h5>
          <p>
            Tailored features to <br />
            meet the needs <br />
            of aspiring writers.
          </p>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center text-center">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Anna Smith"
          className="rounded-circle mb-3"
          width="80"
          height="80"
        />
        <blockquote className="blockquote">
          <p className="mb-3">
            BookModule transformed how I write. The <br/>organization tools and seamless interface make <br/>it indispensable for any author.
          </p>
          <footer className="blockquote-footer">Anna Smith</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default WhyBookModule;
