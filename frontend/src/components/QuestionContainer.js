import React, { useState } from 'react';

//Bootstrap
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

import '../css/create.scss';

function QuestionContainer({ onTaskFormSubmit }) {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState(1);

  function handleSubmit(e) {
    console.log(question + ' ' + type);
    e.preventDefault();
    onTaskFormSubmit(question, type); // call the prop callback
    setType(1);
    setQuestion(''); // reset the input field so it's blank
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Question"
            as="textarea"
            rows={3}
            className="w-75"
            onChange={(e) => {
              e.preventDefault();
              setQuestion(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        {['radio'].map((type) => (
          <div
            key={`inline-${type}`}
            className="mb-3 w-75 d-flex justify-content-center"
          >
            <Form.Check
              inline
              label="1-5 Rating"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
              onClick={() => setType(1)}
            />{' '}
            <Form.Check
              inline
              label="Text Input"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              onClick={() => setType(2)}
            />
          </div>
        ))}
        <Button onClick={handleSubmit}>Add</Button>
      </Form>
    </>
  );
}

export default QuestionContainer;
