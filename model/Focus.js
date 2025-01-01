import mongoose from "mongoose";

const focusSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
}, {timestamps: true});

export const Focus = new mongoose.model('Focus', focusSchema);