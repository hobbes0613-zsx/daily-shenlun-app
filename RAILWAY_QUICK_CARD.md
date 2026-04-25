# 🚀 Railway 部署快速参考卡

一键式快速操作指南（打印或保存备用）

---

## ⚡ 5 步完成部署

### 第 1 步：访问 Railway (1 分钟)
```
https://railway.app
→ 登录 GitHub
→ New Project
→ Deploy from GitHub repo
```

### 第 2 步：连接仓库 (30 秒)
```
搜索：daily-shenlun-app
→ 选择：hobbes0613-zsx/daily-shenlun-app
→ 点击 Import
```

### 第 3 步：配置环境变量 (2 分钟)

添加 3 个变量：

```
SUPABASE_URL
https://doiwleesqwxojwlmxjch.supabase.co
────────────────────────────────────────

SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s

COZE_API_KEY（可选）
pat_xxxxxx（你的Coze密钥）
```

### 第 4 步：配置服务 (1 分钟)

```
Root Directory: server
Build Command: pnpm run build
Start Command: node dist/index.js
```

### 第 5 步：部署并获取域名 (5 分钟)

```
点击 Deploy
→ 等待 2-5 分钟
→ 复制域名：https://xxx.up.railway.app
```

---

## 🧪 测试 API

```bash
# 健康检查
https://你的域名.up.railway.app/api/v1/health

# 获取新闻
https://你的域名.up.railway.app/api/v1/news

# 刷新新闻
curl -X POST https://你的域名.up.railway.app/api/v1/news/refresh
```

---

## 📋 检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送
- [ ] Supabase 已配置
- [ ] Railway 项目已创建
- [ ] GitHub 仓库已连接
- [ ] Root Directory = server
- [ ] 3 个环境变量已添加
- [ ] 部署成功
- [ ] 域名已获取
- [ ] API 测试通过

---

## 🆘 快速解决

| 问题 | 解决方案 |
|------|----------|
| 找不到 Deploy 按钮 | 点击 Architecture → 查看服务状态 |
| 部署失败 | 点击 View Logs 查看错误 |
| API 返回错误 | 检查环境变量配置 |
| 没有域名 | 等待部署完成或检查状态 |

---

## 📞 需要帮助？

**详细指南**：`RAILWAY_COMPLETE_GUIDE.md`

**常用链接**：
- Railway: https://railway.app
- GitHub: https://github.com/hobbes0613-zsx/daily-shenlun-app
- Supabase: https://supabase.com

---

## 🎯 成功标志

看到这些说明成功：

```
✓ 🟢 服务状态：Active
✓ https://xxx.up.railway.app
✓ /api/v1/health 返回 OK
✓ /api/v1/news 返回新闻列表
```

---

**预计时间：10-15 分钟**

---

## ⏭️ 下一步

部署成功后：

1. 复制域名
2. 告诉我：`域名是：https://xxx.up.railway.app`
3. 我帮你构建 APK

---

## 💾 保存这张卡

打印或截图保存，随时查看！

---

*快速参考 - v1.0*
