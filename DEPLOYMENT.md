# 每日申论应用 - 部署指南

本指南将帮助你使用免费服务将"每日申论"应用部署到云端，并生成APK文件。

## 部署架构

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   手机APK   │  ────>  │  Railway后端│  ────>  │  Supabase   │
│             │  HTTPS  │   (免费)    │         │   数据库    │
│             │         │             │         │   (免费)    │
└─────────────┘         └─────────────┘         └─────────────┘
```

## 第一步：注册并配置Supabase数据库

### 1. 注册Supabase账号
1. 访问：https://supabase.com
2. 点击"Start your project"
3. 使用GitHub或邮箱注册（免费）

### 2. 创建新项目
1. 点击"New Project"
2. 填写项目信息：
   - **Name**：`daily-news`
   - **Database Password**：设置一个强密码（记住它！）
   - **Region**：选择`Southeast Asia (Singapore)`（亚洲访问更快）
3. 点击"Create new project"
4. 等待约2分钟，项目创建完成

### 3. 创建数据库表
1. 在左侧菜单点击`Table Editor`
2. 点击"Create a new table"
3. 填写信息：
   - **Name**：`daily_news`
   - **Description**：每日新闻数据
4. 添加列：
   - 点击"Add column"
   - **Name**：`id`，**Type**：`int8`，勾选`Primary Key`
   - 点击"Add column"
   - **Name**：`date`，**Type**：`text`
   - 点击"Add column"
   - **Name**：`data`，**Type**：`jsonb`
   - 点击"Add column"
   - **Name**：`created_at`，**Type**：`timestamptz`，默认值`now()`
   - 点击"Add column"
   - **Name**：`updated_at`，**Type**：`timestamptz`，默认值`now()`
5. 点击"Save"

### 4. 配置唯一索引（避免重复数据）
1. 点击左侧菜单`SQL Editor`
2. 点击"New query"
3. 输入以下SQL：
```sql
-- 创建唯一索引，防止同一天重复插入
CREATE UNIQUE INDEX IF NOT EXISTS daily_news_date_key
ON daily_news (date);
```
4. 点击"Run"

### 5. 获取API密钥
1. 点击左侧菜单`Project Settings`（齿轮图标）
2. 点击`API`
3. 复制以下信息（稍后会用到）：
   - **Project URL**：类似 `https://xxxxxx.supabase.co`
   - **anon public**：类似 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 第二步：部署后端到Railway

### 1. 注册Railway账号
1. 访问：https://railway.app
2. 点击"Login"
3. 使用GitHub账号登录（免费）

### 2. 部署后端

#### 方法A：从GitHub部署（推荐）
1. 将你的项目代码推送到GitHub
2. 登录Railway后，点击"New Project"
3. 点击"Deploy from GitHub repo"
4. 选择你的仓库
5. Railway会自动检测到Node.js项目
6. 点击"Deploy"

#### 方法B：使用railway CLI
1. 安装Railway CLI：
```bash
npm install -g @railway/cli
```

2. 登录：
```bash
railway login
```

3. 初始化项目：
```bash
cd /workspace/projects
railway init
```

4. 添加后端服务：
```bash
cd server
railway up
```

### 3. 配置环境变量
1. 在Railway项目中，点击你的服务
2. 点击"Variables"标签
3. 添加以下环境变量：

```env
# 从Supabase获取
SUPABASE_URL=https://xxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Coze AI API密钥（从Coze平台获取）
COZE_API_KEY=pat_xxxxx

# 端口
PORT=5000

# 环境
NODE_ENV=production
```

4. 点击"Save Changes"
5. Railway会自动重启服务

### 4. 获取后端API地址
1. 在Railway项目页面，点击你的服务
2. 在顶部会看到一个域名，类似：
   ```
   https://daily-news-api-production.up.railway.app
   ```
3. 这是你的后端API地址，复制它（稍后会用到）

---

## 第三步：获取Coze AI API密钥

### 1. 注册Coze账号
1. 访问：https://www.coze.com
2. 注册并登录

### 2. 创建API密钥
1. 点击右上角头像 → `API Tokens`
2. 点击"Create Token"
3. 选择权限：
   - ✓ `Chat`（聊天）
   - ✓ `Knowledge`（知识库）
