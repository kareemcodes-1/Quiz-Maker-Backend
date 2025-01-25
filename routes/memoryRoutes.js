import express from "express";
import { createMemory, deleteMemory, getAllMemories, updateMemory } from "../controllers/memoryController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/', protectRoute, getAllMemories);
router.post('/', protectRoute, createMemory);
router.put('/edit/:id', protectRoute, updateMemory);
router.delete('/delete/:id', protectRoute, deleteMemory);

export default router;