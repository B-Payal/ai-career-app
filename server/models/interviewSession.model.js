const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        analysisId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Analysis",
            required: true
        },

        questions: [
            {
                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    default: null
                },

                score: {
                    type: Number,
                    default: null
                },

                feedback: {
                    type: String,
                    default: null
                },

                idealAnswer: {
                    type: String,
                    default: null
                }
            }
        ],

        currentQuestionIndex: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["IN_PROGRESS", "COMPLETED"],
            default: "IN_PROGRESS"
        },

        overallScore: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "InterviewSession",
    interviewSessionSchema
);