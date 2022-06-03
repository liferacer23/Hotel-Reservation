const mongoose = require("mongoose");
const {Schema} = mongoose;

const HotelsSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    distances:{
        type:String,
        required:true
    },
    photos :{
        type:Array,
    
    },
    description :{
        type:String,
        required:true
    },
    rating :{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    rooms :{
        type:[String],
    
    },
    cheapestPrice :{
        type:Number,
        required:true
    
    },
    featured:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.models.Hotels ||
  mongoose.model("Hotels", HotelsSchema);