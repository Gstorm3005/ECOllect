const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose");
const seeder = require("./src/classes/Seeder")
const router = require("./src/routes")
const createError = require('http-errors');
const cors = require('cors');
// const apiKeyMiddleware = require('./middleware/apiKey');

new seeder().wilaya()
new seeder().usine()
new seeder().role()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


// app.use(apiKeyMiddleware)

app.use('/api', router);


mongoose.connect("mongodb://127.0.0.1:27017/ECOLLECT")

app.listen(process.env.PORT, () => {
    console.log("Server is listening ", process.env.PORT)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
