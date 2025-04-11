/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { useEffect, useState } from "react";
import { Character, Movie, Quote, ApiCharacterResponse } from "./Types";

/*----------------------------------------------------------------------
 *                      CONSTANTS
 */
const URL_BASE = 'https://the-one-api.dev/v2/'
const API_BEARER_TOKEN = import.meta.env.VITE_LOTR_API_BEARER_TOKEN;
const URL_CHARACTERS = `${URL_BASE}character`

/*----------------------------------------------------------------------
 *                      PUBLIC HOOKS
 */
export const useFetchCharactersData = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
  
    useEffect(() => {
        fetch(URL_CHARACTERS, {
            headers: { Authorization: `Bearer ${API_BEARER_TOKEN}` }
        })
        .then((response) => response.json())
        .then((jsonData: ApiCharacterResponse) => { // AI helped me come up with an ApiCharacterResponse because the API characters don't yet have movies or quotes
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
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching characters:", error);
            setIsLoading(false);
        });
    }, []);

    return { characters, isLoading };
};