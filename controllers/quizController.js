
import { Quiz } from "../model/Quiz.js";
import expressAsyncHandler from "express-async-handler";

const createQuiz = expressAsyncHandler(async (req, res) => {
    try {
        const {question, options, answer, topicId} = req.body;
        // if(!question || !options || !answer){
        //     return res.status(400).json({message: "Question, Options, Answer is required"});
        // }

        const quiz = await Quiz.create({
            topicId,
            question,
            options,
            answer
        });

        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getQuiz = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "Quiz not found"});
        }

        const Quiz = await Quiz.findOne({ _id: id });
        res.status(200).json(Quiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllQuizzes = expressAsyncHandler(async (req, res) => {
    const topicId = req.params.id;
    try {
        const quizzes = await Quiz.find({topicId});
        if(quizzes.length > 0){
            res.status(200).json(quizzes);
        }else{
            return res.status(400).json({message: "Quizzes are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateQuiz = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {question, options, answer} = req.body;
        if (!id || !question || !options || !answer) {
            return res.status(400).json({ message: "Question, Id, Options, Answer are required" });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(id, {
            $set: {
                question,
                options,
                answer
            },
        },{ new: true, runValidators: true });

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteQuiz = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedQuiz = await Quiz.findByIdAndDelete(id);

        res.status(200).json(deletedQuiz);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createQuiz, getAllQuizzes, updateQuiz, deleteQuiz, getQuiz};