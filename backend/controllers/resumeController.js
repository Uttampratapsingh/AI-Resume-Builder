import imageKit from "../config/imageKit.js";
import fs from "fs";
import Resume from "../models/resume.js";

//controller for getting user resume 
// GET: /api/resume
export const getUserResumes = async (req,res)=>{
    console.log("Get user resumes controller called");
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

//controller for creating new resume
//POST: /api/resumes/create
export const createResume = async (req,res)=>{
    console.log("Create resume controller called");
    try {
        const userId = req.userId;
        const title = req.body.title;

        //create new resume
        const newResume = await Resume.create({userId, title});

        return res.status(201).json({message: "Resume created successfully", resume: newResume});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//controller for deleting resume
//DELETE: /api/resumes/delete
export const deleteResume = async (req,res)=>{
    console.log("Delete resume controller called");
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        await Resume.findOneAndDelete({_id: resumeId, userId});

        return res.status(200).json({message: "Resume deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//get user resume by id
//GET: /api/resumes/get
    export const getResumeById = async (req,res)=>{
        console.log("Get resume by id controller called");
        try {
            const userId = req.userId;
            const {resumeId} = req.params;

            const resume = await Resume.findOne({_id: resumeId, userId});

            if(!resume){
                return res.status(404).json({message: "Resume not found"});
            }

            resume.__v = undefined; // Set the __v field to undefined before sending the resume data in the response.
            resume.updatedAt = undefined; // Set the updatedAt field to undefined before sending the resume data in the response.
            resume.createdAt = undefined; // Set the createdAt field to undefined before sending the resume data in the response.

            return res.status(200).json({message: "Resume fetched successfully", resume});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

//get resume by id public
//GET: /api/resumes/public
export const getPublicResumeById = async (req,res)=>{
    console.log("Get public resume by id controller called");
    try {
        const {resumeId} = req.params;
        const resume = await Resume.findOne({_id: resumeId, public: true});

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        return res.status(200).json({message: "Resume fetched successfully", resume});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//controller for updating resume
//PUT: /api/resumes/update

export const updateResume = async (req,res)=>{
    console.log("Update resume controller called");
    try {
        const userId = req.userId;
        const {resumeId,resumeData,removeBackground} = req.body; // Get the resume data and removeBackground flag from the request body
        const image = req.file; // Get the uploaded image file from the request (if any)

        
        let resumeDataCopy = JSON.parse(resumeData); // Parse the resumeData string into a JavaScript object
        
        if(image){
            const imageBufferData = fs.createReadStream(image.path); // Create a readable stream from the uploaded image file

            const response = await imageKit.files.upload({
                file: imageBufferData,//
                fileName: 'resume.png', // Set the file name for the uploaded image
                folder : 'user-resumes', // Specify the folder in ImageKit where the image will be stored
                transformation:{ 
                    pre:'w-300,h-300,fo-face,z-0.75' + // Apply transformations to the image, such as resizing to 300x300 pixels, focusing on the face, and setting the zoom level to 0.75
                    (removeBackground ? ',e-background_removal' : '') // If removeBackground is true, add the background removal transformation
                }
            });
        }

        const resume = await Resume.findByIdAndUpdate({userId, _id: resumeId},resumeDataCopy, {new: true}) // Find the resume by userId and resumeId, and update it with the new resume data. The {new: true} option ensures that the updated resume is returned in the response.

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }

        return res.status(200).json({message: "Resume updated successfully", resume});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}