import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Alert, Button } from 'react-bootstrap';

const Board = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockPlayers = [
        { rank: 1, name: 'Alice', score: 1500 },
        { rank: 2, name: 'Bob', score: 1450 },
        { rank: 3, name: 'Charlie', score: 1400 },
        { rank: 4, name: 'David', score: 1350 },
        { rank: 5, name: 'Eve', score: 1300 },
      ];

      const success = true;

      if (success) {
        setIsLoading(false);
      } else {
        setError('Failed to load leaderboard data.');
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-center mb-4">Leaderboard</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
              <div className="text-center">Loading leaderboard...</div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key="1">
                      <td>1</td>
                      <td>Amit</td>
                      <td>125</td>
                      <td>
                        <Button variant="info" size="sm">
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Board;