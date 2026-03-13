"use client";

import Editor from "@monaco-editor/react";

interface ChallengeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export default function ChallengeEditor({ code, onChange }: ChallengeEditorProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-border">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-jetbrains-mono)",
          lineHeight: 1.5,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
        loading={
          <div className="flex h-full items-center justify-center bg-surface text-secondary">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}