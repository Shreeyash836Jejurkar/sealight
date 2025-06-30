import fs from "fs/promises";
import { exportFindings } from "./reporter.js";

export async function writeFindingsToFile(filePath: string) {
  try {
    const content = exportFindings("json");
    await fs.writeFile(filePath, content, "utf-8");
    console.log(`\n📁 Findings exported to ${filePath}`);
  } catch (err) {
    console.error("❌ Failed to write findings:", err);
  }
}