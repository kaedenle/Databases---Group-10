import React from 'react';

import Sidebar from '../components/Sidebar';
import Survey from '../components/Survey';

function TakeSurvey() {
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

export default TakeSurvey;
