import process from "node:process";
globalThis._importMeta_ = { url: import.meta.url, env: process.env };
import "node:http";
import "node:https";
export { z as default } from "./chunks/runtime.mjs";
import "node:fs";
import "node:path";
import "node:url";
import { exec } from "child_process";

// Fungsi untuk memulai Redis server
const startRedis = () => {
  const redisProcess = exec("redis-server", (error, stdout, stderr) => {
    if (error) {
      console.error(`Redis error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Redis stderr: ${stderr}`);
      return;
    }
    console.log(`Redis stdout: ${stdout}`);
  });

  redisProcess.on("close", (code) => {
    console.log(`Redis process exited with code ${code}`);
  });
};

// Fungsi untuk memulai Node server dari server.mjs
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

// Memulai Redis dan server.mjs
console.log("Starting redis-server...");
startRedis();

console.log("Starting server.mjs...");
startServerMJS();

// Tambahkan logika aplikasi Anda di sini
console.log("All servers are running...");
