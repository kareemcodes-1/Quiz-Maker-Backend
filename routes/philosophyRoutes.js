import express from "express";
import { createPhilosophy, getAllPhilosophy, updatePhilosophy, deletePhilosophy } from "../controllers/philosophyController.js";

const router = express.Router();

router.route('/').get(getAllPhilosophy).post(createPhilosophy);
router.put('/edit/:id', updatePhilosophy);
router.delete('/delete/:id', deletePhilosophy);

export default router