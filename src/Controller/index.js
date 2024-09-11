import { Router } from "express";
import mentorRoute from "./mentor.js";
import studentRoute from "./student.js";
import studentMentor from "./studentMentor.js";

const router = Router();

router.use('/mentor',mentorRoute)
router.use('/student',studentRoute)
router.use('/studentMentor',studentMentor)

export default router;