const BookActions = ({ onEdit, onDelete }) => (
    <div className="d-flex gap-3 mt-3 mb-3">
      <button className="btn btn-secondary">View</button>
      <button className="btn btn-secondary" onClick={onEdit}>Edit</button>
      <button className="btn btn-secondary">Outline</button>
      <button className="btn btn-danger" onClick={onDelete}>Delete</button>
    </div>
  );
  
  export default BookActions;
  