
const mongoose = require('mongoose')

const dbschima = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
},{timestamps: true})

const userModel = mongoose.model('react', dbschima);

module.exports = userModel;