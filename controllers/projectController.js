import { Project } from "../model/Project.js";
import expressAsyncHandler from "express-async-handler";

const createProject = expressAsyncHandler(async (req, res) => {
    try {
        const {name, emoji} = req.body;
        if(!name || !emoji){
            return res.status(400).json({message: "Name and emoji is required"});
        }

        const project = await Project.create({
            name,
            emoji
        });

        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllProjects = expressAsyncHandler(async (req, res) => {
    try {
        const projects = await Project.find();
        if(projects.length > 0){
            res.status(200).json(projects);
        }else{
            return res.status(400).json({message: "Projects are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createProject, getAllProjects};