4. 点击"Create"
5. 复制生成的Token（类似：`pat_xxxxx`）

---

## 第四步：配置APK并构建

### 1. 设置后端API地址
在构建APK前，需要设置后端API地址。

#### 方法A：使用环境变量（推荐）
```bash
cd /workspace/projects/client

# 设置后端API地址（替换为你的Railway地址）
export EXPO_PUBLIC_BACKEND_BASE_URL=https://your-railway-app.up.railway.app
```

#### 方法B：修改app.config.ts
编辑 `/workspace/projects/client/app.config.ts`：
```typescript
export default {
  // ... 其他配置
  extra: {
    EXPO_PUBLIC_BACKEND_BASE_URL: 'https://your-railway-app.up.railway.app',
  },
};
```

### 2. 安装EAS CLI
```bash
cd /workspace/projects/client
npm install -g eas-cli
```

### 3. 配置EAS Build
```bash
eas login
eas build:configure
```

### 4. 构建APK
```bash
# 首次构建需要10-20分钟
npx eas build --platform android --profile production
```

### 5. 下载APK
1. 构建完成后，EAS会提供一个下载链接
2. 点击链接下载APK文件
3. 传输到手机并安装

---

## 第五步：测试部署

### 1. 测试后端API
```bash
# 测试健康检查
curl https://your-railway-app.up.railway.app/api/v1/health

# 测试获取新闻
curl https://your-railway-app.up.railway.app/api/v1/news

# 测试刷新新闻
curl -X POST https://your-railway-app.up.railway.app/api/v1/news/refresh
```

### 2. 测试APK
1. 在手机上安装APK
2. 打开应用
3. 下拉刷新新闻列表
4. 点击新闻查看详情
5. 点击"生成申论题目和答案"
6. 测试金句保存功能

---

## 定时任务设置（可选）

如果你希望每天自动更新新闻，可以使用以下方法：

### 方法1：使用Railway Cron
1. 在Railway项目中，点击你的服务
2. 点击"Crons"标签
3. 添加定时任务：
   - **Command**：`curl -X POST https://your-railway-app.up.railway.app/api/v1/news/refresh`
   - **Schedule**：`0 6 * * *`（每天早上6点）
4. 点击"Create"

### 方法2：使用外部服务
使用 [cron-job.org](https://cron-job.org) 或 [EasyCron](https://www.easycron.com)：
1. 注册账号
2. 创建定时任务
3. URL：`https://your-railway-app.up.railway.app/api/v1/news/refresh`
4. 时间：每天早上6点

---

## 成本说明

### 免费额度

**Supabase（永久免费）**：
- 500MB数据库存储
- 2GB文件存储
- 50,000 API请求/月

**Railway（免费套餐）**：
- $5免费额度/月
- 足够运行这个小型应用
- 超过后按使用量付费

### 预计月费用
- **个人使用**：$0（完全免费）
- **1000日活用户**：约$2-5/月
- **10000日活用户**：约$10-20/月

---

## 故障排除

### 问题1：Railway部署失败
**解决方案**：
- 检查`server/package.json`是否有`start`脚本
- 确保所有依赖都已安装
- 查看Railway日志

### 问题2：Supabase连接失败
**解决方案**：
- 检查环境变量是否正确
- 确认Supabase项目已启动
- 检查数据库表是否已创建

### 问题3：APK无法连接后端
**解决方案**：
- 确认`EXPO_PUBLIC_BACKEND_BASE_URL`已设置
- 检查后端是否正常运行
- 使用curl测试后端API

### 问题4：AI生成失败
**解决方案**：
- 检查`COZE_API_KEY`是否正确
- 确认API密钥有足够权限
- 查看Railway日志中的错误信息

---

## 维护建议

1. **定期检查**：每周检查一次服务状态
2. **监控日志**：在Railway查看应用日志
3. **备份数据**：定期备份Supabase数据库
4. **更新依赖**：每月更新一次依赖包

---

## 联系支持

如果遇到问题：
- Railway支持：https://docs.railway.app
- Supabase支持：https://supabase.com/docs
- Coze支持：https://www.coze.com/docs

---

**恭喜！你的应用已成功部署到云端！🎉**
