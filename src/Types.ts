export type CharactersContextType = {
    characters: Character[];
    movies: Movie[];
    cachedCharacters: { [key: string]: Character };
    cachedMovies: { [key: string]: Movie };
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
    movies: Movie[] | null;
    quotes: Quote[] | null;
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

export type ApiQuoteResponse = {
    docs: Quote[];
    total: number;
    limit: 1000;
    offset: 0;
    page: 1;
    pages: 1;
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

export type ApiMovieResponse = {
    docs: Movie[];
    total: number;
    limit: 1000;
    offset: 0;
    page: 1;
    pages: 1;
}

export interface GameCardProps {
    gameName: string;
    gameDescription: string;
    gameImageUrl: string;
}

export type HangmanGameState = {
    randomName: string; // The random word selected for the game
    underScoredName: string; // The name with underscores representing unguessed letters
    guesses: string[]; // Array of letters guessed by the user
    guessCount: number; // The number of guesses made so far
    dictAlphabet: number[]; // An array representing whether a letter has been guessed (0 or 1)
    isWin: boolean; // Whether the player has won the game
    isGameOver: boolean; // Whether the game is over
    feedbackMessage: string; // Feedback per guess given
    incorrectGuesses: number;
};