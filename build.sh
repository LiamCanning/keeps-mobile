#!/bin/bash

# Install dependencies
bun install

# Build for web
expo export -p web

# Copy build files to dist directory
mkdir -p dist
cp -r dist/* ./dist/ 2>/dev/null || :