const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willFail) {
        reject(new Error(`${value} ล้มเหลว`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function situation1() {
  console.log("\n=== สถานการณ์ที่ 1 ===");

  try {
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ"),
    ]);

    console.log(`เปิดหน้าแรก: ${results.join(" + ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  try {
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true),
    ]);

    console.log(`เปิดหน้าแรก: ${results.join(" + ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }
}

async function situation2() {
  console.log("\n=== สถานการณ์ที่ 2 ===");

  const results = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป"),
  ]);

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`${result.value}: สำเร็จ`);
    } else {
      console.log(`แจ้งเตือนล้มเหลว: ${result.reason.message}`);
    }
  });
}

async function situation3() {
  console.log("\n=== สถานการณ์ที่ 3 ===");

  try {
    const result = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B"),
    ]);

    console.log(`ได้ข้อมูลจาก: ${result}`);
  } catch (error) {
    console.log("ไม่พบ mirror ที่สำเร็จ");
  }
}

async function situation4() {
  console.log("\n=== สถานการณ์ที่ 4 ===");

  const database = wait(1200, "ข้อมูลจากฐานข้อมูล");
  const timeout = wait(800, "หมดเวลารอ", true);

  try {
    const result = await Promise.race([database, timeout]);

    console.log(`ได้ข้อมูล: ${result}`);
  } catch (error) {
    console.log("เกินเวลา 800ms → เลิกใช้ฐานข้อมูล");
    console.log("ใช้แคชเก่าแทน");
  }
}

async function main() {
  await situation1();
  await situation2();
  await situation3();
  await situation4();

  console.log("\n=== จบ Workshop 3 ข้อ 4 ===");
}

main().catch((error) => {
  console.error("เกิดข้อผิดพลาด:", error.message);
});