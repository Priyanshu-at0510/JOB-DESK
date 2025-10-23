import e from "express";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        default:'student',
        required:true,
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{
            type:String,
        }],
        resume:{
            type:String,//url to resume file from database
        },
        resumeOriginalName:{
            type:String,
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company',
        },
        profilePhoto:{
            type:String,//url to profile photo from database
            default:"",
        }
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;