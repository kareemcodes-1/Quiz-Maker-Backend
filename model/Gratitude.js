import mongoose from "mongoose";

const gratitudeSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {timestamps: true});

export const Gratitude = new mongoose.model('Gratitude', gratitudeSchema);