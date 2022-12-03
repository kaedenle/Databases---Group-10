import React, { useState } from 'react';

//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//css
import '../css/create.scss';

import thumbnail from '../assets/survey-thumbnail.png';
import QuestionContainer from './QuestionContainer';

function CreateSurvey() {
  const current = new Date();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [start, setStart] = useState(current);
  const [end, setEnd] = useState(current);

  const createSurvey = async (event) => {
    try {
      //IN - title, (userID or userName), description (optional),
      // period_start (optional), period_end

      const obj = {
        title: title,
        userName: 'userName',
        desciption: description,
        period_start: start,
        period_end: end,
      };

      var js = JSON.stringify(obj);

      const response = await fetch('http://localhost:5000/create_survey', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res);
    } catch (e) {
      alert(e.toString());
    }
  };

  return (
    <div className="create">
      <div className="container">
        <Form>
          <Form.Group
            className="mb-3 mt-5"
            controlId="formBasicFirst"
          >
            <Form.Control
              size="1x"
              style={{ fontSize: '40px', marginLeft: '20px' }}
              type="text"
              placeholder="Title"
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <img
            src={thumbnail}
            className="mt-5 "
            style={{ marginLeft: '20px' }}
            alt="Survey Thumbnail"
          />
          <Form.Group
            style={{ marginLeft: '20px' }}
            controlId="formFile"
            className="mb-3"
          >
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            style={{ marginLeft: '20px' }}
          >
            <Form.Label
              className="text-dark"
              style={{ fontSize: '25px' }}
            >
              Description:
            </Form.Label>
            <Form.Control
              placeholder="Description"
              as="textarea"
              rows={3}
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Label
            style={{ marginLeft: '20px' }}
            className="text-dark"
          >
            Start Date:
          </Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            className="mb-2"
            style={{ marginLeft: '20px' }}
            onChange={(e) => setStart(e.target.value)}
          />
          <Form.Label
            style={{ marginLeft: '20px' }}
            className="text-dark"
          >
            End Date:
          </Form.Label>
          <Form.Control
            style={{ marginLeft: '20px' }}
            className="mb-3"
            type="date"
            onChange={(e) => setEnd(e.target.value)}
          />
        </Form>

        <Button
          className="mb-3"
          style={{ marginLeft: '20px' }}
          variant="dark"
          onClick={createSurvey}
        >
          {' '}
          Create Survey
        </Button>
        <QuestionContainer />
      </div>
    </div>
  );
}
export default CreateSurvey;
