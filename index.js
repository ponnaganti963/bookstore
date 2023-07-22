
require('dotenv').config();
const express = require('express')

const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const app = express()


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json())


const routes = require('./routes/routes');



app.use('/', routes)




app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})