# 如何获取 Coze API Key

## 🎯 获取 Coze API Key（3分钟）

Coze API Key 用于调用 AI 服务生成申论题目和答案。

---

## 📝 获取步骤

### 第 1 步：登录 Coze

访问：https://www.coze.com

- 使用你的账号登录
- 如果没有账号，先注册

---

### 第 2 步：进入 API Tokens 设置

1. 点击右上角头像
2. 选择 **Settings**（设置）
3. 在左侧菜单找到 **API Tokens**（或 **API 密钥**）

---

### 第 3 步：创建 API Token

1. 点击 **Create Token**（或 **新建 Token**）按钮
2. 弹出创建 Token 的对话框

---

### 第 4 步：填写 Token 信息

**Token 名称**（可选）：
- 输入：`daily-shenlun-app`
- 或其他你容易识别的名字

**Token 权限**（重要）：
- 勾选 **API Access**（API 访问）
- 勾选 **Model Access**（模型访问）
- 确保有使用豆包模型的权限

---

### 第 5 步：创建并复制

1. 点击 **Create**（或 **创建**）按钮
2. ⚠️ **立即复制** Token（格式：`pat_xxxxxx`）
3. 保存到安全的地方（如记事本）

---

## ⚠️ 重要提示

### Token 格式
- 正确格式：`pat_8HbKc9LmN2oP4qR6sT8uV0wX2yZ4a6b8c`
- 以 `pat_` 开头

### 一次性显示
- ⚠️ Token 只显示一次！
- ⚠️ 刷新页面后看不到完整 Token
- ⚠️ 必须立即复制保存

### 安全性
- 不要分享给他人
- 不要提交到公开代码仓库
- 定期更换 Token

---

## 🔍 查看已创建的 Tokens

如果之前创建过 Token：

1. 进入 **API Tokens** 页面
2. 可以看到已创建的 Token 列表
3. 点击某个 Token 可以查看详细信息
4. 但看不到完整值（只能复制）

---

## 📋 获取到的 Token 示例

```
pat_8HbKc9LmN2oP4qR6sT8uV0wX2yZ4a6b8c0d2e4f6g8h0i2j4k
```

**使用时**：
- 复制完整 Token（包括 `pat_` 前缀）
- 不要加引号
- 不要有空格

---

## 🔑 配置到 Railway

获取到 Token 后：

1. 打开 Railway 项目
2. 进入 **Settings** → **Variables**
3. 添加环境变量：
   - Key: `COZE_API_KEY`
   - Value: `你复制的Token`

---

## ❓ 常见问题

### Q1: 找不到 API Tokens 选项？

**A**: 可能是界面差异，尝试：
- 左侧菜单找 **API** 或 **密钥**
- 右上角头像下拉菜单
- 个人设置页面

### Q2: 创建 Token 时没有模型访问权限？

**A**: 确保：
- 账号已完成实名认证
- 账号有使用模型的额度
- 选择正确的 Token 类型

### Q3: Token 失效了怎么办？

**A**:
- 重新创建新 Token
- 删除旧 Token
- 更新 Railway 环境变量

### Q4: Token 有使用限制吗？

**A**: 是的：
- 有调用次数限制
- 有速率限制（每秒请求数）
- 免费用户有限额
- 升级套餐可增加额度

### Q5: 如何查看 Token 使用情况？

**A**:
- Coze Dashboard → **Usage**
- 查看 API 调用统计
- 监控使用量

---

## 🎯 获取完成后

复制 Token 后：

1. 保存到记事本（备用）
2. 配置到 Railway 环境变量
3. 告诉我："Coze API Key 已获取"
4. 继续完成部署

---

## 📚 相关文档

- Coze API 文档：https://www.coze.com/docs/developer_guides/api
- Token 管理指南：https://www.coze.com/docs/developer_guides/token_management

---

## 💡 小技巧

- 使用有意义的 Token 名称（如项目名）
- 为不同项目创建不同 Token
- 定期检查 Token 使用情况
- 及时删除不用的 Token

---

**获取到 Token 后，直接告诉我："Coze API Key 已获取"**，格式如：

```
pat_8HbKc9LmN2oP4qR6sT8uV0wX2yZ4a6b8c0d2e4f6g8h0i2j4k
```

或者只告诉我："已获取"即可，不需要提供完整内容！
