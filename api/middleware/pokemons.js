const { body, param, validationResponse, validationResult } = require('express-validator')

exports.validatePokemonsFields = [
    body('name').trim().notEmpty().isString(),
    body('pokedexNumber').trim().notEmpty().isNumeric()
]

exports.validateErrorPokemon = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next()
}
