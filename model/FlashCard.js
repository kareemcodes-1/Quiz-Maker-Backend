import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
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
    frontContent: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    backContent: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
  },
  { timestamps: true }
);

export const FlashCard = new mongoose.model("FlashCard", flashcardSchema);