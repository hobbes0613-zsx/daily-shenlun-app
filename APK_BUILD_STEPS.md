# APK 构建具体操作步骤

## 📌 重要提示

**这些操作需要在你的本地电脑上执行，不是在这个沙箱里！**

---

## 🖥️ 准备工作（5 分钟）

### 步骤 1：确认你的本地环境

确保你的本地电脑有：
- ✅ Node.js (建议 18.x 或更高)
- ✅ Git
- ✅ npm 或 yarn

检查方法：
```bash
node --version  # 应该显示 v18.x.x 或更高
git --version   # 应该显示 git version x.x.x
npm --version   # 应该显示 9.x.x 或更高
```

如果没有安装：
- Node.js: https://nodejs.org/ 下载安装
- Git: https://git-scm.com/downloads 下载安装

---

## 📥 获取代码（3 分钟）

### 选项 A：如果你已有代码

```bash
# 进入你的项目目录
cd /path/to/your/projects/daily-shenlun-app
```

### 选项 B：从 GitHub 克隆

```bash
# 克隆代码
git clone https://github.com/hobbes0613-zsx/daily-shenlun-app.git

# 进入项目目录
cd daily-shenlun-app
```

---

## 🔧 安装构建工具（3 分钟）

### 安装 EAS CLI

在命令行中执行：

```bash
npm install -g eas-cli
```

等待安装完成（大约 1-2 分钟）。

---

## 🔐 登录 Expo 账户（2 分钟）

```bash
eas login
```

会提示你：
1. 打开浏览器访问一个 URL
2. 用 Expo 账户登录
3. 登录成功后返回命令行

如果没有 Expo 账户：
1. 访问：https://expo.dev
2. 点击 "Sign Up" 注册
3. 注册完成后返回执行 `eas login`

---

## 📱 配置构建（2 分钟）

```bash
cd client
```

配置构建选项：

```bash
eas build:configure
```

这会创建 `eas.json` 文件（如果还没有的话）。

确认 `client/eas.json` 内容如下：

```json
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_BACKEND_BASE_URL": "https://daily-shenlun-app-production.up.railway.app"
      }
    },
    "production": {
      "distribution": "store",
      "env": {
        "EXPO_PUBLIC_BACKEND_BASE_URL": "https://daily-shenlun-app-production.up.railway.app"
      }
    }
  }
}
```

---

## 🏗️ 开始构建 APK（15-20 分钟）

### 构建预览版 APK（推荐）

```bash
eas build --platform android --profile preview
```

**预期时间**：15-20 分钟

**构建过程**：

1. 上传代码到 Expo 服务器
2. Expo 构建项目
3. 打包成 APK 文件
4. 生成下载链接

### 如果需要发布版（上架应用商店）

```bash
eas build --platform android --profile production
```

**注意**：生产版需要更长时间（20-30 分钟），并且需要签名密钥。

---

## 📥 下载 APK（2 分钟）

构建完成后，命令行会显示一个下载链接：

```
✅ Build successfully

Download your build:
https://expo.dev/artifacts/eas/xxxxx.apk
```

### 下载方式 1：直接点击链接

- 复制上面的链接
- 在浏览器中打开
- 下载 APK 文件

### 下载方式 2：使用 Expo 网站查看

1. 访问：https://expo.dev
2. 登录你的账户
3. 点击 "Builds"
4. 找到你的构建
5. 点击下载 APK

---

## 📲 安装到手机（2 分钟）

### Android 手机

1. 将 APK 文件传到手机（USB、微信等）
2. 在手机上打开 APK 文件
3. 如果提示"允许安装未知应用"，点击允许
4. 点击安装
5. 安装完成

**常见问题**：
- 如果提示"安装被阻止"，去设置 → 安全 → 允许安装未知应用

---

## 🧪 测试应用

安装完成后，打开应用：

1. ✅ 启动界面应该显示水滴涟漪动画
2. ✅ 首页显示 10 条新闻
3. ✅ 下拉刷新获取最新数据
4. ✅ 点击新闻查看详情
5. ✅ 生成申论题目和答案
6. ✅ 尝试精确选择保存金句
7. ✅ 切换深色/浅色主题
8. ✅ 查看金句记录

---

## 🔍 常见问题

### 问题 1：构建失败

**错误信息**：`EAS build failed`

**解决方法**：
1. 检查 `client/package.json` 依赖是否完整
2. 运行 `cd client && npm install` 确保依赖安装
3. 重新执行构建

### 问题 2：登录失败

**错误信息**：`Authentication failed`

**解决方法**：
1. 确保 Expo 账户已创建
2. 访问：https://expo.dev/login 登录
3. 重新执行 `eas login`

### 问题 3：构建超时

**错误信息**：`Build timed out`

**解决方法**：
1. 检查网络连接
2. 重新执行构建命令
3. 如果持续失败，使用 Expo Build Status 页面查看详情

### 问题 4：APK 无法安装

**错误信息**：`App not installed`

**解决方法**：
1. 先卸载旧版本（如果有）
2. 允许安装未知应用（设置 → 安全）
3. 重新安装

---

## 📊 预计时间表

| 步骤 | 时间 |
|------|------|
| 环境准备 | 5 分钟 |
| 获取代码 | 3 分钟 |
| 安装工具 | 3 分钟 |
| 登录 Expo | 2 分钟 |
| 配置构建 | 2 分钟 |
| **构建 APK** | **15-20 分钟** ⏰ |
| 下载安装 | 4 分钟 |
| **总计** | **34-39 分钟** |

---

## ✅ 完成标志

当你看到以下内容时，说明完成：

1. ✅ APK 文件已下载到本地
2. ✅ APK 已安装到手机
3. ✅ 应用可以正常打开
4. ✅ 可以加载新闻数据

---

## 🎯 快速命令汇总

复制以下命令按顺序执行：

```bash
# 1. 进入项目目录
cd /path/to/daily-shenlun-app

# 2. 安装 EAS CLI
npm install -g eas-cli

# 3. 登录 Expo
eas login

# 4. 配置构建
cd client
eas build:configure

# 5. 构建 APK
eas build --platform android --profile preview
```

---

## 📞 需要帮助？

如果遇到问题：

1. 查看错误信息
2. 检查 Expo Build Status 页面
3. 参考 Expo 官方文档：https://docs.expo.dev/build/introduction/

---

**现在就开始吧！** 🚀

按照上面的步骤，大约 35 分钟后，你就能在手机上使用完整的"每日申论"应用了！🎉
