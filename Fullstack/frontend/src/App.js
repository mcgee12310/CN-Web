import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  // State form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [editingId, setEditingId] = useState(null); // ID học sinh đang sửa
  const [successMsg, setSuccessMsg] = useState(""); // Thông báo thành công
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true); // true = A→Z, false = Z→A

  // Lấy danh sách học sinh từ backend khi load
  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Lỗi khi fetch danh sách:", err));
  }, []);

  // ===== BAI 2 =====
  // Xử lý submit form: gửi POST request thêm học sinh
  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStu = {
      name,
      age: Number(age),
      class: stuClass
    };

    axios.post("http://localhost:5000/api/students", newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);

        // Cập nhật danh sách học sinh
        setStudents(prev => [...prev, res.data]);

        // Hiển thị thông báo thành công
        setSuccessMsg("Thêm học sinh thành công!");

        // Ẩn thông báo sau 3 giây
        setTimeout(() => setSuccessMsg(""), 3000);

        // Reset form
        setName("");
        setAge("");
        setStuClass("");
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setStuClass(student.class);
  };

  // ===== BAI 3 =====
  const handleSubmitStudent = (e) => {
    e.preventDefault();

    const stuData = { name, age: Number(age), class: stuClass };

    if (editingId) {
      // PUT update
      axios.put(`http://localhost:5000/api/students/${editingId}`, stuData)
        .then(res => {
          // Cập nhật state students
          setStudents(prev => prev.map(stu => stu._id === editingId ? res.data : stu));

          setEditingId(null); // reset chế độ sửa
          setName(""); setAge(""); setStuClass("");
          setSuccessMsg("Cập nhật học sinh thành công!");
          setTimeout(() => setSuccessMsg(""), 3000);
        })
        .catch(err => console.error("Lỗi khi cập nhật:", err));
    } else {
      // POST thêm mới
      axios.post("http://localhost:5000/api/students", stuData)
        .then(res => {
          setStudents(prev => [...prev, res.data]);
          setName(""); setAge(""); setStuClass("");
          setSuccessMsg("Thêm học sinh thành công!");
          setTimeout(() => setSuccessMsg(""), 3000);
        })
        .catch(err => console.error("Lỗi khi thêm:", err));
    }
  };

  // ===== BAI 4 =====
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học sinh này không?")) {
      axios.delete(`http://localhost:5000/api/students/${id}`)
        .then(res => {
          console.log(res.data.message);
          // Xóa khỏi state để cập nhật giao diện
          setStudents(prev => prev.filter(stu => stu._id !== id));
        })
        .catch(err => console.error("Lỗi khi xóa:", err));
    }
  };

  // ===== BAI 5 =====
  // ===== BAI 6 =====
  const filteredStudents = students
    .filter(stu => stu.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAsc ? -1 : 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="container">
      <h1>Danh sách học sinh</h1>

      {successMsg && (
        <div className="success-msg">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmitStudent}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? "Cập nhật học sinh" : "Thêm học sinh"}
        </button>
      </form>

      <div style={{ marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 8, width: '75%', borderRadius: 5, border: '1px solid #ccc' }}
        />
        <button onClick={() => setSortAsc(prev => !prev)} style={{ padding: '11px', borderRadius: 5 }}>
          Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <button onClick={() => handleEditClick(student)}>Sửa</button>
                  <button onClick={() => handleDelete(student._id)} style={{ marginLeft: 5, backgroundColor: 'red', color: 'white' }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
