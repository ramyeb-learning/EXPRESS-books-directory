const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

const verifyJwtMiddleware = (req,res, next) => {
    try{
        const token = extractBearerToken(req.headers.authorization)

        if(!token){
            throw new Error('Missing token')
        }

        jwt.verify(token, SECRET, (err, decoded)=>{
            if(err)
                throw new Error('Wrong token')
            res.locals.user = decoded; 
            next()
        })

    }catch(e){
        res.status(400).json({error: e.message})
    }
}

module.exports = {verifyJwtMiddleware}