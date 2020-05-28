const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

const Contact = new Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:[],
        required:true
    },
    email:{
        type:[],
        required:true
    },
    dateOfBirth:{
        type:String,
        default:"Not specified"
    }
})
module.exports = mongoose.model('Contact',Contact);