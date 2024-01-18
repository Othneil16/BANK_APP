const router =require('express').Router()


const { authenticate } = require("../middleware/authentication")

const {elecTrans} = require('../controllers/airtimeCont')
router.post('/pay-elecbill/:elecId', authenticate, elecTrans)


module.exports = router