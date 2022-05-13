import React from "react";

export default function ListasTabela({ listas, loading }) {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className="div-table">
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Nome da Lista</th>
                        <th scope="col">Quantidade de pokémons</th>
                        <th scope="col">Data de criação</th>
                        <th scope="col">Última modificação</th>
                    </tr>
                </thead>
                <tbody>
                    {listas?.data?.length
                        ? listas.data.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.pokemons?.length}</td>
                                    <td>{item?.createdDate}</td>
                                    <td>{item?.lastModified}</td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </table>
        </div>
    )
}