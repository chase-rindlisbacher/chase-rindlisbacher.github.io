import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./components/MainPage";
import { CharactersDataProvider } from "./context/CharactersDataProvider";
import CharacterInfoHome from "./components/CharacterInfoHome";
import GameCards from "./components/GameCards";
import HangmanGame from "./components/Hangman";
import CharacterInfo from "./components/CharacterInfo";
// import GameCards from "./components/GameCards";

/* 
*                  Private Helpers
*/
function ErrorPage() {
  return <div>There was a routing error.</div>
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",  // The default route for displaying game cards
          element: <GameCards />  // This will show game cards on the home page
        },
        {
          path: "characterInfoHome",  // Example additional route
          element: <CharacterInfoHome />
        },
        {
          path: "hangman",
          element: <HangmanGame />
        },
        {
          path: "characterInfo/:characterId",
          element: <CharacterInfo />
        }
      ]
    }
  ]);

  return (
    <CharactersDataProvider>
      <RouterProvider router={router} />
    </CharactersDataProvider>
  )
}
