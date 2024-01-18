const bettingModel = require("../models/bettingModel")
const userModel = require("../models/userModel")

exports.createBet = async (req, res) => {
    try {
        const {bettingName} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)
        const betting = await bettingModel.create({bettingName})
        
        if (!user) {
            return res.status(404).json({
                message: "Unable to find user"
            })
        }
        betting.betttingId = betting._id
        await betting.save()

        res.status(200).json({
            message: "You have successfully created a Bet"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAll = async (req, res) => {
    try {
        const betting = await bettingModel.find()
        if (!betting) {
            return res.status(200).json({
                message: "Unable to find airtimes"
            })
        }
        if (betting.length === 0) {
            return res.status(200).json({
                message: "There are no airtimes created"
            })
        }
        return res.status(200).json({
            message: "These are the airtimes",
            data: betting
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

