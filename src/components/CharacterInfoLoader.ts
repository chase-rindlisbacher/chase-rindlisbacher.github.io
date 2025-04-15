/* 
 *                      CharacterInfoLoader.ts
 */

/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { LoaderFunctionArgs } from "react-router-dom";
import { fetchCharactersQuotesAndMovies } from "../ServerApi";
import { Character } from "../Types";

/*----------------------------------------------------------------------
 *                      LOADER FUNCTION
 */
export default async function characterInfoLoader({ params }: LoaderFunctionArgs) {
    const { characterId, characters } = params;

    const selectedCharacter = characters.find((char: Character) => char._id === characterId);

    if (!selectedCharacter) {
        throw new Response("Character not found", { status: 404 });
    }

    // Fetch character quotes and movies
    const updatedCharacter = await fetchCharactersQuotesAndMovies(String(characterId), selectedCharacter);
    
    return updatedCharacter;
}
