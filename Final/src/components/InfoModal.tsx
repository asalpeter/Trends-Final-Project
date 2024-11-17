import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function InfoModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="m-5 d-flex flex-column bg-light">
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <Button variant="info" size="lg" onClick={handleShow}>
          How to Play
        </Button>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>How to Play Guess That Song</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ol className="pl-3">
              <li>Use the hints button to gain more information about the song.</li>
              <li>Try to guess the song's title.</li>
              <li>Type your guess into the input field.</li>
              <li>Submit your answer and see if you're correct!</li>
              <li>The less hints you use the more points you will earn.</li>
              <li>Log in or sign up to be included on the leaderboard.</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default InfoModal;