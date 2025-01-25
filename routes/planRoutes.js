import express from "express";
import { createPlan, deletePlan, getAllPlans, updatePlan} from "../controllers/planController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllPlans).post(protectRoute, createPlan);
router.put('/edit/:id', protectRoute, updatePlan);
router.delete('/delete/:id', protectRoute, deletePlan);

export default router