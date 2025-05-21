import { useState, useEffect, useContext } from "react";
import api from "../../Services/api";
import { Link } from "react-router-dom";
import { MovieContext } from "../../components/MovieContext";

export interface FilmesProps {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    name:string;
}

export const Home = () => {
    const [filmes, setFilmes] = useState<FilmesProps[]>([]);
    const [filmesAlta, setFilmesAlta] = useState<FilmesProps[]>([])

    const { movie } = useContext(MovieContext)


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
            const response = await api.get("/trending/movie/day",{
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
            {movie && movie.length > 0 && (
                <div>
                    <h1>Resultados da Busca</h1>
                    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full  lg:min-h-screen gap-3 p-2">
                    {movie.map((filme) => (
                    <Link to={`/detalhesfilme/${filme.id}`} key={filme.id}>
                    <section className="w-full pt-5 flex items-center justify-center"
                        
                    >
        
                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs lg:h-[500px] h-[400px] hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                alt=""
                                className='w-full h-80 lg:h-100 object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-30 lg:bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 ">
                                    {filme.title}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {filme.overview}
                                </p>
                                
                            </div>

                            
                            <div className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                <h2 className="text-center">Acessar</h2>
                            </div>
                             
                        </article>
                    </section>
                    </Link> 
                        ))}
                    </main>
                </div>
            )}

            <h1 className="mt-10 ml-10 font-medium text-3xl">
                Filmes em Cartaz
            </h1>
            <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full  lg:min-h-screen gap-3 p-2">
                {filmes.map((filme) => (
                    
                    <section className="w-full pt-5 flex items-center justify-center"
                        key={filme.id}
                    >
                      <Link to={`/detalhesfilme/${filme.id}`} className="w-full flex justify-center">
                        <article className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs lg:h-[500px] h-400px hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                alt=""
                                className='w-full h-80 lg:h-100 object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-20 lg:bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 ">
                                    {filme.title}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {filme.overview}
                                </p>
                                
                            </div>

                            
                            <div className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                <h2 className="text-center">Acessar</h2>
                            </div>
                             
                        </article>
                        </Link>
                    </section>
                    
                ))}
            </main>




    <h1 className="mt-10 ml-10 font-medium text-3xl">
                Filmes em Alta
            </h1>
              <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full  lg:min-h-screen gap-3 p-2">
                {filmesAlta.map((emAlta) => (
                    <Link to={`/detalhesfilme/${emAlta.id}`} key={emAlta.id}>
                    <section className="w-full pt-5 flex items-center justify-center"
                        
                    >
        
                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs lg:h-[500px] h-400px hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${emAlta.poster_path}`}
                                alt=""
                                className='w-full h-80 lg:h-100 object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-20 lg:bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 ">
                                    {emAlta.title}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {emAlta.overview}
                                </p>
                                
                            </div>

                            
                            <div className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                <h2 className="text-center">Acessar</h2>
                            </div>
                             
                        </article>
                    </section>
                    </Link>
                ))}
            </main>


        </div>
    );
};
