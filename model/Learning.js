import mongoose from "mongoose";

const learningSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {timestamps: true});

export const Learning = new mongoose.model('Learning', learningSchema);