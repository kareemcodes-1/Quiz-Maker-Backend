import { Project } from "../model/Project.js";
import expressAsyncHandler from "express-async-handler";

const createProject = expressAsyncHandler(async (req, res) => {
    try {
        const {name, emoji, userId} = req.body;
        if(!name || !emoji || !userId){
            return res.status(400).json({message: "Name, userId and emoji is required"});
        }

        const project = await Project.create({
            name,
            emoji,
            userId
        });

        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllProjects = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id
        const projects = await Project.find({userId});
        if(projects.length > 0){
            res.status(200).json(projects);
        }else{
            return res.status(400).json({message: "Projects are empty"}); 
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getProjectById = expressAsyncHandler(async (req, res) => {
    try {
        // const userId = req.user._id;
        const id = req.params.id;
        const project = await Project.findById(id);
        if(!project){
            res.status(404).json({message: 'Project not found'});
        }else{
            return res.status(200).json(project); 
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

export {createProject, getAllProjects, getProjectById};