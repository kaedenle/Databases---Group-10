import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import thumbnail from '../assets/survey-thumbnail.png';

// CSS
import '../App.css';
import '../css/home.css';
import Sidebar from '../components/Sidebar';

function Home() {
  var user_data = JSON.parse(localStorage.getItem('user_data'));

  const [surveyList, setSurveyList] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const get_participant_surveys = async (event) => {
      try {
        //IN - userName, page (optional = 0), per_page (optional = 10), active (optional = true)

        const obj = {
          userName: user_data.userName,
        };

        var js = JSON.stringify(obj);

        const response = await fetch(
          'http://localhost:5000/list_participant_survey',
          {
            method: 'POST',
            body: js,
            headers: { 'Content-Type': 'application/json' },
          }
        );

        let res = JSON.parse(await response.text());
        //console.log(res);

        if (res.error && res.error !== '') {
          console.log(message);
          setMessage(message);
        } else {
          setMessage('');
          setSurveyList(res.info);
        }
      } catch (e) {
        alert(e.toString());
      }
    };
    get_participant_surveys();
  }, [surveyList, message]);
  return (
    <>
      <Sidebar />
      <div className="home">
        <h1 className="m-4 text-center"> Participate</h1>
        <hr className="header" />
        <Container fluid>
          {/* This is where You will adjust to make it dynamic and add data of survey
    This is for basic format */}
          {surveyList.map((data) => (
            <li
              className="list-group-item"
              key={data.surveyID}
            >
              <Row className="add-space">
                <Col
                  md={3}
                  className="text-center"
                >
                  <img
                    src={thumbnail}
                    className="thumbnail"
                    alt="survey thumbnail"
                  />
                </Col>
                <Col
                  md={5}
                  style={{ marginTop: '20px' }}
                >
                  <Link
                    className="text-dark"
                    to={`/TakeSurvey/${data.surveyID}`}
                  >
                    {data.title}
                  </Link>
                  <p>{data.description}</p>
                </Col>
              </Row>
            </li>
          ))}
        </Container>
      </div>
    </>
  );
}

export default Home;

// {
//   surveyList.map((data) => (
//     <li
//       className="list-group-item"
//       key={data.id}
//     >
//       <Link
//         className="text-dark survey-link"
//         to={`/Results/${data.title}`}
//       >
//         {data.title}
//       </Link>
//       <p>Description: {data.description}</p>
//       <p>Start: {formatDate(data.period_start)}</p>
//       <p>End: {formatDate(data.period_end)}</p>
//     </li>
//   ));
// }
