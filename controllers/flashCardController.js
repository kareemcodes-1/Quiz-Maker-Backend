import { FlashCard } from "../model/FlashCard.js";
import expressAsyncHandler from "express-async-handler";

const createFlashCard = expressAsyncHandler(async (req, res) => {
    try {
        const {frontContent, backContent, projectId, userId} = req.body;
        if(!frontContent || !backContent || !projectId || !userId){
            return res.status(400).json({message: "frontContent, backContent userId and ProjectId is required"});
        }

        const flashCard = await FlashCard.create({
            frontContent,
            backContent,
            projectId,
            userId
        });

        const newFlashCard = await flashCard.save();
        res.status(201).json(newFlashCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllFlashCards = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const flashcards = await FlashCard.find({userId}).populate('projectId', 'name emoji');
        if(flashcards.length > 0){
            res.status(200).json(flashcards);
        }else{
            return res.status(400).json({message: "Flashcards are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateFlashCard = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const projectId = req.body.projectId._id;
        const {frontContent, backContent, userId} = req.body;
        if (!id || !frontContent || !backContent || !projectId || !userId) {
            return res.status(400).json({ message: "Id, userId, frontContent, backContent and ProjectId is required" });
        }

        const updatedFlashCard = await Note.findByIdAndUpdate(id, {
            $set: {
                frontContent,
                 backContent,
                projectId,
                userId
            },
        },{ new: true, runValidators: true });

        if (!updatedFlashCard) {
            return res.status(404).json({ message: "FlashCard not found" });
        }

        res.status(200).json(updatedFlashCard);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteFlashCard = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedFlashCard = await FlashCard.findByIdAndDelete(id);

        res.status(200).json(deletedFlashCard);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createFlashCard, getAllFlashCards, updateFlashCard, deleteFlashCard};