#!/usr/bin/env node
/**
 * Introspect GitHub GraphQL API into schema/github.graphql
 * Token: GITHUB_TOKEN, GH_TOKEN, or `gh auth token`
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'schema', 'github.graphql');
const endpoint = process.env.GITHUB_GRAPHQL_URL ?? 'https://api.github.com/graphql';

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim();
  } catch {
    throw new Error(
      'No token: set GITHUB_TOKEN/GH_TOKEN or run `gh auth login`',
    );
  }
}

const token = resolveToken();
const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Github-Next-Global-ID': '1',
  },
  body: JSON.stringify({ query: getIntrospectionQuery({ descriptions: false }) }),
});

if (!res.ok) {
  throw new Error(`Introspection failed: ${res.status} ${res.statusText}`);
}

const json = await res.json();
if (json.errors?.length) {
  throw new Error(`Introspection GraphQL errors: ${JSON.stringify(json.errors)}`);
}

const schema = buildClientSchema(json.data);
const sdl = printSchema(schema);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, sdl + '\n');
console.log(`Wrote ${outPath} (${sdl.length} bytes)`);
