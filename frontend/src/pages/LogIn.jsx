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

// custom components
import LeftHomeSection from '../components/LeftHomeSection';

function Register() {
  return (
    <>
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
    </>
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
      } else {
        setMessage('');
        navigate('/Home');

        const user = {
          userName: userName,
          password: password,
        };
        localStorage.setItem('user_data', JSON.stringify(user));
        console.log(localStorage.getItem('user_data'));
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div>
      {/* Register User */}
      <h1 className="text-center m-4 text-white">Let's Get Started</h1>
      <p className="d-flex justify-content-center text-white">
        Don't have an Account?<span> </span>
        <Link
          variant="link"
          to="/"
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
          ></Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicUsername"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="1x"
              type="text"
              className="custom-form"
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
              className="custom-form"
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
            variant="dark"
            type="button"
            className="d-flex mx-auto"
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
