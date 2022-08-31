const {dbBooks} = require('../db/books')

const verifyOwnershipMiddleware = (req, res, next) => {
    try{ 
        const book = dbBooks.find(element => element.id == req.params.id)
        if(book.author != res.locals.user.username)
            throw new Error('You are not the owner')
        next()
    }
    catch(e){
        res.status(400).json({error: e.message })
    }
   
}

module.exports = {verifyOwnershipMiddleware}