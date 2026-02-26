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
        console.log("User content for enhancement:", userContent);
        if(!userContent) {
            return res.status(400).json({ message: 'User content is required' });
        }

        // Enhance using Gemini AI
        const response = await geminiAi.models.generateContent({
            model: process.env.MODEL || "gemini-2.0-flash",
            contents: userContent,
            config: {
                systemInstruction: enhanceSummaryTemplate,
            },
        });
        console.log("AI Response:", response);
        const enhancedSummary = response.text.trim();
        console.log("Enhanced Summary:", enhancedSummary);
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        if (error.status === 429) {
            return res.status(429).json({ message: 'AI service rate limit exceeded. Please wait a moment and try again.' });
        }
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

        // Enhance using Gemini AI
        const response = await geminiAi.models.generateContent({
            model: process.env.MODEL || "gemini-2.0-flash",
            contents: userContent,
            config: {
                systemInstruction: enhanceJobTemplate,
            },
        });
        console.log("AI Response:", response);
        const enhancedSummary = response.text.trim();
        console.log("Enhanced Job Description:", enhancedSummary);
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        if (error.status === 429) {
            return res.status(429).json({ message: 'AI service rate limit exceeded. Please wait a moment and try again.' });
        }
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
            model: process.env.MODEL || "gemini-2.0-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
            },
        });

        console.log("AI Response:", response);

        let extractedData = response.text;
        if (!extractedData) {
            // fallback: extract from candidates
            extractedData = response.candidates?.[0]?.content?.parts?.[0]?.text;
        }
        if (!extractedData) {
            return res.status(500).json({ message: 'AI returned empty response' });
        }
        extractedData = extractedData.trim();
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