import React, { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import '../css/Survey.scss';
import Sidebar from './Sidebar';

function Survey() {
  const answers = useRef([]);
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  var [answerList, setAnswerList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('Survey Title');

  //console.log(id);

  var user_data = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    question_list();
  }, [title]);

  //   useEffect(() => {
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
        answers.current = answers.current.slice(0, res.info.length);
        setAnswerList(new Array(res.info.length))
      }
    } catch (e) {
      alert(e.toString());
    }
  };
  //   }, []);

  async function handleQuestions() {
    if (!questionList) return;
    for (let i = 0; i < questionList.length; i++) {
      //set questionID and answer
      let questionID = questionList[i].questionID;
      let answer;
      if (answers.current[i]) answer = answers.current[i].target.value;
      try {
        //IN - questionID, takerID, answer (optional)
        const obj = {
          takerName: user_data.userName,
          questionID: questionID,
          answer: answer,
        };

        var js = JSON.stringify(obj);

        const response = await fetch('http://localhost:5000/answer', {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' },
        });

        let res = JSON.parse(await response.text());

        if (res.error && res.error !== '') {
          console.log(res.error);
          setMessage(res.error);
        } else {
          setMessage('');
        }
      } catch (e) {
        alert(e.toString());
      }
    }
  }

  const handleText = (text, array, index, e) => {
    const wordLimit = 200;
    const regEx = /\s+$/;
    let words = text.split(' ').filter(Boolean);
    if (words.length == wordLimit) {
      //if space at end
      if (regEx.test(text)) {
        //message that max count is 200 words goes here
        return;
      } else {
        array[index] = words.slice(0, wordLimit).join(' ')
        setAnswerList(array);
      }
    }
    else if (words.length > wordLimit) {
      //if backspaced on word (OLD vs NEW)
      if(answerList[index].length < text.length){
        array[index] = words.slice(0, wordLimit).join(' ')
        setAnswerList(array);
      }
      else{
        return
      }
      
    } else{
      array[index] = text
      setAnswerList(array);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="survey">
        <div className="d-flex justify-content-center align-items-center h-100 ">
          <div className="survey-display-container d-flex justify-content-center ">
            <div className="d-flex flex-column">
              <h2 className="text-center p-4 survey-title">{title}</h2>

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
                                id={data.questionID}
                                name="group1"
                                type={type}
                                value={1}
                                onClick={(el) => (answers.current[index] = el)}
                              />
                              <Form.Check
                                inline
                                label="2"
                                id={data.questionID}
                                name="group1"
                                type={type}
                                value={2}
                                onClick={(el) => (answers.current[index] = el)}
                              />
                              <Form.Check
                                inline
                                label="3"
                                id={data.questionID}
                                name="group1"
                                type={type}
                                value={3}
                                onClick={(el) => (answers.current[index] = el)}
                              />
                              <Form.Check
                                inline
                                label="4"
                                id={data.questionID}
                                name="group1"
                                type={type}
                                value={4}
                                onClick={(el) => (answers.current[index] = el)}
                              />
                              <Form.Check
                                inline
                                label="5"
                                id={data.questionID}
                                name="group1"
                                type={type}
                                value={5}
                                onClick={(el) => (answers.current[index] = el)}
                              />
                              <span>Strongly Agree</span>
                            </div>
                          ))}
                        </Form>
                      </div>
                    ) : (
                      <Form.Control
                        id={data.questionID}
                        placeholder="Response"
                        as="textarea"
                        rows={3}
                        className="w-75"
                        value = {answerList[index]}
                        onChange={(e) => {
                          e.preventDefault();
                          //auto resize when text comes in
                          e.target.style.height = 'inherit';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                          //keep under 200 words
                          let tempArray = answerList;

                          handleText(e.target.value, tempArray, index, e);
                          answers.current[index] = e;
                          answers.current[index].target.value = answerList[index];
                        }}
                        
                      ></Form.Control>
                    )}
                  </li>
                ))}
              </ol>
              <Button
                variant="dark"
                size="small"
                className="d-flex text-center m-3 submit-button"
                onClick={handleQuestions}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
