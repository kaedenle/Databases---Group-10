import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';

import '../css/Survey.scss';
import Sidebar from './Sidebar';

function Survey() {
  const [message, setMessage] = useState('');
  const [questionList, setquestionList] = useState([]);
  const { id } = useParams();

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
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="edit">
        <p className="m-4">hello</p>
        <Link
          to=".."
          relative="path"
        >
          Cancel
        </Link>
        <div>
          <h2>Now showing post {id}</h2>
        </div>
      </div>
    </div>
  );
}

export default Survey;
