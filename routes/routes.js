const express = require('express')
const checkRole = require('../middeware/checkrole')

const router = express.Router();
const bcrypt = require('bcrypt')

const BookModel = require('../models/book')
const UserModel = require('../models/user')

router.post('/book', checkRole(['admin']), async (req, res) => {
  
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


// const get 

router.get('/book',  async (req, res) => {
    res.send('Get API')
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

module.exports  = router