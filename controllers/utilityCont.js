const utilityModel = require('../models/utilitiesMod')
const userModel = require('../models/userModel')


exports.createUtility = async(req, res)=>{
    try{
        const{utilityName} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message:'User not found'
            })
        }
        const utils = await utilityModel.create({
            utilityName
        })

        if(!utils){
           return res.status(404).json({
            messgae:"Unable to create utility"

           })
        }
        utils.utilityId = utils._id
        await utils.save()
        res.status(201).json({
            message:'Successfully created an utility',
            utils
        })
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const utils = await utilityModel.find()
        if (utils.length === 0) {
            return res.status(200).json({
                message: "Unable to find Utilties"
            })
        }
        return res.status(200).json({
            message: "These are the Students",
            data: utils
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getOne = async (req, res)=> {
    try {
        const utilsId = req.user.userId
        const utils = await utilityModel.findOne(utilsId)
        if (!utils) {
            return res.status(404).json({
                message: "Unable to find one Utility"
            })
        }
        return res.status(200).json({
            message: `utilis with ${utils.utilityName} hs been found`,
            data: utils
        })
    } catch (error) {
        res.status(500).json({
            message: err.message
        })
    }
}