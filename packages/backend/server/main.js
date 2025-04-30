import fsp from "node:fs/promises";
import path from "node:path";

import config from "./config.js";
import { db } from "./lib/db.js";
import { createLoader } from './lib/loader.js';
import logger from "./lib/logger.js";
import { transport } from "./transport/http.js";

const loadModule = createLoader({
  displayErrors: Boolean(config.sandbox.displayErrors),
  timeout: Number(config.sandbox.timeout),
});

const pool = db({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

const sandbox = {
  api: Object.freeze({}),
  console: Object.freeze(logger),
  db: Object.freeze(pool),
};

const apiPath = path.join(process.cwd(), "./api");
const routing = {};

const main = async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith(".js")) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, ".js");
    routing[serviceName] = await loadModule(filePath, sandbox);
  }

  transport(routing, config.api.port, logger);
};

main();
