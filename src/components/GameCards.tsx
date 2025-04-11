import { GameCardProps } from "../Types";
import './GameCards.css'

export default function GameCard({gameName,gameImageUrl,gameDescription}: GameCardProps) {
    return (
        <div className="game-card">
            <img src={`${gameImageUrl}`} alt={gameName} />
            <h3>{gameName}</h3>
            <p>{gameDescription}</p>
        </div>
    );
}
