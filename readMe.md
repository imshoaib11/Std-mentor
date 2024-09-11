1.Write API to create Mentor

2.Write API to create Student

3.Write API to Assign a student to Mentor

Select one mentor and Add multiple Student

A student who has a mentor should not be shown in List

4.Write API to Assign or Change Mentor for particular Student

Select One Student and Assign one Mentor

5.Write API to show all students for a particular mentor

Base URL https://zen-assign-mentors.herokuapp.com

Mentor Api's GET /mentor POST /createMentor

Student Api's GET /student POST /createStudent To get list of students whose mentors weren't assigned

PUT studentMentor/assignMentor/:id To assign mentors for multiple Students

PUT studentMentor/changeMentor/:id To Assign or Change Mentor for particular student

Pass Mentor name in request Body

GET /studentMentor/studentsofaMentor/:id To get all students of a particular mentor

GET /studentMentor/prevMentorOfStudent/:id To get previous Mentor of a particular student