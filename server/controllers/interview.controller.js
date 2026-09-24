const Analysis = require("../models/analysis.model");
const interviewSession = require("../models/interviewSession.model")
const {generateInterviewQuestions , evaluateAnswer} = require("../services/ai.service");


const startInterview = async (req,res)=>{
    try {
        const {analysisId} = req.body;
        if(!analysisId){
            return res.status(400).json({message:"Analysis ID required"});
        };
        const analysis = await Analysis.findOne({userId:req.user.id , _id:analysisId});
        if(!analysis){
            return res.status(404).json({message:"analysis not found"});
        }
        const result = await generateInterviewQuestions(analysis.resume , analysis.jobDescription);
        const session = await interviewSession.create({userId:req.user.id , analysisId:analysis._id , questions:result.questions.map((question)=>({question}))});
        return res.status(201).json({
            message: "Interview started",
            sessionId: session._id, 
            question: session.questions[0].question
        });

        
    } catch (error) {
        return res.status(500).json({error:error.message});        
    }
}


const submitAnswer = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({
                message: "Answer is required"
            });
        }

        const session = await interviewSession.findOne({
            _id: sessionId,
            userId: req.user.id
        });

        if (!session) {
            return res.status(404).json({
                message: "Interview Session not found"
            });
        }

        if (session.status === "COMPLETED") {
            return res.status(400).json({
                message: "Interview is already completed"
            });
        }

        const currentQuestion =
            session.questions[session.currentQuestionIndex];

        const evaluation = await evaluateAnswer(
            currentQuestion.question,
            answer
        );

        currentQuestion.answer = answer;
        currentQuestion.score = evaluation.score;
        currentQuestion.feedback = evaluation.feedback;
        currentQuestion.idealAnswer = evaluation.idealAnswer;

        session.currentQuestionIndex += 1;

        if (session.currentQuestionIndex >= session.questions.length) {
            session.status = "COMPLETED";

            const totalScore = session.questions.reduce(
                (sum, question) => sum + (question.score || 0),
                0
            );

            session.overallScore =
                totalScore / session.questions.length;
        }

        await session.save();

        if (session.status === "COMPLETED") {
            return res.status(200).json({
                message: "Interview completed",
                evaluation,
                overallScore: session.overallScore
            });
        }

        const nextQuestion =
            session.questions[session.currentQuestionIndex];

        return res.status(200).json({
            message: "Answer evaluated",
            evaluation,
            nextQuestion: nextQuestion.question
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to evaluate answer",
            error: error.message
        });
    }
};

const getInterviewSession = async (req,res)=>{
    try{
    const sessionId = req.params;

    const session = await interviewSession.findOne({
        _id:sessionId,
        userId:req.user.id
    }).populate("anaysisId");

    if(!session){
        return res.status(404).json({message:"session not found"})
    }
    return res.status(200).json(session);
}catch(err){
    return res.status(500).json({error:err.message});
}

}

const getMyInterviews = async (req, res) => {
    try {
        const sessions = await InterviewSession
            .find({
                userId: req.user.id
            })
            .sort({ createdAt: -1 })
            .select(
                "analysisId status overallScore currentQuestionIndex createdAt"
            );

        return res.status(200).json(sessions);

    } catch (error) {
        console.error("Get interviews error:", error);

        return res.status(500).json({
            message: "Failed to fetch interviews",
            error: error.message
        });
    }
};

module.exports = {startInterview , submitAnswer , getInterviewSession , getMyInterviews};