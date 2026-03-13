"use client";

import { useState } from "react";
import Link from "next/link";
import ChallengeEditor from "@/components/ChallengeEditor";
import TestResultsPanel from "@/components/TestResultsPanel";
import { ArrowLeft, Flame } from "lucide-react";

export default function ChallengePage() {
  const [code, setCode] = useState<string | undefined>("function makeCounter() {\n  // your code here\n}");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults([
        { id: 1, description: "Returns a function", status: "passed" },
        { id: 2, description: "Counter increments correctly", status: "failed", error: "Expected 3, got undefined" },
        { id: 3, description: "Independent closures", status: "failed" },
      ]);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
        <Link href="/app/dashboard" className="flex items-center gap-2 text-sm text-secondary hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <span className="font-medium text-primary">Closures — Challenge 3/5</span>
        <div className="flex items-center gap-1 rounded bg-surface-raised px-2 py-1 text-sm font-semibold text-secondary">
          <Flame className="h-4 w-4 text-warning" /> 7
        </div>
      </div>
      
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex flex-1 flex-col border-r border-border p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold text-primary">Problem Statement</h2>
            <div className="prose prose-invert max-w-none text-secondary">
              <p>
                Imagine a backpack that remembers what you packed even after you leave home.
                Write a function that creates a counter using closure...
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ChallengeEditor code={code || ""} onChange={setCode} />
          </div>
        </div>
        
        <div className="w-full md:w-[400px] bg-surface">
          <TestResultsPanel results={results} onRun={runCode} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}