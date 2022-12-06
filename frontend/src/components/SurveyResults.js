import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

import Button from 'react-bootstrap/Button';

import '../css/Survey.scss';
import Sidebar from './Sidebar';
import AnswerList from './AnswerList';
import { PrintComponent } from './PrintComponent';

function SurveyResults() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [display, setDisplay] = useState(false);
  const componentRef = useRef();

  let numQuestions;

  var user_data = JSON.parse(localStorage.getItem('user_data'));
  // console.log(localStorage.getItem('user_data'));

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
        setTitle(res.title);
        numQuestions = res.questions.length;
        console.log(numQuestions);
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

  const delete_survey = async () => {
    //IN - questionID OR ((title AND username) AND question), page, per_page
    try {
      const obj = {
        surveyID: id,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/delete_survey', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      if (res.error && res.error !== '') {
        console.log(res.error);
        setMessage(message);
      } else {
        setMessage('');
        navigate('/Results');
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const handleToggle = () => {
    setDisplay((display) => !display);
  };
  const toEdit = () => {
    navigate('/EditSurveyPage', { state: { title: title } });
  };
  const toPrint = () => {
    navigate('/SurveyReport', { state: { id: id } });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Sidebar />
      <div className="edit">
        <div className="d-flex flex-inline justify-content-between">
          <h2 className="m-5">Survey Responses</h2>
          <div className="d-flex ">
            <div>
              <PrintComponent ref={componentRef} />
              <Button onClick={handlePrint}>Print this out!</Button>
            </div>

            <Button
              variant="dark"
              className="d-flex text-center m-5 "
              style={{ width: '10vw' }}
              onClick={toPrint}
            >
              Print Results
            </Button>
            <Button
              variant="dark"
              className="d-flex text-center m-5 "
              style={{ width: '10vw' }}
              onClick={toEdit}
            >
              Edit Survey
            </Button>
          </div>
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
                      handleToggle();
                    }}
                  >
                    <AiIcons.AiOutlineDown />
                  </Button>
                  {display ? (
                    <AnswerList
                      id={data.questionID}
                      type={data.type}
                    />
                  ) : (
                    ''
                  )}
                </li>
              </>
            ))}
          </ol>
        </div>
        <Button
          variant="dark"
          className="d-flex text-center m-5 position-absolute bottom-0 "
          style={{ width: '10vw' }}
          onClick={delete_survey}
        >
          Delete Survey
        </Button>
      </div>
    </div>
  );
}

export default SurveyResults;
