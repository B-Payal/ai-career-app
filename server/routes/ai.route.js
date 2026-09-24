const express = require("express");
const router = express.Router();
const {analyzeResumeController ,analyzeResumePDF} = require("../controllers/ai.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = require("../middlewares/upload.middleware");


router.post("/analyze" , authMiddleware , analyzeResumeController)
router.post("/analyze-pdf" ,authMiddleware , upload.single("resume") ,  analyzeResumePDF);

module.exports = router;