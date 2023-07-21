const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    genre: {
        required: true,
        type: String
    },
    price: {
        requied: true,
        type: Number
    },
    stock: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Book', bookSchema)