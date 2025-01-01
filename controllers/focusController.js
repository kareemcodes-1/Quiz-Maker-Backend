import { Focus } from "../model/Focus.js";
import expressAsyncHandler from "express-async-handler";

const createFocus = expressAsyncHandler(async (req, res) => {
    try {
        const {content, date} = req.body;
        if(!content || !date){
            return res.status(400).json({message: "Content, Date is required"});
        }

        const focus = await Focus.create({
            content,
            date
        });

        const newFocus = await focus.save();
        res.status(201).json(newFocus);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllFocusNotes = expressAsyncHandler(async (req, res) => {
    try {
        const focusNotes = await Focus.find();
        if(focusNotes.length > 0){
            res.status(200).json(focusNotes);
        }else{
            return res.status(400).json({message: "Focus notes are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateFocus = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {content, date} = req.body;
        if (!id || !content || !date) {
            return res.status(400).json({ message: "Id and Content and Date is required" });
        }

        const updatedFocus = await Focus.findByIdAndUpdate(id, {
            $set: {
                content,
                date
            },
        },{ new: true, runValidators: true });

        if (!updatedFocus) {
            return res.status(404).json({ message: "Focus not found" });
        }

        res.status(200).json(updatedFocus);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteFocus = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedFocus = await Focus.findByIdAndDelete(id);
        if(!deletedFocus){

        }

        res.status(200).json(deletedFocus);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createFocus, getAllFocusNotes, updateFocus, deleteFocus};