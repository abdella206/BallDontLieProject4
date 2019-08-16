const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    teamId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]

})

module.exports = mongoose.model('Game', GameSchema)