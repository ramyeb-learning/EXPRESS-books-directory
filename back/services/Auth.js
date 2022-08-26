const jwt = require('jsonwebtoken')

const {users} = require('../db/users')
const {SECRET} = require('../config')

function login(req, res) {
    try{
        const {username, password} = req.body
        if(username==undefined || password==undefined){
            throw new Error('Enter the correct username and password please')
        }

        const user = users.find(u => u.username === username && u.password === password)

        if(!user){
            throw new Error('User unknow : Please register')
        }

        const token = jwt.sign({
            id: user.id,
            username
        }, SECRET)

        res.status(200).json({message: "success", token})

    } catch (e) {
        res.status(400).json({error : e.message})
    }
}


function register(req, res) {
    try{
        const {username, password} = req.body

        
        if(username==undefined || password==undefined)
            throw new Error('Enter the correct username and password please')

        if(users.find(u=> u.username === username))
            throw new Error('This username already exist')

        const user = {
            id: users.length,
            username,
            password
        }    
        users.push(user)
        
        const token = jwt.sign({
            id: user.id,
            username
        }, SECRET)

        res.status(200).json({message: "User registered successfully", token})

    } catch (e) {
        res.status(400).json({error : e.message})
    }
}

module.exports = {register, login}