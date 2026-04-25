# GitHub Personal Access Token 配置指南

## 🔐 推送失败原因

GitHub 已禁用密码认证，需要使用 Personal Access Token (PAT)。

## 📝 创建 Personal Access Token（3分钟）

### 步骤 1：访问 GitHub 设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单 → **Developer settings**

### 步骤 2：生成新 Token

1. 点击 **Personal access tokens** → **Tokens (classic)**
2. 点击 **Generate new token (classic)**

### 步骤 3：配置 Token

1. **Note**：输入描述，如 `daily-shenlun-app`
2. **Expiration**：选择过期时间（推荐 `No expiration` 或 `90 days`）
3. **Select scopes**：勾选以下权限：
   - ✅ `repo`（完整的仓库访问权限）
   - ✅ `workflow`（如果需要 GitHub Actions）

4. 滚动到底部 → 点击 **Generate token**

### 步骤 4：复制 Token

⚠️ **重要**：Token 只显示一次，必须立即复制！

```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

复制后保存到安全的地方。

## 🚀 使用 Token 推送代码

### 方法 1：使用 Git Credential Helper（推荐）

```bash
cd /workspace/projects

# 配置 credential helper
git config --global credential.helper store

# 推送时输入 token
git push -u origin main
```

会提示输入：
- **Username**: `hobbes0613-zsx`
- **Password**: 粘贴你的 GitHub Token（`ghp_` 开头）

### 方法 2：在 URL 中包含 Token（一次性）

```bash
cd /workspace/projects

# 使用 token 更新远程 URL
git remote set-url origin https://hobbes0613-zsx:YOUR_TOKEN@github.com/hobbes0613-zsx/daily-shenlun-app.git

# 替换 YOUR_TOKEN 为你的实际 token

# 推送
git push -u origin main
```

### 方法 3：使用 SSH 密钥（最安全）

如果你偏好使用 SSH：

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "hobbes0613-zsx@github.com"

# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加密钥
ssh-add ~/.ssh/id_ed25519

# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

然后：
1. 访问 https://github.com/settings/keys
2. 点击 **New SSH key**
3. 粘贴公钥内容
4. 更新远程 URL：
```bash
git remote set-url origin git@github.com:hobbes0613-zsx/daily-shenlun-app.git
git push -u origin main
```

## ⚡ 快速推送（推荐使用方法 2）

1. **创建 Token**（按照上面的步骤）
2. **复制 Token**
3. **运行以下命令**：

```bash
cd /workspace/projects
git remote set-url origin https://hobbes0613-zsx:你的Token@github.com/hobbes0613-zsx/daily-shenlun-app.git
git push -u origin main
```

## ✅ 验证推送成功

推送成功后访问：
```
https://github.com/hobbes0613-zsx/daily-shenlun-app
```

应该能看到所有项目文件！

## 🔄 推送成功后的安全操作

如果你使用方法 2（URL 包含 token），推送成功后建议：

```bash
# 移除 URL 中的 token
git remote set-url origin https://github.com/hobbes0613-zsx/daily-shenlun-app.git

# 配置 credential helper
git config --global credential.helper store
```

## 📋 Token 管理建议

1. **安全存储**：将 Token 保存在密码管理器中
2. **定期更新**：90 天后重新生成
3. **不要泄露**：不要在代码、聊天或文档中暴露
4. **最小权限**：只授予必要的权限（repo）

## ❓ 常见问题

**Q: Token 可以重复使用吗？**
A: 可以，直到过期。

**Q: 忘记了 Token 怎么办？**
A: 需要重新生成，旧的会失效。

**Q: 推送还是失败怎么办？**
A: 检查：
- Token 是否正确复制（包括 `ghp_` 前缀）
- 仓库地址是否正确
- Token 是否有 `repo` 权限
