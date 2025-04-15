import './GameCards.css';
import { Link } from "react-router-dom";

export default function GameCards() {
    const gameData = [
        {
            gameLink: 'characterInfoHome',
            gameName: 'LOTR Character Info',
            gameDescription: `This game allows you to learn about your favorite Lord of the Rings Characters. Search the character you'd like to learn more about and view information about their
                              life, a link to their LOTR wiki page, and many of their quotes from the movies.`,
            gameImageUrl: '/LOTR-wiki-image.png'
        },
        {
            gameLink: 'hangman',
            gameName: 'LOTR Hangman',
            gameDescription: "Play Lord of the Rings themed hangman. You have up to 7 mistakes to make before you send a hero to their death. Guess the character first name before then so they can survive.",
            gameImageUrl: '/lotr-hangman-image.jpg'
        }
    ];
    return (
        // <div className="game-card">
            
        //     <img src={`${gameImageUrl}`} alt={gameName} />
        //     <h3>{gameName}</h3>
        //     <p>{gameDescription}</p>
        // </div>
        <div className="game-cards-container">
            {gameData.map((game) => (
                <div key={`gc${game.gameLink}`} className="game-card">
                    <Link to={`/${game.gameLink}`}>
                        <img src={game.gameImageUrl} alt={game.gameName} />
                        <h3>{game.gameName}</h3>
                        <p>{game.gameDescription}</p>
                    </Link>  {/* Link to show detailed game */}
                </div>
            ))}
        </div>
    );
}
