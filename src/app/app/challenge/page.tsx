"use client";

import Link from "next/link";
import { useState } from "react";
import ChallengeEditor from "@/components/ChallengeEditor";
import TestResultsPanel from "@/components/TestResultsPanel";

export default function ChallengePage() {
  const [code, setCode] = useState<string>("function makeCounter() {\n  // your code here\n}");

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b border-border-color bg-surface px-6">
        <Link href="/app/dashboard" className="flex items-center gap-2 font-medium text-text-secondary hover:text-text-primary">
          <span>←</span> Dashboard
        </Link>
        
        <h1 className="text-lg font-bold text-text-primary">Closures — Challenge 3/5</h1>
        
        <div className="flex items-center gap-2 rounded-full border border-border-color bg-surface-raised px-3 py-1 text-sm font-semibold text-secondary shadow-sm">
          <span className="text-lg leading-none">🔥</span>
          <span>7</span>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden lg:flex-row flex-col">
        <div className="flex flex-1 flex-col border-r border-border-color lg:w-1/2">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold text-text-primary">Problem Statement</h2>
            <p className="text-text-secondary leading-relaxed">
              Imagine a backpack that remembers what you packed even after you leave home.
              Write a function that creates a counter using closure...
            </p>
          </div>
          
          <div className="flex-1 p-6 pt-0 flex flex-col">
            <h2 className="mb-4 text-xl font-bold text-text-primary">Code Editor</h2>
            <div className="flex-1">
              <ChallengeEditor initialCode={code} onChange={(v) => setCode(v || "")} />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="btn-primary w-full sm:w-auto px-8">Run & Submit</button>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col lg:w-1/2">
          <TestResultsPanel />
        </div>
      </main>
    </div>
  );
}
