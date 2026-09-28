const knowledgeChunk = require("../models/knowledgeChunk");
const {chunkText} = require("../utils/chunkText");
const {generateEmbedding} = require("./embedding.service");




const ingestDocument = async (text , source)=>{
    const chunks=chunkText(text);
    const docs=[];
    for(const chunk of chunks){
        const embedding= await generateEmbedding(chunk);
        docs.push({content: chunk , 
            source,
            embedding
        });
    }
    const savedChunks = await knowledgeChunk.insertMany(docs);
    return savedChunks;
}


const searchKnowledge = async (query , limit=5) =>{
    const vectorQuery = await generateEmbedding(query);

    const result = await knowledgeChunk.aggregate([{
        $vectorSearch:{
            index:"vector_index",
            path:"embedding",
            queryVector:vectorQuery,
            numCandidates:50,
            limit:limit

        }
    } , {
        $project:{
            _id:1,
            content:1,
            source:1,
            score:{
                $meta:"vectorSearchScore"
            }

        }
    }])

    return result;
}


module.exports = {ingestDocument , searchKnowledge};