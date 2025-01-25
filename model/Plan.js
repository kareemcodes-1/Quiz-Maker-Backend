import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
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

export const Plan = new mongoose.model("Plan", planSchema);
