# 🔧 Railway 环境变量配置详细步骤

## 📋 需要配置的 3 个环境变量

| 序号 | 变量名 (KEY) | 变量值 (VALUE) |
|------|-------------|----------------|
| 1 | `SUPABASE_URL` | `https://doiwleesqwxojwlmxjch.supabase.co` |
| 2 | `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s` |
| 3 | `COZE_API_KEY` | （可选）你的 Coze API 密钥 |

---

## 🚀 配置步骤（3 分钟）

### 步骤 1：进入 Variables 设置

在 Railway 项目页面，找到并点击：

**方法 A：从顶部菜单**
```
Settings → Variables
```

**方法 B：从左侧菜单**
```
左侧边栏 → Settings → Variables
```

**方法 C：直接搜索**
```
按 Ctrl+F 或 Cmd+F
搜索：Variables
点击搜索结果
```

---

### 步骤 2：添加第一个变量

在 Variables 页面：

1. 点击 **New Variable** 按钮
2. 填写以下内容：

```
Key (变量名): SUPABASE_URL
Value (变量值): https://doiwleesqwxojwlmxjch.supabase.co
```

3. 点击 **Add Variable** 保存

---

### 步骤 3：添加第二个变量

再次点击 **New Variable**：

```
Key (变量名): SUPABASE_ANON_KEY
Value (变量值):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
```

点击 **Add Variable** 保存

---

### 步骤 4：添加第三个变量（可选）

如果你有 Coze API Key，添加：

```
Key (变量名): COZE_API_KEY
Value (变量值): pat_xxxxxx（你的密钥）
```

点击 **Add Variable** 保存

⚠️ **注意**：如果没有 Coze API Key，可以暂时不配置这个变量，不影响基本功能。

---

### 步骤 5：验证配置

添加完成后，你应该看到：

```
Variables (2 或 3)
├── ✅ SUPABASE_URL
│    Value: https://doiwleesqwxojwlmxjch.supabase.co
├── ✅ SUPABASE_ANON_KEY
│    Value: •••••••••••••••••••••••••••••••
└── ✅ COZE_API_KEY (可选)
     Value: •••••••••
```

---

## 📝 快速复制参考

### 变量 1：SUPABASE_URL

```
Key: SUPABASE_URL
Value: https://doiwleesqwxojwlmxjch.supabase.co
```

### 变量 2：SUPABASE_ANON_KEY

```
Key: SUPABASE_ANON_KEY
Value:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
```

### 变量 3：COZE_API_KEY（可选）

```
Key: COZE_API_KEY
Value: pat_xxxxxx（你的密钥）
```

---

## 💡 重要提示

### ✅ 必须做的

- **变量名必须完全匹配**：区分大小写
- **变量值不能有多余空格**
- **SUPABASE_URL 必须包含 https://**

### ❌ 不要做的

- 不要添加引号
- 不要添加换行
- 不要修改变量名
- 不要添加空格

---

## 🔄 批量导入（高级方法）

如果你看到一个 **Import from .env** 按钮：

1. 点击 **Import from .env**
2. 粘贴以下内容：

```bash
SUPABASE_URL=https://doiwleesqwxojwlmxjch.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
COZE_API_KEY=pat_xxxxxx
```

3. 点击 **Import**

---

## 🧪 验证步骤

配置完成后：

1. 返回项目主页
2. 检查 **Variables** 选项卡
3. 确认 3 个变量都已添加

---

## ⏭️ 下一步

环境变量配置完成后：

**继续配置构建设置**：

```
Root Directory: server
Build Command: pnpm run build
Start Command: node dist/index.js
```

然后点击 **Deploy** 开始部署！

---

## ❓ 常见问题

### Q: 找不到 Variables 选项？

A: 尝试：
- 检查是否在正确的项目页面
- 搜索 "Variables"
- 查看 Settings 菜单

### Q: 变量值太长怎么办？

A: SUPABASE_ANON_KEY 很长是正常的，直接粘贴即可。

### Q: 可以先不配置 COZE_API_KEY 吗？

A: 可以！前两个变量是必需的，第三个可选。

### Q: 配置错了怎么修改？

A: 点击变量右侧的编辑按钮（铅笔图标），修改后保存。

---

## ✅ 配置完成标志

看到以下内容说明配置成功：

```
✅ SUPABASE_URL
✅ SUPABASE_ANON_KEY
✅ COZE_API_KEY（可选）
```

---

**预计时间：2-3 分钟**

---

**配置完成后告诉我："环境变量已配置完成"！**

然后我会帮你继续下一步！🚀
