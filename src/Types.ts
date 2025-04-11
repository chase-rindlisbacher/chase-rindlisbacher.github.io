export type CharactersContextType = {
    characters: Character[];
    isLoading: boolean;
}

export interface Character {
    _id: string;
    name: string | null;
    wikiUrl: string | null;
    race: string | null;
    birth: string | null;
    gender: string | null;
    death: string | null;
    hair: string | null;
    height: string | null;
    realm: string | null;
    spouse: string | null;
    movies: [string] | null;
    quotes: [string] | null;
}

export interface ApiCharacter {
    _id: string;
    name: string;
    wikiUrl: string;
    race: string;
    birth: string;
    gender: string;
    death: string;
    hair: string;
    height: string;
    realm: string;
    spouse: string;
}

export interface ApiCharacterResponse {
    docs: ApiCharacter[];
    total: number;
    limit: 1000;
    offset: 0;
    page: 1;
    pages: 1;
}

export type Quote = {
    _id: string;
    dialog: string | null;
    movie: string | null;
    character: string | null;
}

export type Movie = {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
}

export interface GameCardProps {
    gameName: string;
    gameDescription: string;
    gameImageUrl: string;
}