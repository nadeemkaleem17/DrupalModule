const PageNavigation = ({ previousPage, nextPage, parentPage, firstPage, onSelectPage }) => (
    <>
      <hr />
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <div>
          {previousPage && (
            <div className="text-primary" style={{ cursor: 'pointer' }} onClick={() => onSelectPage(previousPage)}>
              {previousPage.title}
            </div>
          )}
        </div>
        <div>
          {(parentPage || firstPage) && (
            <div
              className="text-primary text-decoration-underline"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectPage(parentPage || firstPage)}
            >
              Top
            </div>
          )}
        </div>
        <div>
          {nextPage && (
            <div className="text-primary text-decoration-underline" style={{ cursor: 'pointer' }} onClick={() => onSelectPage(nextPage)}>
              {nextPage.title}
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
  
  export default PageNavigation;
  