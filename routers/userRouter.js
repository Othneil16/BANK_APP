const { deposit } = require("../controllers/depositCont")
const { getTransactionHistory } = require("../controllers/transactionHistCont")
const { transfer } = require("../controllers/transferCont")
const { signUp, signIn } = require("../controllers/userCont")
const { withdraw } = require("../controllers/withdrawCont")
const { authenticate } = require("../middleware/authentication")

const uploads = require("../utilityMW/multer")

const router = require("express").Router()

// for user signing-up into the bank app
router.post('/sign-up', uploads.single('profileImage'), signUp)

// for user logging-in into the bank app
router.post('/sign-in', signIn)


// for user depositing into his account
router.post ("/deposit",authenticate, deposit)

// for user traansfering out of the account
router.post("/transfer", authenticate,transfer)

// for user withdrawing into another account
router.post("/withdraw", authenticate, withdraw)

// for the user to see all transaction history
router.post("/getallmyhistory", authenticate, getTransactionHistory)

module.exports = router