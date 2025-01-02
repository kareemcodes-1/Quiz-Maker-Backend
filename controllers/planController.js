import { Plan } from "../model/Plan.js";
import expressAsyncHandler from "express-async-handler";

const createPlan = expressAsyncHandler(async (req, res) => {
    try {
        const {content, projectId} = req.body;
        if(!content || !projectId){
            return res.status(400).json({message: "Content and ProjectId is required"});
        }

        const plan = await Plan.create({
            content,
            projectId
        });

        const newPlan = await plan.save();
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const getAllPlans = expressAsyncHandler(async (req, res) => {
    try {
        const plans = await Plan.find().populate('projectId', 'name color');
        if(plans.length > 0){
            res.status(200).json(plans);
        }else{
            return res.status(400).json({message: "Plans are empty"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const updatePlan = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const projectId = req.body.projectId._id;
        const {content} = req.body;
        if (!id || !content || !projectId) {
            return res.status(400).json({ message: "Id, Content and ProjectId is required" });
        }

        const updatedPlan = await Plan.findByIdAndUpdate(id, {
            $set: {
                content,
                projectId
            },
        },{ new: true, runValidators: true });

        if (!updatedPlan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

const deletePlan = expressAsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedPlan = await Plan.findByIdAndDelete(id);

        res.status(200).json(deletedPlan);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
});

export {createPlan, getAllPlans, updatePlan, deletePlan};