import { Learning } from "../model/Learning.js";
import expressAsyncHandler from "express-async-handler";

const createLearning = expressAsyncHandler(async (req, res) => {
    try {
        const {content} = req.body;
        if(!content){
            return res.status(400).json({message: "Content is required"});
        }

        const learning = await Learning.create({
            content,
        });

        const newLearning = await learning.save();
        res.status(201).json(newLearning);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllLearning = expressAsyncHandler(async (req, res) => {
    try {
        const learnings = await Learning.find();
        if(learnings.length > 0){
            res.status(200).json(learnings);
        }else{
            return res.status(400).json({message: "Learning are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateLearning = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        if (!id || !content) {
            return res.status(400).json({ message: "Id and Content is required" });
        }

        const updatedLearning = await Learning.findByIdAndUpdate(id, {
            $set: {
                content,
            },
        },{ new: true, runValidators: true });

        if (!updatedLearning) {
            return res.status(404).json({ message: "Learning not found" });
        }

        res.status(200).json(updatedLearning);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteLearning = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedLearning = await Learning.findByIdAndDelete(id);

        res.status(200).json(deletedLearning);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createLearning, getAllLearning, updateLearning, deleteLearning};