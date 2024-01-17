const { deposit } = require("../controllers/depositCont")
const { transfer } = require("../controllers/transferCont")
const { signUp, signIn } = require("../controllers/userCont")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()

// for user signing-up into the bank app
router.post('/sign-up', signUp)

// for user logging-in into the bank app
router.post('/sign-in', signIn)


// for user depositing into his account
router.post ("/deposit",authenticate, deposit)

// for user traansfering out of the account
router.post("/transfer", authenticate,transfer)

module.exports = router