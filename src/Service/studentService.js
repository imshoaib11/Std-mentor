import mentorModel from "../Model/mentorModel.js"
import studentModel from "../Model/studentModel.js"

const getAllStudents = async(req,res) =>{
    try{
        let students = await studentModel.find()
        res.status(200).send({
            message:"List of All Students",
            data: students
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

const createStudent = async(req,res) => {
    try{
        let student = await studentModel.findByFilter({email:req.body.email})

        if(!student){
            let today = new Date()
            let dob = new Date(req.body.dob)
            req.body.age = (today.getFullYear()-dob.getFullYear())

            await studentModel.insertOne(req.body)
    
            res.status(201).send(
                {
                    message: "Student created successfully",
                    data: req.body
                }
            )
        }
        else{
            res.status(400).send(
                {
                    message: "Student already exists with this email"
                }
            )
        }
    }

    catch(error){
        res.status(500).send(
            {
                message: error.message || "Internal Server Error",
            }
        )
    }
}

const studentWithoutMentor = async (req, res) => {
    try{
        const student = await studentModel.findOne({mentor: null})
        res.status(400).send({
            message: "There is no Mentor for the student",
            data: student
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


export default {
    createStudent,
    getAllStudents
}