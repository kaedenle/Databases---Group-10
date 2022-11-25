import "../App.css";
import React from "react";

//Bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register() {
  return (
    <Container>
      <Row>
        <Col>
          <LeftHomeSection />
        </Col>
        <Col>
          <RightHomeSection />
        </Col>
      </Row>
    </Container>
  );
}

function LeftHomeSection() {
  return (
    <div>
      <h1>Survey</h1>
      <p>
        Hello This is the left section of the page. This will be a brief
        description of the survey website.
        <br />
        Section
        <ul>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
        </ul>
      </p>
    </div>
  );
}

function RightHomeSection() {
  return (
    <div>
      {/* Register User */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicFirst">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLast">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
