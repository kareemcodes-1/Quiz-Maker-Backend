import { FlashCard } from "../model/FlashCard.js";
import expressAsyncHandler from "express-async-handler";
import { OpenAI } from 'openai';
import {configDotenv} from "dotenv";

configDotenv();


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

const createFlashCard = expressAsyncHandler(async (req, res) => {
    try {
        const {frontContent, backContent, userId, topicId} = req.body;
        if(!frontContent || !backContent || !userId || !topicId){
            return res.status(400).json({message: "frontContent, backContent userId and topicId is required"});
        }

        const flashCard = await FlashCard.create({
            frontContent,
            backContent,
            topicId,
            userId
        });

        const newFlashCard = await flashCard.save();
        res.status(201).json(newFlashCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const createFlashCardWithAI = expressAsyncHandler(async (req, res) => {
    try {
        const {message, userId, topicId} = req.body;
        if(!message || !userId || !topicId){
            return res.status(400).json({message: "Message, userId and topicId is required"});
        }

        
        const prompt = `Generate a flashcard based on the following message: "${message}"`;

        // Request to OpenAI to generate the flashcard content
        const response = await openai.completions.create({
            model: "deepseek-reasoner",
            prompt: prompt,
            max_tokens: 150,
        });

        const generatedFront = response.choices[0].text;
        // const generatedBack = `Detailed explanation for: "${message}"`;

        console.log(generatedFront);
        console.log(generatedBack);

        // const flashCard = await FlashCard.create({
        //     frontContent,
        //     backContent,
        //     topicId,
        //     userId
        // });

        // const newFlashCard = await flashCard.save();
        // res.status(201).json(newFlashCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllFlashCards = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const flashcards = await FlashCard.find({userId});
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
        const {frontContent, backContent, userId, topicId} = req.body;
        if (!id || !frontContent || !backContent || !userId || !topicId) {
            return res.status(400).json({ message: "Id, userId, frontContent, backContent and topicId is required" });
        }

        const updatedFlashCard = await FlashCard.findByIdAndUpdate(id, {
            $set: {
                frontContent,
                 backContent,
                 topicId,
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

export {createFlashCard, getAllFlashCards, updateFlashCard, deleteFlashCard, createFlashCardWithAI};