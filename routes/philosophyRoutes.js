import express from "express";
import { createPhilosophy, getAllPhilosophy, updatePhilosophy, deletePhilosophy } from "../controllers/philosophyController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllPhilosophy).post(protectRoute, createPhilosophy);
router.put('/edit/:id', protectRoute, updatePhilosophy);
router.delete('/delete/:id', protectRoute, deletePhilosophy);

export default router