#!/bin/bash
# Proto 编译脚本 - 一键重新生成前端 proto JS/TS 文件

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "  Proto 编译脚本"
echo "=========================================="

# 1. 从后端同步 proto 文件
BACKEND_PROTO_DIR="../qyh_jushen_backend/shared/proto"
FRONTEND_PROTO_DIR="./proto"

if [ -d "$BACKEND_PROTO_DIR" ]; then
    echo "📂 从后端同步 proto 文件..."
    cp -v "$BACKEND_PROTO_DIR"/*.proto "$FRONTEND_PROTO_DIR/"
    echo "✅ Proto 文件已同步"
else
    echo "⚠️  后端 proto 目录不存在: $BACKEND_PROTO_DIR"
    echo "   使用现有的 proto 文件..."
fi

# 2. 生成 JS 和 TS 文件
echo ""
echo "🔧 生成 JavaScript 文件..."
npx pbjs -t static-module -w es6 -o src/proto/dataplane.js proto/*.proto

echo "🔧 生成 TypeScript 声明文件..."
npx pbts -o src/proto/dataplane.d.ts src/proto/dataplane.js

# 3. 验证生成的文件
echo ""
echo "📋 生成的文件:"
ls -lh src/proto/

# 4. 检查关键消息是否存在
echo ""
echo "🔍 验证关键消息类型..."
grep -q "BasicState" src/proto/dataplane.d.ts && echo "  ✅ BasicState 已定义" || echo "  ❌ BasicState 未找到"
grep -q "MSG_BASIC_STATE" src/proto/dataplane.d.ts && echo "  ✅ MSG_BASIC_STATE 已定义" || echo "  ❌ MSG_BASIC_STATE 未找到"

echo ""
echo "=========================================="
echo "✅ Proto 编译完成！"
echo "=========================================="
