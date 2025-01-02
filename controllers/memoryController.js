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
      await newMemory.populate("projectId", "name color");
  
      res.status(201).json(newMemory);
    } catch (error) {
      res.status(500).json({ message: error.message || "Server Error" });
    }
  });

const getAllMemories = expressAsyncHandler(async (req, res) => {
    try {
        const memories = await Memory.find().populate('projectId', 'name color');
        if(memories.length > 0){
            res.status(200).json(memories);
        }else{
            return res.status(400).json({message: "Memories are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createMemory, getAllMemories};