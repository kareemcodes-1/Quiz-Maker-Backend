import { Memory } from "../model/Memory.js";
import expressAsyncHandler from "express-async-handler";

const createMemory = expressAsyncHandler(async (req, res) => {
    try {
      const { name, image, projectId } = req.body;
  
      if (!name || !image || !projectId) {
        return res.status(400).json({ message: "Name, Image, and ProjectId are required." });
      }
  
      const cloudinaryRegex = /^https?:\/\/res\.cloudinary\.com\/[a-z0-9]+\/image\/upload\/.+$/;
      if (!cloudinaryRegex.test(image)) {
        return res.status(400).json({ message: "Invalid image URL. Please provide a valid Cloudinary URL." });
      }

      const memory = await Memory.create({
        name,
        projectId,
        image,
      });
  
      const newMemory = await memory.save();
      await newMemory.populate("projectId", "name emoji");
  
      res.status(201).json(newMemory);
    } catch (error) {
      res.status(500).json({ message: error.message || "Server Error" });
    }
  });

const getAllMemories = expressAsyncHandler(async (req, res) => {
    try {
        const memories = await Memory.find().populate('projectId', 'name emoji');
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
        const {name, image} = req.body;
        if (!id || !name || !projectId || !image) {
            return res.status(400).json({ message: "Id, Name, ProjectId and Image is required" });
        }

        const updatedMemory = await Memory.findByIdAndUpdate(id, {
            $set: {
                name,
                projectId,
                image
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