import React from "react";

export default function PokemonsTabela({ pokemons, loading }) {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className="div-table">
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Pokedex Number</th>
                        <th scope="col">Generation</th>
                        <th scope="col">Evolution Stage</th>
                        <th scope="col">Evolved</th>
                        <th scope="col">Family ID</th>
                        <th scope="col">Cross Gen</th>
                        <th scope="col">Type 1</th>
                        <th scope="col">Type 2</th>
                        <th scope="col">Weather 1</th>
                        <th scope="col">Weather 2</th>
                        <th scope="col">Stat Total</th>
                        <th scope="col">ATK</th>
                        <th scope="col">DEF</th>
                        <th scope="col">STA</th>
                        <th scope="col">Legendary</th>
                        <th scope="col">Aquireable</th>
                        <th scope="col">Spawns</th>
                        <th scope="col">Regional</th>
                        <th scope="col">Raidable</th>
                        <th scope="col">Hatchable</th>
                        <th scope="col">Shiny</th>
                        <th scope="col">Nest</th>
                        <th scope="col">New</th>
                        <th scope="col">Not Gettable</th>
                        <th scope="col">Future Evolved</th>
                        <th scope="col">100% CP @ 40</th>
                        <th scope="col">100% CP @39</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons?.data?.length
                        ? pokemons.data.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.pokedexNumber}</td>
                                    <td>{item?.generation}</td>
                                    <td>{item?.evolutionStage}</td>
                                    <td>{item?.evolved}</td>
                                    <td>{item?.familyID}</td>
                                    <td>{item?.crossGen}</td>
                                    <td>{item?.type1}</td>
                                    <td>{item?.type2}</td>
                                    <td>{item?.weather1}</td>
                                    <td>{item?.weather2}</td>
                                    <td>{item?.statTotal}</td>
                                    <td>{item?.atk}</td>
                                    <td>{item?.def}</td>
                                    <td>{item?.sta}</td>
                                    <td>{item?.legendary}</td>
                                    <td>{item?.aquireable}</td>
                                    <td>{item?.spawns}</td>
                                    <td>{item?.regional}</td>
                                    <td>{item?.raidable}</td>
                                    <td>{item?.hatchable}</td>
                                    <td>{item?.shiny}</td>
                                    <td>{item?.nest}</td>
                                    <td>{item?.new}</td>
                                    <td>{item?.notGettable}</td>
                                    <td>{item?.futureEvolve}</td>
                                    <td>{item?.cp40}</td>
                                    <td>{item?.cp39}</td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </table>
        </div>
    )
}