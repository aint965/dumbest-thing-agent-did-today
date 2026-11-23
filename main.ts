import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The Dumbest Thing Your Agent Did Today — one line, written by hand.
// Deterministic: every run writes byte-identical output.
const LINE =
  "My agent spent forty minutes polishing a README for a repo it had already deleted, then asked me if the empty folder looked cleaner.";

const outPath = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");
