import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import '../css/Survey.scss';

function Survey() {
  const [message, setMessage] = useState();
  const [surveyList, setSurveyList] = useState();

  var user_data = JSON.parse(localStorage.getItem('user_data'));
  console.log(localStorage.getItem('user_data'));

  const get_surveys = async (event) => {
    try {
      //IN - userName, page (optional = 0), per_page (optional = 10), active (optional = true)

      const obj = {
        userName: user_data.userName,
        page: 1,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/list_user_survey', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        setSurveyList(res);
        console.log(surveyList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div className="container">
      <p className="m-4">hello</p>
      <Button
        variant="dark"
        onClick={get_surveys}
      >
        {' '}
        Hello
      </Button>
    </div>
  );
}

export default Survey;
