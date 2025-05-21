import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../../Services/api";

interface Movie {
    title: ReactNode;
    id:number;
    original_title:string;
    overview:string;
    poster_path:string;
    release_date:string;
};

interface MovieContextType {
    movie: Movie[] | null;
    searchMovie: (title:string) => void
}

interface Provider{
    children: ReactNode
}

export const MovieContext = createContext({} as MovieContextType)

export const MovieProvider = ({children}:Provider) => {

    const [movie, setMovie] = useState<Movie[] | null>(null)

    const searchMovie = async(title:string) => {
        if(!title)return;

        try{
            const response = await api.get("/search/movie",{
                params: {
                    query:title,
                    api_key:'a440320973db39fc00de6bdcb4604c9b',
                },
            });
            setMovie(response.data.results)
        } catch(error) {
            console.error('Erro ao buscar filme ' + error)
        }
    }

    return(
        <MovieContext.Provider value={{movie, searchMovie}}>
            {children}
        </MovieContext.Provider>
    )
}





