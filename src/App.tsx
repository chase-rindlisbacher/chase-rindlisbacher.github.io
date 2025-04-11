import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./components/MainPage";
import { CharactersDataProvider } from "./context/CharactersDataProvider";

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
        { path: "characterInfo", }
      ]
    }
  ]);

  return (
    <CharactersDataProvider>
      <RouterProvider router={router} />
    </CharactersDataProvider>
  )
}
