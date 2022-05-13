import logo from "../../assets/logo.png";
import RedfoxLogo from "../../assets/redfox-logo.svg";
import logout from "../../assets/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import "../navbar/navbar.scss";
import { useContext } from "react";
import StoreContext from "../../store/context";

export function Navbar() {
    const { removeToken } = useContext(StoreContext);

    const navigate = useNavigate();

    function handleClick() {
        removeToken();
        navigate('/');
    }
    return (
        <>
            <nav className="nav">
                <div className="logos">
                    <img className="logo" src={logo} alt="" />
                    <img className="vector" src={RedfoxLogo} alt="" />

                </div>

                <div className="links">
                    <Link to="/home" className="nav-link">
                        Todos os pokémons
                    </Link>
                    <Link to="/listas" className="nav-link">
                        Minhas listas
                    </Link>
                    <Link to="/pokemons" className="nav-link">
                        Meus pokemons
                    </Link>
                    <Link to="/pokemons" className="nav-link">
                        Criar nova lista
                    </Link>
                    <Link to="/pokemons" className="nav-link">
                        Criar novo pokemon
                    </Link>
                </div>
                <a href="#" onClick={handleClick} className="logout link nav-link">
                    <img src={logout} alt="" />
                    Sair
                </a>

            </nav>
        </>
    )
}