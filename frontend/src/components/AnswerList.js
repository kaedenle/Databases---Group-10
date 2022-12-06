import React, { useState, useEffect, useRef } from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

function AnswerList(props) {
  const [message, setMessage] = useState('');
  const [surveyList, setSurveyList] = useState([]);
  const [title, setTitle] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(0);
  const id = props.id;
  const type = props.type;

  useEffect(() => {
    handleQuestion();
  }, []);

  const handleQuestion = () => {
    if (type === 1) {
      get_stats();
    } else if (type === 2) {
      get_answer();
    }
  };

  const get_stats = async (event) => {
    //IN - questionID OR ((title AND username) AND question), page, per_page
    try {
      const obj = {
        questionID: props.id,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/get_stats', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res.info);

      if (res.error && res.error !== '') {
        // console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        setMean(res.info['mean']);
        setVariance(res.info['variance']);
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  const get_answer = async (event) => {
    //IN - questionID OR ((title AND username) AND question), page, per_page
    try {
      const obj = {
        questionID: props.id,
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
        // console.log(message);
        setMessage(message);
      } else {
        setMessage('');
        setAnswers(res.result_answers);
        console.log('stat' + JSON.stringify(answers));
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <>
      <div>
        {type === 1 ? (
          <p>
            Mean: {mean} Variance: {variance}
          </p>
        ) : (
          ''
        )}
        <ListGroup>
          {answers.map((data, index) => (
            <>
              <ListGroupItem
                key={data}
                className="w-75"
              >
                {data.answer}
              </ListGroupItem>
            </>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default AnswerList;
