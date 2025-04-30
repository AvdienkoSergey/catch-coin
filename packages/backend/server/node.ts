import * as _assert from "assert";
import * as _ah from "async_hooks";
import * as _buffer from "buffer";
import * as _cp from "child_process";
import * as _crypto from "crypto";
import * as _dgram from "dgram";
import * as _dns from "dns";
import * as _events from "events";
import * as _fs from "fs";
import * as _http from "http";
import * as _http2 from "http2";
import * as _https from "https";
import * as _net from "net";
import * as _os from "os";
import * as _path from "path";
import * as _ph from "perf_hooks";
import * as _qs from "querystring";
import * as _querystring from "querystring";
import * as _readline from "readline";
import * as _stream from "stream";
import * as _sd from "string_decoder";
import * as _timers from "timers";
import * as _tls from "tls";
import * as _url from "url";
import * as _util from "util";
import * as _v8 from "v8";
import * as _vm from "vm";
import * as _zlib from "zlib";

export {};

declare global {
  interface NodeJSGlobal {
    util: typeof _util;
    buffer: typeof _buffer;
    child_process: typeof _cp;
    childProcess: typeof _cp;
    os: typeof _os;
    v8: typeof _v8;
    vm: typeof _vm;
    path: typeof _path;
    url: typeof _url;
    StringDecoder: typeof _sd;
    querystring: typeof _qs;
    assert: typeof _assert;
    stream: typeof _stream;
    fs: typeof _fs;
    fsp: typeof _fs.promises;
    crypto: typeof _crypto;
    zlib: typeof _zlib;
    readline: typeof _readline;
    perf_hooks: typeof _ph;
    perfHooks: typeof _ph;
    async_hooks: typeof _ah;
    asyncHooks: typeof _ah;
    timers: typeof _timers;
    events: typeof _events;
    dns: typeof _dns;
    net: typeof _net;
    tls: typeof _tls;
    http: typeof _http;
    https: typeof _https;
    http2: typeof _http2;
    dgram: typeof _dgram;
  }
  interface Config {
    static: {
      port: number;
    };
    api: {
      port: number;
      transport: "http" | "https";
    };
    sandbox: {
      timeout: number;
      displayErrors: boolean;
    };
    db: {
      host: string;
      port: number;
      database: string;
      user: string;
      password: string;
    };
  }
}
