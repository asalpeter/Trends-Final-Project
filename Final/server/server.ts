import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

// These are mock api requests for the general requests we will need to construct and update our game leaderboard

app.get('/scores', async (req, res) => {
  try {
    const scoresRef = ref(db, 'scores');
    const snapshot = await get(scoresRef);
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/scores', async (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== 'number') {
    return res.status(400).send('Invalid input');
  }

  try {
    const userRef = ref(db, `scores/${username}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return res.status(400).send('User already exists. Use PUT to update.');
    } else {
      await set(userRef, { score });
      res.status(201).send('Score added successfully');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/scores/:username', async (req, res) => {
  const { username } = req.params;
  const { score } = req.body;

  if (!username || typeof score !== 'number') {
    return res.status(400).send('Invalid input');
  }

  try {
    const userRef = ref(db, `scores/${username}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      await update(userRef, { score });
      res.send('Score updated successfully');
    } else {
      res.status(404).send('User not found. Use POST to add.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/scores/:username', async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send('Invalid input');
  }

  try {
    const userRef = ref(db, `scores/${username}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      await remove(userRef);
      res.send('User account deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});