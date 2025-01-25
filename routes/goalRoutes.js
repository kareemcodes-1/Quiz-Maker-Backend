import express from "express";
import { createGoal, getAllGoals, completeGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllGoals).post(protectRoute, createGoal);
router.put('/complete/goal/:id', protectRoute, completeGoal);
router.put('/edit/:id', protectRoute, updateGoal);
router.delete('/delete/:id', protectRoute, deleteGoal);

export default router