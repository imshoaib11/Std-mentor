import { Router } from "express";
import mentorRoute from "./mentor.js";
import studentRoute from "./student.js";
import studentMentor from "./studentMentor.js";

const router = Router();

router.get('/',(req,res) =>{
    res.status(200).send({
        message: "Welcome to Student-Mentor API"
    })
})

router.use('/mentor',mentorRoute)
router.use('/student',studentRoute)
router.use('/studentMentor',studentMentor)

export default router;