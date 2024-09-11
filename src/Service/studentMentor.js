import mentorModel from "../Model/mentorModel.js"
import studentModel from "../Model/studentModel.js"
import { ObjectId } from "mongodb"

const assignMentor = async(req,res) =>{
        try{
        const {id} = req.params
        const student = await studentModel.findOne({_id:ObjectId.createFromHexString(id)})
        const findMentor = await mentorModel.findByFilter({name: req.body.mentor})

        if(!findMentor){
            res.status(404).send(
                {
                    message: "Mentor not found"
                }
            )
        }

        else{

            //assigning the mentor requested from body to student obtained from studentID through Params
            await studentModel.updateOne({_id:ObjectId.createFromHexString(id)},{$set:{mentor: findMentor.name}})

            //adding the student to students field of mentors document in mentor collection
            await mentorModel.updateOne({name:findMentor.name},{$addToSet:{students: student.name}})

            res.status(200).send(
                {
                    message: "Mentor assigned successfully"
                }
            )
        }
        }
        catch(error){
            res.status(500).send(
                {
                    message: error.message || "Internal Server Error"
                }
            )
        }
        
}

const changeMentor = async (req,res) => {
    try{
        const {id} = req.params

        const student = await studentModel.findOne({_id:ObjectId.createFromHexString(id)})

        if(student.mentor === "Unassigned"){
            res.status(400).send(
                {
                    message: "Student is not assigned to any mentor"
                }
            )
        }
        else{
            const findMentor = await mentorModel.findByFilter({name: req.body.mentor})

            if(!findMentor){
                res.status(404).send(
                    {
                        message: "Mentor not found"
                    }
                )
            }
            else{

                //updating the current mentor to prev mentor as the new mentor is added to the current mentor
                await studentModel.updateOne({_id:ObjectId.createFromHexString(id)},{$set:{previousMentor: student.mentor}})

                //updating the new mentor to the current mentor as the new mentor is assigned to the student
                await studentModel.updateOne({_id:ObjectId.createFromHexString(id)},{$set:{mentor: findMentor.name}})

                //removing the student from students field of mentor document in mentor collection
                await mentorModel.updateOne({name:student.mentor},{$pull:{students: student.name}})

                //adding the student in the mentor db
                await mentorModel.updateOne({name:findMentor.name},{$addToSet:{students: student.name}})

                res.status(200).send(
                    {
                        message: "Mentor Changed Successfully"
                    })
            }
        }
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
}

const showStudentsOfAMentor = async(req,res) =>{
    try{
        const {id} = req.params

    const studentsofMentor = await mentorModel.findByFilter({_id:ObjectId.createFromHexString(id)}) 

    if(studentsofMentor){
        res.status(200).send(
            {
                message:"List of students",
                data: studentsofMentor.students
            }
        )
    }
    else{
        
        res.status(404).send(
            {
                message: "Mentor not found"
            }
        )
    }
    }
    
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
 
}

const showPrevMentor = async(req, res) => {
    try{
        const {id} = req.params

        const prevMentor = await studentModel.findOne({_id:ObjectId.createFromHexString(id)})
        
        if(prevMentor.previousMentor === "NA"){
            res.status(200).send(
                {
                    message:"Student has no previous mentor"
                }
            )
        }
        else if(!prevMentor){
            res.status(404).send(
                {
                    message:"Student not found",
                }
            )
        }
        else{
            res.status(200).send(
                {
                    message:"Student's previous mentor",
                    data: prevMentor.previousMentor
                }
            )
        }
    }
    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error"
            }
        )
    }
}

export default {
    assignMentor,
    changeMentor,
    showStudentsOfAMentor,
    showPrevMentor
};