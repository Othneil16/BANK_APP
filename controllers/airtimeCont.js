const airtimeModel = require("../models/airtimeMod")
const userModel = require("../models/userModel")

exports.createElect = async (req, res) => {
    try {
        const {airtimeName} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)
        const airtime = await airtimeModel.create({airtimeName})
        
        if (!user) {
            return res.status(404).json({
                message: "Unable to find user"
            })
        }
        airtime.airtimeId = airtime._id
        await airtime.save()

        res.status(200).json({
            message: "You have successfully created an airtime"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAll = async (req, res) => {
    try {
        const airtime = await airtimeModel.find()
        if (!airtime) {
            return res.status(200).json({
                message: "Unable to find airtimes"
            })
        }
        if (airtime.length === 0) {
            return res.status(200).json({
                message: "There are no airtimes created"
            })
        }
        return res.status(200).json({
            message: "These are the airtimes",
            data: airtime
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

