import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';

import '../css/Survey.scss';
import Sidebar from './Sidebar';

function Survey() {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const { name } = useParams();

  var user_data = JSON.parse(localStorage.getItem('user_data'));

  const getSurvey = async (event) => {
    try {
      //IN - title, (userName OR userID) OR surveyID

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
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  //   useEffect(() => {
  const question_list = async (event) => {
    try {
      //IN - title, userName

      const obj = {
        title: name,
        userName: user_data.userName,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/get_question_list', {
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
        setQuestionList(res.info);
        console.log(questionList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };
  //   }, []);
  function handleQuestions() {
    question_list();
  }

  function typeOne() {
    return <div> Hello</div>;
  }

  return (
    <div>
      <Sidebar />
      <div className="survey">
        <div className="d-flex justify-content-center align-items-center h-100 ">
          <div className="survey-display-container d-flex justify-content-center ">
            <div>
              <h2 className="text-center p-4 survey-title">{name}</h2>
              <Button onClick={handleQuestions}>Hello</Button>
              <ol className="ordered">
                {questionList.map((data) => (
                  <li key={data.id}>
                    <p>{data.question}</p>
                    {data.type === 1 ? (
                      <p>
                        <typeOne />
                      </p>
                    ) : (
                      <p>Goodbye</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
