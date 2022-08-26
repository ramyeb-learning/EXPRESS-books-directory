//libs
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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
    .get((req, res)=>{
        res.status(200).json({message: ' All books'})
        //Get all books via API
    })

app.route('/book/:id')
    .get((req, res)=>{
        //get
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
