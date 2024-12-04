import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./auth";
import { Container, Table, Row, Col, Alert } from 'react-bootstrap';

type Player = {
  name: string;
  playerId: string;
  score: number;
};


const Board = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

  const loggedInUserId = user?.email??"anonymous";

  useEffect(() => {
    fetch('http://localhost:8080/leaderboard') // Correct route for JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);

        // Sort players by score in descending order
        const sortedData = data.sort((a: Player, b: Player) => b.score - a.score);

        // Set sorted players
        setPlayers(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
        setError(`Failed to fetch leaderboard: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
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
              <>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => {
                      const isLoggedInUser = player.playerId === loggedInUserId;
                      console.log(player.playerId);
                      console.log(loggedInUserId);


                      // Render top 10 or logged-in user's row
                      if (index < 10 || isLoggedInUser) {
                        return (
                          <tr key={player.playerId} className={isLoggedInUser ? 'table-info' : ''}>
                            <td>{index + 1}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                          </tr>
                        );
                      }

                      return null; // Do not render rows for other players outside top 10
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Board;
