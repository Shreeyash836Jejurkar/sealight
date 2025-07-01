import fs from "fs/promises";
import path from "path";
import { globby } from "globby";
import { secretPatterns } from "./matchers.js";
import { reportMatch } from "./reporter.js";
import { readUserIgnoreList } from "./ignore.js";

const DEFAULT_IGNORE = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/.next/**",
  "**/.cache/**"
];

export async function scanDirectory(basePath: string) {
  const absBase = path.resolve(basePath);
  console.log(`🔍 Scanning: ${absBase}\n`);

  const userIgnore = await readUserIgnoreList(process.cwd());
  const combinedIgnore = [...DEFAULT_IGNORE, ...userIgnore];

  const files = await globby([`${basePath}/**/*.*`], {
    gitignore: true,
    ignore: combinedIgnore,
    expandDirectories: {
      files: ["*.js", "*.ts", "*.env", "*.json", "*.yml", "*.yaml", "*.py", "*.go"],
    },
  });

  let totalFindings = 0;

  for (const absFile of files) {
    const relFile = path.relative(absBase, absFile);

    try {
      const content = await fs.readFile(absFile, "utf-8");
      const lines = content.split(/\r?\n/);

      lines.forEach((line, lineNum) => {
        for (const pattern of secretPatterns) {
          const matches = line.match(pattern.regex);
          if (matches) {
            matches.forEach((match) => {
              totalFindings++;
              reportMatch({
                file: relFile,
                line: lineNum + 1,
                type: pattern.name,
                value: match,
              });
            });
          }
        }
      });
    } catch (err) {
      console.warn(`⚠️ Failed to read: ${relFile}`);
    }
  }

  console.log(`\n✅ Scan complete. Total findings: ${totalFindings}`);
}