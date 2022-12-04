import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';

import '../css/Survey.scss';
import Sidebar from './Sidebar';

function Survey() {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [title, setTitle] = useState('');
  const { name } = useParams();

  var user_data = JSON.parse(localStorage.getItem('user_data'));
  console.log(localStorage.getItem('user_data'));

  useEffect(() => {
    const getSurvey = async (event) => {
      try {
        //IN - title, userName

        const obj = {
          title: name,
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

        if (res.error && res.error !== '') {
          console.log(message);
          setMessage(message);
        } else {
          setMessage('');
          console.log(res);
          setTitle(res.title);
        }
      } catch (e) {
        alert(e.toString());
      }
    };
    getSurvey();
  }, [surveyList]);

  return (
    <div>
      <Sidebar />
      <div className="edit">
        <h2 className="m-5">{name}</h2>
      </div>
    </div>
  );
}

export default Survey;
