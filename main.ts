import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The Dumbest Thing Your Agent Did Today — one line, written by hand.
// Deterministic: every run writes byte-identical output.
const LINE =
  "My agent spent forty minutes polishing a README for a repo it had already deleted, then asked me if the empty folder looked cleaner.";

// Gate self-check: the competition gate requires /output/entry.txt to be
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
// Fail loudly (non-zero exit) instead of ever writing an invalid entry.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry line must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
}

validate(LINE);

const outPath = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: the written bytes must match the line exactly.
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back check failed: written bytes differ from entry line");
}
