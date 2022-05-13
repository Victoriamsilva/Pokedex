import "./card-listas.scss"

export function CardListas({ listas, loading }) {
    return (

        <div className="card-box-lista">

            {listas?.data?.length
                ? listas.data.map((item) => {
                    return (
                        <div className="card card-lista gradient-bg" key={item._id}>
                            <div className="content-lista">
                                <h3>{item?.name}</h3>

                                <div>
                                    {item.pokemons.map((pokemon) => {
                                        return (
                                            <img className="img-pokemon" src={pokemon?.image} alt="" />
                                        )
                                    })}
                                </div>

                                <h6 className="length">
                                    {item?.pokemons.length > 1
                                        ? <span>Existem </span>
                                        : <span>Existe </span>}
                                    {item?.pokemons.length} <span>pokémons nessa lista</span></h6>
                                <h6 className="created"><span>Criado em:</span> {item?.createdDate}</h6>
                            </div>


                        </div>
                    )
                })
                : null}
        </div>


    )
}