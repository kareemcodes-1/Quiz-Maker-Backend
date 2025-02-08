import express from "express";
import { createTopic, updateTopic, deleteTopic, getAllTopics, getAllFlashCardByTopicId} from "../controllers/topicController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllTopics).post(protectRoute, createTopic);
router.get('/:topicId/flashcard-count', getAllFlashCardByTopicId);
router.put('/edit/:id', protectRoute, updateTopic);
router.delete('/delete/:id', protectRoute, deleteTopic);

export default router