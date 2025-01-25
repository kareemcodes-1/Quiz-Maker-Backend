import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    time: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    completed: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
}, {timestamps: true});

export const Todo = new mongoose.model('Todo', todoSchema);