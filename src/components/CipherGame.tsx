import { useState, useEffect, useRef } from 'react';
import './CipherGame.css'; // Import the CSS for styling

export default function CipherGame() {
    const [cipher1Answer, setCipher1Answer] = useState<number | null>(null);
    const [cipher2Answer, setCipher2Answer] = useState<number | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);

    const [userGuess, setUserGuess] = useState<string>(''); // User input
    const inputRef = useRef<HTMLInputElement>(null); // Reference to the input field
    const inputRef2 = useRef<HTMLInputElement>(null);

    // Handle input validation (only allows numeric answers)
    const validAnswer = (response: string): number => {
        const parsedResponse = parseInt(response);
        if (!isNaN(parsedResponse)) {
            return parsedResponse;
        }
        return NaN;
    };

    // Check the solution, and provide feedback if incorrect
    const checkSolution = (answer: number, response: number): boolean => {
        if (response === answer) {
            setFeedbackMessage("")
            return true;
        } else {
            setFeedbackMessage("That's incorrect, try again.");
            return false;
        }
    };

    // Handle the first cipher question
    const handleCipher1 = (response: string) => {
        const parsedResponse = validAnswer(response);
        if (!isNaN(parsedResponse)) {
            const isCorrect = checkSolution(20, parsedResponse);
            if (isCorrect) {
                setCipher1Answer(parsedResponse);
                setUserGuess('');
                inputRef2.current?.focus();
            }
        }
    };

    // Handle the second cipher question
    const handleCipher2 = (response: string) => {
        const parsedResponse = validAnswer(response);
        if (!isNaN(parsedResponse)) {
            const isCorrect = checkSolution(1, parsedResponse);
            if (isCorrect) {
                setCipher2Answer(parsedResponse);
                setGameCompleted(true); // End the game after second question is correct
            }
        }
    };

    // Reset the game
    const resetGame = () => {
        setCipher1Answer(null);
        setCipher2Answer(null);
        setFeedbackMessage('');
        setGameCompleted(false);
        setUserGuess('');
    };

    useEffect(() => {
        // Reset the game when it's first rendered
        resetGame();
    }, []);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserGuess(e.target.value);
    };

    // Handle pressing Enter or clicking submit button
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit(userGuess);
        }
    };

    const handleSubmit = (answer: string) => {
        if (cipher1Answer === null) {
            handleCipher1(answer); // Handle first cipher question
        } else if (cipher2Answer === null && cipher1Answer !== null) {
            handleCipher2(answer); // Handle second cipher question
        }
    };

    return (
        <div className="cipher-game-container">
            <h1>Lord of the Rings: Cipher Game</h1>

            {/* Cipher Question 1 */}
            {!cipher1Answer && !gameCompleted && (
                <>
                    <p className="game-text">
                        Sauron gave 9 rings to men, 7 to the dwarves, 3 to the elves, and he crafted the 1 master ring.
                    </p>
                    <p className="game-text">How many rings were crafted total?</p>
                    <input
                        type="text"
                        value={userGuess}
                        onChange={handleChange}
                        placeholder="Enter your answer..."
                        className="riddle-input"
                        ref={inputRef}
                        onKeyUp={handleKeyPress}
                    />
                    <button className="submit-button" onClick={() => handleSubmit(userGuess)}>Submit Guess</button>
                    <p className="feedback-message">{feedbackMessage}</p>
                </>
            )}

            {/* Cipher Question 2 */}
            {cipher1Answer && !cipher2Answer && !gameCompleted && (
                <>
                    <p className="game-text">
                        There looks to be one more problem...
                        <br />
                        Sauron has the 9 Nazgul, his foes had the 5 wizards, but one dissented from them to serve the Dark Lord.
                    </p>
                    <p className="game-text">
                        If each of the wizards that oppose Sauron defeat 2 Nazgul, how many Nazgul will remain?
                    </p>
                    <input
                        type="text"
                        value={userGuess}
                        onChange={handleChange}
                        placeholder="Enter your answer..."
                        className="riddle-input"
                        ref={inputRef2}
                        onKeyUp={handleKeyPress}
                    />
                    <button className="submit-button" onClick={() => handleSubmit(userGuess)}>Submit Guess</button>
                    <p className="feedback-message">{feedbackMessage}</p>
                </>
            )}

            {/* Final Message */}
            {gameCompleted && (
                <>
                <p className="game-text">
                    The solutions were {cipher1Answer} and {cipher2Answer}.
                </p>
                </>
            )}

            {/* Reset Game Button */}
            <button className="reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
}
