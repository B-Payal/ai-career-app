const Analysis = require("../models/analysis.model");

const getAnalyses= async (req,res)=>{
    try {
        const analyses = await Analysis.find({userId:req.user.id}).sort({createdAt:-1});
        return res.status(200).json(analyses);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"failed to fetch analyses"})
        
    }

}

const getAnalysesById = async (req,res)=>{
    try {
        const analyses = await Analysis.findById({userId:req.user.id ,_id:req.params.id});

        return res.status(200).json(analyses);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"failed to fetch analyses"})
        
    }
}

module.exports={getAnalyses , getAnalysesById};