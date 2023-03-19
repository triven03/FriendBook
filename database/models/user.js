const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name:String,
  Email:String,
  Password:String,
  Mobile:Number,
  ProfilePhoto: String,
  Friends:[],
  
  
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

