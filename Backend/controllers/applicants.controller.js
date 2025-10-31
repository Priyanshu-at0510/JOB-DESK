import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required",
                success:false,
            })
        }
        //check if the job exist or not
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false,
            });
        }
        //check if user has already applied for the job
        const existingApplication=await Application.findOne({
            job:jobId,
            applicant:userId,
        });
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false,
            })
        }
        //create new application
        const newApplication=new Application({
            job:jobId,
            applicant:userId,
            status:'Applied',
        });
        job.applications.push(newApplication._id);
        await job.save();
        
        return res.status(201).json({
            message:"Job application submit successfully",
            application:newApplication,
            success:true,
        });
    } catch (error) {
        console.error("Error in applyJob:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}

export const getAppliedJobs=async (req,res)=>{
    try {
        const userId=req.id;
        const applications=(await Application.find({applicant:userId})
           .sort({createdAt:-1}))
           .populate({ path:'job',options:{sort:{createdAt:-1}}
         });
        if(!applications || applications.length===0){
            return res.status(404).json({
                message:"No applied jobs found",
                success:false,
            });
        }
        return res.status(200).json({
            message:"Applied Jobs fetched successfully",
            applications,
            success:true,
        })
           
    } catch (error) {
        console.error("Error in getAppliedJobs:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}

export const getApplicants=async (req,res)=>{
    try {
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required",
                success:false,
            })
        }
        //check if the job exist or not
        const job=await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{path:'applicant',options:{sort:{createdAt:-1}}}
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Applicants fetched successfully",
            job,
            success:true,
        });
    } catch (error) {
        console.error("Error in getApplicants:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}


export const updateStatus=async (req,res)=>{
    try {
        const {status}=req.params;
        const applicationId=req.params.id;
        if(!status){
            return res.status(404).json({
                message:"Status is required",
                success:false,
            })
        }
        //find application by id
        const application=await Application.findById({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false,
            })
        }

    } catch (error) {
        console.error("Error in updateStatus:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        }); 
    }
}