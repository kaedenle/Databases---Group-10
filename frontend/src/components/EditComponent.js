import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import thumbnail from '../assets/survey-thumbnail.png';

function EditSurveyPage(props) {
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  const [message, setMessage] = useState('');
  var survey_data;
  var end = survey_data.period_end;
  var start = survey_data.period_start;

  const getSurvey = async (event) => {
    try {
      //IN - title, userName

      const obj = {
        title: props.title,
        userName: user_data.userName,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/get_survey', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      survey_data = res;

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        console.log(res);
      }
    } catch (e) {
      alert(e.toString());
    }
  };
  return (
    <div>
      <p>hello</p>
    </div>
  );
}
export default EditSurveyPage;
// <h1>{survey_data.title}</h1>
//     <img
//         src={thumbnail}
//         className="mt-5 "
//         style={{ marginLeft: '20px' }}
//         alt="Survey Thumbnail"
//     />
//     <h2> Description:</h2>
//     <p>{survey_data.description}</p>
//     <div>
//         <div>Start Date</div>
//         <div>{start}</div>
//         <div>End Date</div>
//         <div>{end}</div>
//     </div>
