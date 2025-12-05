const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ===== BAI 1 =====
// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== BAI 2 =====
router.post('/', async (req, res) => {
  try {
    // Tạo document mới từ body JSON gửi lên
    const newStudent = await Student.create(req.body);
    // Trả về học sinh vừa tạo kèm status 201
    res.status(201).json(newStudent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ===== BAI 3 =====
// PUT cập nhật học sinh theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,  // ID từ URL
      req.body,       // dữ liệu cập nhật từ request body
      { new: true }   // trả về document sau khi update
    );

    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===== BAI 4 =====
// DELETE xóa học sinh theo ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Đã xóa học sinh", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
