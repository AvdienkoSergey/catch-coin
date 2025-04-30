/**
 * @fileoverview Logger
 * @author Timur Shemsedinov <https://github.com/tshemsedinov>
 * @modified Sergey Avdiienko <https://github.com/AvdienkoSergey>
 */

import fs from "node:fs";
import path from "node:path";
import util from "node:util";

const COLORS = {
  info: "\x1b[1;37m",
  debug: "\x1b[1;33m",
  error: "\x1b[0;31m",
  system: "\x1b[1;34m",
  access: "\x1b[1;38m",
};

const DATETIME_LENGTH = 19;

/**
 * @typedef {import('fs').WriteStream} WriteStream
 */

class Logger {
  /**
   * @param {string} logPath
   */
  constructor(logPath) {
    /** @type {string} */
    this.path = logPath;
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    /** @type {WriteStream} */
    this.stream = fs.createWriteStream(filePath, { flags: "a" });
    /** @type {RegExp} */
    this.regexp = new RegExp(path.dirname(this.path), "g");
  }

  /**
   * @returns {Promise<void>}
   */
  close() {
    return new Promise((resolve) => this.stream.end(resolve));
  }

  /**
   * @param {string} [type="info"]
   * @param {string} s
   * @returns {void}
   */
  write(type = "info", s) {
    const now = new Date().toISOString();
    const date = now.substring(0, DATETIME_LENGTH);
    const color = COLORS[type];
    const line = date + "\t" + s;
    // Using console.log for terminal output is intentional here
    // eslint-disable-next-line no-console
    console.log(color + line + "\x1b[0m");
    const out = line.replace(/[\n\r]\s*/g, "; ") + "\n";
    this.stream.write(out);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  log(...args) {
    const msg = util.format(...args);
    this.write("info", msg);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  dir(...args) {
    const msg = util.inspect(...args);
    this.write("info", msg);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  debug(...args) {
    const msg = util.format(...args);
    this.write("debug", msg);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  error(...args) {
    let msg;
    if (args.length === 1 && args[0] instanceof Error) {
      const err = args[0];
      msg = `${err.name}: ${err.message}\n${err.stack.split("\n").slice(1).join("\n")}`;
    } else {
      msg = util.format(...args);
    }

    this.write("error", msg);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  system(...args) {
    const msg = util.format(...args);
    this.write("system", msg);
  }

  /**
   * @param {...any} args
   * @returns {void}
   */
  access(...args) {
    const msg = util.format(...args);
    this.write("access", msg);
  }
}

const logger = new Logger("./log");
export default logger;
