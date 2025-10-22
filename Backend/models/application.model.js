import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    resume:{
        type:String,//url to resume file from database
        required:true,
    },
    status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending',
    }
},{timestamps:true});

const Application=mongoose.model('Application',jobSchema);

export default Application;

