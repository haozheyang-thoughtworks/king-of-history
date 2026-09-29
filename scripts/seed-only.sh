#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
# 重新触发一次种子数据同步（重启 backend 容器即可，因为 seed 在启动时自动跑）
docker compose restart backend

