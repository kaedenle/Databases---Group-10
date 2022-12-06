import React, { useEffect, useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import thumbnail from '../assets/survey-thumbnail.png';
import Question from './Question';
const fakeApi = () => console.log('Api is called');

function EditSurveyPage(props) {
  var user_data = JSON.parse(localStorage.getItem('user_data'));
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [type, setType] = useState(1);
  const [questionList, setQuestionList] = useState([]);
  const [surveyID, setSurveyID] = useState('');
  const [part, setPart] = useState('');
  const [partList, setPartList] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(null);

  const inputChanged = (e) => {
    setInputValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      fakeApi();
    }, 500);

    setTimer(newTimer);
  };

  useEffect(() => {
    getSurvey();
    question_list();
  }, [title, questionList]);

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
      setSurveyID(res.surveyID);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        console.log(res);
        setPartList(res.emailList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

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
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const add_participants = async (email) => {
    console.log('question: ' + question);
    console.log('type: ' + type);
    //IN - part_emails, surveyID OR (userID (creator's) and title)

    try {
      const obj = {
        part_emails: [email],
        surveyID: surveyID,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/add_participants', {
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
        const newList = partList.concat(part);
        setPartList(newList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const handleToggle = () => {
    setIsCreating((isCreating) => !isCreating);
  };

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
        setQuestionList(res.info);
        console.log(questionList);
      }
    } catch (e) {
      alert(e.toString());
    }
  };
  question_list();

  function handleQuestion(e) {
    setQuestion(e.target.value);
  }

  function handleChange(event) {
    setPart(event.target.value);
  }

  function handleAdd() {
    if (part === '') return;
    console.log('on it ' + part);
    add_participants(part);
    setPart('');
  }

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
        {!isCreating ? (
          <Button
            variant="dark"
            className="w-75 mb-4"
            onClick={() => {
              handleToggle();
            }}
          >
            +
          </Button>
        ) : (
          <Button
            variant="dark"
            className="w-75 mb-4"
            onClick={() => {
              create_question();
              handleToggle();
            }}
          >
            Add
          </Button>
        )}

        {/* Adding questions component */}
        {isCreating ? (
          <>
            <Form>
              <Form.Group>
                <Form.Control
                  placeholder="Question"
                  as="textarea"
                  rows={3}
                  className="w-75"
                  onChange={handleQuestion}
                  required
                ></Form.Control>
              </Form.Group>
              {['radio'].map((type) => (
                <div
                  key={`inline-${type}`}
                  className="mb-3 w-75 d-flex justify-content-center"
                >
                  <Form.Check
                    inline
                    label="1-5 Rating"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={() => setType(1)}
                  />{' '}
                  <Form.Check
                    inline
                    label="Text Input"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    onChange={() => setType(2)}
                  />
                </div>
              ))}
            </Form>
          </>
        ) : (
          ''
        )}

        <ul className="list-group">
          {questionList.map((data) => (
            <li
              className="list-group-item"
              key={data.id}
            >
              <p>question:{data.question}</p>
              <p>type: {data.type}</p>
            </li>
          ))}
        </ul>
        <h3>Participants:</h3>
        <input
          type="text"
          value={part}
          className="mb-3"
          onChange={handleChange}
        />
        <div className="d-flex justify-content-between">
          <Button
            variant="dark"
            className="w-50 mb-4"
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </Button>
        </div>

        <h4>Email List:</h4>
        <ul stlye={{ margin: '0px', padding: '0' }}>
          {partList.map((item, index) => (
            <div
              className="participant"
              key={index}
            >
              {item}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
export default EditSurveyPage;
