# 🚀 快速部署卡片

## 部署步骤概览

### 第一步：配置Supabase（5分钟）
1. 访问 https://supabase.com → 注册/登录
2. 创建项目 → 选择 `Southeast Asia (Singapore)`
3. 创建表 `daily_news`：
   ```sql
   CREATE TABLE daily_news (
     id int8 PRIMARY KEY,
     date text,
     data jsonb,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );
   CREATE UNIQUE INDEX daily_news_date_key ON daily_news (date);
   ```
4. 复制 `Project URL` 和 `anon public` 密钥

### 第二步：获取Coze API密钥（2分钟）
1. 访问 https://www.coze.com → 登录
2. 点击头像 → API Tokens → Create Token
3. 复制生成的Token（`pat_xxxxx`）

### 第三步：部署到Railway（3分钟）
1. 访问 https://railway.app → GitHub登录
2. 点击 New Project → Deploy from GitHub repo
3. 选择你的项目仓库
4. 点击 Deploy

**配置环境变量**：
```
SUPABASE_URL=https://xxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
COZE_API_KEY=pat_xxxxx
PORT=5000
NODE_ENV=production
```

### 第四步：获取后端地址
Railway会自动生成一个域名，如：
```
https://daily-news-api-production.up.railway.app
```

### 第五步：构建APK（15-20分钟）
```bash
cd client
npm install -g eas-cli
eas login
eas build:configure

# 设置后端地址
export EXPO_PUBLIC_BACKEND_BASE_URL=https://your-railway-app.up.railway.app

# 构建APK
npx eas build --platform android --profile production
```

### 第六步：测试
1. 下载APK并安装
2. 打开应用 → 下拉刷新
3. 测试所有功能

---

## 快速测试命令

```bash
# 测试后端健康检查
curl https://your-railway-app.up.railway.app/api/v1/health

# 测试获取新闻
curl https://your-railway-app.up.railway.app/api/v1/news

# 测试刷新新闻
curl -X POST https://your-railway-app.up.railway.app/api/v1/news/refresh
```

---

## 📞 常见问题

### Railway部署失败？
- 确保项目根目录有 `Procfile`
- 检查 `package.json` 是否有 `start` 脚本

### Supabase连接失败？
- 检查环境变量是否正确配置
- 确认表已创建

### APK无法连接后端？
- 确认 `EXPO_PUBLIC_BACKEND_BASE_URL` 已设置
- 使用curl测试后端是否正常运行

---

## 💰 成本估算

| 服务 | 免费额度 | 个人使用 | 1000日活 |
|------|---------|---------|----------|
| Supabase | 永久免费 | $0 | $0 |
| Railway | $5/月 | $0 | $2-5/月 |

---

## 📖 详细文档

完整部署指南请查看：`DEPLOYMENT.md`

---

## ✅ 部署检查清单

- [ ] Supabase账号已注册
- [ ] Supabase项目已创建
- [ ] 数据库表已创建
- [ ] Supabase API密钥已获取
- [ ] Coze API密钥已获取
- [ ] Railway账号已注册
- [ ] 后端已部署到Railway
- [ ] 环境变量已配置
- [ ] 后端API地址已获取
- [ ] APK已构建
- [ ] APK已安装到手机
- [ ] 所有功能已测试

---

**预计总耗时：30-40分钟**
