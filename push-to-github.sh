#!/bin/bash

# GitHub 推送助手脚本
# 使用方法: bash push-to-github.sh <你的GitHub用户名>

set -e

echo "🚀 GitHub 推送助手"
echo "=================="

# 检查参数
if [ -z "$1" ]; then
    echo "❌ 错误：请提供你的 GitHub 用户名"
    echo ""
    echo "使用方法："
    echo "  bash push-to-github.sh <你的GitHub用户名>"
    echo ""
    echo "示例："
    echo "  bash push-to-github.sh john-doe"
    echo ""
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="daily-shenlun-app"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "📋 配置信息："
echo "  - GitHub 用户名: ${GITHUB_USERNAME}"
echo "  - 仓库名称: ${REPO_NAME}"
echo "  - 仓库地址: ${REPO_URL}"
echo ""

# 检查 git 状态
echo "📊 检查 Git 状态..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  有未提交的修改，正在提交..."
    git add .
    git commit -m "Update for deployment"
else
    echo "✅ 工作区干净"
fi

# 检查远程仓库
echo ""
echo "🔍 检查远程仓库..."
if git remote get-url origin &>/dev/null; then
    CURRENT_REMOTE=$(git remote get-url origin)
    echo "ℹ️  当前远程仓库: ${CURRENT_REMOTE}"
    read -p "是否要更新远程仓库地址？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin ${REPO_URL}
        echo "✅ 远程仓库已更新"
    fi
else
    echo "➕ 添加远程仓库..."
    git remote add origin ${REPO_URL}
    echo "✅ 远程仓库已添加"
fi

# 设置主分支
echo ""
echo "🌿 设置主分支为 main..."
git branch -M main

# 推送
echo ""
echo "📤 准备推送到 GitHub..."
echo ""
echo "请先确保你已经在 GitHub 上创建了仓库："
echo "  ${REPO_URL}"
echo ""
read -p "是否已创建仓库并准备好推送？(y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 操作已取消"
    echo ""
    echo "请先在 GitHub 上创建仓库："
    echo "  1. 访问 https://github.com/new"
    echo "  2. 仓库名称: ${REPO_NAME}"
    echo "  3. 描述: 每日申论 - 时政新闻与AI申论生成应用"
    echo "  4. 设置为 Public 或 Private"
    echo "  5. 不要初始化 README、.gitignore 或 license"
    echo "  6. 点击 Create repository"
    echo ""
    echo "创建完成后，重新运行此脚本。"
    exit 1
fi

echo ""
echo "⏳ 正在推送，可能需要 GitHub 用户名和密码..."
echo "💡 提示：密码建议使用 Personal Access Token"
echo ""
git push -u origin main

echo ""
echo "🎉 推送成功！"
echo ""
echo "✅ 仓库地址: ${REPO_URL}"
echo "✅ 现在可以继续部署到 Railway 了"
echo ""
echo "下一步："
echo "  1. 访问 ${REPO_URL} 验证文件"
echo "  2. 阅读 RAILWAY_DEPLOY.md 了解如何部署"
echo ""
