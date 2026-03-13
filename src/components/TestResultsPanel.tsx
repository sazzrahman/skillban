export default function TestResultsPanel() {
  const mockTests = [
    { id: 1, name: "Test 1: Creates a counter that starts at 0", passed: true, error: "" },
    { id: 2, name: "Test 2: Increments the counter correctly", passed: true, error: "" },
    { id: 3, name: "Test 3: Maintains state independently for multiple instances", passed: false, error: "Expected 3, got undefined" },
  ];

  return (
    <div className="flex h-full flex-col bg-surface p-6">
      <h3 className="mb-4 text-lg font-bold text-text-primary">Output / Test Results</h3>
      
      <div className="mb-6 flex-1 overflow-y-auto space-y-3">
        {mockTests.map((test) => (
          <div key={test.id} className="rounded-md border border-border-color bg-background p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none">
                {test.passed ? "✅" : "❌"}
              </span>
              <span className={`font-semibold ${test.passed ? "text-success" : "text-error"}`}>
                {test.name}
              </span>
            </div>
            {!test.passed && test.error && (
              <div className="mt-2 text-sm text-text-secondary pl-8">
                <code className="bg-surface-raised px-1 py-0.5 rounded text-error">{test.error}</code>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 border-t border-border-color pt-4">
        <button className="btn-secondary w-full">Hint</button>
        <button className="btn-secondary w-full">Skip</button>
      </div>
    </div>
  );
}
