// CharacterInfoHome.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Use location to read the query params for the search term
import { useCharactersDataContext } from "../context/CharactersDataContextHook"; // Assuming you have context for characters
import { Character } from "../Types";

export default function CharacterInfoHome() {
    const { characters, isLoading } = useCharactersDataContext(); // Get all characters from context
    const [searchTerm, setSearchTerm] = useState<string>(""); // Local state for the search term
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters); // Filtered characters based on search

    const location = useLocation(); // To read the current URL (useful for search term or any other params)
    console.log(location);
    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter characters by name based on search term (case insensitive)
        const filtered = characters.filter((character) =>
            character.name?.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    if (isLoading) {
        return <div>Loading characters...</div>;
    }

    return (
        <div>
            <h1>Search for a Character</h1>
            <input
                type="text"
                placeholder="Search by character name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul>
                {filteredCharacters.length > 0 ? (
                    filteredCharacters.map((character) => (
                        <li key={character._id}>
                            <a href={`#characterInfo/${character._id}`}>
                                {character.name}
                            </a>
                        </li>
                    ))
                ) : (
                    <li>No characters found</li>
                )}
            </ul>
        </div>
    );
}
