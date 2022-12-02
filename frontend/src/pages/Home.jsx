import React from 'react';

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
  return (
    <div className="home">
      <Sidebar />
      <h1 className="home-title"> Active Title</h1>
      <hr className="header" />
      <Container fluid>
        {/* This is where You will adjust to make it dynamic and add data of survey
        This is for basic format */}
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
          <Col style={{ marginTop: '20px' }}>
            <h3>Survey Title</h3>
            <p> This will be the description of the survey</p>
          </Col>
        </Row>
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
          <Col style={{ marginTop: '20px' }}>
            <h3>Survey Title</h3>
            <p> This will be the description of the survey</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
