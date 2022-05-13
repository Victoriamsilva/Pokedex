const { getLists, postList, getOneList, putList, removeList } = require('../model/lists')

exports.get = async (req, res) => {
    try {
        let { q, limit = 30, page = 0 } = req.query
        const { data: response, status } = await getLists(Number(page), Number(limit), q, req.userId)
        res.status(status).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.post = async (req, res) => {
    try {
        const response = await postList(req.body, req.userId)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.getOne = async (req, res) => {
    try {
        const response = await getOneList(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.put = async (req, res) => {
    try {
        const response = await putList(req.params.id, req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}

exports.remove = async (req, res) => {
    try {
        const response = await removeList(req.params.id)
        res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' })
    }
}
