import api from "../../Services/api"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { type FilmesProps } from "../Home"
import { useContext } from "react"
import { MovieContext } from "../../components/MovieContext"

export const Filmes = () => {
    const [allFilmes, setAllFilmes] = useState<FilmesProps[]>([])
    const [moreMovies, setMoreMovies] = useState<number>(1)

    const { movie } = useContext(MovieContext)
   
        //page ja vem atribuida com o numero da pagina de filmes = 1
        const getAllFilmes = async(page:number) => {
            const response = await api.get("/movie/popular",{
                  params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                },
            })

            //busca novos filmes e adiciona na lista sem apagar os ja listados
        
      setAllFilmes((prev) => {
        // Junta os filmes atuais com os novos
        const filmesCombinados = [...prev, ...response.data.results.slice(0, 8)];

        // Remove duplicados pelo id mantendo só o primeiro encontrado
        const filmesUnicos = filmesCombinados.filter(
          (filme, index, self) => 
            index === self.findIndex((f) => f.id === filme.id)
        );

        return filmesUnicos;
      });
        }

        useEffect(() => {
            //renderiza os novos filmes junto aos ja listados
            getAllFilmes(moreMovies)
        },[])
        



    const loadMore = () => {
        //funcao para botao que pega o numero da pagina e adiciona mais um, entao pagina 2
        const next = moreMovies + 1
        setMoreMovies(next)
        getAllFilmes(next)
    }

  

    return(
        <div className="mt-30 flex flex-col justify-center items-center">
           {movie && movie.length > 0 && (
                <div className="mt-30">
                    <h1 className="px-8 font-medium text-2xl italic">Resultados da Busca</h1>
                    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full  lg:min-h-screen gap-3 p-2">
                    {movie.map((filme) => (
                    <Link to={`/detalhesfilme/${filme.id}`} key={filme.id}>
                    <section className="w-full pt-5 flex items-center justify-center"
                        
                    >
        
                        <article className="group flex flex-col rounded-lg overflow-hidden transition-transform w-full max-w-xs lg:h-[500px] h-[400px] hover:scale-105 "
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



            <h1 className="mt-10 mb-10 text-3xl text-center font-medium">Todos os Filmes</h1>
            <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-screen gap-3 p-2">
              {allFilmes.map((filme) => (
                <Link to={`/detalhesfilme/${filme.id}`} key={filme.id}>
                  <section className="flex items-center justify-center">
                    <article className="group flex flex-col rounded-lg overflow-hidden transition-transform w-full max-w-xs lg:h-[500px] h-[400px] hover:scale-105">
                        <img 
                        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
                        alt="" 
                        className="w-full h-80 lg:h-100  object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30"
                        />

                        <div className="absolute  bottom-30 lg:bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">
                            <h1 className="text-white text-xl font-medium px-4">{filme.title}</h1>
                            <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">{filme.overview}</p>
                        </div>
                        <div className=" text-white font-semibold p-2 rounded-b-lg transition-colors bg-green-500 hover:bg-green-700 ">
                            <h2 className="text-center">Acessar</h2>
                        </div>
                    </article>
                </section>
                </Link>
              ))}
            </main>
             <button 
            onClick={loadMore}
             className="bg-green-500 font-bold text-white p-2 rounded-lg float-right mr-20 mb-10">Carregar mais...</button> 
        </div>
    )
}