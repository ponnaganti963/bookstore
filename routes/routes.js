const express = require('express')
const checkRole = require('../middeware/checkrole')

const router = express.Router();
const bcrypt = require('bcrypt')

const BookModel = require('../models/book')
const UserModel = require('../models/user')

router.post('/books', checkRole(['admin']), async (req, res) => {
  
    const newBook = new BookModel({ 
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        stock: req.body.stock
    })

    try{
        const saveData = await newBook.save()
        res.status(200).json(saveData)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/books/:id', async (req, res) => {
    try{
        let book = await BookModel.findById(req.params.id)
        res.status(200).json(book)
    }catch(err){
        res.status(404).json({message: `Book With Id ${req.params.id} is not found`})
    }
})

router.delete('/books/:id', checkRole(['admin']), async (req, res) => {
    try{
        let book = await BookModel.findByIdAndDelete(req.params.id)
        if(book)
        res.status(200).json({message: `Book with Id ${req.params.id} is successfully deleted`, book: book})
        else
        res.status(404).json({message: `Book with Id ${req.params.id} is not found`})
    }catch(err){
        res.status(404).json({message: `Book with Id ${req.params.id} is not found`})
    }
})

router.get('/books',  async (req, res) => {
    try{
        let books = await BookModel.find() 
        res.status(200).json({books: books})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/auth/signup', async (req, res) => {
    try{
        const validateEmail = async (email) => {
            let user = await UserModel.findOne({email: email})
            return !user
        }

        let emailNotRegistered = await validateEmail(req.body.email)
        if(!emailNotRegistered) res.status(400).json({message: `User with email ${req.body.email} is Already registered.`})

        const password = await bcrypt.hash(req.body.password,12)

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: password,
            role: req.body.role
        })

        await newUser.save()
        return res.status(200).json({message: "User added successfully!!"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

router.post('/auth/login', async (req, res) => {
    try{
        console.log(req.body.email)
        let user = await UserModel.findOne({email : req.body.email})
        
        if(!user) return res.status(404).json({message: 'User Not Found'})

        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password) 
        if(!isPasswordValid) return res.status(401).json({message: 'Invalid password'})
        return res.status(200).json({message: 'Login Successfull!'})

    }catch(error){
        return res.status(500).json({message: "User not found"})
    }
})

module.exports  = router