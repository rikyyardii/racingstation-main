import process from "node:process";
globalThis._importMeta_ = { url: import.meta.url, env: process.env };
import { Server as Server$1 } from "node:http";
import { Server } from "node:https";
import { t as toNodeListener, d as destr, u as useRuntimeConfig, a as trapUnhandledNodeErrors, s as setupGracefulShutdown, b as useNitroApp } from "./chunks/_/nitro.mjs";
import "node:events";
import "node:buffer";
import "node:fs";
import "node:path";
import "node:crypto";
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

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});

trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);

console.log("All servers are running...");

const nodeServer = {};

export { nodeServer as default };
//# sourceMappingURL=index.mjs.map
