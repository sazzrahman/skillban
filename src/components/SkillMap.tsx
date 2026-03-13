export default function SkillMap() {
  const concepts = [
    { name: "Variables & Types", status: "proficient" },
    { name: "Functions", status: "in_progress" },
    { name: "Closures", status: "struggling" },
    { name: "Promises / Async", status: "unseen" },
    { name: "DOM Manipulation", status: "unseen" },
  ];

  const getStatusDot = (status: string) => {
    switch (status) {
      case "proficient":
        return <span className="h-3 w-3 rounded-full bg-success"></span>;
      case "in_progress":
        return <span className="h-3 w-3 rounded-full bg-secondary"></span>;
      case "struggling":
        return <span className="h-3 w-3 rounded-full bg-error"></span>;
      case "unseen":
      default:
        return <span className="h-3 w-3 rounded-full bg-border-color"></span>;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "proficient": return "Proficient";
      case "in_progress": return "In Progress";
      case "struggling": return "Struggling";
      case "unseen": default: return "Not Started";
    }
  };

  return (
    <div className="card w-full max-w-md p-6">
      <h2 className="mb-6 text-xl font-bold text-text-primary">JavaScript Skill Map</h2>
      <div className="flex flex-col gap-4">
        {concepts.map((concept, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="font-medium text-text-primary">{concept.name}</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {getStatusDot(concept.status)}
                {concept.status === "proficient" || concept.status === "in_progress" || concept.status === "struggling" ? getStatusDot(concept.status) : <span className="h-3 w-3 rounded-full bg-border-color/30"></span>}
                {concept.status === "proficient" || concept.status === "in_progress" ? getStatusDot(concept.status) : <span className="h-3 w-3 rounded-full bg-border-color/30"></span>}
              </div>
              <span className="w-24 text-right text-xs font-semibold text-text-secondary">
                {getStatusText(concept.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
