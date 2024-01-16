const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const {myValidate} = require('../helpers/validation')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res)=>{
    try{
       const {firstname, lastname, phoneNumber, email, userPassword, confirmPassword, transactionPin} = req.body
      
       await myValidate.validateAsync(req.body,(err,data)=>{
        if (err) {
           return res.json(err.message)
        } else {
            return  res.json(data) 
        }
       }
    )
    
    const checkPassword = confirmPassword === userPassword
    if (!checkPassword) {
       return res.status(404).json({
       message:`incorrect Password, pls type-in a correct password that match`
       })
    } 
       const salt = bcrypt.genSaltSync(10)
       const hashedPassword = bcrypt.hashSync(userPassword,salt)

     
    
       const user = await new userModel({
        firstName:firstname.toUpperCase(),
        lastName:lastname.toUpperCase(),
        phoneNumber, 
        email: email.toUpperCase(),
        password: hashedPassword,
        transactionPin

       })

    
       await user.save()

       return res.status(201).json({
        message: `Congratulations!!!, ${firstname.charAt(0).toUpperCase()}${firstname.slice(1)}.${lastname.slice(0, 1).toUpperCase()} you are successfully registered on FASTRANS BANKING APP`,
        data: user,
    
       })
    }catch(err){
        return res.status(500).json({
            error:err.message
        })
    }
}
