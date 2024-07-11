const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
}
);

const studentModel = mongoose.model("People",userSchema)
module.exports = studentModel