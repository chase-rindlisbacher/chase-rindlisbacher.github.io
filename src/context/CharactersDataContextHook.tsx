/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { use } from "react";
import { CharactersContextType } from "../Types";
import { CharactersDataContext } from "./CharactersData";

/*----------------------------------------------------------------------
 *                      CUSTOM HOOK
 */
export function useCharactersDataContext(): CharactersContextType {
    const context = use(CharactersDataContext);

    if (!context) {
        throw new Error("useCharactersDataContext must be used within a CharactersDataProvider");
    }

    return context
}