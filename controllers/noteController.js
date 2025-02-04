import { Note } from "../model/Note.js";
import expressAsyncHandler from "express-async-handler";

const createNote = expressAsyncHandler(async (req, res) => {
    try {
        const {content, projectId, userId} = req.body;
        if(!content || !projectId || !userId){
            return res.status(400).json({message: "Content, userId and ProjectId is required"});
        }

        const note = await Note.create({
            content,
            projectId,
            userId
        });

        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

const getAllNotes = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Note.find({userId}).populate('projectId', 'name emoji');
        if(notes.length > 0){
            res.status(200).json(notes);
        }else{
            return res.status(400).json({message: "Notes are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updateNote = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const projectId = req.body.projectId._id;
        const {content, userId} = req.body;
        if (!id || !content || !projectId || !userId) {
            return res.status(400).json({ message: "Id, userId and Content and ProjectId is required" });
        }

        const updatedNote = await Note.findByIdAndUpdate(id, {
            $set: {
                content,
                projectId,
                userId
            },
        },{ new: true, runValidators: true });

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deleteNote = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        res.status(200).json(deletedNote);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createNote, getAllNotes, updateNote, deleteNote};