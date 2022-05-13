const { body, param, validationResponse, validationResult } = require('express-validator')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const res = require('express/lib/response');

exports.validateId = [
    param('id').notEmpty().custom((value) => ObjectId.isValid(value))
]

exports.validateListFields = [
    body('name').trim().notEmpty().isString(),
    body('pokemons').notEmpty().isArray(),
]

exports.validateErrorList = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next()
}