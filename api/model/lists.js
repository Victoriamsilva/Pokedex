const { connectMongodb } = require('../database/connection')
const { ObjectId } = require('mongodb');

const regex = /[\s,\.;:\(\)\-'\+]/;

exports.getLists = async (page, limit, q, userId) => {
    const { collection } = await connectMongodb('pokemonFox', 'listas')
    const skip = page > 0 ? page * limit : 0
    const pipeline = [
        { $match: { owner: ObjectId(userId) } },
        { $lookup: { from: 'pokemons', localField: 'pokemons', foreignField: '_id', as: 'pokemons' } },
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

exports.getOneList = async (id) => {
    const { collection } = await connectMongodb('pokemonFox', 'listas')
    const data = await collection.findOne({ _id: ObjectId(id) })
    return { data, status: 200 }
}

exports.postList = async (body, userId) => {
    body.owner = ObjectId(userId);
    let date = new Date();
    body.createdDate = ((date.getDate())) + "/" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/" + date.getFullYear();
    body.lastModified = ((date.getDate())) + "/" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/" + date.getFullYear();
    body.pokemons = body.pokemons.map(item => ObjectId(item));
    const { collection } = await connectMongodb('pokemonFox', 'listas');
    const data = await collection.insertOne(body);
    return { data, status: 201 }
}

exports.putList = async (id, body) => {
    const { collection } = await connectMongodb('pokemonFox', 'listas')
    let date = new Date();
    const lastModified = ((date.getDate())) + "/" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/" + date.getFullYear();
    const data = await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...body, lastModified } })
    return { data, status: 200 }
}
exports.removeList = async (id) => {
    const { collection } = await connectMongodb('pokemonFox', 'listas')
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data, status: 221 }
}