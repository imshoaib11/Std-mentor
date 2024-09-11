import { Router } from "express";
import studentMentor from "../Service/studentMentor.js";

const assignRoutes = Router();

assignRoutes.put('/assignMentor/:id',studentMentor.assignMentor)
assignRoutes.put('/changeMentor/:id',studentMentor.changeMentor)
assignRoutes.get('/studentsofaMentor/:id',studentMentor.showStudentsOfAMentor)
assignRoutes.get('/prevMentorOfStudent/:id',studentMentor.showPrevMentor)

export default assignRoutes;

