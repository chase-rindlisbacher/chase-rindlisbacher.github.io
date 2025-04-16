import { useState, useEffect, useRef } from 'react';
import { riddles } from '../Constants';
import './RiddleGame.css';

export default function RiddleGame() {
    const [gameState, setGameState] = useState({
        guessCount: 0,
        feedback: '',
        gameOver: false,
        isWin: false,
        userGuess: '',
        selectedRiddle: riddles[Math.floor(Math.random() * riddles.length)], // Initialize selected riddle
    });

    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus the input when the component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Function to handle guess submission
    const handleGuess = () => {
        setGameState(prevState => {
            const newGuessCount = prevState.guessCount + 1;
            let newFeedback = '';
            let isGameOver = prevState.gameOver;
            let isWin = prevState.isWin;

            if (prevState.userGuess.trim().toLowerCase() === prevState.selectedRiddle.answer) {
                isWin = true;
                newFeedback = 'Bah, it cheats us! No meal for Gollum!';
                isGameOver = true;
            } else if (newGuessCount < 3) {
                newFeedback = `Nope, try again! You have ${3 - newGuessCount} guesses remaining.`;
            } else {
                isWin = false;
                newFeedback = 'Yay! Gollum was hungry, you\'ll do!';
                isGameOver = true;
            }

            return {
                ...prevState,
                guessCount: newGuessCount,
                feedback: newFeedback,
                gameOver: isGameOver,
                isWin: isWin,
                userGuess: '',
            };
        });
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameState(prevState => ({
            ...prevState,
            userGuess: e.target.value,
        }));
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    };

    // Function to reset the game
    const resetGame = () => {
        setGameState({
            guessCount: 0,
            feedback: '',
            gameOver: false,
            isWin: false,
            userGuess: '',
            selectedRiddle: riddles[Math.floor(Math.random() * riddles.length)], // Reset to a new riddle
        });
    };

    return (
        <div className="riddle-game-container">
            <h1>Lord of the Rings: Riddle Game</h1>

            {/* Riddle and Feedback Section */}
            <div className="riddle-display">
                <p className="riddle-text">{gameState.selectedRiddle ? gameState.selectedRiddle.riddle : "Loading riddle..."}</p>

                {/* Always display feedback message after each guess */}
                <p className="feedback-message">{gameState.feedback}</p>

                {gameState.gameOver ? (
                    <div className="game-result">
                        {gameState.isWin ? (
                            <p className="win-message">Congratulations, you solved the riddle!</p>
                        ) : (
                            <p className="lose-message">Gollum's hunger wins this time, better luck next time!</p>
                        )}
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            value={gameState.userGuess}
                            onChange={handleChange}
                            placeholder="Enter your guess..."
                            className="riddle-input"
                            ref={inputRef}
                            onKeyUp={handleKeyPress}
                        />
                        <button className="submit-button" onClick={handleGuess}>Submit Guess</button>
                        <p>{`Guess Count: ${gameState.guessCount}`}</p>
                    </>
                )}
            </div>

            {/* Reset Game Button */}
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
}
