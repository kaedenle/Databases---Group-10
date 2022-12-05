import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import '../css/Survey.scss';
import Sidebar from './Sidebar';

function Survey() {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const { name } = useParams();
  const [count, setCount] = useState(0);
  var answer1;
  var answer2;
  var answer3;

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

  const handleClick = (num) => {
    // 👇️ take parameter passed from Child component
    setCount((current) => current + num);
  };
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
                {questionList.map((data, index) => (
                  <li key={index}>
                    <p>{data.question}</p>
                    {data.type === 1 ? (
                      <div>
                        <Form>
                          {['radio'].map((type) => (
                            <div
                              key={`inline-${type}`}
                              className="mb-3"
                            >
                              <span style={{ marginRight: ' 30px' }}>
                                Strongly Disagree{' '}
                              </span>
                              <Form.Check
                                inline
                                label="1"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onClick={(index = 1)}
                              />
                              <Form.Check
                                inline
                                label="2"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                onClick={(answer1 = 1)}
                              />
                              <Form.Check
                                inline
                                label="3"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                                onClick={(answer1 = 1)}
                              />
                              <Form.Check
                                inline
                                label="4"
                                name="group1"
                                type={type}
                                id={`inline-${type}-4`}
                                onClick={(answer1 = 1)}
                              />
                              <Form.Check
                                inline
                                label="5"
                                name="group1"
                                type={type}
                                id={`inline-${type}-5`}
                                onClick={(answer1 = 1)}
                              />
                              <span>Strongly Agree</span>
                            </div>
                          ))}
                        </Form>
                      </div>
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
