import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./auth";

const GuessTheNumberGame = () => {
    const [guess, setGuess] = useState('');
    const [currentStreak, setCurrentStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [message, setMessage] = useState('');
    const [guessesLeft, setGuessesLeft] = useState(3);
    const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;
    const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const [secretNumber, setSecretNumber] = useState(generateRandomNumber);

    useEffect(() => {
        const loadBestStreak = async () => {
            const best = await fetchBestStreak();
            setBestStreak(best);
        };

        loadBestStreak();
    },);


    const handleSubmit = async () => {
        const userGuess = parseInt(guess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            setMessage('Please enter a number between 1 and 10.');
            return;
        }

        if (userGuess === secretNumber) {
            setCurrentStreak(currentStreak + 1);
            setMessage('Correct! Starting a new round.');

            if (currentStreak + 1 > bestStreak) {
                setBestStreak(currentStreak + 1);
                await updateFirestoreStreak(currentStreak + 1);
            }

            resetGame(true);
        } else {
            setGuessesLeft(guessesLeft - 1);

            if (guessesLeft - 1 === 0) {
                setMessage(`Out of guesses! The number was ${secretNumber}. Your streak has been reset.`);
                resetGame(false);
            } else {
                setMessage(userGuess < secretNumber ? 'Your guess is smaller than the secret number.' : 'Your guess is larger than the secret number.');
            }
        }

        setGuess('');
    };

    const resetGame = (guessedCorrectly:boolean) => {
        setGuessesLeft(3);
        setSecretNumber(generateRandomNumber);

        if (!guessedCorrectly) {
            setCurrentStreak(0);
        }
    };

    const fetchBestStreak = async () => {
        try {
            const playerId = user?.email ?? "anonymous";
            if (!playerId) {
                console.error('User not logged in or missing displayName.');
                return 0;
            }
    
            const response = await fetch(`http://localhost:8080/player/${playerId}`);
            
            if (response.status === 404) {
                console.log(`Player ${playerId} not found, initializing with bestStreak = 0.`);
                await initializePlayerScore(playerId);
                return 0;
            }
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.score || 0; 
        } catch (error) {
            console.error('Failed to fetch best streak from Firestore:', error);
            return 0; 
        }
    };
    
    const initializePlayerScore = async (playerId: string): Promise<void> => {
        try {
            await fetch('http://localhost:8080/create-player', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId, score: 0 , name:user?.displayName}),
            });
            console.log(`Player ${playerId} initialized with a bestStreak of 0.`);
        } catch (error) {
            console.error('Failed to initialize player in Firestore:', error);
        }
    };

    const updateFirestoreStreak = async (newBestStreak:number) => {
        try {
            const playerId = user?.email??"anonymous";
            await fetch('http://localhost:8080/update-score', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({playerId,score: newBestStreak}),
            });
        } catch (error) {
            console.error('Failed to update score in Firestore:', error);
        }
    };

    return (
        <div className='text-center'>
            <h2>Guess the Number (1-10)</h2>
            <p>Current Streak: {currentStreak}</p>
            <p>Best Streak: {bestStreak}</p>
            <p>Guesses Left: {guessesLeft}</p>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>{message}</p>
        </div>
    );
};

export default GuessTheNumberGame;
