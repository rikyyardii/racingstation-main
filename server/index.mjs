import process from "node:process";
globalThis._importMeta_ = { url: import.meta.url, env: process.env };
import "node:http";
import "node:https";
export { z as default } from "./chunks/runtime.mjs";
import "node:fs";
import "node:path";
import "node:url";
import { exec } from "child_process";

// start server.mjs
const startServerMJS = () => {
  const serverProcess = exec("node server/server.mjs", (error, stdout, stderr) => {
    if (error) {
      console.error(`Server error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Server stderr: ${stderr}`);
      return;
    }
    console.log(`Server stdout: ${stdout}`);
  });

  serverProcess.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
  });
};

console.log("Starting server.mjs...");
startServerMJS();

console.log("All servers are running...");
