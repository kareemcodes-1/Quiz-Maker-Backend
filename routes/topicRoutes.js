import express from "express";
import { createTopic, updateTopic, deleteTopic, getAllTopics, getTopic} from "../controllers/topicController.js";

const router = express.Router();

router.route('/').get( getAllTopics).post( createTopic);
router.route('/topic/:id').get(getTopic)
router.put('/edit/:id', updateTopic);
router.delete('/delete/:id', deleteTopic);

export default router