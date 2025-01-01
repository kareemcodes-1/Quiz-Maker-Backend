import express from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";

const router = express.Router();

router.route('/').get(getAllProjects).post(createProject);

export default router;