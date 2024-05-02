import express from 'express';
import feedbackController from '../controllers/feedbackController.js'; 
const router = express.Router();

router.post('/feedback', feedbackController);

export default router;
