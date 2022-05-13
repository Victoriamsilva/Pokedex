const express = require("express")
const router = express.Router()
const controller = require("../controller/pokemon")
const { validatePokemonsFields, validateErrorPokemon } = require("../middleware/pokemons")
const { verifyJWT } = require('../middleware/user')

router.get('/pokemons', verifyJWT, controller.get)
router.post('/pokemons', verifyJWT, validatePokemonsFields, validateErrorPokemon, controller.post)
router.get('/pokemons/:id', verifyJWT, controller.getOne)
router.put('/pokemons/:id', verifyJWT, validateErrorPokemon, controller.put)
router.delete('/pokemons/:id', verifyJWT, validateErrorPokemon, controller.remove)

module.exports = router;