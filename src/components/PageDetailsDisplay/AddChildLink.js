import { Link } from 'react-router-dom';

const AddChildLink = () => (
  <Link to="/add-page" className="text-primary d-flex justify-content-end fw-normal text-decoration-underline">
    Add Child Page
  </Link>
);

export default AddChildLink;
