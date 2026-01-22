export interface CaseStudy {
  id: string;
  name: string;
  year: number;
  line: string;
  color: string;
  thumbnail: string;
  tagline: string;
  impact: string;
  methodology: string;
  route: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "logs",
    name: "Logs: Rags to Riches",
    year: 2025,
    line: "Red Line",
    color: "#E53935",
    thumbnail: "/images/Home/Thumbs/1.webp",
    tagline: "From niche add-on to flagship product",
    impact: "Cut troubleshooting from hours to 10 minutes",
    methodology: "Stanford d.school",
    route: [
      "User Interviews",
      "Empathy Maps",
      "Define Problem",
      "Converge",
      "Build Prototype",
      "Test",
    ],
  },
  {
    id: "alerts",
    name: "Smarter Alerts",
    year: 2025,
    line: "Purple Line",
    color: "#8E24AA",
    thumbnail: "/images/Home/Thumbs/2.webp",
    tagline: "Cut alert noise 30% and laid AI foundation",
    impact: "30% reduction in alert fatigue",
    methodology: "Behavior Design",
    route: [
      "User Interviews",
      "Clarify Outcome",
      "Simplify Behavior",
      "Make Easier",
      "Build Flows",
      "Test",
    ],
  },
  {
    id: "data",
    name: "Secure Data",
    year: 2025,
    line: "Red + Green Lines",
    color: "#43A047",
    thumbnail: "/images/Home/Thumbs/loyola.webp",
    tagline: "Protected 17,000 students with AI-powered search",
    impact: "Future-proofed log management for compliance",
    methodology: "Mixed Route",
    route: [
      "User Interviews",
      "Define Problem",
      "Identify Causes",
      "Design Mechanisms",
      "Build Prototype",
      "Test",
    ],
  },
  {
    id: "team",
    name: "Empowered Team",
    year: 2020,
    line: "Blue Line",
    color: "#1E88E5",
    thumbnail: "/images/Home/Thumbs/align.webp",
    tagline: "Scaled design thinking across 17 global leaders",
    impact: "3 piloted solutions in 12 weeks",
    methodology: "Business Strategy",
    route: [
      "User Interviews",
      "Map System",
      "Identify Levers",
      "Brainstorm",
      "Shape Strategy",
      "Test",
    ],
  },
  {
    id: "future",
    name: "Imagining the Future",
    year: 2019,
    line: "Green Line",
    color: "#43A047",
    thumbnail: "/images/Home/Thumbs/sesi.webp",
    tagline: "Built confidence framework into new museum",
    impact: "100K+ visitors since 2022",
    methodology: "Sustainability",
    route: [
      "User Interviews",
      "Map System",
      "Identify Causes",
      "Shape Strategy",
      "Evaluation Plan",
      "Test",
    ],
  },
  {
    id: "health",
    name: "Health Frameworks",
    year: 2019,
    line: "Purple + Blue Lines",
    color: "#8E24AA",
    thumbnail: "/images/Home/Thumbs/bose.webp",
    tagline: "Aligned fragmented health teams under uncertainty",
    impact: "40% reduction in expert dependency",
    methodology: "Mixed Route",
    route: [
      "User Interviews",
      "Clarify Outcome",
      "Map System",
      "Build Prototype",
      "Test",
    ],
  },
];
