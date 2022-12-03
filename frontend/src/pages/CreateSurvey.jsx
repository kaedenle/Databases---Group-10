import React, { useState } from 'react';

//Bootstrap
import Form from 'react-bootstrap/Form';

//css
import '../css/create.scss';

//custom components
import CreateSurveyComponent from '../components/CreateSurveyComponent';
import Sidebar from '../components/Sidebar';
import QuestionContainer from '../components/QuestionContainer';

function CreateSurvey() {
  return (
    <>
      <Sidebar />
      <CreateSurveyComponent />
    </>
  );
}

export default CreateSurvey;
