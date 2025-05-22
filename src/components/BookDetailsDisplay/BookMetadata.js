const BookMetadata = ({ description }) => (
    <div className="mt-3 mb-3">
      <div className="mb-4">Submitted by username on Tue, 00/00/0000 - 00:00</div>
      <p className="mb-3">{description || "No description provided."}</p>
      <hr />
    </div>
  );
  
  export default BookMetadata;
  