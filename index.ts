#!/usr/bin/env node
import { program } from "commander";
import { scanDirectory } from "./src/scanner.js";
import { writeFindingsToFile } from "./src/exporter.js";


program
  .name("sealight")
  .description("Scan your project for hardcoded secrets and sensitive data")
  .version("0.1.2")
  .argument("<path>", "Directory path to scan")
  .option("--json <outputFile>", "Export findings to a JSON file")
  .action(async (path, options) => {
    await scanDirectory(path);

    if (options.json) {
      await writeFindingsToFile(options.json);
    }
  });

program.parse();