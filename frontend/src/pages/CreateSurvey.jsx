import e from 'cors';
import React, { useState } from 'react';

//Bootstrap
import Form from 'react-bootstrap/Form';
//css
import '../css/create.css';

function CreateSurvey() {
  const [title, setTitle] = useState(false);
  const [name, setName] = useState('Title');
  let data = [
    {
      id: 1,
      name: 'test 1',
    },
    {
      id: 2,
      name: 'test 2',
    },
  ];
  return (
    <div className="create">
      {/* <h1 className="title">{title}</h1> */}
      <p>Hello</p>
    </div>
  );
}

export default CreateSurvey;
