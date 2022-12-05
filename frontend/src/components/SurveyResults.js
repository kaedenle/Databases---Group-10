import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';

import '../css/Survey.scss';
import Sidebar from './Sidebar';
import EditSurveyPage from '../pages/EditSurveyPage';

function SurveyResults() {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  var user_data = JSON.parse(localStorage.getItem('user_data'));
  console.log(localStorage.getItem('user_data'));

  useEffect(() => {
    getSurvey();
    question_list();
    console.log(questionList);
  }, [title]);

  const getSurvey = async (event) => {
    try {
      //IN - title, userName

      const obj = {
        surveyID: id,
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

  const question_list = async (event) => {
    try {
      //IN - title, userName

      const obj = {
        surveyID: id,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/get_question_list', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      //console.log(res);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        setQuestionList(res.info);
        //console.log(questionList);
        // answers.current = answers.current.slice(0, res.info.length);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const toEdit = () => {
    navigate('/EditSurveyPage', { state: { title: id } });
  };

  const get_answer = async (id) => {
    //IN - questionID OR ((title AND username) AND question), page, per_page
    try {
      const obj = {
        questionID: id,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/get_answers', {
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
        setAnswers(res.result_answers);
        console.log(answers);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="edit">
        <div className="d-flex flex-inline justify-content-between">
          <h2 className="m-5">Survey Responses</h2>
          <Button
            variant="dark"
            className="d-flex text-center m-5 float-end w-25 h-25"
            onClick={toEdit}
          >
            Edit Survey
          </Button>
        </div>
        <div>
          <ol className="ordered">
            {questionList.map((data, index) => (
              <>
                <li key={index}>
                  {data.question}
                  <Button
                    variant="dark"
                    size="sm"
                    className="m-3"
                    onClick={() => {
                      get_answer(data.questionID);
                    }}
                  >
                    <AiIcons.AiOutlineDown />
                  </Button>
                </li>
              </>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SurveyResults;
