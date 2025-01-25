import { Memory } from "../model/Memory.js";
import {Project} from "../model/Project.js";
import expressAsyncHandler from "express-async-handler";

const createMemory = expressAsyncHandler(async (req, res) => {
    try {
      const { name, image, projectId, kilometers, steps, mins, calories, userId } = req.body;
  
      if (!name || !image || !projectId || !userId) {
        return res.status(400).json({ message: "Name, Image, userId and ProjectId are required." });
      }
  
      // Validate Cloudinary image URL
      const cloudinaryRegex = /^https?:\/\/res\.cloudinary\.com\/[a-z0-9]+\/image\/upload\/.+$/;
      if (!cloudinaryRegex.test(image)) {
        return res.status(400).json({ message: "Invalid image URL. Please provide a valid Cloudinary URL." });
      }
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }
  
      let memoryData = { name, projectId: project._id, image, userId };
  
      if (project.name === "Fitness") {
        memoryData = {
          ...memoryData,
          kilometers: kilometers || 0,
          mins: mins || 0,
          steps: steps || 0,
          calories: calories || 0,
        };
      }
  
      const memory = await Memory.create(memoryData);
  
      await memory.populate("projectId", "name emoji");
  
      res.status(201).json(memory);
    } catch (error) {
      res.status(500).json({ message: error.message || "Server Error" });
    }
  });
  

const getAllMemories = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const memories = await Memory.find({userId}).populate('projectId', 'name emoji');
        if(memories.length > 0){
            res.status(200).json(memories);
        }else{
            return res.status(400).json({message: "Memories are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});


const updateMemory = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const projectId = req.body.projectId._id
        const {name, image, kilometers, steps, mins, calories, userId} = req.body;
        if (!id || !name || !projectId || !image || !userId) {
            return res.status(400).json({ message: "Id, Name, ProjectId, userId and Image is required" });
        }

        const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }

      let memoryData = { name, projectId: project._id, image, userId };

      if (project.name === "Fitness") {
        memoryData = {
          ...memoryData,
          kilometers: kilometers || 0,
          mins: mins || 0,
          steps: steps || 0,
          calories: calories || 0,
        };
      }

        const updatedMemory = await Memory.findByIdAndUpdate(id, {
            $set: {
                ...memoryData
            },
        },{ new: true, runValidators: true }).populate('projectId', 'name emoji');

        if (!updatedMemory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        res.status(200).json(updatedMemory);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteMemory = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedMemory = await Memory.findByIdAndDelete(id);
        res.status(200).json(deletedMemory);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createMemory, getAllMemories, deleteMemory, updateMemory};