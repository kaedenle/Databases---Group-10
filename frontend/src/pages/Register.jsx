import '../App.css';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

//Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import surveyImg from '../assets/surveyImg.png';

function Register() {
  return (
    <Container className="mw-100">
      <Row>
        <Col sm={7}>
          <LeftHomeSection />
        </Col>
        <Col
          sm={5}
          className="right_side"
        >
          <RightHomeSection />
        </Col>
      </Row>
    </Container>
  );
}

function LeftHomeSection() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center mt-5 mb-4">Survey Studies</h1>

      <p className="text-center">
        Hello! Love taking studies, need to create one?
        <br /> This is the place for you!
      </p>
      <img
        src={surveyImg}
        className="w-50"
        alt="Survey cartoon"
      />
      <ul style={{ listStyle: 'none', fontSize: '20px' }}>
        <li>Create</li>
        <li>Take</li>
        <li>Results</li>
      </ul>
    </div>
  );
}

function RightHomeSection({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const register = async (event) => {
    try {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage('Username is taken, please try a different one.');
      } else {
        setMessage('');
        navigate('/Home');

        const user = {
          userName: userName,
          password: password,
        };
        localStorage.setItem('user_data', JSON.stringify(user));
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div>
      {/* Register User */}
      <h1 className="text-center m-3 text-white">Let's Get Started</h1>
      <p className="d-flex justify-content-center text-white">
        Already have an Account?<span> </span>
        <Link
          variant="link"
          to="/Login"
          className="account-link"
        >
          Click Here
        </Link>
      </p>
      <div className="d-flex justify-content-center">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicFirst"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              size="1x"
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicLast"
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              size="1x"
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicUsername"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="1x"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                e.preventDefault();
                setUserName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              size="1x"
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="1x"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              register();
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
