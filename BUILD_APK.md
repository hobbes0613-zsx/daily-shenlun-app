# 📱 APK 构建指南

## ✅ 部署完成状态

- ✅ Supabase 数据库：正常
- ✅ Railway 后端：正常
- ✅ API 测试：通过
- ✅ Railway 域名：`https://daily-shenlun-app-production.up.railway.app`

---

## 🚀 构建 APK 步骤（20-25 分钟）

### 前置要求

确保你已经：
- ✅ 安装了 Node.js（本地环境）
- ✅ 有 Expo 账号

### 步骤 1：安装 EAS CLI（2 分钟）

```bash
npm install -g eas-cli
```

验证安装：
```bash
eas --version
```

### 步骤 2：登录 Expo（1 分钟）

```bash
eas login
```

按提示输入你的 Expo 账号信息。

### 步骤 3：配置构建（2 分钟）

```bash
cd /workspace/projects/client
eas build:configure
```

按照提示完成配置。

### 步骤 4：构建 APK（15-20 分钟）

```bash
eas build --platform android --profile preview
```

**重要参数说明**：
- `--platform android`：构建 Android APK
- `--profile preview`：使用预览配置（构建速度更快）

### 步骤 5：下载 APK（1 分钟）

构建完成后，Expo 会提供下载链接：
- 在浏览器中打开链接
- 下载 APK 文件

---

## 📊 构建过程

你会看到：

```
✔ Resolving Expo SDK
✔ Collecting project dependencies
✔ Validating project manifest
✔ Resolving native dependencies
✔ Building Android project
✔ Signing APK
✔ Uploading build artifacts
```

构建完成后显示：
```
✅ Build successful

📱 Download: https://expo.dev/artifacts/xxx/xxx.apk
```

---

## 📱 安装 APK

### 方法 1：直接安装
1. 下载 APK 文件
2. 在手机上打开
3. 允许安装未知来源应用
4. 点击安装

### 方法 2：通过数据线
1. 将 APK 传输到手机
2. 在手机文件管理器中找到
3. 点击安装

---

## ⚙️ 构建配置说明

你的 `eas.json` 已配置为：

```json
{
  "build": {
    "preview": {
      "env": {
        "EXPO_PUBLIC_BACKEND_BASE_URL": "https://daily-shenlun-app-production.up.railway.app"
      }
    }
  }
}
```

APK 会自动使用 Railway 后端！

---

## ✅ 构建成功标志

构建成功后你会看到：
- ✅ 绿色的 "Build successful" 消息
- ✅ APK 下载链接
- ✅ 文件大小（约 30-50 MB）

---

## 🔧 常见问题

### Q: 构建失败怎么办？
A: 查看错误日志，常见原因：
- 依赖版本冲突
- Expo SDK 版本不兼容
- 网络问题

### Q: 构建需要多久？
A: 通常 15-20 分钟，首次可能更久。

### Q: APK 文件在哪里？
A: Expo 会提供下载链接，链接有效期 30 天。

### Q: 可以重用构建吗？
A: 可以，同一个构建可以多次下载。

---

## 💡 提示

- 首次构建可能需要更长时间（Expo 需要缓存依赖）
- 后续构建会更快
- 保留构建链接，方便重新下载

---

## ⏭️ 下一步

APK 构建成功后：
1. 下载 APK 文件
2. 安装到手机
3. 测试所有功能：
   - ✅ 新闻列表
   - ✅ 下拉刷新
   - ✅ 申论题目生成
   - ✅ 金句保存
   - ✅ 主题切换

---

**开始构建吧！** 🚀

```bash
cd /workspace/projects/client
eas build --platform android --profile preview
```
