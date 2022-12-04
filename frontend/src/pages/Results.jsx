import React from 'react';

//custom imports
import Sidebar from '../components/Sidebar';
import Survey from '../components/Survey';

function Results() {
  return (
    <>
      <div>
        <Sidebar />
        <div className="survey">
          <Survey />
        </div>
      </div>
    </>
  );
}

export default Results;
