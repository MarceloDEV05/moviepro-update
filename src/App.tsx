import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./Pages/Home";
import { Filmes } from "./Pages/Filmes";
import { Favoritos } from "./Pages/Favoritos";
import { Series } from "./Pages/Series";
import { Details } from "./Pages/Details";
import { SeriesDetails } from "./Pages/SeriesDetails";

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
                path: '/series',
                element:<Series/>
            },

            {
                path: '/favoritos',
                element: <Favoritos/>
            },
            
            {
                path: '/detalhesfilme/:id/',
                element: <Details/>
            },
            {
                path: '/detalhesserie/:id/',
                element: <SeriesDetails/>
            },

        ]
    }
])