const {GoogleGenAI} = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

const analyzeResume = async (resume , jobDescription) =>{
   const prompt = `
You are an expert technical recruiter and career advisor.

Analyze the candidate's resume against the given job description.

IMPORTANT:
- Only use information actually present in the resume.
- Do not invent skills, experience, projects, or achievements.
- Give realistic and constructive feedback.
- Match score must be between 0 and 100.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Return the result in this exact JSON structure:

{
  "matchScore": 0,
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "suggestions": [],
  "interviewQuestions": []
}

Rules:
- matchScore: integer from 0 to 100
- summary: short explanation of the overall match
- strengths: maximum 5 items
- missingSkills: maximum 8 items
- suggestions: maximum 5 items
- interviewQuestions: exactly 5 questions
`;

const response = await ai.models.generateContent({
    model:"gemini-3.5-flash-lite",
    contents:prompt,
    config:{
        responseMimeType:"application/json"
    }

});

return JSON.parse(response.text);

}


const generateInterviewQuestions=async (resume ,jobDescription)=>{
    const prompt = `
You are a technical interviewer.

Create a technical interview based on the candidate's resume
and the provided job description.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Generate exactly 5 interview questions.

The questions should test:
- Skills mentioned in the resume
- Skills required by the job
- Projects and practical experience
- Technical understanding
- Problem solving

Do not ask questions about skills that are completely unrelated
to the resume or job description.

Return ONLY valid JSON in this format:


    "questions": [
        "question 1",
        "question 2",
        "question 3",
        "question 4",
        "question 5"
    ]

`;
const response = await ai.models.generateContent({
    model:"gemini-3.5-flash-lite",
    contents:prompt,
    config:{
        responseMimeType: "application/json"
    }
});
return JSON.parse(response.text);
}



const evaluateAnswer = async (question , answer)=>{

    const prompt = `
You are a technical interviewer.

Evaluate the candidate's answer to the interview question.

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Return ONLY valid JSON:

{
    "score": 0,
    "feedback": "",
    "idealAnswer": ""
}

Rules:
- score must be between 0 and 10
- feedback should explain what was good and what could improve
- idealAnswer should be a concise technically correct answer
`;

const response = await ai.models.generateContent({
    model:"gemini-3.5-flash-lite",
    contents:prompt,
    config:{
        responseMimeType:"application/json"
    }
});

return JSON.parse(response.text);

}

module.exports = {analyzeResume , generateInterviewQuestions, evaluateAnswer};



