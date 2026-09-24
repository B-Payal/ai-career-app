const {analyzeResume} = require("../services/ai.service");
const Analysis  = require("../models/analysis.model");
const {extractTextFromPDF} = require("../services/pdf.service");



const analyzeResumeController = async (req,res)=>{

    try {
        const {resume , jobDescription}= req.body;
    if(!resume || !jobDescription){
        return res.status(400).json({message:"all fields required."});
    }

    const result = await analyzeResume(resume,jobDescription);

    const analysis = await Analysis.create({
        userId:req.user.id,
        resume,
    jobDescription,

    matchScore: result.matchScore,
    summary: result.summary,
    strengths: result.strengths,
    missingSkills: result.missingSkills,
    suggestions: result.suggestions,
    interviewQuestions: result.interviewQuestions



    });

    return res.status(201).json(analysis);

        
    } catch (error) {
        return res.status(500).json({message:"some error occured." , error:error.message})
    }
}


const analyzeResumePDF= async (req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                message:"Resume PDF required"
            });
        }

        const {jobDescription}=req.body;
        const resumeText=await extractTextFromPDF(req.file.buffer);
        if(!resumeText.trim()){
            return res.status(400).json({
                message:"Could not extract text from resume"
            })
        }

        const result = await analyzeResume(resumeText,jobDescription);
        const analysis = await Analysis.create({
             userId: req.user.id,

            resume: resumeText,

            jobDescription,

            matchScore: result.matchScore,

            summary: result.summary,

            strengths: result.strengths,

            missingSkills: result.missingSkills,

            suggestions: result.suggestions,

            interviewQuestions: result.interviewQuestions

        })
        return res.status(201).json(analysis);


        
    } catch (error) {
        console.error("PDF analysis error:", error);
        return res.status(500).json({
            message:"failed to analyze PDF",error:error.message
        })

        
    }
}

module.exports = {analyzeResumeController , analyzeResumePDF};