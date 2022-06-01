import mongoose from "mongoose";
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
    type:{
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
    desc :{
        type:String,
        required:true
    },
    rating :{
        type:Number,
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

export default mongoose.models.Hotels ||
  mongoose.model("Hotels", HotelsSchema);