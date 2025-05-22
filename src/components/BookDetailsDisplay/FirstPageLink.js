const FirstPageLink = ({ firstPage, onSelectPage }) => {
    if (!firstPage) return null;
    return (
      <>
        <div className="d-flex justify-content-end">
          <div
            className="text-primary me-3 text-decoration-underline"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectPage(firstPage)}
          >
            {firstPage.title}
          </div>
        </div>
        <hr />
      </>
    );
  };
  
  export default FirstPageLink;
  