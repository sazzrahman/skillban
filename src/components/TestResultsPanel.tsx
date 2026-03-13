import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface TestCase {
  id: number;
  description: string;
  status: "passed" | "failed" | "pending";
  error?: string;
}

interface TestResultsPanelProps {
  results: TestCase[];
  onRun: () => void;
  isRunning: boolean;
}

export default function TestResultsPanel({ results, onRun, isRunning }: TestResultsPanelProps) {
  return (
    <div className="flex h-full flex-col bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-primary">Test Results</h3>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="btn-primary py-1.5 px-3 text-sm"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="flex-1 overflow-auto rounded border border-border bg-background p-4">
        {results.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-secondary">
            Run your code to see results
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((test) => (
              <li key={test.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  {test.status === "passed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {test.status === "failed" && <XCircle className="h-4 w-4 text-error" />}
                  {test.status === "pending" && <Clock className="h-4 w-4 text-secondary" />}
                  <span
                    className={
                      test.status === "passed"
                        ? "text-success"
                        : test.status === "failed"
                        ? "text-error"
                        : "text-secondary"
                    }
                  >
                    Test {test.id}: {test.description}
                  </span>
                </div>
                {test.error && (
                  <div className="ml-6 mt-1 rounded bg-surface-raised p-2 text-xs text-error font-mono">
                    {test.error}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn-secondary flex-1 py-1.5 text-sm">Hint</button>
        <button className="btn-secondary flex-1 py-1.5 text-sm">Skip</button>
      </div>
    </div>
  );
}