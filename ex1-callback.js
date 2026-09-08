const STUDENTS = [
  { id: "6501", name: "สมชาย", major: "Computer Engineering", score: 78 },
  { id: "6502", name: "สมหญิง", major: "Computer Engineering", score: 92 },
  { id: "6503", name: "วิชัย", major: "Information Technology", score: 65 },
  { id: "6504", name: "สุดา", major: "Computer Science", score: 85 },
];

function fetchStudentById(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const student = STUDENTS.find((s) => s.id === id);

    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    callback(null, { ...student });
  }, 300);
}

fetchStudentById("6501", (error, student) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("พบข้อมูล:", student);
});

fetchStudentById("9999", (error, student) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("พบข้อมูล:", student);
});

fetchStudentById(42, (error, student) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("พบข้อมูล:", student);
});