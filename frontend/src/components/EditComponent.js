import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import thumbnail from '../assets/survey-thumbnail.png';
import QuestionContainer from './QuestionContainer';
import Question from './Question';

function EditSurveyPage(props) {
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  const [message, setMessage] = useState('');
  let survey_data;
  const [end, setEnd] = useState('');
  const [start, setStart] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [type, setType] = useState(1);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
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

        setTitle(res.title);
        setDescription(res.description);

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
  }, [title, description, start, end]);

  const create_question = async (event) => {
    //IN - (userName AND title) OR surveyID, question, type
    console.log('question: ' + question);
    console.log('type: ' + type);

    try {
      const obj = {
        title: title,
        userName: user_data.userName,
        question: question,
        type: type,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/create_question', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      let res = JSON.parse(await response.text());
      console.log(res);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage('');
      } else {
        setMessage('');
        console.log(message);
        handleToggle();
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const handleToggle = () => {
    setIsCreating((isCreating) => !isCreating);
  };

  function handleAddTask(newquestion, newtype) {
    setQuestion(newquestion);
    setType(newtype);
  }

  const question_list = async (event) => {
    try {
      //IN - title, userName

      const obj = {
        title: props.title,
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
        console.log(res);
        setQuestionList(questionList);
        console.log('questions: ' + questionList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <h1 className="">{title}</h1>
        <img
          src={thumbnail}
          alt="survey thumbnail"
          className="mb-4"
        />
        <h2>Description:</h2>
        <p> {description}</p>
        <h3>Questions:</h3>
        <Button
          variant="dark"
          className="w-75 mb-4"
          onClick={() => {
            question_list();
            handleToggle();
          }}
        >
          +
        </Button>

        {isCreating ? (
          <QuestionContainer onTaskFormSubmit={handleAddTask} />
        ) : (
          ''
        )}
        {isCreating ? (
          <div className="mb-3 w-75 d-flex justify-content-center">
            <Button
              variant="dark"
              size="md"
              className="w-75"
              onClick={() => {
                create_question();
              }}
            >
              Add
            </Button>
          </div>
        ) : (
          ''
        )}
        <Question />
      </div>
    </>
  );
}
export default EditSurveyPage;
