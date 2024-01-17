const userModel = require("../models/userModel");
const transferModel = require("../models/transferMod");
const TransHisModel = require("../models/transHistMod");
const bcrypt = require('bcrypt')

exports.transfer = async (req, res) => {
    try {
        const { userId } = req.user;
        const { recieverAcctNum, amount, transacPin } = req.body;

        // Check for the sender and receiver account numbers in the database
        const checkUser = await userModel.findById(userId);
        const reciever = await userModel.findOne({ accountNumber: recieverAcctNum });

        if (!checkUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        if (!reciever) {
            return res.status(404).json({
                message: 'Receiver account number not found'
            });
        }

        // Check for the user's transacPin
        const comparetransacPin = bcrypt.compareSync(transacPin, checkUser.transactionPin);

        if (!comparetransacPin) {
            return res.status(400).json({
                message: 'Invalid transaction pin, please type in a correct pin'
            });
        }

        // Check if the account balance is greater than the amount for the transfer
        if (amount > checkUser.balance) {
            return res.status(400).json({
                message: 'Insufficient Balance, please deposit to carry out this transaction'
            });
        }

        // Decrement the sender's account balance and increment the receiver's account balance
        const newAccountBalForSender = checkUser.balance - amount;
        checkUser.balance = newAccountBalForSender;
        const newAccountBalForReceiver = reciever.balance + amount;
        reciever.balance = newAccountBalForReceiver;

        // Create a new transfer instance
        const transfer = new transferModel({
            SendrAcctNum: checkUser.accountNumber,
            recvrAcctNum: reciever.accountNumber,
            amount,
            type: "debit",
            userId:checkUser.userId
        });

        // Save the transfer to the database
        await transfer.save();

        // Create and save the transaction history id of the user as a debit 
        const depositToSender = await new TransHisModel({
            sender: checkUser.accountNumber,
            reciever: reciever.accountNumber,
            amount,
            type: "debit"
        }).save();

        // Create and save the transaction history id of the user as a credit
        const depositToReceiver = await new TransHisModel({
            sender: checkUser.accountNumber,
            reciever: reciever.accountNumber,
            amount,
            type: "credit",
          
        }).save();

        // Push the transfer id of the sender to the user's transfers 
        checkUser.transfers.push(transfer._id);

       // Push the transaction history id of the sender to the user's transHist as a debit
       checkUser.transHist.push(depositToSender._id);
        
        // Push the depositToReceiver of the reciever to the user's deposits
        reciever.deposits.push(depositToReceiver._id);

        // Push the transaction history id of the receiver to the user's deposits as a credit
        reciever.transHist.push(depositToReceiver._id);
    
        // Save the sender and receiver data
        await checkUser.save();
        await reciever.save();

        // Check the success and return detailed information about the transfer
        return res.status(200).json({
            message: 'Transfer successful',
            transfer: {
                sender: checkUser.accountNumber,
                receiver: reciever.accountNumber,
                amount,
                type: "debit",
                timestamp: transfer.createdAt // or any other timestamp you want to include
            },
            sender: checkUser,
            receiver: reciever
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
};
