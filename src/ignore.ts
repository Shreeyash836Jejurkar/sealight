import fs from "fs/promises";
import path from "path";

export async function readUserIgnoreList(basePath: string): Promise<string[]> {
  const ignoreFile = path.join(basePath, ".sealightignore");

  try {
    const content = await fs.readFile(ignoreFile, "utf-8");
    return content
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
  } catch {
    return [];
  }
}