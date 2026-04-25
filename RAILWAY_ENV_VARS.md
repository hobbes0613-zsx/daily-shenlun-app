# Railway 环境变量配置指南

## 📋 需要配置的环境变量

配置以下 3 个变量：

| 变量名 | 值 |
|--------|-----|
| `SUPABASE_URL` | `https://doiwleesqwxojwlmxjch.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s` |
| `COZE_API_KEY` | `你的Coze API密钥` |

---

## 🚀 配置步骤（3分钟）

### 方法一：通过 Web 界面配置（推荐）

#### 第 1 步：进入项目设置

1. 在 Railway 项目页面
2. 点击左侧菜单的 **Settings**（齿轮图标）
3. 选择 **Variables** 标签页

#### 第 2 步：添加第一个变量

1. 点击 **New Variable** 按钮
2. 在 **Key** 输入框输入：`SUPABASE_URL`
3. 在 **Value** 输入框输入：`https://doiwleesqwxojwlmxjch.supabase.co`
4. 点击 **Add Variable**

#### 第 3 步：添加第二个变量

1. 点击 **New Variable** 按钮
2. 在 **Key** 输入框输入：`SUPABASE_ANON_KEY`
3. 在 **Value** 输入框输入：
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
   ```
4. 点击 **Add Variable**

#### 第 4 步：添加 Coze API Key

1. 点击 **New Variable** 按钮
2. 在 **Key** 输入框输入：`COZE_API_KEY`
3. 在 **Value** 输入框输入你的 Coze API 密钥
4. 点击 **Add Variable**

---

### 方法二：通过 Railway CLI（高级用户）

如果你安装了 Railway CLI，可以使用命令：

```bash
# 登录 Railway
railway login

# 添加环境变量
railway variables set SUPABASE_URL=https://doiwleesqwxojwlmxjch.supabase.co
railway variables set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
railway variables set COZE_API_KEY=你的Coze_API_Key

# 验证配置
railway variables
```

---

## 🔍 如何获取 Coze API Key

如果你还没有 Coze API Key，按以下步骤获取：

1. 访问：https://www.coze.com
2. 登录你的账户
3. 进入 **Settings** → **API Tokens**
4. 点击 **Create Token**
5. 复制生成的密钥（格式：`pat_xxxxxx`）

---

## ✅ 验证配置

添加完所有变量后，你应该能看到：

```
Variables (3)
├── COZE_API_KEY          ••••••••••••••
├── SUPABASE_ANON_KEY     •••••••••••••••••••••••••••••••
└── SUPABASE_URL          https://doiwleesqwxojwlmxjch.supabase.co
```

---

## 🎯 配置完成后的下一步

配置完成后：
1. 返回 Railway 项目页面
2. 配置构建设置
3. 点击 Deploy 开始部署

---

## ⚠️ 注意事项

1. **不要包含引号**：变量值不要加引号
2. **不要有空格**：等号两边不要有空格
3. **Key 使用大写**：遵循环境变量命名规范
4. **立即生效**：添加后会自动重启服务

---

## 📝 快速复制模板

直接复制以下内容到 Railway：

```
SUPABASE_URL=https://doiwleesqwxojwlmxjch.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s
COZE_API_KEY=你的Coze_API_Key
```

---

## 💡 小技巧

- 如果变量很多，可以点击 **Import from .env** 批量导入
- 点击变量旁的眼睛图标可以查看完整值
- 点击垃圾桶图标可以删除变量

---

**配置完环境变量后告诉我："环境变量已配置"**，我会指导你进行下一步！
