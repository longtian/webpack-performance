#!/usr/bin/env bash
npm install
mkdir -p ./build
webpack --json > ./build/log.json
webpack --json --profile > ./build/log_performance.json