# 🚀 Railway 完整操作流程（从头开始）

从创建Railway项目到成功部署的完整步骤。

---

## 📋 准备工作

在开始之前，确保你已经完成：

- [ ] ✅ GitHub 仓库已创建：`hobbes0613-zsx/daily-shenlun-app`
- [ ] ✅ 代码已推送到GitHub
- [ ] ✅ Supabase 配置完成
  - URL: `https://doiwleesqwxojwlmxjch.supabase.co`
  - Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s`
- [ ] ⚠️ Coze API Key（如果还没有可以跳过或后续添加）

---

## 🚀 步骤 1：登录 Railway

### 访问网站
打开浏览器访问：https://railway.app

### 登录
1. 点击右上角 **Login** 按钮
2. 选择 **GitHub** 登录（推荐）
3. 授权 Railway 访问你的 GitHub 账户
4. 登录成功后会跳转到 Railway 主页

---

## 🆕 步骤 2：创建新项目

### 打开创建页面
在 Railway 主页找到：

**方法 A**：点击 **New Project** 按钮（通常在页面右上角或中间）

**方法 B**：点击 **Start a new project** 链接

### 选择创建方式
你会看到几个选项：

1. **Deploy from GitHub repo** ← 选择这个 ⭐
2. Provision an empty project
3. Start from a template

**选择 "Deploy from GitHub repo"**

---

## 📦 步骤 3：连接 GitHub 仓库

### 搜索仓库
在 GitHub 仓库搜索框中输入：

```
daily-shenlun-app
```

或搜索你的用户名：
```
hobbes0613-zsx/daily-shenlun-app
```

### 选择仓库
在搜索结果中找到：
```
hobbes0613-zsx/daily-shenlun-app
```

点击选择这个仓库。

### 确认选择
点击 **Import** 或 **Connect** 按钮。

---

## ⚙️ 步骤 4：配置服务设置

### Root Directory 设置 ⚠️ 重要！

Railway 会显示配置选项，找到：

**Root Directory**
```
选择：server
```

**为什么是 server？**
- 项目包含 `client/` 和 `server/` 两个目录
- 我们只需要部署后端服务
- Root Directory 指向 `server` 目录

**如果看不到 Root Directory 设置：**
- Railway 可能会自动配置
- 继续下一步

### 其他设置

**Build Command**
```
pnpm run build
```

**Start Command**
```
node dist/index.js
```

**如果没有这些设置选项：**
- Railway 会自动检测
- 不用担心

---

## 🔧 步骤 5：添加环境变量

### 打开环境变量设置

**方法 A**：在部署前的配置页面
找到 **Environment Variables** 或 **Variables** 部分

**方法 B**：点击 **Settings** → **Variables**

### 添加变量 1：SUPABASE_URL

点击 **New Variable**

```
Key: SUPABASE_URL
Value: https://doiwleesqwxojwlmxjch.supabase.co
```

点击 **Add Variable** 或按 Enter

### 添加变量 2：SUPABASE_ANON_KEY

再次点击 **New Variable**

```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
```

点击 **Add Variable** 或按 Enter

### 添加变量 3：COZE_API_KEY（可选）

如果你有 Coze API Key：

```
Key: COZE_API_KEY
Value: 你的Coze_API_Key（格式：pat_xxxxxx）
```

点击 **Add Variable** 或按 Enter

**如果没有 Coze API Key：**
- 可以跳过这个变量
- 后续再添加

### 验证环境变量

你应该看到：

```
Variables (2 或 3)
├── ✅ SUPABASE_URL
├── ✅ SUPABASE_ANON_KEY
└── ⚠️  COZE_API_KEY（可选）
```

---

## 🚀 步骤 6：开始部署

### 启动部署

在配置页面找到：

**Deploy 按钮**
- 绿色的 **Deploy** 按钮
- 或 **Create Deployment** 按钮
- 或 **Start Deployment** 按钮

点击它！

### 查看部署进度

Railway 会显示部署日志：

```
✓ Cloning repository...
✓ Installing dependencies...
✓ Building...
✓ Deploying...
```

部署通常需要 2-5 分钟。

### 部署过程中的界面

你会看到：

**阶段 1：Cloning**
```
Cloning repository from GitHub...
✓ Done
```

**阶段 2：Installing**
```
Installing dependencies...
Fetching packages...
✓ Done
```

**阶段 3：Building**
```
Building...
Compiling TypeScript...
✓ Done
```

**阶段 4：Deploying**
```
Deploying service...
✓ Done
```

**完成**：
```
✓ Deployed successfully!
```

---

## ✅ 步骤 7：获取域名

### 部署成功后

Railway 会自动为你的项目分配一个域名。

**在哪里找到域名？**

**位置 1**：项目主页顶部
```
https://daily-shenlun-app-production.up.railway.app
```

**位置 2**：服务卡片
在 Architecture 或 Dashboard 界面的服务卡片中。

**位置 3**：Settings → General
```
Public URL
─────────
https://xxx.up.railway.app
```

### 复制域名

**完整复制域名**，包括：
- ✅ `https://`
- ✅ 子域名部分
- ✅ `.up.railway.app`

