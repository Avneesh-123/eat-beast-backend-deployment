const mongoose = require("mongoose");
const {DB_LINK} = process.env || require("../config/secret.js");
require('dotenv').config();
// const DB_LINK = process.env.DB_LINK;


const crypto = require("crypto");
mongoose.connect(DB_LINK,{ useNewUrlParser: true })
.then( (db)=>{
    console.log("connected to db");
});

  //bookedPlan Schema
  const bookedPlanSchema = new mongoose.Schema({
      planId:{
        type:String,
        required:true
      },
      planImage:{
          type:String,
          required:true
      },
      name:{
        type:String,
        required:true
      },
      currentPrice : {
        type:Number,
        required:true
    },
    bookedOn : {
        type:String,
        default:new Date().toLocaleString() // 11/16/2015, 11:18:48 PM
    },
    address : {
        type:String
    }
  }) 

  // booking Schema
  const bookingSchema = new mongoose.Schema({
    userId :{
        type:String,
        required:true
    },
    bookedPlans:{
        type:[bookedPlanSchema],
        required:true
    }
})


const bookingModel = mongoose.model("bookingcollection" , bookingSchema);
module.exports = bookingModel;