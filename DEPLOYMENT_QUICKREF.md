# 🎯 快速部署参考卡片

## 📋 你的配置信息

### Supabase 信息
- **Project URL**: `https://doiwleesqwxojwlmxjch.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s`
- **状态**: ✅ 已配置并测试通过

### 数据库状态
- ✅ `daily_news` 表已创建
- ✅ 数据连接测试通过
- ✅ 测试数据已插入

---

## 🚀 6步完成部署

### 1️⃣ 推送代码到 GitHub（5分钟）

```bash
cd /workspace/projects
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/daily-shenlun-app.git
git branch -M main
git push -u origin main
```

### 2️⃣ 部署到 Railway（5分钟）

1. 访问 https://railway.app
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 选择 `daily-shenlun-app` 仓库
4. 添加环境变量：
   ```
   SUPABASE_URL=https://doiwleesqwxojwlmxjch.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
   PORT=5000
   NODE_ENV=production
   ```
5. 配置构建：
   - Root Directory: `server`
   - Build Command: `pnpm run build`
   - Start Command: `node dist/index.js`
6. 点击 **Deploy Now**

### 3️⃣ 获取 Railway 域名

部署完成后，在 Railway 项目页面查看域名，例如：
```
https://your-project.up.railway.app
```

### 4️⃣ 配置 APK 的后端 URL

```bash
export EXPO_PUBLIC_BACKEND_BASE_URL=https://你的项目.up.railway.app
```

### 5️⃣ 构建 APK（15-20分钟）

```bash
cd /workspace/projects/client
npx eas build --platform android
```

选择：
- Build profile: `preview`
- Distribution: `APK`

### 6️⃣ 下载并安装

构建完成后，下载 APK 并安装到手机。

---

## 🧪 测试命令

### 测试 Railway 服务

```bash
# 健康检查
curl https://你的项目.up.railway.app/api/v1/health

# 获取新闻
curl https://你的项目.up.railway.app/api/v1/news
```

### 预期输出

健康检查：
```json
{"status":"ok"}
```

新闻 API：
```json
{"data":[...]}
```

---

## 💰 成本估算

- **Supabase**: $0/月（永久免费）
- **Railway**: $0/月（$5免费额度）
- **总计**: **$0/月**（个人使用）

---

## ⚠️ 常见问题快速修复

### Railway 部署失败？
→ 检查环境变量是否正确配置

### API 返回 500？
→ 检查 Supabase URL 和密钥是否正确

### APK 无法联网？
→ 确认 `EXPO_PUBLIC_BACKEND_BASE_URL` 已正确配置

### 想要 AI 生成题目？
→ 添加 `COZE_API_KEY` 环境变量（可选）

---

## 📞 需要帮助？

详细文档：
- **Railway 部署**: `RAILWAY_DEPLOY.md`
- **Supabase 配置**: `SUPABASE_SETUP.md`
- **快速开始**: `QUICKSTART.md`

---

**预计总耗时：30-40分钟** ⏱️
**预计总成本：$0/月** 💰
