import { ObjectId } from "mongodb";
import mentorModel from "../Model/mentorModel.js";

const getAllMentors = async(req,res) =>{
    try{
        let mentors = await mentorModel.find()
        res.status(200).send({
            message:"List of All Mentors",
            data: mentors
    })
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error",
            }
        )
    }
}

const createMentor = async (req,res) => {
    try{
        let mentor = await mentorModel.findByFilter({email : req.body.email})

        if(!mentor){
            let today = new Date()
            let dob = new Date(req.body.dob)
            req.body.age = Math.abs(today.getFullYear() - dob.getFullYear())

            await mentorModel.insertOne(req.body)

            res.status(201).send(
                {
                 message: "Mentor created successfully",
                 data: req.body
                }
            )
        }
        else{
            res.status(409).json(
                {
                    message: "Mentor already exists with this email"
                })
        }

    }
    catch(error){
        
        res.status(500).json(
            {message: error.message || "Internal Server Error"

            })
    }
}

const editMentorById = async (req, res) => {
    try{
        const {id} = req.params
        // const updatedMentor = await mentorModel.findByFilter({mentor: req.body})

        const mentor = await mentorModel.findByFilter({_id:ObjectId.createFromHexString(id)})

        if(!mentor){
             res.status(404).send(
                {
                    message: "Mentor not found"
                })
        }
        else{
                let today = new Date()
                let dob = new Date(req.body.dob)
                req.body.age = Math.abs(today.getFullYear() - dob.getFullYear())
                await mentorModel.updateOne({_id:ObjectId.createFromHexString(id)}, {$set:req.body})
                
                res.status(200).send(
                {
                    message: "Mentor Updated successfully",
                    data: req.body
                }
            )
        }
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            })
    }
}

export default {
    getAllMentors,
    createMentor,
    editMentorById
 
}