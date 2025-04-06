import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    },
    question: {
        type: mongoose.Schema.Types.String
    },
    options: [
        {
            type: mongoose.Schema.Types.String
        }
    ],
    answer: {
        type: mongoose.Schema.Types.Number
    }
}, { timestamps: true });

export const Quiz = new mongoose.model("Quiz", quizSchema);