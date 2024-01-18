const router =require('express').Router()


const { authenticate } = require("../middleware/authentication")

const {betTrans} = require('../controllers/airtimeCont')
router.post('/place-bet/:betId', authenticate, betTrans)


module.exports = router