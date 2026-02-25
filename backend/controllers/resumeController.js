import Resume from "../models/resume";

//controller for getting user resume 
// GET: /api/resume
export const getUserResumes = async (req,res)=>{
    try {
        const userId = req.userId;
        //return user resumes
        const resumes = await Resume.find({userId});
        return res.status(200).json({
            message: "Resumes fetched successfully",
            resumes
        });

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}