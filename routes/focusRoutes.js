import express from "express";
import { createFocus, getAllFocusNotes, updateFocus, deleteFocus } from "../controllers/focusController.js";

const router = express.Router();

router.route('/').get(getAllFocusNotes).post(createFocus);
router.put('/edit/:id', updateFocus);
router.delete('/delete/:id', deleteFocus);

export default router