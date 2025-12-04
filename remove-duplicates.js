// remove-duplicates.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

const targetDir = "./"; // غيّر هذا لمسار المجلد الذي تريد فحصه

// دالة لحساب بصمة (hash) لكل ملف
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileBuffer).digest("hex");
}

function removeDuplicates(dir) {
  const files = fs.readdirSync(dir);
  const seenHashes = new Map();

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      const hash = getFileHash(filePath);

      if (seenHashes.has(hash)) {
        console.log(`🗑️ حذف الملف المكرر: ${filePath}`);
        fs.unlinkSync(filePath);
      } else {
        seenHashes.set(hash, filePath);
      }
    }
  }
}

removeDuplicates(targetDir);
