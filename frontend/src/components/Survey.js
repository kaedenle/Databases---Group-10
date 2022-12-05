import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';

import '../css/Survey.scss';
import Sidebar from './Sidebar';
import EditSurveyPage from '../pages/EditSurveyPage';

function Survey() {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  var user_data = JSON.parse(localStorage.getItem('user_data'));
  console.log(localStorage.getItem('user_data'));

  useEffect(() => {
    const getSurvey = async (event) => {
      try {
        //IN - title, userName

        const obj = {
          title: id,
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
        }
      } catch (e) {
        alert(e.toString());
      }
    };
    getSurvey();
  }, [surveyList]);

  const toEdit = () => {
    navigate('/EditSurveyPage', { state: { title: id } });
  };

  return (
    <div>
      <Sidebar />
      <div className="edit">
        <h2 className="m-5">Survey Responses</h2>

        <Button onClick={toEdit}>Edit Survey</Button>
      </div>
    </div>
  );
}

export default Survey;
