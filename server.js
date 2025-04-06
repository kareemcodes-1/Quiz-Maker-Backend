import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import topicRoutes from "./routes/topicRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";

configDotenv();

const app = express();

const port = process.env.PORT || 8000;
const client = process.env.VITE_CLIENT;

app.listen(port, () => {
    console.log(`Server started running on ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    cors({
      origin: [client], // Add client URL explicitly
    })
  );

connectDB();

app.use('/api/topics', topicRoutes);
app.use('/api/quizzes', quizRoutes);