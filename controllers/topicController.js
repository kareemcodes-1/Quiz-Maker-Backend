
import { Topic } from "../model/Topic.js";
import expressAsyncHandler from "express-async-handler";

const createTopic = expressAsyncHandler(async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({message: "Name is required"});
        }

        const topic = await Topic.create({
            name,
        });

        const newTopic = await topic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getTopic = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "Topic not found"});
        }

        const topic = await Topic.findOne({ _id: id });
        res.status(200).json(topic);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllTopics = expressAsyncHandler(async (req, res) => {
    try {
        const topics = await Topic.find();
        if(topics.length > 0){
            res.status(200).json(topics);
        }else{
            return res.status(400).json({message: "Topics are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateTopic = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        if (!id || !name) {
            return res.status(400).json({ message: "Name and Id are required" });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(id, {
            $set: {
                name,
            },
        },{ new: true, runValidators: true });

        if (!updatedTopic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.status(200).json(updatedTopic);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteTopic = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedTopic = await Topic.findByIdAndDelete(id);

        res.status(200).json(deletedTopic);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createTopic, getAllTopics, updateTopic, deleteTopic, getTopic};