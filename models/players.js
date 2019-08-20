const mongoose = require('mongoose')

const playersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    playerId:Number


})

module.exports = mongoose.model('players', playersSchema)