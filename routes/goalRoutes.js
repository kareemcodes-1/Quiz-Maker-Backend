import express from "express";
import { createGoal, getAllGoals, completeGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";

const router = express.Router();

router.route('/').get(getAllGoals).post(createGoal);
router.put('/complete/goal/:id', completeGoal);
router.put('/edit/:id', updateGoal);
router.delete('/delete/:id', deleteGoal);

export default router