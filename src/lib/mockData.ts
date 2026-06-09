export const treeTxt = `project-root/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── CodeViewer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Config.tsx
│   │   └── Exclusion.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
`;

export type MockFile = {
  name: string;
  language: string;
  content: string;
};

export const mockFiles: MockFile[] = [
  {
    name: "index-html.txt",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Context F2P</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  },
  {
    name: "style-css.txt",
    language: "css",
    content: `:root {
  --bg: #0d0a08;
  --fg: #ff8c2a;
  --border: rgba(255, 140, 42, 0.4);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: "JetBrains Mono", monospace;
}

.panel {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
}
`,
  },
  {
    name: "package-json.txt",
    language: "json",
    content: `{
  "name": "context-f2p",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "typescript": "^5.5.0"
  }
}
`,
  },
  {
    name: "components-json.txt",
    language: "json",
    content: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
`,
  },
];
