const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    SendrAcctNum: {
        type: String,
        required: true
    },
    recvrAcctNum: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    withdrawId: {
        type: String,
        required: true
    }
});

const WithdrawTransaction = mongoose.model('withdraws', withdrawSchema);

module.exports = WithdrawTransaction;
