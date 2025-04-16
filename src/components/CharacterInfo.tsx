import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // for routing params
import { useCharactersDataContext } from "../context/CharactersDataContextHook"; // Assuming you have context for characters
import { fetchCharactersQuotesAndMovies } from "../ServerApi"; // Function to fetch quotes and movies
import { Character } from "../Types"; // Your Character type
import './CharacterInfo.css'; // Import a separate CSS file for styling

export default function CharacterInfo() {
    const { characters } = useCharactersDataContext(); // Get all characters from context
    const [character, setCharacter] = useState<Character | null>(null); // Store selected character
    const { characterId } = useParams<{ characterId: string }>();  // Get characterId from URL params

    // Fetch character details when the component mounts
    useEffect(() => {
        if (characterId) {
            const selectedCharacter = characters.find(c => c._id === characterId);
            if (selectedCharacter) {
                // Fetch additional details (quotes, movies)
                fetchCharactersQuotesAndMovies(characterId, selectedCharacter).then((updatedCharacter) => {
                    setCharacter(updatedCharacter);
                });
            }
        }
    }, [characterId, characters]);

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
            </div>

            {/* Display quotes */}
            <h3>Famous Quotes</h3>
            <ul className="character-quotes">
                {character.quotes && character.quotes.length > 0 ? (
                    character.quotes.map((quote) => (
                        <li key={quote._id}>
                            <blockquote>{quote.dialog}</blockquote>
                            <p><em>- {quote.movie}</em></p>
                        </li>
                    ))
                ) : (
                    <li>No quotes available</li>
                )}
            </ul>

            {/* Display Movies Section */}
            <h3>Movies</h3>
            <ul className="character-movies">
                {character.movies && character.movies.length > 0 ? (
                    character.movies.map((movie) => (
                        <li key={movie._id}>
                            <p>{movie.name} ({movie.runtimeInMinutes} min) - ${movie.boxOfficeRevenueInMillions}M Box Office</p>
                        </li>
                    ))
                ) : (
                    <li>No movie information available</li>
                )}
            </ul>
        </div>
    );
}
