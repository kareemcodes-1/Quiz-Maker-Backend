import express from "express";
import { createProject, getAllProjects, getProjectById } from "../controllers/projectController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(protectRoute, getAllProjects).post(protectRoute, createProject);
router.get('/project/:id', protectRoute, getProjectById);

export default router;