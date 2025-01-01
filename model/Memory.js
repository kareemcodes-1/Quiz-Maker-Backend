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
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true});

export const Memory = new mongoose.model('Memory', memorySchema);