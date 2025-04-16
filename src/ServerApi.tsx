/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { useEffect, useState } from "react";
import { Character, ApiCharacterResponse, ApiQuoteResponse, ApiMovieResponse, Movie } from "./Types";

/*----------------------------------------------------------------------
 *                      CONSTANTS
 */
const URL_BASE = 'https://the-one-api.dev/v2/'
const API_BEARER_TOKEN = import.meta.env.VITE_LOTR_API_BEARER_TOKEN;
const URL_CHARACTERS = `${URL_BASE}character`
const URL_MOVIES = `${URL_BASE}movie`
//5cd99d4bde30eff6ebccfea4/quote

/*----------------------------------------------------------------------
 *                      PRIVATE FUNCTIONS
 */
const encodedCharacterUrl = function (
    characterId: string,
): string {
    if (characterId !== undefined) {
        return `${URL_CHARACTERS}/${characterId}/quote`
    }
    return "";
}

/*----------------------------------------------------------------------
 *                      PUBLIC HOOKS
 */
export const useFetchCharactersAndMoviesData = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        // Start both fetch requests concurrently
        const fetchCharacters = fetch(URL_CHARACTERS, {
            headers: { Authorization: `Bearer ${API_BEARER_TOKEN}` }
        }).then((response) => response.json())
          .then((jsonData: ApiCharacterResponse) => {
                const mappedCharacters: Character[] = jsonData.docs.map((item) => ({
                    _id: item._id,
                    name: item.name || null,
                    wikiUrl: item.wikiUrl || null,
                    race: item.race || null,
                    birth: item.birth || null,
                    gender: item.gender || null,
                    death: item.death || null,
                    hair: item.hair || null,
                    height: item.height || null,
                    realm: item.realm || null,
                    spouse: item.spouse || null,
                    movies: null,
                    quotes: null,
                }));
              setCharacters(mappedCharacters);
          });

        const fetchMovies = fetch(URL_MOVIES, {
            headers: { Authorization: `Bearer ${API_BEARER_TOKEN}` }
        }).then((response) => response.json())
          .then((jsonData: ApiMovieResponse) => {
                const mappedMovies: Movie[] = jsonData.docs.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    runtimeInMinutes: item.runtimeInMinutes,
                    budgetInMillions: item.budgetInMillions,
                    boxOfficeRevenueInMillions: item.boxOfficeRevenueInMillions,
                    academyAwardNominations: item.academyAwardNominations,
                    academyAwardWins: item.academyAwardWins,
                    rottenTomatoesScore: item.rottenTomatoesScore
                }));
              setMovies(mappedMovies);
          });

        // Wait for both fetch requests to complete
        Promise.all([fetchCharacters, fetchMovies])
          .then(() => {
            setIsLoading(false); // Set loading state to false when both fetches are done
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false); // Set loading state to false even in case of an error
          });
    }, []);

    return { characters, movies, isLoading };
};

export async function fetchCharactersQuotesAndMovies(
    characterId: string, 
    character: Character,
    movies: Movie[],  // Movies array passed into the function
): Promise<{character: Character, characterMovies: Movie[] | null}> {
    const characterQuotesUrl = encodedCharacterUrl(characterId);
    let characterMovies: Movie[] | null = [];
    
    try {
        if (character.quotes === null) {
            const response = await fetch(characterQuotesUrl, {
                headers: { Authorization: `Bearer ${API_BEARER_TOKEN}` }
            });
            const jsonData: ApiQuoteResponse = await response.json();
    
            if (jsonData.docs.length > 0) {
                const quotes = jsonData.docs.map((quote) => {
                    // Find the movie by its _id in the movies array
                    const movie = movies.find((m) => m._id === quote.movie);
                    
                    // If the movie is found, replace the quote's movie _id with the movie name
                    const movieName = movie ? movie.name : "Unknown Movie"; // Default to "Unknown Movie" if not found
                    // Need to narrow characterMovies type here 
                    if (characterMovies != null) {
                        if (movie && !characterMovies.find(m => m._id === movie._id)) {
                            characterMovies.push(movie);
                        }
                    }
                    
                    return {
                        _id: quote._id,
                        dialog: quote.dialog,
                        movie: movieName,  // Set the movie name instead of the movie _id
                        character: quote.character
                    };
                });
    
                // Assign the fetched quotes to the character's quotes
                character.quotes = quotes;
            }
        }
        else {
            character.quotes.map((quote) => {
                const movie = movies.find((m) => m.name === quote.movie);
                if (movie && characterMovies && !characterMovies.find(m => m._id === movie._id)) {
                    characterMovies?.push(movie);
                }
            })
        }
    } catch (error) {
        console.error("Error fetching Character's quotes: ", error);
    }
    if (characterMovies.length >= 1) {
        return { character, characterMovies };
    }
    else {
        characterMovies = null
        return { character, characterMovies }
    }
}