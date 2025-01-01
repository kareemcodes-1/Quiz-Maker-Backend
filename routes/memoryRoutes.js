import express from "express";
import { createMemory, getAllMemories } from "../controllers/memoryController.js";

const router = express.Router();

router.get('/', getAllMemories);
router.post('/', createMemory);

export default router;