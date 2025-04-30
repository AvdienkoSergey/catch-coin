import { createRequire } from 'module';
import path from 'node:path';
import vm from 'node:vm';

import { build } from 'esbuild';

export function createLoader(opts = {}) {
  const requireFn = createRequire(import.meta.url);

  return async function loadModule(filePath, sandbox = {}) {
    const { outputFiles } = await build({
      entryPoints: [filePath],
      bundle: true,
      write: false,
      platform: 'node',
      format: 'cjs',
      sourcemap: opts.displayErrors !== false,
    });
    const code = outputFiles[0].text;

    const script = new vm.Script(code, {
      filename: filePath,
      displayErrors: opts.displayErrors,
      timeout: opts.timeout,
    });

    const context = vm.createContext({});

    for (const key of Object.keys(sandbox)) {
      context[key] = sandbox[key];
    }

    const exports = {};
    const module = { exports };
    context.module   = module;
    context.exports  = exports;
    context.require  = requireFn;
    context.__filename = filePath;
    context.__dirname  = path.dirname(filePath);

    script.runInContext(context, {
      displayErrors: opts.displayErrors || false,
      timeout: opts.timeout || 5_000,
    });

    return module.exports && module.exports.__esModule
      ? module.exports.default
      : module.exports;
  };
}
