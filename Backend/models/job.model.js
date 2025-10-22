import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
        required:true,
    }],
    location:{
        type:String,
        required:true,
    },
    salaryRange:{
        min:{
            type:Number,
            required:true,
        },
        max:{
            type:Number,
            required:true,
    }},
    jobType:{
        type:String,
        enum:['Full-time','Part-time','Contract','Internship','Temporary'],
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
        default:null,
    }]
},{timestamps:true});

const Job=mongoose.model('Job',jobSchema);
export default Job;
