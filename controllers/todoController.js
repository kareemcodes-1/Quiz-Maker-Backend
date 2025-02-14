import { Todo } from "../model/Todo.js";
import expressAsyncHandler from "express-async-handler";

const createTodo = expressAsyncHandler(async (req, res) => {
    try {
        const projectId = req.body.projectId._id;
        const {name, date, time, completed, userId, priority} = req.body;
        if(!name || !projectId || !date || !time || !userId || !priority){
            return res.status(400).json({message: "Name, projectId, userId, Priority Time and Date is required"});
        }

        const todo = await Todo.create({
            name,
            projectId,
            date, 
            priority,
            userId,
            time,
            completed
        })

        const newTodo = await todo.save();
        await newTodo.populate('projectId', 'name emoji');
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllTodos = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const todos = await Todo.find({userId}).populate('projectId', 'name emoji');
        if(todos.length > 0){
            res.status(200).json(todos);
        }else{
            return res.status(400).json({message: "Todos are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateTodo = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {name, date, time, userId, priority} = req.body;
        const projectId = req.body.projectId._id;
 
        if (!id || !name || !projectId || !userId || !priority) {
            return res.status(400).json({ message: "Id, Name, userId, ProjectId, Date and Time is required" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: {
                name,
                projectId,
                priority,
                userId,
                time,
                date
            },
        },{ new: true}).populate('projectId', 'name emoji');

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const completeTodo = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {completed} = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: {
                completed
            },
        },{ new: true}).populate('projectId', 'name emoji');

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteTodo = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createTodo, getAllTodos, updateTodo, deleteTodo, completeTodo};