import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register({ navigation }) {
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
      <h1 className="text-center">Survey</h1>
      <p className="text-center">
        Hello This is the left section of the page.
        <br /> This will be a brief description of the survey website.
        <br />
        Section
      </p>
      <ul>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    </div>
  );
}

function RightHomeSection(navigation) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const doLogin = async (event) => {
    try {
      const obj = {
        userName: userName,
        password: password,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      if (res.error && res.error !== '') {
        console.log(message);
        setMessage('Username is taken, please try a different one.');
        console.log('help');
      } else {
        setMessage('');
        navigate('/home');
        console.log('me');

        const user = {
          userName: userName,
          Password: password,
        };
        localStorage.getItem('user_data', JSON.stringify(user));
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div>
      {/* Register User */}
      <h1 className="startTitle">Let's Get Started</h1>
      <p className="d-flex justify-content-center">
        Don't have an account?
        <button
          variant="link"
          onPress={() => navigation.navigate('register')}
        >
          CLick Here
        </button>
      </p>
      <div className="d-flex justify-content-center">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicFirst"
          ></Form.Group>
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
              doLogin();
            }}
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
