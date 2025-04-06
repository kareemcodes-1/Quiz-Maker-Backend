import express from "express";
import { createQuiz, updateQuiz, deleteQuiz, getQuiz, getAllQuizzes} from "../controllers/quizController.js";

const router = express.Router();

router.route('/topic/:id').get( getAllQuizzes);
router.route('/').get( createQuiz);
router.route('/quiz/:id').get(getQuiz)
router.put('/edit/:id', updateQuiz);
router.delete('/delete/:id', deleteQuiz);

export default router