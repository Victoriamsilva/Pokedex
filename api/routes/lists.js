const express = require("express")
const router = express.Router()
const controller = require("../controller/lists")
const { verifyJWT } = require('../middleware/user')
const { validateListFields, validateErrorList } = require("../middleware/lists")

router.get('/lists', verifyJWT, controller.get)
router.post('/lists', verifyJWT, validateListFields, validateErrorList, controller.post)
router.put('/lists/:id', verifyJWT, validateListFields, validateErrorList, controller.put)
router.delete('/lists/:id', verifyJWT, validateErrorList, controller.remove)
router.get('/lists/:id', verifyJWT, validateErrorList, controller.getOne)

module.exports = router;