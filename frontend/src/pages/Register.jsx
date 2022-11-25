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
    <Container className="mw-100">
      <Row>
        <Col sm={7}>
          <LeftHomeSection />
        </Col>
        <Col sm={5} className="right_side">
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

function RightHomeSection() {
  return (
    <div>
      {/* Register User */}
      <h2 class="startTitle">Let's Get Started</h2>
      <div className="d-flex justify-content-center">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicFirst">
            <Form.Label>First Name</Form.Label>
            <Form.Control size="1x" type="text" placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLast">
            <Form.Label>Last Name</Form.Label>
            <Form.Control size="1x" type="text" placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control size="1x" type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control size="1x" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control size="1x" type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
