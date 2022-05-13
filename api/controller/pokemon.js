const { removePokemon, putPokemon, getOnePokemon, postPokemon, getPokemons } = require('../model/pokemon')

exports.get = async (req, res) => {
    try {
        let { q, limit = 30, page = 0 } = req.query
        const { data: response, status } = await getPokemons(Number(page), Number(limit), q)
        res.status(status).json(response)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.post = async (req, res) => {
    try {
        const response = await postPokemon(req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.getOne = async (req, res) => {
    try {
        const response = await getOnePokemon(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.put = async (req, res) => {
    try {
        const response = await putPokemon(req.params.id, req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.remove = async (req, res) => {
    try {
        const response = await removePokemon(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}
