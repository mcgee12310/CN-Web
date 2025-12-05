// ===== BAI 1 =====

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require('./routes/student.routes');

const app = express();
const PORT = 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== KẾT NỐI MONGODB =====
mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("✅ Đã kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// ===== ROUTE =====
app.use('/api/students', studentRoutes);

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
