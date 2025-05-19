import { Link } from "react-router-dom"

export const Header = () => {
    return(
        <header className="w-full h-16 justify-around items-center flex bg-gray-700">
            <h1 className="text-3xl text-white">Movie<strong className="text-green-500">PRO</strong></h1>

            <ul className="flex gap-10 text-white">
                <li>
                    <Link to='/'>
                      Home
                    </Link>
                </li>
                <li>
                    <Link to='/filmes'>
                       Filmes
                    </Link>
                </li>
                <li>
                    <Link to='/series'>Series</Link>
                </li>
            </ul>

            <Link to='/favoritos'>
            <button className="cursor-pointer bg-green-500 p-1 rounded-md text-white font-bold">Meus Filmes</button>
            </Link>
        </header>
    )
}