const mongoose= require("mongoose");

const admin= new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const Register= new mongoose.model("Register",admin);
module.exports =Register;