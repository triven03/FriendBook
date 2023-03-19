const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  Name:String,
  Para:String,
  Time:{
    // type: Date, default: new Date(new Date().getTime()+5.5*60*60*1000) 
    type: Date, default: new Date()
  },
  Photo:{
    type:String,
    default:""
  },

  Privacy:String,
  CreateBy:ObjectId, 
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;

