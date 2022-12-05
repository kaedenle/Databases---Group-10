import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function CreatedModal(props) {
  const navigate = useNavigate();

  const toEdit = () => {
    navigate('/EditSurveyPage', { state: { title: props.title } });
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Congrats!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully created a survey!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              toEdit();
            }}
          >
            Click Here to Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatedModal;
