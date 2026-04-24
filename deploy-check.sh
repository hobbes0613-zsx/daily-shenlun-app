#!/bin/bash

# 每日申论应用 - 部署前检查脚本

echo "🚀 每日申论应用 - 部署前检查"
echo "================================"
echo ""

# 检查Node.js版本
echo "1️⃣  检查Node.js版本..."
node_version=$(node -v 2>&1)
echo "   Node.js版本: $node_version"

if [[ $node_version =~ v[1][8-9][0-9] || $node_version =~ v2[0-9] ]]; then
    echo "   ✅ Node.js版本符合要求"
else
    echo "   ⚠️  建议使用Node.js 18或更高版本"
fi
echo ""

# 检查pnpm
echo "2️⃣  检查pnpm..."
if command -v pnpm &> /dev/null; then
    pnpm_version=$(pnpm -v)
    echo "   ✅ pnpm已安装 (版本: $pnpm_version)"
else
    echo "   ❌ pnpm未安装"
    echo "   安装命令: npm install -g pnpm"
fi
echo ""

# 检查后端依赖
echo "3️⃣  检查后端依赖..."
cd /workspace/projects/server
if [ -f "package.json" ]; then
    echo "   ✅ package.json存在"
    if [ -d "node_modules" ]; then
        echo "   ✅ 依赖已安装"
    else
        echo "   ⚠️  依赖未安装，正在安装..."
        pnpm install
    fi
else
    echo "   ❌ package.json不存在"
fi
echo ""

# 检查前端依赖
echo "4️⃣  检查前端依赖..."
cd /workspace/projects/client
if [ -f "package.json" ]; then
    echo "   ✅ package.json存在"
    if [ -d "node_modules" ]; then
        echo "   ✅ 依赖已安装"
    else
        echo "   ⚠️  依赖未安装，正在安装..."
        npx expo install --fix
    fi
else
    echo "   ❌ package.json不存在"
fi
echo ""

# 检查环境变量
echo "5️⃣  检查环境变量..."
cd /workspace/projects/server
if [ -f ".env" ]; then
    echo "   ✅ .env文件存在"
    if grep -q "SUPABASE_URL" .env; then
        echo "   ✅ SUPABASE_URL已配置"
    else
        echo "   ⚠️  SUPABASE_URL未配置"
    fi
    if grep -q "COZE_API_KEY" .env; then
        echo "   ✅ COZE_API_KEY已配置"
    else
        echo "   ⚠️  COZE_API_KEY未配置"
    fi
else
    echo "   ⚠️  .env文件不存在"
    echo "   提示：创建.env文件并配置环境变量"
fi
echo ""

# 检查TypeScript编译
echo "6️⃣  检查TypeScript编译..."
cd /workspace/projects
pnpm -w lint:all
if [ $? -eq 0 ]; then
    echo "   ✅ TypeScript编译通过"
else
    echo "   ❌ TypeScript编译失败"
fi
echo ""

echo "================================"
echo "✅ 检查完成！"
echo ""
echo "下一步："
echo "1. 按照 DEPLOYMENT.md 部署到Railway和Supabase"
echo "2. 配置API地址"
echo "3. 构建APK"
echo ""
echo "详细步骤请查看：/workspace/projects/DEPLOYMENT.md"
