import mongoose from "mongoose";

const philosophySchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true});

export const Philosophy = new mongoose.model('Philosophy', philosophySchema);