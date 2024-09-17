import {Router} from 'express';
import mentorService from '../Service/mentorService.js'

const mentorRoute = Router();

mentorRoute.post('/createMentor', mentorService.createMentor)
mentorRoute.get('/', mentorService.getAllMentors)
mentorRoute.put('/updateMentor/:id',mentorService.editMentorById)

export default mentorRoute;
