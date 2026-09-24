const express = require("express");
const router = express.Router();
const {startInterview , submitAnswer , getInterviewSession} = require("../controllers/interview.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.post("/start" , authMiddleware , startInterview);
router.post("/:sessionId/answer" , authMiddleware , submitAnswer);
router.get("/",authMiddleware, getMyInterviews);
router.get("/:sessionId" , authMiddleware , getInterviewSession);

module.exports = router;