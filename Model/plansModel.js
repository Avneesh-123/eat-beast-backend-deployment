const mongoose = require("mongoose");
const {DB_LINK} = process.env || require("../config/secret.js") ;
require('dotenv').config();
// const DB_LINK = process.env.DB_LINK;


mongoose.connect(DB_LINK,{ useNewUrlParser: true })
.then( (db)=>{
    console.log("connected to db");
});


  const reviewObjSchemaInPlan = new mongoose.Schema({
    userId :{
      type:String,
      required:true
    },
    userImage:{
      type:String,
      required:true
    },
    userName:{
      type:String,
      required:true
    },
    message:{
      type:String,
      required:true
    },
    rating:{
      type:Number,
    },
    bookedOn : {
      type:String,
      default:new Date()
    }
  })

  let planSchema = new mongoose.Schema({
      name:{
          type:String,
          required:true,
          maxlength:[40,"length is greater than 40"]
      },
      duration:{
          type:Number,
          required:true,
      },
      price:{
          type:Number,
          required:true,
      },
      discount:{
        type:[reviewObjSchemaInPlan],
      },
      planImage:{
        type:String,
        default:"/images/plans/default.png"
      },
  })

  const planModel = mongoose.model("planscollection",planSchema);

  module.exports = planModel;