**示例**：
```
https://daily-shenlun-app-production.up.railway.app
```

### 保存域名

把域名保存到记事本：
```
Railway 域名：https://xxx.up.railway.app
```

---

## 🧪 步骤 8：测试 API

### 测试 1：健康检查

打开浏览器访问：
```
https://你的域名.up.railway.app/api/v1/health
```

**预期结果**：
```json
{
  "status": "ok"
}
```

### 测试 2：获取新闻

访问：
```
https://你的域名.up.railway.app/api/v1/news
```

**预期结果**：
```json
[
  {
    "id": 1,
    "rank": 1,
    "summary": "...",
    "content": "...",
    "question": "...",
    "answer": "..."
  },
  ...（10条新闻）
]
```

### 测试 3：刷新新闻

```bash
curl -X POST https://你的域名.up.railway.app/api/v1/news/refresh
```

**预期结果**：
```json
{
  "success": true,
  "message": "新闻已更新"
}
```

---

## 📊 步骤 9：查看部署状态

### 进入 Architecture 界面

在 Railway 左侧菜单点击 **Architecture**

你会看到：

```
┌─────────────────────────────────┐
│  daily-shenlun-app-server       │
│  ─────────────────────────────── │
│  🟢 Active                      │
│  ─────────────────────────────── │
│  https://xxx.up.railway.app     │
│                                 │
│  [View Logs] [Settings]         │
└─────────────────────────────────┘
```

### 状态说明

- 🟢 **Active**：服务正在运行 ✅
- 🟡 **Deploying**：正在部署中 ⏳
- 🔴 **Failed**：部署失败 ❌

### 查看日志

如果需要查看日志：
1. 点击服务卡片
2. 点击 **View Logs**
3. 查看运行日志

---

## ⏭️ 步骤 10：后续配置

### 添加 Coze API Key（如果之前没添加）

1. 点击 **Settings** → **Variables**
2. 点击 **New Variable**
3. 添加：
   ```
   Key: COZE_API_KEY
   Value: 你的Coze_API_Key
   ```
4. 点击 **Redeploy** 重新部署

### 设置自定义域名（可选）

1. 点击 **Settings** → **Networking**
2. 添加自定义域名
3. 配置 DNS

---

## 📋 完整检查清单

部署完成后，检查：

- [ ] ✅ 项目已创建
- [ ] ✅ GitHub 仓库已连接
- [ ] ✅ Root Directory 设置为 `server`
- [ ] ✅ 环境变量已添加
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_ANON_KEY
  - [ ] COZE_API_KEY（可选）
- [ ] ✅ 部署成功
- [ ] ✅ 域名已获取
- [ ] ✅ API 测试通过
  - [ ] `/api/v1/health` 返回 OK
  - [ ] `/api/v1/news` 返回新闻列表
  - [ ] `/api/v1/news/refresh` 可以刷新

---

## 🆘 常见问题排查

### 问题 1：部署失败

**查看日志**：
1. 点击服务卡片
2. 点击 **View Logs**
3. 查找错误信息

**常见原因**：
- 环境变量未配置
- Root Directory 错误
- 依赖安装失败

### 问题 2：API 返回错误

**检查环境变量**：
1. 确认所有环境变量都已添加
2. 检查值是否正确
3. 重新部署

**检查数据库**：
1. 登录 Supabase
2. 确认表已创建
3. 确认测试数据存在

### 问题 3：无法访问域名

**检查服务状态**：
1. 在 Architecture 界面查看
2. 确认状态是 🟢 Active
3. 如果是 🔴 Failed，查看日志并修复

---

## ✅ 成功标志

当看到以下内容时，说明部署成功：

1. **服务状态**：🟢 Active
2. **域名可用**：`https://xxx.up.railway.app`
3. **健康检查通过**：`/api/v1/health` 返回 OK
4. **API 正常工作**：`/api/v1/news` 返回新闻列表

---

## 🎉 下一步

Railway 部署成功后：

1. ✅ 保存 Railway 域名
2. ✅ 告诉我：`域名是：https://xxx.up.railway.app`
3. ✅ 我会帮你构建 APK

**预计剩余时间**：
- APK 构建：15-20 分钟
- 下载安装：2 分钟

---

**现在就按照这个流程操作吧！每完成一步告诉我进展！** 🚀

如果遇到任何问题，立即告诉我具体在哪一步卡住了！