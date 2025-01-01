import express from "express";
import { createPlan, deletePlan, getAllPlans, updatePlan} from "../controllers/planController.js";

const router = express.Router();

router.route('/').get(getAllPlans).post(createPlan);
router.put('/edit/:id', updatePlan);
router.delete('/delete/:id', deletePlan);

export default router