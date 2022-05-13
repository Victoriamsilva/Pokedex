import { useEffect, useState } from "react";
import iconeSearch from "../../assets/iconeSearch.svg"
import ListasTabela from "../../components/tabelas/listas";
import api from "../../services/api";
import iconeTabela from "../../assets/icone.svg";
import iconeCard from "../../assets/icone-card.svg";
import { CardListas } from "../../components/cards/card-listas";

export function Listas() {
    const [listas, setListas] = useState({});
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    function onChange(event) {
        setValue(event.target.value)
    }

    useEffect(() => {
        getListas();
    }, [])

    function getListas(page = 0) {
        setLoading(true)
        let url = (!value) ? `http://localhost:3100/lists?page=${page}` : `http://localhost:3100/lists?q=${value}&page=${page}`;
        api.get(url).then(({ data }) => {
            setListas({ ...data, metaData: data.metaData[0] });
            console.log(listas);
        })
        setLoading(false)
    }

    const [view, setView] = useState(false);

    function onChangeVisualization() {
        view ? setView(false) : setView(true);
    }

    return (

        <div className="container">
            <h1>MINHAS LISTAS</h1>
            <div className="container-fluid">
                <div className="d-flex">
                    <div className="input-search">
                        <img src={iconeSearch} alt="" />
                        <input onChange={onChange} className="form-control me-2" type="search" placeholder="Buscar por nome" aria-label="Search" />
                    </div>
                    <button className="btn btn-red ms-4" onClick={getListas}>Buscar</button>
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

                {view ? <ListasTabela listas={listas} loading={loading} /> : <CardListas listas={listas} loading={loading} />}




                {listas?.metaData?.total > 30
                    ? <Pagination itensPerPage={30} totalItens={listas.metaData.total} currentPage={listas.metaData.page} onSelect={getListas} />
                    : null}

            </div>
        </div>




    )
}