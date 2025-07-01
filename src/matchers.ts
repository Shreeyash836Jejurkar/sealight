import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type SecretPattern = { name: string, regex: RegExp };

function loadPatterns(): SecretPattern[] {
  const patternsPath = path.resolve(__dirname, "../key-patterns.json");
  const raw = fs.readFileSync(patternsPath, "utf-8");
  const arr = JSON.parse(raw);
  const seen = new Set();
  return arr.filter((p: { name: string, regex: string }) => {
    if (seen.has(p.regex)) return false;
    seen.add(p.regex);
    return true;
  }).map((p: { name: string, regex: string }) => ({
    name: p.name,
    regex: new RegExp(p.regex, "g")
  }));
}

export const secretPatterns: SecretPattern[] = loadPatterns();