const router = require('express').Router()
const { authenticate } = require("../middleware/authentication")

const {airtimeTrans} = require('../controllers/airtimeCont')
router.post('/purchase-airtime/:airtimeId', authenticate, airtimeTrans)


module.exports = router