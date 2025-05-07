#!/usr/bin/env node
import { exec } from 'node:child_process';
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

  exec(`bash ${generatorPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    if (stderr) {
      console.error(`⚠️ stderr:`, stderr)
    }

    console.log('✅ stdout:', stdout)
  })
}

export default runner;