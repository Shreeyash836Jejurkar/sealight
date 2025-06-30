# 🔐 Sealight – Hardcoded Secret Scanner for Developers

[![NPM version](https://img.shields.io/npm/v/sealight.svg)](https://www.npmjs.com/package/sealight)
[![License](https://img.shields.io/npm/l/sealight.svg)](./LICENSE)

**Sealight** is a fast, zero-config CLI tool that scans your codebase for hardcoded secrets and sensitive data — such as API keys, JWTs, AWS credentials, Base64 blobs, and more.

> ✅ Lightweight.  
> ✅ ESM-compatible.  
> ✅ Designed for CI, audits, and secure development practices.

---

## 📦 Installation

You can install `sealight` globally using:

```bash
npm install -g sealight
```

Or run it directly (if not published yet):

```bash
npx sealight ./your-folder
```

> 🧠 Requires **Node.js v18+** and ESM-compatible project setup.

---

## 🚀 Usage

```bash
sealight <path-to-scan> [options]
```

### Basic Example:

```bash
sealight ./src
```

### With JSON Output:

```bash
sealight ./my-app --json report.json
```

---

## 🎯 What It Detects

Sealight uses built-in regex patterns to catch:
- 🔑 **Generic API Keys**
- 🔐 **AWS Access Keys**
- 🧪 **JWT Tokens**
- 🧬 **Base64 Encoded Strings**
- 🔓 Common sensitive patterns in `.env`, `.js`, `.ts`, `.json`, `.py`, and more

---

## 📂 .sealightignore – Exclude Files or Folders

Create a `.sealightignore` file in your project root to exclude files or folders from being scanned.

### Example:
```
# Ignore secrets in test fixtures
**/mocks/**
.env.local
src/secrets/sample.json
```

> Uses glob patterns. Similar behavior to `.gitignore`.

---

## 📤 JSON Output (for CI/CD or Auditing)

Use the `--json` flag to export findings to a machine-readable `.json` file:

```bash
sealight ./backend --json findings.json
```

### Output Format:
```json
[
  {
    "file": "src/config/api.js",
    "line": 15,
    "type": "Generic API Key",
    "value": "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
  }
]
```

---

## 📄 Sample Output

```
🔍 Scanning: ./src

🔐 [API Key]  ./src/config.js:12
→ sk_test_4eC39HqLyjWDarjtT1zdp7dc

🔐 [JWT Token] ./auth/token.ts:8
→ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Scan complete. Total findings: 2
📁 Findings exported to report.json
```

---

## 🤝 Contributing

Want to suggest a new pattern or contribute?

1. Fork this repo
2. Create a feature branch
3. Submit a pull request with a clear description

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🔗 Author

Created by [Shreeyash Jejurkar](https://github.com/Shreeyash836Jejurkar)

