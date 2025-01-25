import express from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route('/').get(getAllProjects).post(protectRoute, createProject);

export default router;