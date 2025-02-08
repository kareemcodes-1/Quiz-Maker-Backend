import { FlashCard } from "../model/FlashCard.js";
import { Topic } from "../model/Topic.js";
import expressAsyncHandler from "express-async-handler";

const createTopic = expressAsyncHandler(async (req, res) => {
    try {
        const {name, description, projectId, userId} = req.body;
        if(!name  || !projectId || !userId){
            return res.status(400).json({message: "name userId and ProjectId is required"});
        }

        const topic = await Topic.create({
            name,
            description,
            projectId,
            userId
        });

        const newTopic = await topic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllTopics = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const topics = await Topic.find({userId}).populate('projectId', 'name emoji');
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
        const projectId = req.body.projectId._id;
        const {name, description, userId} = req.body;
        if (!id || !name || !projectId || !userId) {
            return res.status(400).json({ message: "Id, userId, name and ProjectId is required" });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(id, {
            $set: {
                name,
                description,
                projectId,
                userId
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

const getAllFlashCardByTopicId = expressAsyncHandler(async (req, res) => {
    const topicId = req.params.topicId;
    try {
        const flashcardCount = await FlashCard.countDocuments({ topicId });
        res.status(200).json({ topicId, flashcardCount });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
})

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

export {createTopic, getAllTopics, updateTopic, deleteTopic, getAllFlashCardByTopicId};