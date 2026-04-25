# 📤 推送代码到 GitHub - 3 步完成

## 方法一：使用自动脚本（推荐）⭐

```bash
bash push-to-github.sh <你的GitHub用户名>
```

示例：
```bash
bash push-to-github.sh john-doe
```

脚本会自动：
1. 检查 Git 状态
2. 添加远程仓库
3. 推送代码到 GitHub

---

## 方法二：手动推送

### 步骤 1：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 仓库名：`daily-shenlun-app`
3. 描述：`每日申论 - 时政新闻与AI申论生成应用`
4. 选择 Public 或 Private
5. **不要**初始化 README、.gitignore 或 license
6. 点击 Create repository

### 步骤 2：添加远程仓库

```bash
cd /workspace/projects
git remote add origin https://github.com/你的用户名/daily-shenlun-app.git
```

### 步骤 3：推送代码

```bash
git branch -M main
git push -u origin main
```

---

## 🔐 身份验证

如果需要输入密码，建议使用 **Personal Access Token**：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制 token
5. 推送时输入 token 作为密码

---

## ✅ 验证

推送成功后，访问：
```
https://github.com/你的用户名/daily-shenlun-app
```

应该能看到所有项目文件！

---

## 📚 详细文档

详细步骤和故障排除请查看：
- **GITHUB_PUSH_GUIDE.md** - 完整的推送指南

---

## ⏭️ 下一步

推送成功后，继续部署到 Railway：
```bash
cat DEPLOYMENT_QUICKREF.md
```

---

**预计耗时：5分钟** ⏱️
