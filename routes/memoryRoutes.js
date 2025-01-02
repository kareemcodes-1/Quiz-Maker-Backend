import express from "express";
import { createMemory, deleteMemory, getAllMemories, updateMemory } from "../controllers/memoryController.js";

const router = express.Router();

router.get('/', getAllMemories);
router.post('/', createMemory);
router.put('/edit/:id', updateMemory);
router.delete('/delete/:id', deleteMemory);

export default router;