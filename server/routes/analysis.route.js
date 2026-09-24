const getAnalysesController = require("../controllers/analysis.controller");
const express=require("express");
const router=express.Router();
const auth = require("../middlewares/auth.middleware");


router.get("/analyses" , auth ,  getAnalysesController.getAnalyses);
router.get("/analyses/:id" , auth ,getAnalysesController.getAnalysesById);

module.exports = router;


