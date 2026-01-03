// caseStudyData.tsx

type LineColor = 'red' | 'blue' | 'purple' | 'green';

interface Stop {
  station_name: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  quoteImage?: string;
  insights?: string[];
  impact?: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
  };
  images?: string[];
}

export interface CaseStudyData {
  id: string;
  title: string;
  line_color: LineColor;
  destination: string;
  peeks: string[];
  before?: string;
  after?: string;
  background: string;
  overview: string;
  stops: Stop[];
}

export const allCaseStudies: CaseStudyData[] = [
  {
    id: "logs",
    title: "Logs: Rags to Riches",
    line_color: "red",
    destination: "Cut troubleshooting from hours to 10 minutes",
    peeks: [
          '/images/rags/fields.png',
          '/images/rags/gap3.png',
          '/images/rags/gap1.3.png'
        ],
    before: '/images/rags/before.png',
    after: '/images/rags/after.png',
    background: "Before LogicMonitor had acquired (and properly integrated) a logs product, users were forced to jump between disconnected tools during critical moments. RaySearch Labs' Senior IT Solutions Engineer spent 50-60% of his time manually reviewing logs.",
    overview: "I joined and took over design for LogicMonitor Logs, helping users bridge the critical gap between knowing that something is wrong and solving the problem. Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product that LogicMonitor itself relied on.",
    
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "I led recurring user research sessions, conducting Zoom interviews and analyzing users' current workflows to understand where our product was failing. Working with customers like RaySearch Labs (who develop pioneering cancer treatment software), I discovered three critical gaps.",
        quote: "I needed to see my entire environment from a single pane of glass. To monitor everything on the network, whether it be a server to a workstation to a piece of networking equipment.",
        quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
        quoteImage: "/images/rags/burriss.png",
        insights: [
          "Disconnected Tools: Critical troubleshooting moments are only more stressful when you have siloed apps, forced to juggle various tools and processes",
          "Inefficient Filtering: Competitors offered advanced search, while our users react: 'Why is LM Logs search so small? I don't expect a diet logs product'",
          "Raw Data Overload: Without proper and integrated visualizations, the benefit of LM Logs was buried"
        ],
      },
      {
        station_name: "Unified Platform",
        phase: "Ideate",
        content: "I designed seamless workflows connecting logs across the platform. Added logs widgets capabilities to dashboards, made logs visible alongside device and service data, and displayed anomalous logs available within alerts. LogicMonitor allows its users to access a plethora of tools to help monitor their infrastructure.",
        images: [
          "/images/rags/gap1.1.png",
          "/images/rags/gap1.2.png",
          "/images/rags/gap1.3.png"
        ]
      },
      {
        station_name: "Empowered Search",
        phase: "Ideate",
        content: "I expanded the size of the search bar and added recent searches, in-line errors, type-ahead, and stateful search (edited vs searching vs searched). I gave both novice and expert users deeper control over filtering by emphasizing and injecting features into search, including a prominent search box and intuitive fields panel.",
        quote: "I like a big search box and inline support is super helpful.",
        quoteAuthor: "NOC Engineer at HyeTech Networks"
      },
      {
        station_name: "Visual Analytics",
        phase: "Prototype",
        content: "I transformed raw log data into actionable insights through visual analytics. Designed multiple graph types, advanced query operators (count, avg, sum, min, max), and dashboard integration. RaySearch could have a dashboard on a TV in their office—a spike in errors would be obvious and immediately easy to assess.",
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product that LogicMonitor itself relied on. LogicMonitor did not use its own logs product until my team and I improved and integrated it enough to achieve all its needs.",
        quote: "We had users complaining that there was a licensing error. Using LogicMonitor's platform, including LM Logs, we were able to trace the issue and do a stop service on a server way down the line. The process took about 10 minutes versus the two to three hours it would have taken without the visibility.",
        quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
        impact: {
          metric1: "2-3 hours → 10 minutes",
          label1: "Issue Resolution Time",
          metric2: "One Powerful Tool",
          label2: "Engineers solve complex issues without tool-jumping"
        }
      }
    ]
  },
  // ... other case studies (alerts, data, team, future, health) omitted for brevity in this new file
];
