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
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Print the current working directory
console.log("Current working directory:", process.cwd());
console.log("Script directory:", __dirname);

// Create a custom process.env.NODE_OPTIONS to help with module resolution
process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, "--experimental-specifier-resolution=node", "--preserve-symlinks", `--experimental-modules`].filter(Boolean).join(" ");

// Node.js will use paths in NODE_PATH to resolve modules
process.env.NODE_PATH = [process.env.NODE_PATH, "./node_modules", "../node_modules", join(__dirname, "node_modules"), join(__dirname, "..", "node_modules")].filter(Boolean).join(":");

// Create a custom loader to fix the unhead module resolution
const createLoader = () => {
  return {
    // Create a custom module loader to handle unhead/server
    resolve(specifier, context, nextResolve) {
      if (specifier === "unhead/server") {
        // Try to find unhead package and redirect to the right file
        try {
          const unheadPath = join(__dirname, "node_modules", "unhead", "dist", "server.mjs");
          return { url: `file://${unheadPath}`, shortCircuit: true };
        } catch (error) {
          console.error("Error resolving unhead/server:", error);
        }
      }
      return nextResolve(specifier, context);
    },
  };
};

// The loader needs to be registered before server startup
try {
  if (process.versions.node.split(".")[0] >= 16) {
    // Only available in Node.js 16+
    import("node:module")
      .then((module) => {
        if (module.register) {
          module.register(createLoader(), {
            condition: "unhead-fix",
            parentURL: import.meta.url,
          });
        }
      })
      .catch((err) => console.error("Failed to register loader:", err));
  }
} catch (error) {
  console.error("Error setting up module loader:", error);
}

// start server.mjs
const startServerMJS = () => {
  // Find the server.mjs file
  const serverPath = join(__dirname, "server", "server.mjs");
  console.log(`Starting server from: ${serverPath}`);

  const serverProcess = exec(`node ${serverPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Server error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Server stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(`Server stdout: ${stdout}`);
    }
  });

  serverProcess.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
  });
};

console.log("Starting server.mjs...");
startServerMJS();

// Setup main Nitro server
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;

// Create the Nitro app with error handling
try {
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
} catch (error) {
  console.error("Failed to start Nitro server:", error);
  process.exit(1);
}

console.log("All servers are running...");

const nodeServer = {};

export { nodeServer as default };
//# sourceMappingURL=index.mjs.map
