import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import focusRoutes from "./routes/focusRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
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
app.use(cors({
    origin: client,
}));


connectDB();

app.use('/api/todos', todoRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/plans', planRoutes);