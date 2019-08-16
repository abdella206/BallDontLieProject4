const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: String,
    statsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Stats'}]

})

module.exports = mongoose.model('Player', playerSchema)