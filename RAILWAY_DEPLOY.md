# 🚀 Railway 部署指南

## 前置条件
✅ Supabase 已配置完成
✅ 数据库连接测试通过
✅ 拥有 GitHub 账号

---

## 第一步：推送代码到 GitHub（5分钟）

### 1.1 初始化 Git 仓库（如果还没有）

```bash
cd /workspace/projects
git init
git add .
git commit -m "Initial commit: 每日申论应用"
```

### 1.2 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名：`daily-shenlun-app`
3. 设置为 Public（推荐）或 Private
4. 不要初始化 README（因为我们已经有代码了）
5. 点击 **Create repository**

### 1.3 推送代码

复制 GitHub 提供的命令并执行：

```bash
git remote add origin https://github.com/你的用户名/daily-shenlun-app.git
git branch -M main
git push -u origin main
```

---

## 第二步：在 Railway 部署（5分钟）

### 2.1 登录 Railway

1. 访问 https://railway.app
2. 点击 **Login** → 使用 GitHub 账号登录
3. 点击 **Authorize Railway** 授权

### 2.2 创建新项目

1. 点击 **New Project** 按钮
2. 选择 **Deploy from GitHub repo**
3. Railway 会请求访问你的 GitHub，点击 **Install & Authorize**
4. 找到 `daily-shenlun-app` 仓库，点击 **Import**

### 2.3 配置环境变量

在 Railway 项目页面：

1. 点击 **Variables** 标签
2. 点击 **New Variable** 按钮
3. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `SUPABASE_URL` | `https://doiwleesqwxojwlmxjch.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s` |
| `COZE_API_KEY` | `你的Coze API密钥`（见下方说明） |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

⚠️ **重要**：暂时可以先不设置 `COZE_API_KEY`，新闻数据会从数据库读取，只是没有AI生成的题目和答案。

### 2.4 启动部署

1. 点击 **Deploy Now** 按钮
2. Railway 会自动检测项目类型（Node.js）
3. 点击 **Root Directory** 选择 `server` 目录
4. 点击 **Add Build Config** 添加配置：
   - Name: `server`
   - Root Directory: `server`
   - Build Command: `pnpm run build`
   - Start Command: `node dist/index.js`

5. 点击 **Deploy Now** 开始部署

### 2.5 等待部署完成

部署通常需要 2-3 分钟，你会看到：
```
✅ Build complete
✅ Service is healthy
```

### 2.6 获取 Railway 域名

部署完成后，Railway 会分配一个域名，类似：
```
https://your-project.up.railway.app
```

---

## 第三步：测试 Railway 服务（2分钟）

### 3.1 测试健康检查

在浏览器或终端访问：
```bash
curl https://你的项目.up.railway.app/api/v1/health
```

应该返回：
```json
{"status":"ok"}
```

### 3.2 测试新闻 API

```bash
curl https://你的项目.up.railway.app/api/v1/news
```

应该返回新闻数据。

---

## 第四步：构建 APK（15-20分钟）

### 4.1 安装 EAS CLI

```bash
cd /workspace/projects/client
npm install -g eas-cli
```

### 4.2 登录 Expo

```bash
eas login
```

### 4.3 配置后端 API 地址

#### 方法 1：使用环境变量（推荐）

```bash
export EXPO_PUBLIC_BACKEND_BASE_URL=https://你的项目.up.railway.app
npx eas build --platform android
```

#### 方法 2：修改代码（永久）

编辑 `/workspace/projects/client/app.config.ts`：

```typescript
export default {
  // ...
  extra: {
    EXPO_PUBLIC_BACKEND_BASE_URL: 'https://你的项目.up.railway.app',
  },
};
```

### 4.4 配置构建

```bash
npx eas build:configure
```

### 4.5 开始构建

```bash
npx eas build --platform android
```

选择：
- Build profile: `preview`（预览版，免费）
- Distribution: `APK`

### 4.6 下载 APK

构建完成后（15-20分钟），你会收到邮件或可以在 Expo 网站下载 APK 文件。

---

## 第五步：安装测试（2分钟）

### 5.1 传输 APK 到手机

- 使用数据线连接手机
- 将 APK 文件复制到手机
- 或者通过网盘/云盘发送

### 5.2 安装 APK

1. 在手机上打开 APK 文件
2. 允许安装未知来源应用
3. 完成安装

### 5.3 测试功能

✅ 打开应用
✅ 查看新闻列表
✅ 点击新闻查看详情
✅ 测试主题切换
✅ 测试下拉刷新
✅ 测试精确选词
✅ 测试金句保存

---

## Coze API 密钥获取（可选）

如果你希望应用自动生成申论题目和答案，需要获取 Coze API 密钥：

### 获取步骤

1. 访问 https://www.coze.com
2. 使用手机号或邮箱注册登录
3. 进入工作台
4. 点击右上角 **API** 图标
5. 点击 **Manage API Keys**
6. 点击 **Create New Token**
7. 输入 Token 名称（如：Daily Shenlun App）
8. 点击 **Confirm**
9. 复制生成的密钥（格式：`pat_xxxxxxxxx`）

### 配置到 Railway

在 Railway 项目 → Variables 中添加：
```
COZE_API_KEY=pat_xxxxxxxxx
```

然后点击 Redeploy 重新部署。

---

## 成本说明

- **Railway**：免费 $5/月额度（个人使用完全够用）
- **Supabase**：永久免费（500MB存储，2GB带宽/月）
- **Coze API**：按量付费，个人使用每月可能 $1-2
- **EAS Build**：每月免费 100 次构建

**总计**：$0-3/月（个人使用）

---

## 故障排除

### Q1: Railway 部署失败？

**A**: 检查：
- Node.js 版本是否正确（需要 Node.js 18+）
- package.json 是否正确
- 环境变量是否配置

### Q2: API 返回 500 错误？

**A**: 检查：
- Supabase URL 和密钥是否正确
- 数据库表是否创建
- Railway 日志：点击项目 → View Logs

### Q3: APK 构建失败？

**A**: 检查：
- Expo 账号是否登录
- app.config.ts 是否正确配置
- 网络连接是否正常

### Q4: 安装后无法联网？

**A**: 检查：
- 后端 URL 是否正确配置
- 手机网络是否正常
- Railway 服务是否部署成功

---

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Railway 项目已创建
- [ ] 环境变量已配置
- [ ] Railway 部署成功
- [ ] Railway 服务正常响应
- [ ] 后端 URL 已配置
- [ ] APK 构建成功
- [ ] APK 已下载
- [ ] APK 已安装到手机
- [ ] 所有功能测试通过

---

**预计总耗时：30-40分钟**
**总成本：$0-3/月**
