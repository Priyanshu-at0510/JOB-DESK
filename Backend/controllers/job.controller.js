import  Job from "../models/job.model.js";
//admin post the job
export const postJob=async (req,res)=>{
    try {
        const {title,description,requirements,location,salary,jobType,companyId,position,experience}=req.body;
        const userId=req.id;
        if(!title || !description || !requirements || !location || !salary || !jobType || !companyId || !position || !experience){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            });
        }

        const newJob=await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            location,
            salary,
            jobType,
            experience,
            company:companyId,
            position,
            createdBy:userId,
        });
        return res.status(201).json({
            message:"Job Posted successfully",
            job:newJob,
            success:true,
        }); 
    } catch (error) {
        console.error("Error in registerJob:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}
//users get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};
//user get job by id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};
//admin get jobs posted by him
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};