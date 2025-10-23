import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

//register new user
export const register=async (req,res)=>{
    try {
        const{fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        }
        //check if user already exists
        const existingUser=await User.findOne({$or:[{email},{phoneNumber}]});
        if(existingUser){
            return res.status(400).json({
                message:"User with this email or phone number already exists",
                success:false,
            });
        }
        //convert password to hash
        const hashedPassword=await bcrypt.hash(password,10);
        //create new user
        const newUser=new User({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        });
        await newUser.save();
        return res.status(201).json({
            message:`Account created successfully for ${newUser.fullname}`,
            success:true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error while registering user",
            success:false,  
        })
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Email and password are required",
                success:false,
            });
        }
        //check is user is exit
        let user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,      
            })
        }
        //cmpare password
        const issMatch=await bcrypt.compare(password,user.password);
        if(!issMatch){
            return res.status(401).json({
                message:"Invalid password",
                success:false,  
            })
        }
        if(user.role!==role){
            return res.status(403).json({
                message:"Unauthorized access ,u can't login with this role",
                success:false,  
            })  
        }
        //generate token
        const tokenData={
            id:user._id,
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{
            expiresIn:'2d',
        });

        user={
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role, 
            profile: user.profile,   
        }
        return res
            .status(200)
            .cookie('token',token,{maxAge:2*24*60*60*1000,httpOnly:true,})
            .json({
            message:`welcome back, ${user.fullname}`,
            success:true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error while logging in",
            success:false,  
        })      
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message:"Logged out successfully",
            success:true,
        })
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            message:"Internal Server Error while logging out",
            success:false,  
        })      
    }       
}

export const updateProfile=async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} =req.body;
        const file=req.files;
        
        //cloudinary upload can be added here for profile picture
        let skillsArray;
        if(skills){
            skillsArray = skills.split(',').map(skill => skill.trim());
        }
        const userId=req.id;
        let user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,      
            })
        }
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();
        user={
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role, 
            profile: user.profile,   
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error while updating profile",
            success:false,  
        })
    }
}



