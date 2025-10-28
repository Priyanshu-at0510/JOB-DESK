import Company from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName,description } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }
    if(!description){
        return res.status(401).json({
            message:"Company description is required",
            success:false,
        });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(401).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      description,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllCompanies=async(req,res)=>{
    try {
        const userId=req.id;//user id for loggedIn user 
        const companies=await Company.find({userId});
        return res.status(200).json({
            message:"Companies fetched successfully",
            companies,
            success:true,   
        })
    } catch (error) {
        console.error("Error in getAllCompanies:", error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}

export const getCompanyById=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            });
        }
        return res.status(200).json({
            message:"Company fetched successfully",
            company,
            success:true,
        });
    } catch (error) {
        console.error("Error in getCompanyById:", error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        });
    }
}

//update company details
export const updateCompanyDetails=async(req,res)=>{
    try {
       const {name,description,location,website}=req.body;
       const file=res.file;//logo file

       //cloudinary logic to upload file and get url
       const updateData={name,description,location,website};
        if(file){
        updateData.logo=file.path;//url from cloudinary
        }

       const companyId=req.params.id;
       const company=await Company.findByIdAndUpdate(companyId,updateData,{new:true});
       if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            });
        }
        return res.status(200).json({
            message:"Company updated successfully",
            success:true,   
        });
    }
    catch (error) {
        console.error("Error in updateCompanyDetails:", error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        }); 
    }
}