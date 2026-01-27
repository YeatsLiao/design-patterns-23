# Design Patterns 23 (Interactive Learning Platform)

[中文介绍 (Chinese Version)](README.zh-CN.md)

---

## 🇬🇧 English Version

This is an interactive learning platform built with React, designed to help developers deeply understand the 23 GoF Design Patterns through visual demonstrations and code comparisons.

### 📁 Project Structure

The project code is located in the `design-patterns-web` directory. Here is the core structure:

```
design-patterns-web/
├── src/
│   ├── components/        # Shared components
│   │   ├── Layout.tsx     # Overall page layout
│   │   ├── LanguageSwitcher.tsx # Language toggler
│   │   └── MarkdownTrans.tsx    # Markdown renderer supporting i18n
│   ├── i18n/              # Internationalization configuration
│   │   ├── locales/       # Translation files
│   │   │   ├── en.json    # English translations
│   │   │   └── zh.json    # Chinese translations
│   │   └── config.ts      # i18next configuration
│   ├── pages/
│   │   └── patterns/      # Implementation of the 23 patterns
│   │       ├── Factory/   # Example: Factory Pattern
│   │       │   ├── Demo.tsx   # Interactive visualization component
│   │       │   ├── Guide.tsx  # Concept explanation & code examples
│   │       │   └── index.tsx  # Pattern entry file
│   │       └── ... (Other patterns)
│   ├── App.tsx            # Routing configuration & App entry
│   └── main.tsx           # React rendering entry
└── package.json           # Project dependencies
```

### 🛠️ Tech Stack & Implementation Details

This project utilizes a modern frontend stack:

*   **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Atomic CSS) + `clsx` / `tailwind-merge` (Class merging)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) (For demo animations)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Internationalization**: [i18next](https://www.i18next.com/) (English/Chinese support)

#### Core Implementation Logic

Each design pattern (under `src/patterns/`) typically consists of three files:
1.  **`index.tsx`**: Exports the component, serving as the container for that pattern's page.
2.  **`Guide.tsx`**: Explains the **Concept** and provides **Code Examples**. Text content is stored in `i18n/locales/*.json` and rendered via the `MarkdownTrans` component, which supports Markdown syntax.
3.  **`Demo.tsx`**: The **Interactive Playground**. It goes beyond static code by using React state (`useState`) and animations (`framer-motion`) to simulate how the pattern works in real-world scenarios (e.g., simulating a factory producing items, or an observer receiving notifications).

### 🤝 Contribution

PRs are welcome to improve content or fix bugs!

#### 1. Fixing Translations or Text
*   Locate `src/i18n/locales/zh.json` (Chinese) or `en.json` (English).
*   Search for the relevant key and modify the value.
*   **Note**: If the JSON contains HTML tags (like `<code>`), please preserve them to maintain styling.

#### 2. Improving or Adding Demos
*   Find the corresponding pattern folder under `src/pages/patterns/`.
*   Modify `Demo.tsx` to optimize interaction logic or UI.
*   Modify `Guide.tsx` to improve code examples or explanations.

### 🎓 Getting Started (For Beginners)

If you are new to frontend development and want to run this project locally, follow these steps:

#### Step 1: Prepare Environment
You need to install **Node.js**.
1.  Visit [Node.js Official Website](https://nodejs.org/).
2.  Download and install the **LTS Version** (Long Term Support).
3.  Once installed, open your terminal (Windows: `Win + R` -> `cmd`, Mac: `Terminal`) and type `node -v`. If a version number appears, you are good to go.

#### Step 2: Install Dependencies
1.  In your terminal, navigate to the project directory:
    ```bash
    cd design-patterns-web
    ```
2.  Install the required third-party libraries (dependencies):
    ```bash
    npm install
    ```
    *(This may take a few minutes depending on your network)*

#### Step 3: Start the Project
1.  In your terminal, type:
    ```bash
    npm run dev
    ```
2.  You will see output similar to this:
    ```
      VITE v5.x.x  ready in 300 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
    ```
3.  Hold `Ctrl` (or `Cmd` on Mac) and click the link `http://localhost:5173/`, or manually type it into your browser.
4.  🎉 Congratulations! You can now browse all the design patterns locally.

#### Common Commands
*   `npm run dev`: Starts the development server (Most used).
*   `npm run build`: Bundles the project for deployment.
