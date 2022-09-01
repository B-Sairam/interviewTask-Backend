const mongoose  = require('mongoose');

const UserShema = mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true},
    mobile:{type:Number,require:true},
    password:{type:String}
})
const UserList = mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true,unique:true},
    mobile:{type:Number,require:true,unique:true},
    age:{type:Number}
})

const Users = mongoose.model("User",UserShema);
const UserDetail = mongoose.model("UserDetail",UserList);

module.exports={Users,UserDetail}