import chalk from "chalk";

type Match = {
  file: string;
  line: number;
  type: string;
  value: string;
};

const findings: Match[] = [];

export function reportMatch(match: Match) {
  findings.push(match);

  const icon = "🔐";
  const location = chalk.gray(`${match.file}:${match.line}`);
  const type = chalk.yellow(`[${match.type}]`);
  const value = chalk.redBright(`→ ${truncate(match.value)}`);

  console.log(`${icon} ${type}  ${location}`);
  console.log(value);
  console.log();
}

function truncate(text: string, max = 80): string {
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export function exportFindings(format: "json" = "json") {
  if (format === "json") {
    return JSON.stringify(findings, null, 2);
  }

  return "";
}

export function getFindingsCount() {
  return findings.length;
}