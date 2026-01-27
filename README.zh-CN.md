# Design Patterns 23 (Interactive Learning Platform)

[English Version](README.md)

---

## 🇨🇳 中文介绍 (Chinese Version)

这是一个基于 React 的设计模式交互式学习平台，旨在通过可视化演示和代码对比，帮助开发者深入理解 GoF 的 23 种设计模式。

### 📁 项目结构

项目代码位于 `design-patterns-web` 目录下，主要结构如下：

```
design-patterns-web/
├── src/
│   ├── components/        # 公共组件
│   │   ├── Layout.tsx     # 页面整体布局
│   │   ├── LanguageSwitcher.tsx # 语言切换器
│   │   └── MarkdownTrans.tsx    # 支持 i18n 的 Markdown 渲染组件
│   ├── i18n/              # 国际化配置
│   │   ├── locales/       # 翻译文件
│   │   │   ├── en.json    # 英文翻译
│   │   │   └── zh.json    # 中文翻译
│   │   └── config.ts      # i18next 配置
│   ├── pages/
│   │   └── patterns/      # 23种设计模式的具体实现
│   │       ├── Factory/   # 例如：工厂模式
│   │       │   ├── Demo.tsx   # 交互式演示组件
│   │       │   ├── Guide.tsx  # 概念讲解与代码示例
│   │       │   └── index.tsx  # 模式入口文件
│   │       └── ... (其他模式)
│   ├── App.tsx            # 路由配置与应用入口
│   └── main.tsx           # React 渲染入口
└── package.json           # 项目依赖配置
```

### 🛠️ 技术栈与实现细节

本项目使用了现代前端技术栈：

*   **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (原子化 CSS) + `clsx` / `tailwind-merge` (类名合并)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) (用于演示动画)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Internationalization**: [i18next](https://www.i18next.com/) (支持中英切换)

#### 核心实现逻辑

每个设计模式（在 `src/patterns/` 下）通常包含三个文件：
1.  **`index.tsx`**: 导出组件，通常作为该模式的页面容器。
2.  **`Guide.tsx`**: 负责讲解该模式的**概念 (Concept)** 和 **代码示例 (Code Example)**。内容文本通常存储在 `i18n/locales/*.json` 中，通过 `MarkdownTrans` 组件渲染，支持 Markdown 语法。
3.  **`Demo.tsx`**: 这是一个**交互式演示**。它不只是展示代码，而是通过 React 状态 (`useState`) 和动画 (`framer-motion`) 来模拟该模式在真实场景下的运行逻辑（例如：模拟工厂生产产品、模拟观察者收到通知等）。

### 🤝 如何贡献 (Contribution)

欢迎提交 PR 来改进内容或修复 Bug！

#### 1. 修复翻译或文案错误
*   找到 `src/i18n/locales/zh.json` (中文) 或 `en.json` (英文)。
*   搜索相关文案的 Key 并进行修改。
*   **注意**: 如果 JSON 中包含 HTML 标签（如 `<code>`），请保留它们以维持样式。

#### 2. 改进或添加设计模式演示
*   在 `src/pages/patterns/` 下找到对应的模式文件夹。
*   修改 `Demo.tsx` 来优化交互逻辑或 UI。
*   修改 `Guide.tsx` 来完善代码示例或解释。

#### 3. 添加新的通用组件
*   如果发现多个模式使用了相同的 UI 逻辑，可以在 `src/components/` 下新建组件进行复用。

### 🎓 小白使用教程 (Getting Started)

如果你是前端新手，想在本地运行这个项目，请跟随以下步骤：

#### 第一步：环境准备
你需要安装 **Node.js**。
1.  访问 [Node.js 官网](https://nodejs.org/)。
2.  下载并安装 **LTS 版本** (长期支持版)。
3.  安装完成后，打开终端（Windows 下按 `Win + R` 输入 `cmd`，Mac 下打开 `Terminal`），输入 `node -v`，如果出现版本号说明安装成功。

#### 第二步：安装依赖
1.  在终端中，进入项目目录：
    ```bash
    cd design-patterns-web
    ```
2.  安装项目所需的第三方库（依赖）：
    ```bash
    npm install
    ```
    *(这一步可能需要几分钟，取决于你的网络状况)*

#### 第三步：启动项目
1.  在终端中输入：
    ```bash
    npm run dev
    ```
2.  你会看到类似这样的输出：
    ```
      VITE v5.x.x  ready in 300 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
    ```
3.  按住 `Ctrl` (Mac 是 `Cmd`) 点击链接 `http://localhost:5173/`，或者在浏览器中手动输入该地址。
4.  🎉 恭喜！你现在可以在本地浏览所有的设计模式演示了。

#### 常见命令
*   `npm run dev`: 启动开发服务器（最常用）。
*   `npm run build`: 打包项目，生成用于部署的静态文件。
