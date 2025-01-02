import express from "express";
import { createLearning, getAllLearning, updateLearning, deleteLearning } from "../controllers/learningController.js";

const router = express.Router();

router.route('/').get(getAllLearning).post(createLearning);
router.put('/edit/:id', updateLearning);
router.delete('/delete/:id', deleteLearning);

export default router