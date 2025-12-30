import { spawn } from "node:child_process";
import path from "node:path";

const processes = [];

function run(command, args) {
  const child = spawn(command, args, { stdio: "inherit" });
  processes.push(child);
  child.on("error", (error) => {
    console.error(`Failed to start ${command}:`, error);
    shutdown("SIGTERM");
    process.exit(1);
  });
  child.on("exit", (code, signal) => {
    if (process.exitCode === null || process.exitCode === undefined) {
      process.exitCode = code ?? (signal ? 1 : 0);
    }
    shutdown(signal ?? "SIGTERM");
    setTimeout(() => process.exit(process.exitCode ?? 0), 0);
  });
  return child;
}

const viteBin = path.resolve(
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vite.cmd" : "vite",
);

run("node", ["server/index.js"]);
run(viteBin, []);

function shutdown(signal) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal);
    process.exit(0);
  });
});
