# 念珠在线设计器
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

基于 Vue3 + Vite 开发的念珠在线设计工具，支持配件分类管理、自定义素材上传、拖拽交互等功能。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5.x
- **状态管理**: Pinia
- **拖拽功能**: VueDraggable + HTML5 Drag API
- **样式方案**: Tailwind CSS 3.x

## 功能特性

### 1. 配件分类管理
- 按"顶珠/腰珠/跳珠/侧挂/三通/背云/弟子珠"分类展示
- 每个分类默认提供预设配件（带缩略图）
- 支持添加新配件（上传本地图片作为素材）
- 支持删除配件
- 点击配件可替换素材

### 2. 素材自定义
- 支持本地图片上传（JPG、PNG、GIF等）
- 自动转换为Base64格式存储
- 实时预览素材缩略图
- 支持拖拽上传图片
- 存储素材尺寸信息

### 3. 拖拽交互
- **左侧面板 → 编辑区**: 拖拽配件添加到念珠
- **配件列表**: 支持拖拽调整顺序
- **拖拽反馈**: 显示半透明预览效果和高亮提示
- **位置匹配**: 根据配件类型自动匹配念珠对应位置

### 4. 念珠编辑区
- 默认渲染108颗基础珠的环形框架
- 配件自动定位：
  - **顶珠**：念珠顶端
  - **腰珠**：三通左侧和右侧第28个位置（固定）
  - **跳珠**：间隔插入
  - **侧挂**：基础珠外侧
  - **三通**：念珠中心
  - **背云**：三通下方
  - **弟子珠**：底部排列
- 点击配件进行编辑（调整位置、删除等）
- 实时预览同步

### 5. 响应式适配
- **PC端**: 左侧面板 + 右侧编辑区的左右布局
- **移动端**: 分类面板弹窗 + 全屏编辑区

### 6. 错误处理
- 位置冲突检测（如同位置添加多个顶珠）
- 友好的错误提示
- 阻止无效操作

### 7. 数据持久化
- 导出JSON配置（包含所有配件的素材、位置信息）
- 导入JSON恢复配置
- 本地存储保存/加载
- 导出PNG图片

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 或 **yarn**: >= 1.22.0 或 **pnpm**: >= 8.0.0

### 检查 Node.js 版本

在终端/命令行中运行以下命令检查 Node.js 版本：

```bash
node -v
```

如果版本低于 18.0.0，请访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本。

## 项目搭建

### 1. 克隆项目

如果项目在 Git 仓库中：

```bash
git clone <repository-url>
cd custom-jewelry
```

或者直接下载项目 ZIP 文件并解压。

### 2. 安装依赖

使用 npm（推荐）：

```bash
npm install
```

如果 npm 安装速度较慢，可以使用国内镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

或者使用其他包管理器：

```bash
# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 3. 配置检查

安装完成后，检查项目结构：

```
custom-jewelry/
├── src/                    # 源代码目录
│   ├── components/        # Vue组件
│   ├── stores/           # Pinia状态管理
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── index.html            # HTML入口
├── package.json          # 项目配置
├── vite.config.js        # Vite配置
├── tailwind.config.js    # Tailwind配置
└── postcss.config.js     # PostCSS配置
```

## 启动项目

### 开发模式

启动开发服务器（支持热更新）：

```bash
npm run dev
```

启动成功后，终端会显示类似以下信息：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

在浏览器中打开 `http://localhost:5173` 即可访问应用。

### 构建生产版本

构建用于生产环境的优化版本：

```bash
npm run build
```

构建完成后，文件将输出到 `dist/` 目录。

### 预览生产版本

在本地预览构建后的生产版本：

```bash
npm run preview
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |

## 开发说明

### 项目结构

```
src/
├── components/              # Vue组件
│   ├── PalettePanel.vue     # 左侧配件分类面板
│   ├── EditingArea.vue      # 右侧编辑区域
│   ├── AccessoryGroup.vue   # 配件渲染组件
│   ├── RosaryAccessoryPanel.vue # 配件属性面板
│   └── MaterialReplaceDialog.vue # 素材替换弹窗
├── stores/                  # Pinia状态管理
│   └── jewelry.js           # 念珠状态store
├── App.vue                  # 根组件
├── main.js                  # 入口文件
└── style.css                # 全局样式（Tailwind）
```

### 核心功能说明

#### 配件类型与位置规则

- **顶珠**: 限制1个，位置在念珠顶端（位置0）
- **腰珠**: 限制2个，只能放在三通左侧和右侧第28个位置（固定位置）
- **跳珠**: 限制4个，间隔插入基础珠之间
- **侧挂**: 限制2个，位于基础珠外侧
- **三通**: 限制1个，位于念珠中心（位置54）
- **背云**: 限制1个，位于三通下方
- **弟子珠**: 限制10个，底部排列

#### 状态管理

项目使用 Pinia 管理状态，主要包含：
- 配件库（accessoryLibrary）
- 念珠结构（rosaryStructure）
- 选中状态（selectedAccessoryId、selectedRosaryAccessory）

## 使用说明

### 添加配件

1. 从左侧面板拖拽配件到编辑区，或点击配件直接添加
2. 点击分类下的"添加新配件"按钮，上传图片创建新配件

### 编辑配件

1. 点击编辑区中的配件或列表中的配件项进行选择
2. 在属性面板中调整位置索引（腰珠使用下拉选择框）
3. 点击"从念珠中移除"删除配件

### 替换素材

1. 在左侧面板中点击配件的"替换"按钮
2. 在弹窗中上传新图片替换素材
3. 可以同时修改配件名称

### 保存和导出

1. **保存**: 点击工具栏的"保存"按钮，数据存储到浏览器本地存储
2. **加载**: 点击"加载"按钮恢复之前保存的设计
3. **导出PNG**: 导出当前设计的图片
4. **导出JSON**: 导出完整的配置数据（包含所有配件的素材、位置信息）
5. **导入JSON**: 导入之前导出的配置

## 常见问题

### 1. 安装依赖失败

**问题**: `npm install` 失败，提示网络错误或超时

**解决方案**:
- 使用国内镜像：`npm install --registry=https://registry.npmmirror.com`
- 检查网络连接
- 清除 npm 缓存：`npm cache clean --force`

### 2. 端口被占用

**问题**: 启动时提示端口 5173 已被占用

**解决方案**:
- Vite 会自动尝试下一个可用端口（5174、5175等）
- 或者手动指定端口：修改 `vite.config.js` 或使用 `npm run dev -- --port 3000`

### 3. 图片上传失败

**问题**: 上传图片时提示错误

**解决方案**:
- 确保图片格式为 JPG、PNG 或 GIF
- 图片大小建议不超过 5MB
- 检查浏览器控制台是否有详细错误信息

### 4. 拖拽功能不工作

**问题**: 无法拖拽配件

**解决方案**:
- 确保使用现代浏览器（Chrome、Firefox、Safari、Edge 最新版本）
- 检查浏览器是否禁用了 JavaScript
- 清除浏览器缓存后重试

## 浏览器支持

- Chrome（最新版本）
- Firefox（最新版本）
- Safari（最新版本）
- Edge（最新版本）


## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

[在此添加联系方式]
