const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {
    const {username,password} = req.body
    if(!username || !password){
        throw new BadRequest('Please Provide Email and Password.')
    }
    
    const id = new Date().getDate()
    
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})
    
    // console.log(username,password);
    res.status(200).json(token)
}

const dashboard = async (req,res) => {


    const luckyNumber = Math.floor(Math.random()*100)

    res.status(200).json({msg: `Hello ${req.user.username}...`, secret:`Here is your authorised data, your lucky number is ${luckyNumber}.`})

    // const authHeader = req.headers.authorization

    // if(!authHeader || !authHeader.startsWith('Bearer ')){
    //     throw new customApiError('No Token Provided.', 401)
    // }
    
    // const token = authHeader.split(' ')[1]
    // try {
    //     const decoded = jwt.verify(token,process.env.JWT_SECRET)

    //     const luckyNumber = Math.floor(Math.random()*100)

    //     res.status(200).json({msg: `Hello ${decoded.username}...`, secret:`Here is your authorised data, your lucky number is ${luckyNumber}.`})
    // } catch (error) {
    //     throw new customApiError('Not authorised to access this route.', 401)
    // }
    
}

module.exports = {
    login, dashboard
}