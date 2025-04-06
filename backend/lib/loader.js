/**
 * @fileoverview Logger
 * @author Timur Shemsedinov <https://github.com/tshemsedinov>
 * @modified Sergey Avdiienko <https://github.com/AvdienkoSergey>
 */

import fs from 'node:fs/promises';
import vm from 'node:vm';

export const load = (options) => async (filePath, sandbox) => {
  const src = await fs.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code);
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, options);
  return exported;
};

export const loader = (options) => load(options);