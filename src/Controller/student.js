import { Router } from "express";
import studentService from "../Service/studentService.js";

const studentRoute = Router()

studentRoute.post('/createStudent',studentService.createStudent)
studentRoute.get('/', studentService.getAllStudents)

export default studentRoute