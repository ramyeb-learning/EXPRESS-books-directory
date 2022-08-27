//libs
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')

//imports
const {users} = require('./db/users')

//config
const PORT = 3000

const app = express()
app.use(cors())
    .use(morgan('tiny'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

//middlewares
const {verifyJwtMiddleware} = require('./middleware/jwt')
const securityMiddlewares = [verifyJwtMiddleware]

//services
const {register, login} = require('./services/Auth')

app.route('/login').post(login);
app.route('/register').post(register);

app.route('/users')
    .get([...securityMiddlewares], (req,res)=> {
        const listOfUsers = []
        users.forEach(e => listOfUsers.push(e.username))
        res.json(listOfUsers)
    })

app.route('/books')
    .get(async (req, res)=>{
        try{
            const response = await axios.get('https://openlibrary.org/search.json?author=tolkien')
            res.status(200).json(response.data)
        } catch (e){
            res.status(500).json({error: e.message})
        }           

    })


app.route('/book/:id')
    .get( async (req, res)=>{
        try{
            const response = await axios.get(' https://openlibrary.org/books/OL7353617M.json') 
            res.status(200).json(response.data)
        }catch (e){
            res.status(500).json({error: e.message})
        }
    })
    .post((req, res)=>{
        //create
    })
    .put((req, res)=>{
        //modify
    })
    .delete((req, res)=>{
        //delete
    })

const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`)
})

server.on('connection', ()=>{
    console.log(`User connected`)

    server.on('disconnect', ()=>{
        console.log(`User disconnected`)
    })
})
