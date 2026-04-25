# 📤 如何推送代码到 GitHub

## 🎯 快速步骤（5分钟）

### 第一步：在 GitHub 创建新仓库（2分钟）

1. 登录 https://github.com
2. 点击右上角的 **+** 按钮
3. 选择 **New repository**
4. 填写信息：
   - **Repository name**: `daily-shenlun-app`（或你喜欢的名字）
   - **Description**: `每日申论 - 时政新闻与AI申论生成应用`
   - **Public/Private**: 选择 **Public**（公开）或 **Private**（私有）
5. **不要**勾选：
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. 点击 **Create repository**

### 第二步：复制仓库地址（10秒）

创建后会显示一个页面，找到并复制仓库地址：

**HTTPS 方式**（推荐）：
```
https://github.com/你的用户名/daily-shenlun-app.git
```

或者 **SSH 方式**（如果配置了 SSH）：
```
git@github.com:你的用户名/daily-shenlun-app.git
```

### 第三步：添加远程仓库（10秒）

在终端执行：

```bash
cd /workspace/projects
git remote add origin https://github.com/你的用户名/daily-shenlun-app.git
```

### 第四步：推送到 GitHub（2分钟）

```bash
cd /workspace/projects
git branch -M main
git push -u origin main
```

### 第五步：验证（10秒）

访问你的 GitHub 仓库页面：
```
https://github.com/你的用户名/daily-shenlun-app
```

你应该能看到所有项目文件！🎉

---

## 🔧 详细说明

### 如果出现 "Authentication failed" 错误

**原因**：需要配置 GitHub 身份验证

**解决方法A：使用 Personal Access Token（推荐）**

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 填写信息：
   - **Note**: `daily-shenlun-app deploy`
   - **Expiration**: 选择 `90 days` 或 `No expiration`
   - **Scopes**: 勾选 `repo`（完整的仓库访问权限）
4. 点击 **Generate token**
5. **重要！** 复制生成的 token（只显示一次）
6. 推送时输入 token 作为密码

**解决方法B：使用 SSH Key（更安全）**

```bash
# 1. 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 复制公钥
cat ~/.ssh/id_ed25519.pub

# 3. 添加到 GitHub
# 访问：https://github.com/settings/keys
# 点击 "New SSH key"，粘贴公钥

# 4. 测试连接
ssh -T git@github.com

# 5. 使用 SSH 地址推送
git remote set-url origin git@github.com:你的用户名/daily-shenlun-app.git
git push -u origin main
```

### 如果出现 "Updates were rejected" 错误

**原因**：远程仓库有文件冲突

**解决方法A：强制推送（慎用，会覆盖远程）**

```bash
git push -u origin main --force
```

**解决方法B：先拉取再推送**

```bash
git pull origin main --rebase
git push -u origin main
```

### 如果需要推送更新代码

```bash
# 查看修改状态
git status

# 添加所有修改
git add .

# 提交修改
git commit -m "描述你的修改"

# 推送到 GitHub
git push
```

---

## 📝 常用命令速查

```bash
# 查看状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <仓库地址>

# 修改远程仓库地址
git remote set-url origin <新仓库地址>

# 推送到远程
git push -u origin main

# 拉取远程更新
git pull origin main

# 创建新分支
git branch <分支名>

# 切换分支
git checkout <分支名>

# 删除分支
git branch -d <分支名>
```

---

## ⚠️ 注意事项

1. **敏感信息保护**
   - ✅ 不要推送 `.env` 文件（包含 API 密钥）
   - ✅ `.gitignore` 已配置，自动忽略敏感文件
   - ✅ `.env.example` 可以推送（不包含真实密钥）

2. **仓库命名建议**
   - 使用小写字母和连字符：`daily-shenlun-app`
   - 避免使用空格和特殊字符

3. **首次推送**
   - 使用 `git push -u origin main` 设置上游分支
   - 之后只需使用 `git push` 即可

---

## 🎯 推送后的下一步

推送成功后：

1. ✅ 验证文件都在 GitHub 上
2. ✅ 记住仓库 URL（Railway 部署需要）
3. ✅ 继续 [Railway 部署](RAILWAY_DEPLOY.md)

你的仓库 URL 格式：
```
https://github.com/你的用户名/daily-shenlun-app
```

这个 URL 在部署 Railway 时需要使用！

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub 官方文档：https://docs.github.com
2. 搜索错误信息
3. 查看项目的 `.gitignore` 文件确保敏感文件不被推送

---

**预计耗时：5分钟** ⏱️
**难度：简单** ⭐
