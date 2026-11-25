// SPDX-License-Identifier: MIT
// Notes From a Passive-Aggressive Fridge — one note from a smart fridge
// to its owner, written to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The yogurt expired Tuesday. I beeped four times to tell you. You opened the door, stared, and closed it. It is still in here. Watching you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Empty /output by its contents only — never remove the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

// Fail fast on the competition gate: 1-200 chars, one non-blank line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, gate is 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
