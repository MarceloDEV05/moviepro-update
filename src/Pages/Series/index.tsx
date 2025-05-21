import { useState, useEffect } from "react";
import { type FilmesProps } from "../Home";
import api from "../../Services/api";
import { Link } from "react-router-dom";

// Filmes populares: /movie/popular

// Séries populares: /tv/popular

// Filmes em alta: /trending/movie/day

// Séries em alta: /trending/tv/day
// /movie/top_rated

// /tv/top_rated

// /trending/all/day

// /discover/movie (com filtros, gênero etc)

export const Series = () => {
    const [series, setSeries] = useState<FilmesProps[]>([]);
    const [getAllSeries, setGetAllSeries] = useState<number>(1)
    const [seriesAlta, setSeriesAlta] = useState<FilmesProps[]>([])
    const [getSeriesAlta, setGetSeriesAlta] = useState<number>(1)

    //series populares
        const getSeries = async(page: number) => {
            const response = await api.get("/tv/popular", {
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                },
            });
             setSeries((prev) => [...prev,...response.data.results.slice(0, 20)]);
        };

        useEffect(() => {
            getSeries(getAllSeries)
        },[])
      
        const loadMore = () => {
            const next = getAllSeries + 1
            setGetAllSeries(next)
            getSeries(next)
        }


        //series em alta
     
        const getSeriesEmAlta = async(page:number) => {
            const response = await api.get("/trending/tv/day",{
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                }
            });
            setSeriesAlta((serie) => [...serie,...response.data.results.slice(0,20)])
        }
      
  
            const loadMoreSeries = () => {
            const next = getSeriesAlta + 1
            setGetSeriesAlta(next)
            getSeriesEmAlta(next)
        }

           useEffect(() => {
            getSeriesEmAlta(getSeriesAlta)
        },[])
    


    return(
        <div>
            <h1 className="mt-10 ml-10 font-medium text-3xl">
                Series Populares
            </h1>
            <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-screen gap-3 p-2">
                {series.map((serie) => (
                <Link to={`/detalhesserie/${serie.id}`}>
                    <section className="w-full pt-2 flex items-center justify-center"
                        key={serie.id}
                    >

                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs h-[400px] lg:h-[500px] hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                                alt=""
                                className='w-full h-80 lg:h-100 object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 truncate ">
                                    {serie.name}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {serie.overview}
                                </p>
                                
                            </div>

                            <button className="cursor-pointer bg-gray-800 hover:bg-gray-950 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                Acessar
                            </button>
                        </article>
                    </section>
                    </Link>
                ))}  
            </main>
            <button
             onClick={loadMore}
             className="bg-green-500 hover:bg-green-700 font-bold text-white p-2 rounded-lg float-right mr-20 mb-10">Carregar mais...</button>



            <h1 className="mt-20 ml-10 font-medium text-3xl">
                Series em Alta
            </h1>
            <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-screen gap-3 p-2">
                {seriesAlta.map((serie) => (
                    <Link to={`/detalhesserie/${serie.id}`}>
                    <section className="w-full pt-2 flex items-center justify-center"
                        key={serie.id}
                    >

                        <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs h-[400px] hover:scale-105 "
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                                alt=""
                                className='w-full h-80  object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30'
                            />

                            <div className="absolute bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">

                                <h1 className="text-lg text-white font-medium px-4 truncate ">
                                    {serie.name}
                                </h1>
                                <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">
                                 {serie.overview}
                                </p>
                                
                            </div>

                            <button className="cursor-pointer bg-gray-800 hover:bg-gray-950 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors">
                                Acessar
                            </button>
                        </article>
                    </section>
                    </Link>
                ))}
            </main>

            <button 
            onClick={loadMoreSeries}
             className="bg-green-500 hover:bg-green-700 font-bold text-white p-2 rounded-lg float-right mr-20 mb-10">Carregar mais...</button>
        </div>
    )
}