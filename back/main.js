const express = require('express')
const port = 3000
const app = express()

app.route('/books')
    .get(()=>{
        //Get all books via API
    })

app.route('/book/{id}')
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

const server = app.listen(port, ()=>{
    console.log(`Server listening on port : ${port}`)
})

server.on('connection', (socket)=>{
    console.log(`User connected`)

    server.on('disconnect', ()=>{
        console.log(`User disconnected`)
    })
})

