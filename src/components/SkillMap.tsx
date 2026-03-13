import { CheckCircle2, Circle, Disc3 } from "lucide-react";

type ConceptStatus = "proficient" | "in-progress" | "struggling" | "not-started";

interface Concept {
  id: string;
  title: string;
  status: ConceptStatus;
}

const mockConcepts: Concept[] = [
  { id: "1", title: "Variables & Types", status: "proficient" },
  { id: "2", title: "Functions", status: "in-progress" },
  { id: "3", title: "Closures", status: "struggling" },
  { id: "4", title: "Promises / Async", status: "not-started" },
  { id: "5", title: "DOM Manipulation", status: "not-started" },
];

export default function SkillMap() {
  const getStatusIcon = (status: ConceptStatus) => {
    switch (status) {
      case "proficient":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Disc3 className="h-5 w-5 text-primary" />;
      case "struggling":
        return <Disc3 className="h-5 w-5 text-warning" />;
      case "not-started":
        return <Circle className="h-5 w-5 text-border" />;
    }
  };

  return (
    <div className="card p-6">
      <h3 className="mb-4 text-lg font-semibold text-primary">JavaScript Skill Map</h3>
      <ul className="space-y-4">
        {mockConcepts.map((concept) => (
          <li key={concept.id} className="flex items-center gap-3">
            {getStatusIcon(concept.status)}
            <span
              className={`text-sm ${
                concept.status === "not-started" ? "text-secondary" : "text-primary"
              }`}
            >
              {concept.title}
            </span>
            <span className="ml-auto text-xs font-medium uppercase tracking-wider text-secondary">
              {concept.status.replace("-", " ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}