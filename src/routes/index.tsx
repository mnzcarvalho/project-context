import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, FileText, FolderTree, Play, Plus, Trash2 } from "lucide-react";
import { mockFiles, treeTxt, type MockFile } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Context F2P — Contexto de Código para IA" },
      { name: "description", content: "MVP de ferramenta para exportar contexto de código em .txt para uso com IA." },
    ],
  }),
  component: ContextF2P,
});

type Tab = "home" | "configuracao" | "exclusao";

const TREE_FILE: MockFile = { name: "tree.txt", language: "text", content: treeTxt };

function ContextF2P() {
  const [tab, setTab] = useState<Tab>("home");
  const [active, setActive] = useState<MockFile>(TREE_FILE);
  const [pathX, setPathX] = useState("C:/Users/dev/projects/meu-app");
  const [rules, setRules] = useState<string[]>(["node_modules/", "dist/", ".git/", "*.lock", ".env"]);
  const [newRule, setNewRule] = useState("");

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
      <Header tab={tab} setTab={setTab} />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 min-h-0">
        <Sidebar active={active} setActive={setActive} disabled={tab !== "home"} />
        <main className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col min-h-[60vh]">
          {tab === "home" && <HomeView file={active} />}
          {tab === "configuracao" && (
            <ConfigView pathX={pathX} setPathX={setPathX} />
          )}
          {tab === "exclusao" && (
            <ExclusionView rules={rules} setRules={setRules} newRule={newRule} setNewRule={setNewRule} />
          )}
        </main>
      </div>

      <footer className="text-xs text-muted-foreground text-center tracking-widest uppercase">
        &gt;_ context f2p · v0.1.0 · ready
      </footer>
    </div>
  );
}

function Header({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "home", label: "home" },
    { id: "configuracao", label: "configuração" },
    { id: "exclusao", label: "exclusão" },
  ];
  return (
    <header className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <h1 className="text-sm md:text-base font-bold tracking-[0.25em] uppercase">
            context_f2p
          </h1>
        </div>
        <span className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase">
          // code context for AI
        </span>
      </div>
      <nav className="flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 px-4 py-3 text-xs md:text-sm uppercase tracking-[0.2em] transition-colors border-r border-border/60 last:border-r-0",
              tab === t.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
            )}
          >
            [{t.label}]
          </button>
        ))}
      </nav>
    </header>
  );
}

