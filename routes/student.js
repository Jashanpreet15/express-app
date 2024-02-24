// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = new Student(studentData);
        await newStudent.save();
        res.status(201).send(newStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for fetching all students
router.get('/home', async (req, res) => {
    try {
        const allStudents = await Student.find();
        res.render('student/index', { students: allStudents });
    } catch (err) {
        res.status(500).send(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
        if (!updatedStudent) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send(updatedStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for deleting a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
