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

// แปลงคะแนนเป็นเกรด
function toGrade(score) {
  if (score >= 80) {
    return "A";
  }

  if (score >= 70) {
    return "B";
  }

  if (score >= 60) {
    return "C";
  }

  return "F";
}

async function reportSequential() {
  console.log("\n=== Sequential ===");

  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);

    console.log(
      `${student.name} ได้ ${student.score} คะแนน เกรด ${toGrade(student.score)}`
    );
  }

  const elapsed = Date.now() - start;

  console.log(`ใช้เวลา: ${elapsed} ms`);

  return elapsed;
}

async function reportParallel() {
  console.log("\n=== Parallel ===");

  const ids = ["6501", "6502", "6503"];
  const start = Date.now();

  const students = await Promise.all(
    ids.map((id) => fetchStudentByIdAsync(id))
  );

  for (const student of students) {
    console.log(
      `${student.name} ได้ ${student.score} คะแนน เกรด ${toGrade(student.score)}`
    );
  }

  const elapsed = Date.now() - start;

  console.log(`ใช้เวลา: ${elapsed} ms`);

  return elapsed;
}

async function safeReport(id) {
  console.log(`\n=== ตรวจสอบ ${id} ===`);

  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = toGrade(student.score);

    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  const sequentialTime = await reportSequential();

  const parallelTime = await reportParallel();

  console.log(
    `\nParallel เร็วขึ้นประมาณ ${(sequentialTime / parallelTime).toFixed(2)} เท่า`
  );

  await safeReport("6501");
  await safeReport("9999");
}

// เริ่มโปรแกรม
main().catch((error) => {
  console.error("เกิดข้อผิดพลาด:", error.message);
});