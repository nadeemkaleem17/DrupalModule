import { useParams } from 'react-router-dom';
// import { useTheme } from '../../context/theme-context';
import { PageEditor } from './components/PageEditor';
import { ChapterSidebar } from './components/ChapterSidebar';
import { AddBookProvider, useAddBook } from '../../context/EditBookContext';
import {RightSidebar} from "./components/RightSideBar";
import { useEffect } from 'react';

const AddBookPage = () => {
  const { id: bookId } = useParams();
  const {editBookId, setEditBookId} = useAddBook();
  useEffect(()=>{
    function setBook(){
      if(bookId){
        setEditBookId(bookId);
      }
    }
    setBook();
  }, [bookId]);
  // const { darkMode } = useTheme();
  return (
    <AddBookProvider>
    <div className={`d-flex text-dark bg-light`} style={{ overflow: 'hidden' }}>
      <div className="bg-secondary text-white" style={{ width: '260px', overflowY: 'auto'}}>
        <ChapterSidebar bookId={bookId} />
      </div>

      {/* Page Editor */}
      <div
        className="flex-grow-1"
        style={{
          overflowY: 'auto',
          height: 'calc(100vh - 0px)', // ensures it doesn't exceed screen height
          padding: '2rem'
        }}
      >
        {bookId &&
        <PageEditor bookId={bookId} />}

      </div>
        <div
          className="bg-light"
          style={{
            borderLeft: '1px solid #ddd',
            padding: '1rem',
            height: '100vh',
            overflowY: 'auto'
          }}
        >
          <RightSidebar />
        </div>
    </div>
    </AddBookProvider>

  );
};

export { AddBookPage };