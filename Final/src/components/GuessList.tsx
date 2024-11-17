import React, { useState } from 'react';

const GuessList = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleInputChange = (event: any) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (guess.trim()) {
      setGuesses((prevGuesses) => [...prevGuesses, guess]);
      setGuess(''); 
    }
  };

  return (
    <div style={{textAlign:"center"}} className='bg-light'>
      <h1 className='display-3 justify-content-center justify-content-sm-end'>Guesses</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type guess here:
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            placeholder="Enter a guess"
          />
        </label>
        <button type="submit">Add Guess</button>
      </form>
      
      <ul className='list-group' style={{width:"40em", margin:"auto"}}>
        {guesses.map((guess, index) => (
          <li className='list-group-item' key={index}>
            Guess #{index + 1}: {guess}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuessList;