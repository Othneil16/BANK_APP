const eletricityModel = require("../models/electricityMod")
const userModel = require("../models/userModel")

exports.createElect = async (req, res) => {
    try {
        const {eletricityName} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)
        const eletricity = await eletricityModel.create({eletricityName})
        
        if (!user) {
            return res.status(404).json({
                message: "Unable to find user"
            })
        }
        eletricity.eletricityId = eletricity._id
        await eletricity.save()

        res.status(200).json({
            message: "You have successfully created an electricty",
            eletricity
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAll = async (req, res) => {
    try {
        const eletricity = await eletricityModel.find()
        if (!eletricity) {
            return res.status(200).json({
                message: "Unable to find eletricities"
            })
        }
        if (eletricity.length === 0) {
            return res.status(200).json({
                message: "There are no eletricities created"
            })
        }
        return res.status(200).json({
            message: "These are the eletricities",
            data: eletricity
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

