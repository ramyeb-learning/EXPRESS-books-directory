const axios = require('axios')
const {dbBooks} = require('../db/books')

const getAllBooks = async (req, res)=>{
    try{
        const response = await axios.get('https://openlibrary.org/search.json?author=tolkien')
        res.status(200).json({
            dbBooks,
            response: response.data
        })
    } catch (e){
        res.status(500).json({error: e.message})
    }           
}

const getBook = async (req, res)=>{
    try{
        const response = await axios.get(' https://openlibrary.org/books/OL7353617M.json') 
        res.status(200).json(response.data)
    }catch (e){
        res.status(500).json({error: e.message})
    }
}

const postBook = async (req, res)=>{
    try{
        if(!req.body.title)
            throw new Error('title missing')
        
        const book = { 
            id: dbBooks[dbBooks.length-1].id+1,
            username: res.locals.user.username,
            title: req.body.title
        }
        dbBooks.push(book)
        res.status(200).json("Book created")
    }catch(e){
        res.status(500).json({error: e.message})
    }
    
}

const putBook = async (req, res)=>{
    try{
        const id = dbBooks.findIndex(book => book.id == req.params.id)
        dbBooks[id] = { 
            ...dbBooks[id],
            title: req.body.title ? req.body.title : book.title,
        };
        res.status(200).json('Book changed')
    }catch (e) {
        res.status(400).json({error: e.message})
    }
}
   
const deleteBook = async (req, res)=>{
    try{
        index = dbBooks.findIndex(book => book.id != req.params.id)
        dbBooks.splice(index, 1)
        res.status(200).json('Book deleted')
    }catch (e) {
        res.status(400).json({error: e.message})
    }
}


module.exports = {getAllBooks, getBook, postBook, putBook, deleteBook}