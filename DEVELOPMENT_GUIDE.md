# Development Guide - From Zero to Hero

[中文版 (Chinese Version)](DEVELOPMENT_GUIDE.zh-CN.md)

---

## 👋 Welcome
Welcome to the **Design Patterns 23** project! This is a detailed development guide designed specifically for beginners.

Whether you are new to React or looking to contribute to this open-source project, this guide will walk you through setting up your environment, understanding the code, and successfully adding a new design pattern step-by-step.

## 🛠 Step 1: Prerequisites

Before you start coding, you need to install the following software. If you already have them installed, you can skip this step.

### 1. Install Node.js
This project runs on Node.js.
*   **Download**: [Node.js Official Website](https://nodejs.org/)
*   **Version Recommendation**: We recommend the **LTS (Long Term Support)** version, such as v18.x or v20.x.
*   **Verify Installation**: Open your terminal (Terminal/CMD) and type `node -v`. If you see output like `v18.16.0`, you are good to go.

### 2. Install Git
Used for downloading and managing code versions.
*   **Download**: [Git Official Website](https://git-scm.com/)
*   **Verify Installation**: Type `git --version` in your terminal.

### 3. Install Code Editor (VS Code)
We strongly recommend using **Visual Studio Code (VS Code)**.
*   **Download**: [VS Code Official Website](https://code.visualstudio.com/)
*   **Recommended Extensions** (Search and install in the VS Code Extensions Marketplace):
    *   **ES7+ React/Redux/React-Native snippets**: Provides React code snippets.
    *   **Tailwind CSS IntelliSense**: Intelligent auto-completion for CSS classes (Very Important!).
    *   **Prettier - Code formatter**: Automatically formats your code.

---

## 🚀 Step 2: Getting Started

Open your terminal (or VS Code's built-in terminal `Ctrl + ~`) and run the following commands in order:

1.  **Enter the Project Directory**
    If you have already downloaded the code, make sure you are inside the `design-patterns-web` folder:
    ```bash
    cd design-patterns-web
    ```

2.  **Install Dependencies**
    This will download all third-party libraries required by the project (React, TypeScript, Tailwind, etc.):
    ```bash
    npm install
    ```
    *Note: This might take a few minutes depending on your internet connection.*

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    The terminal will usually show `Local: http://localhost:5173/`. Ctrl+Click that link or manually type it in your browser to see the project running!

---

## 🎓 Step 3: Core Tech & Principles (Must Read for Beginners)

This project uses some of the most popular modern frontend technologies. If you are a beginner, understanding these principles will save you a lot of time.

### 1. React (The Framework) - "Building with Lego"
React is a library for building user interfaces.
*   **Components**: Think of them as Lego blocks. We break the page into small pieces (like `Button`, `Navbar`, `Demo`) and assemble them.
    *   *Rule*: One file usually contains one component.
*   **Props**: Like passing parameters to a Lego block. E.g., `<Button color="red" />`. `color` is a Prop that tells the component to be red.
*   **State**: This is the component's "Memory".
    *   *Principle*: When State changes, React automatically re-renders the page. You don't need to manually touch the DOM (no `document.getElementById`).
    *   *Syntax*: `const [count, setCount] = useState(0);`
        *   `count`: The current value.
        *   `setCount`: The function to update the value.

### 2. TypeScript (Type Safety) - "Spell Checker for Code"
We use `.tsx` files instead of `.js`.
*   **Why?**: JavaScript is flexible but error-prone (e.g., treating a number as a string). TypeScript forces you to define the "shape" of your data.
*   **Example**:
    ```tsx
    // TypeScript knows 'name' must be a string
    function welcome(name: string) { ... }
    ```
    If you write `welcome(123)`, the editor will underline it in red immediately, preventing bugs.

### 3. Tailwind CSS (Styling) - "No CSS Files"
We don't write `.css` files. Instead, we write `className` directly in HTML.
*   **Traditional**: `<div class="box">` and then `.box { background: red; padding: 10px; }` in a CSS file.
*   **Tailwind**: `<div className="bg-red-500 p-4">`
    *   `bg-red-500`: Red background.
    *   `p-4`: Padding 1rem.
    *   *Benefit*: It's super fast to write and you don't have to jump between files.

---

## 📂 Step 4: Project Structure

```
src/
├── components/       # Shared components (Layout, Buttons, Navbar)
├── i18n/             # Internationalization (Where translations live)
│   └── locales/
│       ├── en.json   # English text
│       └── zh.json   # Chinese text
├── pages/
│   └── patterns/     # ✨ Core Code Here! One folder per pattern.
│       ├── Factory/  # Example: Factory Pattern
│       │   ├── Demo.tsx   # Demo Page (Top part: Interactive)
│       │   ├── Guide.tsx  # Guide Page (Bottom part: Theory)
│       │   └── index.tsx  # Entry file (Assembles Demo and Guide)
│       └── ...
├── App.tsx           # Route Configuration (Maps URLs to Pages)
└── main.tsx          # Application Entry Point
```

---

## 🧑‍💻 Step 5: Hands-on - How to Add a New Pattern?

Let's assume we want to add a design pattern named **"MyNewPattern"**. The page layout is **Top-Bottom**: Interactive Demo on top, Theory Guide at the bottom.

### 1. Create a Folder
Create a new folder `MyNewPattern` under `src/pages/patterns/`.

### 2. Create Core Files
Inside the `MyNewPattern` folder, create 3 files. You can copy the template code below.

#### File A: `Demo.tsx` (Interactive Demo - Top)
This shows how the pattern works visually.
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
        <p className="text-lg">Current Count: {count}</p>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Click to Increment
        </button>
      </div>
    </div>
  );
};

export default Demo;
```

#### File B: `Guide.tsx` (Theory Guide - Bottom)
This explains the theory behind the pattern.
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Guide = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4">{t('common.guide')}</h3>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Explain how your pattern works here in detail...</p>
        {/* 
           Tip: In production, we recommend using translation keys with MarkdownTrans component
           Example: <MarkdownTrans i18nKey="myNewPattern.concept" />
        */}
      </div>
    </div>
  );
};

export default Guide;
```

#### File C: `index.tsx` (Entry File)
Combines the two parts above in a **Vertical Stack**.
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Demo from './Demo';
import Guide from './Guide';

const MyNewPatternPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('myNewPattern.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          {t('myNewPattern.description')}
        </p>
      </div>

      {/* 2. Demo Section */}
      <section>
        <Demo />
      </section>

      {/* 3. Guide Section */}
      <section>
        <Guide />
      </section>
    </div>
  );
};

export default MyNewPatternPage;
```

### 3. Register Route (Modify `App.tsx`)
Tell the browser to show this page when visiting `/patterns/my-new-pattern`.

Open `src/App.tsx`:
1.  **Import Component**:
    ```tsx
    // ... other imports
    import MyNewPatternPage from './pages/patterns/MyNewPattern';
    ```
2.  **Add Route**:
    Find the `<Routes>` tag and add inside:
    ```tsx
    <Route path="patterns/my-new-pattern" element={<MyNewPatternPage />} />
    ```

### 4. Add to Sidebar (Modify `Layout.tsx`)
Open `src/components/Layout.tsx`, find the `<nav>` area.
Add a link in the corresponding section (Creational/Structural/Behavioral):

```tsx
<SubMenuLink 
  to="/patterns/my-new-pattern" 
  label={t('patterns.myNewPattern')} 
  active={location.pathname === '/patterns/my-new-pattern'} 
/>
```

### 5. Add Translations (Modify JSON)
Open `src/i18n/locales/zh.json` (Chinese) and `en.json` (English).

Add to `en.json`:
```json
{
  "patterns": {
    "myNewPattern": "My New Pattern",
    // ... other patterns
  },
  "myNewPattern": {
    "title": "My New Pattern Title",
    "description": "Detailed description about this pattern..."
  }
}
```
*Don't forget to add the corresponding Chinese translation in `zh.json`!*

---

## ❓ FAQ

**Q: Why don't I see changes after saving?**
A: Check if `npm run dev` is running in the terminal. Try refreshing the browser. Check the console for red errors.

**Q: What is `clsx`?**
A: You might see `clsx(...)` in the code. It's a tiny utility to conditionally join classNames.
E.g., `clsx("btn", isActive && "btn-active")`. If `isActive` is true, the result is `"btn btn-active"`.

**Q: How to check Dark Mode?**
A: There is a theme switcher button in the bottom left of the sidebar. Tailwind's `dark:` prefix is designed for this. E.g., `bg-white dark:bg-black` means: white background in Light mode, black background in Dark mode.

---

Happy Coding with Design Patterns 23!
