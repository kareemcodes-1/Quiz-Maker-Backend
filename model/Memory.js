import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
    steps: {
        type: String,
        required: false,
    },
    kilometers: {
        type: String,
        required: false,
    },
    calories: {
        type: String,
        required: false,
    },
    mins: {
        type: String,
        required: false,
    },
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true});

export const Memory = new mongoose.model('Memory', memorySchema);