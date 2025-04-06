import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Topic = new mongoose.model("Topic", topicSchema);