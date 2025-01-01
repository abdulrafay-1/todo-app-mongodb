import express from "express";
import { addTodo, allTodos, deleteTodo, editTodo, singleTodo, toggleTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/todo", allTodos)
router.get("/todo/:id", singleTodo)
router.post("/todo", addTodo)
router.post("/todo/toggletodo/:id", toggleTodo)
router.put("/todo/:id", editTodo)
router.delete("/todo/:id", deleteTodo)

export default router