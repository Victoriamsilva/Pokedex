import "./card-pokemon.scss";

export function CardPokemon({ pokemons, loading }) {
    return (

        <div className="card-box-pokemon">

            {pokemons?.data?.length
                ? pokemons.data.map((item) => {
                    return (
                        <div className="card card-pokemon gradient-bg" key={item._id}>
                            <img src={item?.image} className="card-img-top" alt="..." />

                            <div className="content-pokemon">
                                <h3>{item?.name}</h3>
                                <h6><span>ATK</span> {item?.atk}</h6>
                                <h6><span>DEF</span> {item?.def}</h6>
                                <h6><span>STA</span> {item?.sta}</h6>
                            </div>


                        </div>
                    )
                })
                : null}
        </div>


    )
}