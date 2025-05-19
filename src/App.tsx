import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./Pages/Home";
import { Filmes } from "./Pages/Filmes";
import { Favoritos } from "./Pages/Favoritos";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/filmes',
                element:<Filmes/>
            },

            {
                path: '/favoritos',
                element: <Favoritos/>
            }
        ]
    }
])