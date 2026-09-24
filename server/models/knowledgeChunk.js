const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const knowledgeChunkSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    embedding:{
        type:[Number],
        required:true
    },
    metadata:{
        type:Object,
        default:{}
    },

} , {timestamps:true})

module.exports = mongoose.model("KnowledgeChunk" , knowledgeChunkSchema);