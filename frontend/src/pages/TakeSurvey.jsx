import React, { useParams, useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Survey from '../components/SurveyResults';

function TakeSurvey() {
  const [message, setMessage] = useState();
  var user_data = JSON.parse(localStorage.getItem('user_data'));

  return (
    <>
      <div>
        <Sidebar />
        <div className="survey">
          <div className="m-3 text-center">
            <h1>Unfinished Surveys</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default TakeSurvey;
