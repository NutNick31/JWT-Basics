const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Provided.')
    }
    
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const {id,username} = decoded
        req.user = {id,username}
        next()

        // const luckyNumber = Math.floor(Math.random()*100)

        // res.status(200).json({msg: `Hello ${decoded.username}...`, secret:`Here is your authorised data, your lucky number is ${luckyNumber}.`})
    } catch (error) {
        throw new UnauthenticatedError('Not authorised to access this route.')
    }    


}

module.exports = authenticationMiddleware