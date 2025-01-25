import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo, completeTodo } from "../controllers/todoController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/', protectRoute, createTodo);
router.get('/', protectRoute, getAllTodos);
router.put('/edit/:id', protectRoute, updateTodo);
router.put('/complete/todo/:id', protectRoute, completeTodo);
router.delete('/delete/:id', protectRoute, deleteTodo);

export default router;