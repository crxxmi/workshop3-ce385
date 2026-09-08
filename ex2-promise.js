const STUDENTS = [
  { id: "6501", name: "สมชาย", major: "Computer Engineering", score: 78 },
  { id: "6502", name: "สมหญิง", major: "Computer Engineering", score: 92 },
  { id: "6503", name: "วิชัย", major: "Information Technology", score: 65 },
  { id: "6504", name: "สุดา", major: "Computer Science", score: 85 },
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
      return;
    }

    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);

      if (!student) {
        reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        return;
      }

      resolve({ ...student });
    }, 300);
  });
}

fetchStudentByIdAsync("6501")
  .then((student) => {
    console.log("พบข้อมูล:", student);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("-- จบการตรวจสอบ 6501 --");
  });

// กรณีที่ 2: ไม่พบข้อมูล
fetchStudentByIdAsync("9999")
  .then((student) => {
    console.log("พบข้อมูล:", student);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("-- จบการตรวจสอบ 9999 --");
  });

fetchStudentByIdAsync(42)
  .then((student) => {
    console.log("พบข้อมูล:", student);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("-- จบการตรวจสอบ 42 --");
  });

fetchStudentByIdAsync("6501")
  .then((student) => {
    const grade =
      student.score >= 80
        ? "A"
        : student.score >= 70
        ? "B"
        : student.score >= 60
        ? "C"
        : "F";

    return {
      name: student.name,
      grade,
    };
  })
  .then((result) => {
    return `รายงาน: ${result.name} ได้เกรด ${result.grade}`;
  })
  .then((report) => {
    console.log(report);
  })
  .catch((error) => {
    console.log("Chain Error:", error.message);
  });