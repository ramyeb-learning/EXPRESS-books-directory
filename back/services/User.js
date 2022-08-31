const users = require('../db/users')

const getAllUsers = (req,res)=> {
        const listOfUsers = []
        users.forEach(e => listOfUsers.push(e.username))
        res.json(listOfUsers)
    }

module.exports = {getAllUsers}