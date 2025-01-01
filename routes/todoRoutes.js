import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo, completeTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodos);
router.put('/edit/:id', updateTodo);
router.put('/complete/todo/:id', completeTodo);
router.delete('/delete/:id', deleteTodo);

export default router;