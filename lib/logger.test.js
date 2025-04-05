import assert from 'node:assert';
import { describe, it, beforeEach, afterEach, after } from 'mocha';
import fs from 'node:fs';
import path from 'node:path';
import logger from '../lib/logger.js';

describe('Logger', () => {
  const originalConsoleLog = console.log;
  let consoleOutput = [];
  
  beforeEach(() => {
    consoleOutput = [];
    console.log = (...args) => {
      consoleOutput.push(args.join(' '));
    };
  });
  
  afterEach(() => {
    console.log = originalConsoleLog;
  });
  
  after(async () => {
    await logger.close();
  });
  
  function getLatestLogFile() {
    const date = new Date().toISOString().substring(0, 10);
    return path.join('./log', `${date}.log`);
  }
  
  it('should log info message', () => {
    logger.log('test info message');
    assert.ok(consoleOutput[0].includes('test info message'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    assert.ok(content.includes('test info message'));
  });
  
  it('should log debug message', () => {
    logger.debug('test debug message');
    assert.ok(consoleOutput[0].includes('test debug message'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    assert.ok(content.includes('test debug message'));
  });
  
  it('should log error message', () => {
    const error = new Error('test error message');
    logger.error(error);
    assert.ok(consoleOutput[0].includes('Error: test error message'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    console.log(content.includes('Error: test error message'))
    assert.ok(content.includes('Error: test error message'));
  });
  
  it('should log system message', () => {
    logger.system('test system message');
    assert.ok(consoleOutput[0].includes('test system message'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    assert.ok(content.includes('test system message'));
  });
  
  it('should log access message', () => {
    logger.access('test access message');
    assert.ok(consoleOutput[0].includes('test access message'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    assert.ok(content.includes('test access message'));
  });
  
  it('should log object with dir method', () => {
    const testObject = { name: 'test', value: 123 };
    logger.dir(testObject);
    assert.ok(consoleOutput[0].includes('name') && consoleOutput[0].includes('test'));
    
    const logFile = getLatestLogFile();
    const content = fs.readFileSync(logFile, 'utf8');
    assert.ok(content.includes('name') && content.includes('test'));
  });
});
