const mongoose = require('mongoose');

const airtimeSchema = new mongoose.Schema({
    airtimeName:{
        type: String,
        enum:["Airtel", 'MTN', "Elisalat", "Glo"],
        required: true
    },
    airtimeId: { 
        type: String, 
     },


}, {timestamps:true});

const airtime = mongoose.model('airtime', airtimeSchema);

module.exports = airtime;
