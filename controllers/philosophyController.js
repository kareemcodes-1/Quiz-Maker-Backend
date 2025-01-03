import { Philosophy } from "../model/Philosophy.js";
import expressAsyncHandler from "express-async-handler";

const createPhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const {content} = req.body;
        if(!content){
            return res.status(400).json({message: "Content is required"});
        }

        const philosophy = await Philosophy.create({
            content,
        });

        const newPhilosophy = await philosophy.save();
        res.status(201).json(newPhilosophy);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllPhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const philosophies = await Philosophy.find();
        if(philosophies.length > 0){
            res.status(200).json(philosophies);
        }else{
            return res.status(400).json({message: "Philosophies are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updatePhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        if (!id || !content) {
            return res.status(400).json({ message: "Id and Content is required" });
        }

        const updatedPhilosophy = await Philosophy.findByIdAndUpdate(id, {
            $set: {
                content,
            },
        },{ new: true, runValidators: true });

        if (!updatedPhilosophy) {
            return res.status(404).json({ message: "Philosophy not found" });
        }

        res.status(200).json(updatedPhilosophy);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deletePhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedPhilosophy = await Philosophy.findByIdAndDelete(id);

        res.status(200).json(deletedPhilosophy);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createPhilosophy, getAllPhilosophy, updatePhilosophy, deletePhilosophy};