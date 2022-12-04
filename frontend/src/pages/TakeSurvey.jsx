import React, { useParams, useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import Survey from '../components/Survey';

function TakeSurvey() {
  const [message, setMessage] = useState();
  var user_data = JSON.parse(localStorage.getItem('user_data'));

  return (
    <>
      <div>
        <Sidebar />
        <div className="survey">
          <p>You are viewing</p>
        </div>
      </div>
    </>
  );
}

export default TakeSurvey;
