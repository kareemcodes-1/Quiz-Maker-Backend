import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    emoji: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true});

export const Project = new mongoose.model('Project', projectSchema);