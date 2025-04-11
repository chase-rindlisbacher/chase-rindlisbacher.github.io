/*----------------------------------------------------------------------
 *                      IMPORTS
 */
import { ReactNode } from "react";
import { CharactersDataContext } from "./CharactersData";
import { useFetchCharactersData } from "../ServerApi";

export function CharactersDataProvider({ children }: { children: ReactNode }) {
    const { characters, isLoading } = useFetchCharactersData();
    return (
        <CharactersDataContext
            value={{
                characters,
                isLoading
            }}
        >
            {children}
        </CharactersDataContext>
    )
}