/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { ReactNode, useState, useEffect } from "react";
import { CharactersDataContext } from "./CharactersData";
import { useFetchCharactersAndMoviesData } from "../ServerApi";
import { Character, Movie } from "../Types";

const CACHE_KEY_CHARACTERS = 'cached_characters';
const CACHE_KEY_MOVIES = 'cached_movies';

export function CharactersDataProvider({ children }: { children: ReactNode }) {
    const [cachedCharacters, setCachedCharacter] = useState<{ [key: string]: Character }> ({});
    const [cachedMovies, setCachedMovies] = useState<{ [key: string]: Movie }>({});
    const { characters, movies, isLoading } = useFetchCharactersAndMoviesData();
    // utilizing caching
    useEffect(() => {
        if (characters && characters.length > 0) {
            const charactersById = characters.reduce((acc, char) => {
                acc[char._id] = char;
                return acc;
            }, {} as { [key: string]: Character });
            setCachedCharacter(charactersById);
            localStorage.setItem(CACHE_KEY_CHARACTERS, JSON.stringify(charactersById));
        }
        if (movies && movies.length > 0) {
            const moviesById = movies.reduce((acc, movie) => {
              acc[movie._id] = movie;
              return acc;
            }, {} as { [key: string]: Movie });
            setCachedMovies(moviesById);
            localStorage.setItem(CACHE_KEY_MOVIES, JSON.stringify(moviesById));
        }
    }, [characters, movies]);

    useEffect(() => {
        const savedCharacters = localStorage.getItem(CACHE_KEY_CHARACTERS);
        const savedMovies = localStorage.getItem(CACHE_KEY_MOVIES);
        if (savedCharacters) {
            setCachedCharacter(JSON.parse(savedCharacters));
        }
        if (savedMovies) {
            setCachedMovies(JSON.parse(savedMovies));
          }
    }, []);
    return (
        <CharactersDataContext
            value={{
                characters,
                movies,
                cachedCharacters,
                cachedMovies,
                isLoading
            }}
        >
            {children}
        </CharactersDataContext>
    )
}