import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
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
        required: false
    },
    time: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    startDeadlineDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    endDeadlineDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const Goal = new mongoose.model('Goal', goalSchema);