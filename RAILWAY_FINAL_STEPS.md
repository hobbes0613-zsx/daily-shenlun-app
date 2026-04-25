# Railway 部署完成步骤 🚀

环境变量已配置完成！现在继续部署。

---

## ✅ 已完成

- [x] Supabase 数据库配置
- [x] 代码推送到 GitHub
- [x] Railway 项目创建
- [x] 环境变量配置

---

## 🎯 下一步：配置构建设置（2分钟）

### 步骤 1：进入项目配置

1. 在 Railway 项目页面
2. 点击 **Settings** → **General**
3. 或者直接点击项目主页的 **配置** 按钮

### 步骤 2：配置 Root Directory（重要！）

找到 **Root Directory** 设置：

**填写**：
```
server
```

**说明**：
- 因为代码仓库有 `client/` 和 `server/` 两个目录
- 我们只需要部署 `server/` 目录
- 所以 Root Directory 设置为 `server`

---

### 步骤 3：配置构建命令

找到 **Build Command**：

**填写**：
```
pnpm run build
```

**说明**：
- 这会执行 `server/package.json` 中的 build 脚本
- 将 TypeScript 编译为 JavaScript

---

### 步骤 4：配置启动命令

找到 **Start Command**：

**填写**：
```
node dist/index.js
```

**说明**：
- 启动编译后的服务器
- 入口文件是 `dist/index.js`

---

## 📋 完整配置总结

| 设置项 | 值 | 说明 |
|--------|-----|------|
| **Root Directory** | `server` | 只部署后端目录 |
| **Build Command** | `pnpm run build` | 编译 TypeScript |
| **Start Command** | `node dist/index.js` | 启动服务器 |

---

## 🚀 步骤 5：开始部署

配置完成后：

1. 返回项目主页
2. 点击 **Deploy** 或 **重新部署**
3. 等待部署完成（通常 2-5 分钟）

---

## 📊 部署状态

你会看到以下阶段：

```
✓ Cloning repository...
✓ Installing dependencies...
✓ Building...
✓ Deploying...
✓ Deployed successfully!
```

---

## ✅ 部署成功的标志

看到绿色成功标志，显示：

```
✓ Your app is now live at https://your-project.up.railway.app
```

---

## 🔗 获取你的域名

部署成功后，在项目顶部会显示你的域名：

格式示例：
```
https://daily-shenlun-app-production.up.railway.app
```

或

```
https://your-project-name.up.railway.app
```

---

## 🧪 测试 API

部署成功后，测试 API 是否正常工作：

### 测试 1：健康检查

打开浏览器访问：
```
https://你的域名.up.railway.app/api/v1/health
```

应该看到：
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

应该看到 10 条新闻数据。

---

## 📝 复制你的域名

**重要**：将你的 Railway 域名复制并保存！

格式：`https://xxx.up.railway.app`

这个地址将用于：
1. 配置前端 API 地址
2. 构建 APK
3. 测试应用

---

## ⏭️ 下一步：构建 APK

获取到 Railway 域名后：

1. ✅ 告诉我："域名是：https://xxx.up.railway.app"
2. 我会帮你配置前端 API 地址
3. 构建 APK 文件
4. 下载并安装到手机

---

## ⏱️ 预计时间

- 构建设置配置：2 分钟
- Railway 部署：2-5 分钟
- API 测试：1 分钟

**总计：5-8 分钟**

---

## 💡 提示

1. **Root Directory 必须是 `server`**
   - 否则会找不到 package.json

2. **Build Command 必须是 `pnpm run build`**
   - 不要用 `npm run build`

3. **Start Command 必须是 `node dist/index.js`**
   - 不要用 `ts-node` 或其他方式

4. **部署失败检查**：
   - 查看 Build Logs
   - 确认 `server/package.json` 存在
   - 确认依赖都已安装

---

## 🆘 常见问题

### Q: 部署失败，提示 "No build output"
**A**: 检查 Root Directory 是否设置为 `server`

### Q: 部署失败，提示 "Command not found"
**A**: 确认 Build Command 是 `pnpm run build`

### Q: 部署成功但 API 返回 500
**A**: 检查环境变量是否配置正确，特别是 Supabase URL 和 Key

### Q: 找不到 Root Directory 设置
**A**: 在 Settings → General 中，或者点击项目主页的配置按钮

---

**现在就配置构建设置并部署吧！** 🚀

部署完成后，告诉我你的 Railway 域名，我会帮你构建 APK！
