import express from "express";
import { createFlashCard, updateFlashCard, deleteFlashCard, getAllFlashCards} from "../controllers/flashCardController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllFlashCards).post(protectRoute, createFlashCard);
router.put('/edit/:id', protectRoute, updateFlashCard);
router.delete('/delete/:id', protectRoute, deleteFlashCard);

export default router