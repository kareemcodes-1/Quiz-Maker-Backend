import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote} from "../controllers/noteController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllNotes).post(protectRoute, createNote);
router.put('/edit/:id', protectRoute, updateNote);
router.delete('/delete/:id', protectRoute, deleteNote);

export default router