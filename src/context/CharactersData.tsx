/* 
 *              Imports
 */
import { createContext } from "react";
import { CharactersContextType } from "../Types";

export const CharactersDataContext = createContext<CharactersContextType | null>(null);