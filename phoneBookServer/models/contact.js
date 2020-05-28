const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

const Contact = new Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:[String],
    email:[String],
    dateOfBirth:{
        type:String,
        default:"Not specified"
    }
})
module.exports = mongoose.model('Contact',Contact);