import { useEffect, useState } from "react";
import iconeSearch from "../../assets/iconeSearch.svg"
import api from "../../services/api";
import Pagination from "../../components/pagination/pagination";
import PokemonsTabela from "../../components/tabelas/pokemons";
import { CardPokemon } from "../../components/cards/card-pokemon";
import iconeTabela from "../../assets/icone.svg";
import iconeCard from "../../assets/icone-card.svg";

export function Home() {
    const [pokemons, setPokemons] = useState({});
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    function onChange(event) {
        setValue(event.target.value)
    }

    useEffect(() => {
        getPokemons();
    }, [])

    function getPokemons(page = 0) {
        setLoading(true)
        let url = (!value) ? `http://localhost:3100/pokemons?page=${page}` : `http://localhost:3100/pokemons?q=${value}&page=${page}`;
        api.get(url).then(({ data }) => {
            setPokemons({ ...data, metaData: data.metaData[0] });
            console.log(pokemons)
        })
        setLoading(false)
    }

    const [view, setView] = useState(false);

    function onChangeVisualization() {
        view ? setView(false) : setView(true);
    }

    return (

        <div className="container">
            <h1>TODOS OS POKÉMONS</h1>
            <div className="container-fluid">
                <div className="d-flex">
                    <div className="input-search">
                        <img src={iconeSearch} alt="" />
                        <input onChange={onChange} className="form-control me-2" type="search" placeholder="Buscar por nome do pokémon" aria-label="Search" />
                    </div>
                    <button className="btn btn-red ms-4" onClick={getPokemons}>Search</button>
                </div>
                <div onClick={onChangeVisualization}>
                    {view
                        ? <div className="view">
                            <img src={iconeCard} />
                            <span>Visão por cards</span>
                        </div>
                        : <div className="view">
                            <img src={iconeTabela} />
                            <span>Visão por lista</span>
                        </div>
                    }
                </div>

                {view ? <PokemonsTabela pokemons={pokemons} loading={loading} /> : <CardPokemon pokemons={pokemons} loading={loading} />}

                {pokemons?.metaData?.total > 30
                    ? <Pagination itensPerPage={30} totalItens={pokemons.metaData.total} currentPage={pokemons.metaData.page} onSelect={getPokemons} />
                    : null}

            </div>
        </div>




    )
}