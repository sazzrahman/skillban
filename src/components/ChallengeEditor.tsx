"use client";

import Editor from "@monaco-editor/react";

interface ChallengeEditorProps {
  initialCode?: string;
  onChange?: (value: string | undefined) => void;
}

export default function ChallengeEditor({ initialCode = "", onChange }: ChallengeEditorProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-border-color bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={initialCode}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
        }}
      />
    </div>
  );
}
