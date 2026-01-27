# 开发指南 (Development Guide) - 从零开始

[English Version](DEVELOPMENT_GUIDE.md)

---

## 👋 欢迎
欢迎来到 **Design Patterns 23** 项目！这是一份专为初学者（小白）准备的详细开发指南。

无论你是刚接触 React 的新手，还是想为这个开源项目做贡献的开发者，本指南将手把手教你如何搭建环境、理解代码，并成功添加一个新的设计模式。

## 🛠 第一步：环境准备 (Prerequisites)

在开始写代码之前，你需要安装以下软件。如果你已经安装了，可以跳过这一步。

### 1. 安装 Node.js
本项目基于 Node.js 运行。
*   **下载地址**: [Node.js 官网](https://nodejs.org/)
*   **版本建议**: 推荐安装 **LTS (长期支持版)**，例如 v18.x 或 v20.x。
*   **验证安装**: 打开终端（Terminal/CMD），输入 `node -v`。如果看到类似 `v18.16.0` 的输出，说明安装成功。

### 2. 安装 Git
用于下载和管理代码版本。
*   **下载地址**: [Git 官网](https://git-scm.com/)
*   **验证安装**: 在终端输入 `git --version`。

### 3. 安装代码编辑器 (VS Code)
我们强烈推荐使用 **Visual Studio Code (VS Code)**。
*   **下载地址**: [VS Code 官网](https://code.visualstudio.com/)
*   **推荐插件** (在 VS Code 左侧扩展商店搜索安装):
    *   **ES7+ React/Redux/React-Native snippets**: 提供 React 代码片段。
    *   **Tailwind CSS IntelliSense**: 智能提示 CSS 类名（非常重要！）。
    *   **Prettier - Code formatter**: 自动美化代码格式。

---

## 🚀 第二步：启动项目 (Getting Started)

打开你的终端（或 VS Code 的内置终端 `Ctrl + ~`），依次执行以下命令：

1.  **进入项目目录**
    如果你已经下载了代码，请确保进入了 `design-patterns-web` 文件夹：
    ```bash
    cd design-patterns-web
    ```

2.  **安装依赖**
    这会下载项目所需的所有第三方库（React, TypeScript, Tailwind 等）：
    ```bash
    npm install
    ```
    *注意：如果下载速度慢，可以尝试使用淘宝源或科学上网。*

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```

4.  **打开浏览器**
    终端通常会显示 `Local: http://localhost:5173/`。按住 `Ctrl` 点击该链接，或者在浏览器手动输入，你就能看到项目运行起来了！

---

## 🎓 第三步：小白必看 - 核心技术与原理 (Core Tech & Principles)

在这个项目中，我们用到了几个现代前端最流行的技术。如果你是新手，理解这些原理会让你事半功倍。

### 1. React (核心框架) - "搭积木"
React 是一个用于构建用户界面的库。
*   **组件 (Components)**: 就像乐高积木。我们把页面拆成一个个小块（比如 `Button`, `Navbar`, `Demo`），然后拼装起来。
    *   *原则*: 一个文件通常只写一个组件。
*   **Props (属性)**: 就像给积木传参数。比如 `<Button color="red" />`，`color` 就是 Props，告诉组件要显示红色。
*   **State (状态)**: 这是组件的"记忆"。
    *   *原理*: 当 State 改变时，React 会自动重新渲染页面，不需要你手动去改 DOM（不需要写 `document.getElementById`）。
    *   *语法*: `const [count, setCount] = useState(0);`
        *   `count`: 当前的值。
        *   `setCount`: 用来修改值的函数。

### 2. TypeScript (类型安全) - "代码的拼写检查"
我们使用的是 `.tsx` 文件而不是 `.js`。
*   **为什么用它？**: JavaScript 很灵活但容易出错（比如把数字当成字符串）。TypeScript 强迫你定义数据的"形状"。
*   **例子**:
    ```tsx
    // TypeScript 知道 name 必须是字符串
    function welcome(name: string) { ... }
    ```
    如果你写 `welcome(123)`，编辑器会直接画红线报错，防止你写出 Bug。

### 3. Tailwind CSS (样式) - "不写 CSS 文件"
我们不写 `.css` 文件，而是直接在 HTML 标签上写 `className`。
*   **传统写法**: `<div class="box">` 然后在 CSS 里写 `.box { background: red; padding: 10px; }`
*   **Tailwind 写法**: `<div className="bg-red-500 p-4">`
    *   `bg-red-500`: 红色背景
    *   `p-4`: Padding 1rem
    *   *好处*: 写起来飞快，不用在文件间跳来跳去。

---

## 📂 第四步：理解项目结构 (Project Structure)

```
src/
├── components/       # 公共组件 (如 Layout 布局, 按钮, 导航栏)
├── i18n/             # 国际化翻译 (存放中文/英文文本的地方)
│   └── locales/
│       ├── en.json   # 英文文案
│       └── zh.json   # 中文文案
├── pages/
│   └── patterns/     # ✨ 核心代码在这里！每个设计模式一个文件夹
│       ├── Factory/  # 例如：工厂模式
│       │   ├── Demo.tsx   # 演示页面 (上半部分：交互演示)
│       │   ├── Guide.tsx  # 指南页面 (下半部分：文字讲解)
│       │   └── index.tsx  # 入口文件 (组装 Demo 和 Guide)
│       └── ...
├── App.tsx           # 路由配置 (决定访问哪个 URL 显示哪个页面)
└── main.tsx          # 项目的总入口
```

---

## 🧑‍💻 第五步：实战 - 如何添加一个新的设计模式？

假设我们要添加一个名为 **"MyNewPattern"** 的设计模式。我们的页面布局是 **上下结构**：上面是交互演示 (Demo)，下面是理论讲解 (Guide)。

### 1. 创建文件夹
在 `src/pages/patterns/` 下创建一个新文件夹 `MyNewPattern`。

### 2. 创建核心文件
在 `MyNewPattern` 文件夹中，我们需要创建 3 个文件。你可以直接复制以下模板代码。

#### 文件 A: `Demo.tsx` (交互演示 - 上半部分)
这里展示模式的运行效果。
```tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Demo = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4">{t('common.demo')}</h3>
      
      <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 dark:bg-gray-950 rounded-lg">
        <p className="text-lg">当前计数: {count}</p>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          点击增加
        </button>
      </div>
    </div>
  );
};

export default Demo;
```

#### 文件 B: `Guide.tsx` (理论讲解 - 下半部分)
这里解释模式的原理。
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Guide = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4">{t('common.guide')}</h3>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>在这里详细解释你的模式是如何工作的...</p>
        {/* 
           提示: 实际项目中，我们推荐使用 translation key 配合 MarkdownTrans 组件
           例如: <MarkdownTrans i18nKey="myNewPattern.concept" />
        */}
      </div>
    </div>
  );
};

export default Guide;
```

#### 文件 C: `index.tsx` (入口整合)
将上面两个部分**垂直堆叠**在一起。
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Demo from './Demo';
import Guide from './Guide';

const MyNewPatternPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-20">
      {/* 1. 标题头 */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('myNewPattern.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          {t('myNewPattern.description')}
        </p>
      </div>

      {/* 2. 演示区域 (Demo) */}
      <section>
        <Demo />
      </section>

      {/* 3. 指南区域 (Guide) */}
      <section>
        <Guide />
      </section>
    </div>
  );
};

export default MyNewPatternPage;
```

### 3. 注册路由 (修改 `App.tsx`)
让浏览器知道访问 `/patterns/my-new-pattern` 时显示这个页面。

打开 `src/App.tsx`：
1.  **顶部引入组件**:
    ```tsx
    // ... 其他引入
    import MyNewPatternPage from './pages/patterns/MyNewPattern';
    ```
2.  **添加 Route**:
    找到 `<Routes>` 标签内部，在合适的位置添加：
    ```tsx
    <Route path="patterns/my-new-pattern" element={<MyNewPatternPage />} />
    ```

### 4. 添加到侧边栏 (修改 `Layout.tsx`)
打开 `src/components/Layout.tsx`，找到 `<nav>` 区域。
根据你的模式类型（创建型/结构型/行为型），在相应的 `<div className="space-y-0.5 ...">` 中添加链接：

```tsx
<SubMenuLink 
  to="/patterns/my-new-pattern" 
  label={t('patterns.myNewPattern')} 
  active={location.pathname === '/patterns/my-new-pattern'} 
/>
```

### 5. 添加翻译 (修改 JSON)
打开 `src/i18n/locales/zh.json` (中文) 和 `en.json` (英文)。

在 `zh.json` 中添加：
```json
{
  "patterns": {
    "myNewPattern": "我的新模式",
    // ... 其他模式
  },
  "myNewPattern": {
    "title": "我的新模式标题",
    "description": "这是关于该模式的详细描述..."
  }
}
```
*别忘了在 `en.json` 中也添加对应的英文翻译！*

---

## ❓ 常见问题 (FAQ)

**Q: 为什么我修改了代码，页面没有变化？**
A: 请检查终端是否在运行 `npm run dev`。如果是，尝试刷新浏览器。如果还是不行，检查控制台是否有红色报错。

**Q: 什么是 `clsx`？**
A: 你可能会在代码里看到 `clsx(...)`。这是一个用来动态拼接 className 的小工具。
比如: `clsx("btn", isActive && "btn-active")`。如果 `isActive` 是 true，结果就是 `"btn btn-active"`。

**Q: 怎么在亮色/暗色模式下看效果？**
A: 页面左下角有一个切换主题的按钮。Tailwind 的 `dark:` 前缀就是专门为此设计的。例如 `bg-white dark:bg-black` 表示：亮色时白底，暗色时黑底。

---

祝你在 Design Patterns 23 的开发之旅愉快！
