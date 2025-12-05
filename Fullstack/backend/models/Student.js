const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"]
    },
    age: {
      type: Number,
      required: [true, "Student age is required"],
      min: 1
    },
    class: {
      type: String,
      required: [true, "Student class is required"]
    }
  },
  {
    collection: 'students',
    timestamps: true   // tự tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model('Student', studentSchema);
