import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
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
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    description: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
  },
  { timestamps: true }
);

export const Topic = new mongoose.model("Topic", topicSchema);