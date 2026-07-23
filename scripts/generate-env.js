const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const outPath = path.resolve(__dirname, '../src/environments/environment.generated.ts');

function parseEnv(text) {
  return text
    .split(/\r?\n/)
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .reduce((env, line) => {
      const [key, ...rest] = line.split('=');
      if (!key) return env;
      env[key.trim()] = rest.join('=').trim();
      return env;
    }, {});
}

let env = {};
if (fs.existsSync(envPath)) {
  env = parseEnv(fs.readFileSync(envPath, 'utf8'));
}

const apiUrl = env.NG_APP_API_URL || env.API_URL || 'https://pet-odyssey-api-node.vercel.app';

const content = `// This file is generated from .env. Do not edit directly.
export const GENERATED_ENV = {
  apiUrl: ${JSON.stringify(apiUrl)}
};
`;

fs.writeFileSync(outPath, content, 'utf8');
