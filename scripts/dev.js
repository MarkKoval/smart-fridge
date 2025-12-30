import { spawn } from "node:child_process";

const processes = [];

function run(command, args) {
  const child = spawn(command, args, { stdio: "inherit" });
  processes.push(child);
  child.on("exit", (code, signal) => {
    if (process.exitCode === null || process.exitCode === undefined) {
      process.exitCode = code ?? (signal ? 1 : 0);
    }
    shutdown(signal ?? "SIGTERM");
    setTimeout(() => process.exit(process.exitCode ?? 0), 0);
  });
  return child;
}

run("node", ["server/index.js"]);
run("vite", []);

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
