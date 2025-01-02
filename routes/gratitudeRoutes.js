import express from "express";
import { createGratitude, getAllGratitude, updateGratitude, deleteGratitude } from "../controllers/gratitudeController.js";

const router = express.Router();

router.route('/').get(getAllGratitude).post(createGratitude);
router.put('/edit/:id', updateGratitude);
router.delete('/delete/:id', deleteGratitude);

export default router