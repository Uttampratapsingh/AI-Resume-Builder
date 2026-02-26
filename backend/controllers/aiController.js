import geminiAi from "../config/ai.js";
import enhanceJobTemplate from "../template/enhanceJobTemplate.js";
import enhanceSummaryTemplate from "../template/enhanceSummaryTemplate.js";
import userResumeTemplate from "../template/userResumeTemplate.js";
import Resume from "../models/resume.js";



// controller for enhancing resume summary using AI
// PODST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    console.log("Enhance professional summary controller called");
    try {
        const { userContent } = req.body;

        if(!userContent) {
            return res.status(400).json({ message: 'User content is required' });
        }

        // Simulate AI enhancement (replace with actual AI logic)
        const response = await geminiAi.chat.completions.create({
            model: process.env.MODEL || "gemini-3-flash-preview",
            messages: [
                { role: "system", content : enhanceSummaryTemplate},
                {role: "user" , content: userContent}
            ]
        })

        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        return res.status(500).json({ message: 'Error enhancing professional summary', error: error.message });
    }
}



// controller for the enhance job description using AI
// PODST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    console.log("Enhance job description controller called");
    try {
        const { userContent } = req.body;

        if(!userContent) {
            return res.status(400).json({ message: 'User content is required' });
        }

        // Simulate AI enhancement (replace with actual AI logic)
        const response = await geminiAi.chat.completions.create({
            model: process.env.MODEL || "gemini-3-flash-preview",
            messages: [
                { role: "system", content : enhanceJobTemplate},
                {role: "user" , content: userContent}
            ]
        })

        const enhancedSummary = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        return res.status(500).json({ message: 'Error enhancing job description', error: error.message });
    }
}


//controller for uploading resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    console.log("Upload resume controller called");
    try {
        const {resumeText,title} = req.body;
        const userId = req.userId;
        console.log("Resume text:", resumeText);
        console.log("Title:", title);
        if(!resumeText || !title) {
            return res.status(400).json({ message: 'Resume text and title are required' });
        }

        const systemPrompt = "You are an expert AI agent to extract data from resume"
        const userPrompt = `Provide ONLY valid JSON. Do not wrap in markdown. Do not add explanations.
        provide data in the following JSON format with no additional text before and after the JSON:
        --------------------------------------------------------
        ${JSON.stringify(userResumeTemplate, null, 2)}
        --------------------------------------------------------
        Extract data from this resume:
        --------------------------------------------------------
        ${resumeText}

        `;

        console.log("System Prompt:", systemPrompt);
        console.log("User Prompt:", userPrompt);


        const response = await geminiAi.models.generateContent({
            model: process.env.MODEL || "gemini-3-flash-preview",
            messages: [
                { role: "system", content : systemPrompt},
                {role: "user" , content: userPrompt}
            ],
            response_format: {
                type: "json_object"},
        });

        console.log("AI Response:", response);

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({userId,title,...parsedData});

        console.log("New Resume Created:", newResume);
        
        return res.status(201).json({ message: 'Resume uploaded successfully', resumeId: newResume._id});

    } catch (error) {
        console.error("Upload resume error:", error.message, error.status);
        if (error.status === 429) {
            return res.status(429).json({ message: 'AI service rate limit exceeded. Please wait a moment and try again.' });
        }
        return res.status(500).json({ message: 'Error uploading resume', error: error.message });
    }
}