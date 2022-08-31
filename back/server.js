//libs
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')

//config
const PORT = 3000

const app = express()
app.use(cors())
    .use(morgan('tiny'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

//middlewares
const {verifyJwtMiddleware} = require('./middleware/jwt')
const {verifyOwnershipMiddleware} = require('./middleware/ownership')
const securityMiddlewares = [verifyJwtMiddleware]
const securityAndOwnerMiddlewares = [...securityMiddlewares, verifyOwnershipMiddleware]

//services
const {register, login} = require('./services/Auth')
const {getAllBooks, getBook, postBook, putBook, deleteBook} = require('./services/Book')
const {getAllUsers} = require('./services/User')


//---------------ROUTES--------------

//Auth Route
app.route('/login').post(login);
app.route('/register').post(register);

//User Route
app.route('/users')
    .get([...securityMiddlewares], getAllUsers)

//Books route
app.route('/books')
    .get(getAllBooks);

app.route('/book')
    .post([...securityMiddlewares], postBook)

app.route('/book/:id')
    .get( getBook )
    .put( [...securityAndOwnerMiddlewares], putBook)
    .delete([...securityAndOwnerMiddlewares], deleteBook)

    
//---------------SERV--------------

const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`)
})

server.on('connection', ()=>{
    console.log(`User connected`)

    server.on('disconnect', ()=>{
        console.log(`User disconnected`)
    })
})