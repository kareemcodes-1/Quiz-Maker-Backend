import { Philosophy } from "../model/Philosophy.js";
import expressAsyncHandler from "express-async-handler";

const createPhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const {content, userId} = req.body;
        if(!content || !userId){
            return res.status(400).json({message: "Content and UserId is required"});
        }

        const philosophy = await Philosophy.create({
            content,
            userId
        });

        const newPhilosophy = await philosophy.save();
        res.status(201).json(newPhilosophy);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

const getAllPhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const philosophies = await Philosophy.find({userId});
        if(philosophies.length > 0){
            res.status(200).json(philosophies);
        }else{
            return res.status(400).json({message: "Philosophies are empty"}); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

const updatePhilosophy = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {content, userId} = req.body;
        if (!id || !content || !userId) {
            return res.status(400).json({ message: "Id, userId and Content is required" });
        }

        const updatedPhilosophy = await Philosophy.findByIdAndUpdate(id, {
            $set: {
                content,
                userId
            },
        },{ new: true, runValidators: true });

        if (!updatedPhilosophy) {
            return res.status(404).json({ message: error.message });
        }

        res.status(200).json(updatedPhilosophy);
    } catch (error) {
        res.status(500).json({message: error.message});
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
        res.status(500).json({message: error.message});
    }
});

export {createPhilosophy, getAllPhilosophy, updatePhilosophy, deletePhilosophy};