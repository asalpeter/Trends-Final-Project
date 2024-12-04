import express, { Express } from "express";
import cors from 'cors';
import { db } from "./firebase";

const app: Express = express();

const hostname = "0.0.0.0"
const port = 8080;

app.use(express.json());
app.use(cors());


type Player = {
  id: number;
  name: string;
  score: number;
};

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboardRef = db.collection("leaderboard");
    const snapshot = await leaderboardRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No data found" });
    }

    const players = snapshot.docs.map((doc) => doc.data());
    
    res.json(players)
  } catch (error) {
    console.error("Error fetching leaderboard from Firebase:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put('/update-score', async (req, res) => {
  const {playerId ,score} = req.body; // Get score and name from the request body

  if (!score) {
    res.status(400).send({ message: 'Score is required' });
    return;
  }

  try {
    const playerRef = db.collection('leaderboard').doc(playerId);

    // Update the player document using set() with merge to avoid overwriting other fields
    await playerRef.set(
      {
        score: score,               // Update score
      },
      { merge: true } // Ensure we don't overwrite other existing fields in the document
    );

    res.status(200).send({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating Firestore:', error);
    res.status(500).send({ message: 'Failed to update score' });
  }
});



app.get('/player/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const playerRef = db.collection('leaderboard').doc(id);
    const doc = await playerRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const playerData = doc.data();
    res.status(200).json(playerData); // Send player data including bestStreak
  } catch (error) {
    console.error('Error fetching player data:', error);
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});


app.post('/create-player', async (req, res) => {
  const { playerId, score, name} = req.body;
  try {
    // Create or update a document in the "leaderboard" collection using playerId
    await db.collection('leaderboard').doc(playerId).set({
      name: name || 'Anonymous', // Use default name if not provided
      score: score,
      playerId : playerId,
    });

    res.status(201).send({ message: 'Player created successfully' });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).send({ message: 'Failed to create player' });
  }
});

app.listen(port, hostname, () => {
  console.log("Listening");
});

