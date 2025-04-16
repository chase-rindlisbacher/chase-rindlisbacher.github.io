import { useState, useEffect, useRef } from "react";
import { useCharactersDataContext } from "../context/CharactersDataContextHook"; // Assuming you have context for characters
import { Character } from "../Types";
import { Link } from "react-router-dom";
import "./CharacterInfoHome.css"

export default function CharacterInfoHome() {
  const { characters, isLoading } = useCharactersDataContext(); // Get all characters from context
  const [searchTerm, setSearchTerm] = useState<string>(""); // Local state for the search term
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]); // Filtered characters based on search
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCharacters([]); // Clear results when searchTerm is empty
    }
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  if (isLoading) {
    return <div className="character-info-home">Loading characters...</div>;
  }

  return (
    <div className="character-info-home">
        <h1>Search for a Character</h1>
        <input
            type="text"
            placeholder="Search by character name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            ref={inputRef}
        />
        {searchTerm && (
            <ul className="character-list">
            {filteredCharacters.length > 0 ? (
                filteredCharacters.map((character) => (
                    <Link className="link" to={`/characterInfo/${character._id}`}>
                        <li key={`cih${character._id}`} className="character-item">
                            {/* Use Link to navigate to the character's detailed info page */}
                            {character.name}
                        </li>
                    </Link>
                ))
            ) : (
                <li className="no-results">No characters found</li>
            )}
            </ul>
        )}
    </div>
  );
}
