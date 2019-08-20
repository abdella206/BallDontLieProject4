const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    apiId: String,

})

module.exports = mongoose.model('Team', TeamSchema)