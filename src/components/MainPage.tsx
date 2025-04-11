import GameCard from "./GameCards";
import PageBanner from "./PageBanner";
import './GameCards.css'

export default function MainPage() {
    const gameData = [
        {
            gameName: 'LOTR Character Info',
            gameDescription: `This game allows you to learn about your favorite Lord of the Rings Characters. Search the character you'd like to learn more about and view information about their
                              life, a link to their LOTR wiki page, and many of their quotes from the movies.`,
            gameImageUrl: '../assets/LOTR-wiki-image.jpg'
        },
        {
            gameName: 'LOTR Hangman',
            gameDescription: "Play Lord of the Rings themed hangman. You have up to 7 mistakes to make before you send a hero to their death. Guess the character first name before then so they can survive.",
            gameImageUrl: '../assets/lotr-hangman-image'
        }
    ]
    return (
        <main>
            <PageBanner />
            <div className="game-cards-container">
                {gameData.map((game, index) => (
                    <GameCard
                        key={`gc${index}`}
                        gameName={game.gameName}
                        gameDescription={game.gameDescription}
                        gameImageUrl={game.gameImageUrl}
                    />
                ))}
            </div>
        </main>
    )
}