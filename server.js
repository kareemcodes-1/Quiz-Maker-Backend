import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import philosophyRoutes from "./routes/philosophyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
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
      origin: [client, "https://productivity-app-client-ebon.vercel.app"], // Add client URL explicitly
      credentials: true, // Allow cookies/auth headers
    })
  );
app.options("*", cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/philosophies', philosophyRoutes);