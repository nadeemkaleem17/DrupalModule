import React, { useState } from 'react';
import { SidePanel } from './components/SidePanel';
import { useParams } from 'react-router-dom';
import PageForm from './components/PageForm/PageForm';
import { useTheme } from '../../context/theme-context';

const AddPage = () => {
  const [weight, setWeight] = useState(0);
  const { id: pageId } = useParams(); // null for add, set for edit
  const {darkMode} = useTheme();
  return (
    <div className={`container mt-4 ${
          darkMode ? 'text-white bg-dark bg-gradient' : 'text-dark bg-custom-gray-300'}`}>
      <div className="row justify-content-between align-items-start gap-3">
        <PageForm pageId={pageId} weight={weight} />
        {/* <SidePanel weight={weight} setWeight={setWeight} /> */}
      </div>
    </div>
  );
};

export { AddPage };