function Sidebar({
  active,
  setActive,
  disabled,
}: {
  active: MockFile;
  setActive: (f: MockFile) => void;
  disabled: boolean;
}) {
  return (
    <aside className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-3 flex flex-col gap-3 min-h-0">
      <button
        onClick={() => setActive(TREE_FILE)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border border-border text-left text-sm transition-colors",
          active.name === TREE_FILE.name && !disabled
            ? "bg-primary/15 text-primary"
            : "hover:bg-primary/10 text-foreground",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <FolderTree className="size-4" />
        <span className="font-semibold tracking-wider">tree.txt</span>
      </button>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-2 py-1 border-b border-border/60 mb-2">
          // arquivos
        </div>
        <ul className="flex-1 overflow-y-auto space-y-1 pr-1">
          {mockFiles.map((f) => {
            const isActive = active.name === f.name && !disabled;
            return (
              <li key={f.name}>
                <button
                  onClick={() => setActive(f)}
                  disabled={disabled}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/40"
                      : "hover:bg-primary/10 text-foreground/90 border border-transparent",
                    disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <FileText className="size-3.5 shrink-0" />
                  <span className="truncate">{f.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-xs text-muted-foreground/70 px-2">
        {mockFiles.length + 1} arquivo(s)
      </div>
    </aside>
  );
}

function HomeView({ file }: { file: MockFile }) {
  const lines = useMemo(() => file.content.split("\n"), [file.content]);
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-background/40">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">›</span>
          <span className="text-primary">{file.name}</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground ml-2">
            {file.language}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-primary/30" />
          <span className="size-2.5 rounded-full bg-primary/50" />
          <span className="size-2.5 rounded-full bg-primary" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <pre className="text-sm leading-relaxed">
          <code className="grid">
            {lines.map((line, i) => (
              <div key={i} className="grid grid-cols-[3rem_1fr] hover:bg-primary/5">
                <span className="text-right pr-3 select-none text-muted-foreground/60 border-r border-border/40">
                  {i + 1}
                </span>
                <span className="pl-3 whitespace-pre text-foreground/90">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </>
  );
}

function ConfigView({ pathX, setPathX }: { pathX: string; setPathX: (v: string) => void }) {
  const [executed, setExecuted] = useState<string | null>(null);
  return (
    <div className="p-6 md:p-8 overflow-auto">
      <h2 className="text-lg uppercase tracking-[0.3em] text-primary neon-glow mb-1">
        // configuração
      </h2>
      <p className="text-xs text-muted-foreground mb-6">
        Configure o caminho do projeto que será convertido em contexto .txt para IA.
      </p>

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-xs uppercase tracking-widest text-primary mb-2">
            Path da pasta original (Pasta X)
          </label>
          <input
            value={pathX}
            onChange={(e) => setPathX(e.target.value)}
            placeholder="C:/caminho/para/seu/projeto"
            className="w-full bg-background/60 border border-border rounded-md px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:neon-border"
          />
        </div>

        <div className="rounded-md border border-border/60 bg-background/40 p-4 text-sm">
          <div className="flex items-start gap-3">
            <FolderTree className="size-4 text-primary mt-0.5" />
            <div className="space-y-2">
              <p className="text-foreground/90">
                Os arquivos convertidos em <span className="text-primary">.txt</span> serão salvos na{" "}
                <span className="text-primary">Pasta Y</span> (dentro da Pasta X).
              </p>
              <pre className="text-xs text-muted-foreground bg-background/60 border border-border/40 rounded p-2 overflow-x-auto">
{`${pathX || "<pasta-x>"}/
└── Y/
    ├── tree.txt
    ├── index-html.txt
    ├── style-css.txt
    └── ...`}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-destructive/60 bg-destructive/10 p-4 flex items-start gap-3">
          <AlertTriangle className="size-5 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-destructive-foreground/90">
            <span className="font-bold uppercase tracking-wider">Atenção:</span> O script irá{" "}
            <span className="underline">limpar a Pasta Y</span> antes de sobrescrever os novos arquivos.
            Todo conteúdo anterior dentro de Y será apagado.
          </p>
        </div>

        <button
          onClick={() => setExecuted(new Date().toLocaleTimeString())}
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary/15 hover:bg-primary/25 border border-primary text-primary uppercase tracking-[0.25em] text-sm neon-glow neon-border transition-all"
        >
          <Play className="size-4 group-hover:translate-x-0.5 transition-transform" />
          Salvar Configurações / Executar Script
        </button>

        {executed && (
          <div className="text-xs text-primary/80 border-l-2 border-primary pl-3">
            ✓ Script executado às {executed} — {mockFiles.length + 1} arquivos gerados em Pasta Y.
          </div>
        )}
      </div>
    </div>
  );
}

function ExclusionView({
  rules,
  setRules,
  newRule,
  setNewRule,
}: {
  rules: string[];
  setRules: (r: string[]) => void;
  newRule: string;
  setNewRule: (v: string) => void;
}) {
  const add = () => {
    const v = newRule.trim();
    if (!v || rules.includes(v)) return;
    setRules([...rules, v]);
    setNewRule("");
  };
  const remove = (r: string) => setRules(rules.filter((x) => x !== r));

  return (
    <div className="p-6 md:p-8 overflow-auto">
      <h2 className="text-lg uppercase tracking-[0.3em] text-primary neon-glow mb-1">
        // exclusão
      </h2>
      <p className="text-xs text-muted-foreground mb-6">
        Regras de ignorar para arquivos e pastas (estilo <span className="text-primary">.gitignore</span>).
        Itens listados aqui não serão incluídos no contexto exportado.
      </p>

      <div className="max-w-2xl space-y-4">
        <div className="flex gap-2">
          <input
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="ex: node_modules/  •  *.log  •  .env"
            className="flex-1 bg-background/60 border border-border rounded-md px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:neon-border"
          />
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 px-4 rounded-md border border-primary text-primary hover:bg-primary/15 uppercase tracking-widest text-xs neon-border"
          >
            <Plus className="size-4" /> add
          </button>
        </div>

        <ul className="rounded-md border border-border/60 bg-background/40 divide-y divide-border/40">
          {rules.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nenhuma regra de exclusão definida.
            </li>
          )}
          {rules.map((r) => (
            <li key={r} className="flex items-center justify-between px-4 py-2.5 group hover:bg-primary/5">
              <span className="text-sm font-mono">
                <span className="text-muted-foreground mr-2">›</span>
                {r}
              </span>
              <button
                onClick={() => remove(r)}
                className="opacity-60 group-hover:opacity-100 text-destructive hover:text-destructive transition-opacity"
                aria-label={`remover ${r}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="text-[11px] text-muted-foreground tracking-wider">
          // {rules.length} regra(s) ativa(s) · serão aplicadas na próxima execução
        </div>
      </div>
    </div>
  );
}
