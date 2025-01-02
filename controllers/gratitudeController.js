import { Gratitude } from "../model/Gratitude.js";
import expressAsyncHandler from "express-async-handler";

const createGratitude = expressAsyncHandler(async (req, res) => {
    try {
        const {content} = req.body;
        if(!content){
            return res.status(400).json({message: "Content is required"});
        }

        const gratitude = await Gratitude.create({
            content,
        });

        const newGratitude = await gratitude.save();
        res.status(201).json(newGratitude);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllGratitude = expressAsyncHandler(async (req, res) => {
    try {
        const gratitudes = await Gratitude.find();
        if(gratitudes.length > 0){
            res.status(200).json(gratitudes);
        }else{
            return res.status(400).json({message: "Gratitudes are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateGratitude = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        if (!id || !content) {
            return res.status(400).json({ message: "Id and Content is required" });
        }

        const updatedGratitude = await Gratitude.findByIdAndUpdate(id, {
            $set: {
                content,
            },
        },{ new: true, runValidators: true });

        if (!updatedGratitude) {
            return res.status(404).json({ message: "Gratitude not found" });
        }

        res.status(200).json(updatedGratitude);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteGratitude = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedGratitude = await Gratitude.findByIdAndDelete(id);

        res.status(200).json(deletedGratitude);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createGratitude, getAllGratitude, updateGratitude, deleteGratitude};