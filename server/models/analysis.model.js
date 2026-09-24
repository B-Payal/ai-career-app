const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analysisSchema = Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    matchScore:{
        type:Number,
        required:true
    },
      summary: {
            type: String,
            required: true
        },

        strengths: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        suggestions: {
            type: [String],
            default: []
        },

        interviewQuestions: {
            type: [String],
            default: []
        }},{timestamps:true}
    
)

const Analysis = mongoose.model("Analysis" , analysisSchema);
module.exports = Analysis;