import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    content: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = new mongoose.model("Note", noteSchema);
