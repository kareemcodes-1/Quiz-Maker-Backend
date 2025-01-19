import { Goal } from "../model/Goal.js";
import expressAsyncHandler from "express-async-handler";

const createGoal = expressAsyncHandler(async (req, res) => {
    try {
        const {name, projectId, time, completed, startDeadlineDate, endDeadlineDate, image} = req.body;
        if(!name || !projectId || !time || !startDeadlineDate || !endDeadlineDate){
            return res.status(400).json({message: "Name, ProjectId Time startDeadline and endDeadline is required"});
        }

        const goal = await Goal.create({
            name,
            projectId,
            time,
            image,
            startDeadlineDate,
            endDeadlineDate,
            completed
        });

        const newGoal = await goal.save();
        await newGoal.populate('projectId', 'name emoji');
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllGoals = expressAsyncHandler(async (req, res) => {
    try {
        const goals = await Goal.find().populate('projectId', 'name emoji');
        if(goals.length > 0){
            res.status(200).json(goals);
        }else{
            return res.status(400).json({message: "Goals are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateGoal = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const projectId = req.body.projectId._id
        const {name, time, startDeadlineDate, endDeadlineDate, image} = req.body;
        if (!id || !name || !projectId || !time || !startDeadlineDate  || !endDeadlineDate) {
            return res.status(400).json({ message: "Id, Name, ProjectId Time startDeadline and endDeadline is required" });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(id, {
            $set: {
                name,
                projectId,
                image,
                time,
                startDeadlineDate,
                endDeadlineDate,
            },
        },{ new: true, runValidators: true }).populate('projectId', 'name emoji');

        if (!updatedGoal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteGoal = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedGoal = await Goal.findByIdAndDelete(id);
        res.status(200).json(deletedGoal);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const completeGoal = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {completed} = req.body;

        const updatedGoal = await Goal.findByIdAndUpdate(id, {
            $set: {
                completed
            },
        },{ new: true, runValidators: true }).populate('projectId', 'name emoji');

        if (!updatedGoal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createGoal, getAllGoals, updateGoal, completeGoal, deleteGoal};