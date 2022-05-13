const { connectMongodb } = require('../database/connection')
const { ObjectId } = require('mongodb');

const regex = /[\s,\.;:\(\)\-'\+]/;

exports.getPokemons = async (page, limit, q) => {
    const { collection } = await connectMongodb('pokemonFox', 'pokemons')
    const skip = page > 0 ? page * limit : 0
    const pipeline = [
        {
            $facet: {
                metaData: [{ $count: 'total' }, { $addFields: { page } }],
                data: [{ $skip: skip }, { $limit: limit }]
            }
        }
    ];

    if (q) {
        pipeline.unshift({ $match: { $text: { $search: q } } })
    }
    const [data] = await collection.aggregate(pipeline).toArray()

    return { data, status: 200 }
}

exports.getOnePokemon = async (id) => {
    const { collection } = await connectMongodb('pokemonFox', 'pokemons')
    const data = await collection.findOne({ _id: ObjectId(id) })
    return { data, status: 200 }
}
exports.postPokemon = async (body) => {
    const { collection } = await connectMongodb('pokemonFox', 'pokemons')
    const data = await collection.insertOne(body)
    return { data, status: 201 }
}

exports.putPokemon = async (id, body) => {
    const { collection } = await connectMongodb('pokemonFox', 'pokemons')
    await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...body } })
    return { data: { _id: id, body }, status: 200 }
}
exports.removePokemon = async (id) => {
    const { collection } = await connectMongodb('pokemonFox', 'pokemons')
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data, status: 221 }
}