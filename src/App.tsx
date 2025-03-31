import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./components/MainPage";

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
        
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
    // <>
    //   <div style={{backgroundColor: 'whitesmoke'}} className='homepage'>
    //     <div className="banner homepage">
    //       {/* <a href="https://vite.dev" target="_blank">
    //         <img src={viteLogo} className="logo" alt="Vite logo" />
    //       </a> */}
    //       <h1>Lord of Mini-Games</h1>
    //     </div>
    //     <h1>Vite + React</h1>
    //     <div className="card">
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //   </div>
    // </>
  )
}
