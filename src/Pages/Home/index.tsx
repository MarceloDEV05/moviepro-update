import { useState, useEffect } from "react";
import api from "../../Services/api";

interface FilmesProps {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    overview: string;
}

export const Home = () => {
    const [filmes, setFilmes] = useState<FilmesProps[]>([]);
    const [filmesAlta, setFilmesAlta] = useState<FilmesProps[]>([])

    useEffect(() => {
        const getFilmes = async () => {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: 1,
                },
            });
            setFilmes(response.data.results.slice(0, 8));
        };

        getFilmes();
    }, []);

    useEffect(() => {
        const getFilmesEmAlta = async() => {
            const response = await api.get("/movie/popular",{
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: 2
                }
            });
            setFilmesAlta(response.data.results.slice(0,8))
        }
        getFilmesEmAlta()
    },[])


    return (
        <div>
            <h1 className="mt-10 ml-10 font-medium text-3xl">
                Filmes em Cartaz
            </h1>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-screen gap-6 p-6">
                {filmes.map((filme) => (
                    <section className="w-full pt-5 flex items-center justify-center"
                        key={filme.id}
                    >

                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs h-[500px] hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                alt=""
                                className='w-full h-100  object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 truncate ">
                                    {filme.title}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {filme.overview}
                                </p>
                                
                            </div>

                            <button className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                Acessar
                            </button>
                        </article>
                    </section>
                ))}
            </main>




    <h1 className="mt-10 ml-10 font-medium text-3xl">
                Filmes em Alta
            </h1>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-screen gap-6 p-6">
                {filmesAlta.map((emAlta) => (
                    <section className="w-full pt-5 flex items-center justify-center"
                        key={emAlta.id}
                    >

                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs h-[500px] hover:scale-105 relative"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${emAlta.poster_path}`}
                                alt=""
                                className='w-full h-100  object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 truncate ">
                                    {emAlta.title}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {emAlta.overview}
                                </p>
                                
                            </div>

                            <button className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                Acessar
                            </button>
                        </article>
                    </section>
                ))}
            </main>

        </div>
    );
};
