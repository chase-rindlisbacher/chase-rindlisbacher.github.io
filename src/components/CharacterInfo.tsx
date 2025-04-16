import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // for routing params
import { useCharactersDataContext } from "../context/CharactersDataContextHook"; // Assuming you have context for characters
import { fetchCharactersQuotesAndMovies } from "../ServerApi"; // Function to fetch quotes and movies
import { Character, Movie } from "../Types"; // Your Character type
import './CharacterInfo.css'; // Import the CSS for styling

export default function CharacterInfo() {
    const { characters, cachedCharacters, movies } = useCharactersDataContext(); // Get all characters from context
    const [character, setCharacter] = useState<Character | null>(null); // Store selected character
    const [characterMovies, setCharacterMovies] = useState<Movie[] | null>(null);
    const { characterId } = useParams<{ characterId: string }>(); // Get characterId from URL params
    const [showQuotes, setShowQuotes] = useState(false); // State for toggling quotes section
    const [showMovies, setShowMovies] = useState(false); // State for toggling movies section

    // Fetch character details when the component mounts
    useEffect(() => {
        if (characterId) {
            const selectedCharacter = characters.find(c => c._id === characterId);
            if (selectedCharacter) {
                // Fetch additional details (quotes, movies) or retrieve from cache
                const cachedCharacter = cachedCharacters[selectedCharacter._id];
                if (!cachedCharacter) {
                    fetchCharactersQuotesAndMovies(characterId, selectedCharacter, movies).then(({ character, characterMovies }) => {
                        setCharacter(character);
                        setCharacterMovies(characterMovies); // Set the movies associated with this character
                    });
                }
                else {
                    fetchCharactersQuotesAndMovies(characterId, cachedCharacter, movies).then(({ characterMovies }) => {
                        setCharacter(cachedCharacter);
                        setCharacterMovies(characterMovies);
                    })
                }
            }
        }
    }, [characterId, characters, movies, cachedCharacters]);

    // Show loading state if character data is not yet loaded
    if (!character) {
        return <div>Loading character details...</div>;
    }

    return (
        <div className="character-info">
            <h1>{character.name}</h1>

            {/* Character Details Section */}
            <div className="character-details">
                <p><strong>Race:</strong> {character.race || "N/A"}</p>
                <p><strong>Birth:</strong> {character.birth || "N/A"}</p>
                <p><strong>Gender:</strong> {character.gender || "N/A"}</p>
                <p><strong>Death:</strong> {character.death || "N/A"}</p>
                <p><strong>Hair:</strong> {character.hair || "N/A"}</p>
                <p><strong>Height:</strong> {character.height || "N/A"}</p>
                <p><strong>Realm:</strong> {character.realm || "N/A"}</p>
                <p><strong>Spouse:</strong> {character.spouse || "N/A"}</p>
                {/* Conditionally render the wikiUrl link if it exists */}
                {character.wikiUrl ? (
                <p>
                    <a href={character.wikiUrl} target="_blank" rel="noopener noreferrer">
                    <strong>LOTR Wiki Link:</strong> {character.wikiUrl}
                    </a>
                </p>
                ) : null}
            </div>

            {/* Toggle Button for Quotes */}
            <button
                className="toggle-button"
                onClick={() => setShowQuotes(!showQuotes)}
            >
                {showQuotes ? "▲ Hide Quotes" : "▼ Show Quotes"}
            </button>

            {/* Quotes Section */}
            <div className={`character-quotes ${showQuotes ? "" : "collapsed"}`}>
                <h3><strong>Character's Quotes:</strong></h3>
                <ul className="character-quotes">
                {character.quotes && character.quotes.length > 0 ? (
                    character.quotes.map((quote) => (
                    <li key={`cq${quote._id}`}>
                        <blockquote>"{quote.dialog}"</blockquote>
                        <p><em>- {quote.movie}</em></p>
                    </li>
                    ))
                ) : (
                    <li>No quotes available</li>
                )}
                </ul>
            </div>

            {/* Toggle Button for Movies */}
            <button
                className="toggle-button"
                onClick={() => setShowMovies(!showMovies)}
            >
                {showMovies ? "▲ Hide Movies" : "▼ Show Movies"}
            </button>

            {/* Movies Section */}
            <div className={`character-movies ${showMovies ? "" : "collapsed"}`}>
                <h3><strong>Movies Appearances</strong></h3>
                <ul className="character-movies">
                {characterMovies && characterMovies.length > 0 ? (
                    characterMovies.map((movie) => (
                    <li key={`cm${movie._id}`}>
                        <p>{movie.name} ({movie.runtimeInMinutes} min) - ${movie.boxOfficeRevenueInMillions}M Box Office</p>
                    </li>
                    ))
                ) : (
                    <li>No movie information available</li>
                )}
                </ul>
            </div>
        </div>
    );
}
