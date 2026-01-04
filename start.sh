#!/bin/bash
# QYH Jushen Web 前端启动脚本

cd "$(dirname "$0")"

echo "🚀 启动前端开发服务器..."
npm run dev -- --host 0.0.0.0
