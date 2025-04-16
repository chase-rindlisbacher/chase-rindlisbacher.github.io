import { useState, useRef, useEffect } from 'react';
import { HangmanGameState } from '../Types';
import "./Hangman.css"


// List of LOTR character names for the game
const lotrNames = ["aragorn", "frodo", "baggins", "elrond", "gandalf", "galadriel", "saruman", "sauron"];

export default function HangmanGame() {
    const [gameState, setGameState] = useState<HangmanGameState>({
      randomName: '',
      underScoredName: '',
      guesses: [],
      guessCount: 0,
      dictAlphabet: Array(26).fill(0), // 26 letters of the alphabet
      isWin: false,
      isGameOver: false,
      feedbackMessage: '', // User feedback message
    });
    const [inputValue, setInputValue] = useState(''); // State for input value
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        resetGame();
    },[]);
  
    const validGuess = (guess: string): boolean => {
      // Make sure the guess is a single letter and is valid
      while (!(/^[a-zA-Z]$/.test(guess)) || guess.length !== 1) {
        return false
      }
      return true;
    };
  
    // Start the game
    const resetGame = () => {
      const randomName = lotrNames[Math.floor(Math.random() * lotrNames.length)];
      const underScoredName = '_'.repeat(randomName.length);
      
      setGameState({
        randomName,
        underScoredName,
        guesses: [],
        guessCount: 0,
        dictAlphabet: Array(26).fill(0), // Reset alphabet
        isWin: false,
        isGameOver: false,
        feedbackMessage: '', // Clear feedback message when a new game starts
      });
      setInputValue(''); // Reset for starting new game.
      inputRef.current?.focus();
    };
  
    // Handle letter guess
    const handleGuess = (letter: string) => {
        if (letter === '') {
            setGameState(prevState => ({
                ...prevState,
                feedbackMessage: "Please make sure you guess a letter. Try again!"
            }))
            return 
        }
        if (gameState.isGameOver) return;
        
        const valid = validGuess(letter);
        
        if (valid != false) {
            // Check if the letter has already been guessed
            letter = letter.toLocaleLowerCase();
            if (gameState.guesses.includes(letter)) {
                setGameState(prevState => ({
                ...prevState,
                feedbackMessage: "You already guessed that letter. Try again!",
                }));
                return;
            }
        
            // Update guesses array
            const newGuesses = [...gameState.guesses, letter];
            const randomNameArray = [...gameState.randomName];
            let updatedUnderScoredName = gameState.underScoredName.split('');
            
            // Update the underscores based on the guess
            let letterFound = false;
            for (let i = 0; i < randomNameArray.length; i++) {
                if (randomNameArray[i] === letter) {
                updatedUnderScoredName[i] = letter;
                letterFound = true;
                }
            }
        
            // Provide feedback based on whether the letter was found or not
            const feedbackMessage = letterFound ? `"${letter}" was found!` : `"${letter}" is not in the word!`;
        
            // Check if the word has been guessed correctly
            const newUnderScoredName = updatedUnderScoredName.join('');
            const isWin = newUnderScoredName === gameState.randomName;
            updatedUnderScoredName = [];
        
            if (isWin) {
                setGameState(prevState => ({
                ...prevState,
                underScoredName: newUnderScoredName,
                guesses: newGuesses,
                guessCount: prevState.guessCount + 1,
                isWin: true,
                isGameOver: true,
                feedbackMessage: `Congratulations! You guessed the word in ${prevState.guessCount + 1} guesses!`,
                }));
            } else {
                setGameState(prevState => ({
                ...prevState,
                underScoredName: newUnderScoredName,
                guesses: newGuesses,
                guessCount: prevState.guessCount + 1,
                dictAlphabet: prevState.dictAlphabet.map((count) =>
                    prevState.randomName.includes(letter) ? count : 0 // Increase guess count if not repeated
                ),
                isGameOver: prevState.guessCount >= 20, // Game over after 20 incorrect guesses
                feedbackMessage, // Show feedback after each guess
                }));
            }
            setInputValue('');
            inputRef.current?.focus();
        }
        else {
            setGameState(prevState => ({
                ...prevState,
                feedbackMessage: "Please make sure your guess is a letter. Try again!"
            }))
            return 
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleGuess(inputValue);
        }
    };
    
    
    return (
        <div className='hangman'/* style={{backgroundImage:"url('/one-ring-timeline.avif')"}} */>
            <h1>Lord of the Rings Hangman</h1>
            <button onClick={resetGame}>Reset Game</button>
        
            {/* Game interface */}
            {!gameState.isGameOver && !gameState.isWin && (
                <>
                <p>Current word: {gameState.underScoredName.split('').join(' ')}</p> {/* Adds spaces between underscores */}
                <p>Guess Count: {gameState.guessCount}</p>
                <p>{gameState.feedbackMessage}</p> {/* Display feedback message */}
                <input
                    type="text"
                    maxLength={1}
                    value={inputValue} // Bind the input field to the inputValue state
                    onChange={(e) => setInputValue(e.target.value.toLowerCase())} // Update state with new guess
                    onKeyUp={handleKeyPress}
                    ref={inputRef}
                    disabled={gameState.isGameOver}
                />
                <button onClick={() => handleGuess(inputValue)} disabled={gameState.isGameOver}>Submit Guess</button>
                </>
            )}
        
            {/* Win or Game Over messages */}
            {gameState.isWin && <p>Congratulations, You won! The word was {gameState.randomName}.</p>}
            {gameState.isGameOver && !gameState.isWin && <p>Game over! The word was {gameState.randomName}.</p>}
        </div>
    );
};