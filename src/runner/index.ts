#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

if (!fs.existsSync(path.join(process.cwd(), 'pom.xml'))) {
  console.error('❌ pom.xml file not found in the current directory');
  process.exit(1);
}

const GENERATOR = process.env.GENERATOR

if (!GENERATOR) {
  console.error("⚠️ Please set the GENERATOR environment variable to the path of the generator.")
  process.exit(1)
}

function runner() {
  const generatorPath = path.join(GENERATOR!, "generator.jar")

  const child = spawn('java', ['-jar', generatorPath], {
    stdio: 'inherit'
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ The process finished with code ${code}`);
      process.exit(code ?? 1);
    } else {
      console.log('✅ Process completed successfully');
    }
  });
}

export default runner;