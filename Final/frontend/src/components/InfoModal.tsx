import { useState } from 'react';
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
            <Modal.Title>How to Play Guess That Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ol className="pl-3">
              <li>Guess a number from 1-10.</li>
              <li>You will recieve a hint telling you if the secret number is lower or higher.</li>
              <li>You have three chances to guess correctly.</li>
              <li>The more correct guesses in a row the higher your streak.</li>
              <li>Log in or sign up to be included on the streak leaderboard.</li>
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