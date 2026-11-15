#!/usr/bin/env bash
# Builds and deploys the Cloudflare Worker from a clean copy of the project.
# OpenNext inlines every .env* file it finds into the Worker bundle, so local
# secret files (.env, .env.local etc.) must never be present at build time.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/blp27-cf-build.XXXXXX")"
trap 'rm -rf "$BUILD_DIR"' EXIT

rsync -a \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env.*.local' \
  --exclude '.env.development' \
  --exclude '.dev.vars*' \
  --exclude '.git' \
  --exclude '.next' \
  --exclude '.open-next' \
  --exclude '.wrangler' \
  --exclude '.vercel' \
  --exclude '.DS_Store' \
  --exclude 'node_modules' \
  --exclude 'tsconfig.tsbuildinfo' \
  "$ROOT/" "$BUILD_DIR/"

# APFS clone on macOS (instant, no extra disk); plain copy elsewhere.
cp -cR "$ROOT/node_modules" "$BUILD_DIR/node_modules" 2>/dev/null || cp -R "$ROOT/node_modules" "$BUILD_DIR/node_modules"

cd "$BUILD_DIR"

# Shell-exported NEXT_PUBLIC_* values would override .env.production.
for name in $(env | sed -n 's/^\(NEXT_PUBLIC_[A-Za-z0-9_]*\)=.*/\1/p'); do
  unset "$name"
done

npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy "$@"
