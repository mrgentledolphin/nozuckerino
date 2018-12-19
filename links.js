const mongoose = require('mongoose')
let Schema = mongoose.Schema
let linksSchema = new Schema({
    link: String
}, {
    collection: 'links'
})
module.exports = mongoose.model('links', linksSchema)