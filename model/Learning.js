import mongoose from "mongoose";

const learningSchema = new mongoose.Schema({
    projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true,
        },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {timestamps: true});

export const Learning = new mongoose.model('Learning', learningSchema);