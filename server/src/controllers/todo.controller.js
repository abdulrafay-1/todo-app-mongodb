import mongoose from "mongoose";
import Todos from "../models/todo.model.js";

const allTodos = async (req, res) => {
    try {
        const todo = await Todos.find({})
        res.json({
            data: todo
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const addTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(404).json({
        message: "title is required"
    })

    try {
        const todo = await Todos.create({
            title,
        })
        res.status(200).json({
            message: "todo added successfully",
            todo,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const singleTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
        message: "not a valid id"
    })

    try {
        const todo = await Todos.findById({ _id: id })
        if (!todo) return res.status(404).json({
            message: "todo not found"
        })

        res.json({
            data: todo
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
        message: "not a valid id"
    })

    try {
        const todo = await Todos.findByIdAndDelete({ _id: id })
        if (!todo) return res.status(404).json({
            message: "todo not found"
        })

        res.json({
            message: "todo deleted",
            data: todo
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const editTodo = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) return res.status(404).json({
        message: "title is required"
    })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
        message: "not a valid id"
    })

    try {
        const todo = await Todos.findOneAndUpdate(
            { _id: id },
            {
                title,
            },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: "Todo not found!" });
        }

        res.json(todo)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const toggleTodo = async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
        message: "not a valid id"
    })

    try {
        const todo = await Todos.findOneAndUpdate(
            { _id: id },
            {
                isCompleted: !isCompleted
            },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: "Todo not found!" });
        }

        res.json(todo)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

export { allTodos, addTodo, singleTodo, deleteTodo, editTodo, toggleTodo }