// caseStudyData.js

// 1. Define the types here so this file knows what they are
type LineColor = 'red' | 'blue' | 'purple' | 'green';

interface Stop {
  station_name: string;
  subtitle?: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  quoteImage?: string;
  insights?: string[];
  features?: { title: string; description: string }[];
  numberedFeatures?: { title: string; description: string }[];
  callout?: string;
  impact?: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
    metric3?: string;
    label3?: string;
  };
  images?: string[];
}

export interface CaseStudyData {
  id: string;
  title: string;
  line_color: LineColor; // This is the key part!
  destination: string;
  peeks: (string | { src: string; type: 'image' | 'video' })[];
  allImpact?: { metric: string; label: string }[]
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
          '/images/rags/win.png',
          '/images/rags/gap3.png',
          '/images/rags/gap1.3.png'
        ],
    before: '/images/rags/before.png',
    after: '/images/rags/after.png',
    background: "When Systems Fail, Lives Are at Risk: RaySearch Labs' Senior IT Solutions Engineer spent 50-60% of his time manually reviewing logs. Before LogicMonitor had properly integrated a logs product, users were forced to jump between disconnected tools during critical moments.",
    overview: "I joined and took over design for LogicMonitor Logs, helping users bridge the critical gap between knowing that something is wrong and solving the problem. Owned end-to-end design for LM Logs acquisition integration; collaborated globally with engineering, PMs, technical writers, and a 10-person design team. Established LM Logs as a competitive player by overhauling search, visualizations, and product cohesion.",
    allImpact: [{ metric: "2-3 hrs → 10m", label: "Resolution Time" },
    // { metric: "1000+", label: "Customers Served" },
    { metric: "$250K", label: "Annual Tool Savings" }],
    stops: [
      {
        station_name: "Three Critical Gaps",
        subtitle: "Discovery",
        phase: "Empathize",
        content: "I led recurring user research sessions, conducting Zoom interviews and analyzing users' current workflows to understand where our product was failing. I discovered three critical gaps:",
        quote: "I needed to see my entire environment from a single pane of glass. To monitor everything on the network, whether it be a server to a workstation to a piece of networking equipment.",
        quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
        quoteImage: "/images/rags/burriss.png",
        numberedFeatures: [
          { title: "Disconnected Tools", description: "Critical troubleshooting moments are only more stressful with siloed apps; users were forced to juggle various tools and processes." },
          { title: "Inefficient Filtering", description: "Competitors offered advanced search — users asked: 'Why is LM Logs search so small? Where is my recent history?'" },
          { title: "Raw Data Overload", description: "Without diverse and integrated visualizations, the benefit of LM Logs was buried." }
        ],
        callout: "Our customers weren't the only ones suffering, LogicMonitor itself avoided using LM Logs, forcing us to spend on a competitor."
      },
      {
        station_name: "Gap 1",
        subtitle: "Solution: Unified Platform",
        phase: "Ideate",
        content: "LogicMonitor allows its users to access a plethora of tools to help monitor their infrastructure. I designed seamless workflows connecting logs across the platform so engineers like John at RaySearch didn't have to context switch in critical moments - a single pane of glass.",
        features: [
          { title: "Added logs widgets capabilities to dashboards", description: ""},
          { title: "Made logs visible alongside device and service data", description: ""},
          { title: "Display anomalous logs available within alert", description: ""}],
        images: [
          "/images/rags/gap1.1.png",
          "/images/rags/gap1.2.png",
          "/images/rags/gap1.3.png",
          "/images/rags/logsInResources.webp"
        ]
      },
      {
        station_name: "Gap 2",
        subtitle: "Solution: Empowered Search",
        phase: "Ideate",
        content: "Through competitive analysis, it was clear that search was the key to engineers finding the needle in the haystack. DataDog, Splunk, Sumologic, and more used queries to power almost everything else in Logs. I expanded the size of the search bar and added recent searches, in-line errors, type-ahead, and stateful search. I emphasized a prominent search box and an intuitive fields panel so both novice and expert users could find needles in haystacks.",
        quote: "I like a big search box and inline support is super helpful.",
        quoteAuthor: "NOC Engineer at HyeTech Networks",
        images: ["images/rags/logsquery.png", "images/rags/fields.png"]
      },
      {
        station_name: "Gap 3",
        subtitle: "Solution: Visual Analytics",
        phase: "Prototype",
        content: "RaySearch engineers had plenty of log data but no good way to actually find the specific logs that would help them. \n\n The goal was simple: make spikes, anomalies, and trends obvious enough that a team could put a dashboard on a monitor in their office and instantly spot when something looked off. No more scrolling through thousands of lines of text. \n\n Rather than reinventing visualization patterns, I leveraged LogicMonitor's existing design system for charts and graphs. This ensured consistency and reduced engineering complexity.",
        features: [
          { title: "Multiple Graph Types", description: "By providing options, users are now more empowered to understand patterns in their data." },
          { title: "Advanced Query Operators", description: "Count, avg, sum, min, and max operators enabled numerical analysis beyond keyword searches." },
          { title: "Dashboard Integration", description: "Logs widgets can be embedded in dashboards, helping correlate log data with system performance metrics." }
        ],
        images: ['images/rags/gap3.png', 'images/rags/donut.webp']
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product that LogicMonitor itself relied on. \n\nRaySearch develops pioneering software used by cancer clinics worldwide to plan and deliver radiation therapy safely and effectively. By simplifying complexity and integrating logs seamlessly into the platform, I helped ensure that cancer treatment software at RaySearch Labs runs reliably: ultimately supporting better patient care.",
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
  {
    id: "alerts",
    title: "Smarter Alerts",
    line_color: "purple",
    destination: "30% reduction in alert fatigue",
    peeks: [
          '/images/alerts/logsvid.mp4',
          // '/images/alerts/proactive.png',
          // '/images/alerts/AI4.png'
        ],
    before: '/images/alerts/before.png',
    after: '/images/alerts/after.png',
    background: "Schneider Electric, a 160-year-old global leader in energy management trusted by Google and Amazon, had IT teams surrounded by noise: juggling 17,000 daily alerts, manually troubleshooting repetitive issues, and losing valuable hours to false alarms and reactive monitoring.",
    overview: "With 25,000+ network devices and a rapidly expanding cloud environment, tool sprawl and alert fatigue had become major obstacles. I designed new alert types, query tracking capabilities, and laid the foundation for Edwin AI—ultimately contributing to LogicMonitor's 2025 partnership with IBM and Red Hat on AI-driven, self-healing infrastructure.",
    allImpact: [{ metric: "40%", label: "reduction in alert noise" },
    // { metric: "1000+", label: "Customers Served" },
    { metric: "30 → 5", label: "tools for troubleshooting" }],
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "Through interviews, testing, and journey mapping with a recurring loop of 30+ LogicMonitor customers, three key challenges emerged:",
        quote: "We're like headless chickens running around. If you spend your efforts in different directions, the chances of them negating or canceling out are greater.",
        quoteAuthor: "Sankeet Lokhande, Senior Engineer at Schneider Electric",
        quoteImage: '/images/alerts/sankeet.png',
        features: [
          { title: "Alert Fatigue", description: "Thousands of daily alerts buried critical issues in noise" },
          { title: "Slow Troubleshooting", description: "Engineers spent hours diagnosing incidents, even repeated ones" },
          { title: "Reactive Monitoring", description: "Teams discovered problems only after they escalated" }
        ],
        images: ['images/alerts/buried1.png', 'images/alerts/buried2.png','images/alerts/buried3.png']
      },
      {
        station_name: "Smarter Alerts",
        phase: "Define",
        content: "Engineers needed two things that seemed contradictory: more control over their alerts, but less complexity in setting them up. I sketched and tested multiple approaches to ensure a clear alert configuration flow. Now that alerts could clean up after themselves, teams like Schneider Electric saw fewer, smarter alerts tied directly to actionable data. \n\n I introduced alert groups and 'stateful' alerts that clear automatically when issues resolve. Users could now choose between 3 alert types, build groups of alerts on the fly, group related alerts, define alert logic within time windows, and view all important alert information directly from their email.",
        features: [
          { title: "Spike Detection", description: "Users needed to know when getting way more logs of a certain type than normal" },
          { title: "Missing Log Detection", description: "Users needed to know when not receiving a certain log" },
          { title: "Reduce False Positives", description: "Instead of drowning in false positives, teams saw fewer, smarter alerts tied directly to actionable data" }
        ],
        images: ['images/alerts/newLogAlert.webp', 'images/alerts/NewLogAlert.png']
      },
      {
        station_name: "Proactive Monitoring",
        phase: "Ideate",
        content: "Once the immediate noise problem was solved, I turned to helping teams prevent issues before they caused downtime. I designed Saved Views and Query Tracking, enabling users to save, share, and track search results as metrics over time. \n\n Schneider used this to automatically track spikes in 404 errors and authentication failures across their global clusters.",
        images: ['images/alerts/proactive.png']
      },
      {
        station_name: "AI Foundation",
        phase: "Prototype",
        content: "Leadership asked me to extend this thinking platform-wide as they needed a unified alerts vision. I designed flows and defined troubleshooting principles: Make leveraging LM's tools seamless, provide clear one-click starting points, and serve value without hunting. This work became the foundation for Edwin AI.",
        images: ['images/alerts/AI1.png', 'images/alerts/AI2.png','images/alerts/AI3.png', 'images/alerts/AI4.png'],
        numberedFeatures: [
          { title: "Make deep investigation across LM's tools seamless and intuitive", description: "" },
          { title: "Provide a clear, one-click starting point for triage", description: "" },
          { title: "No hunting for value, value is served to you", description: "" }
        ],
        callout: "This work became the foundation for \"Edwin AI\" and positioned LogicMonitor for their [2025 partnership](https://www.logicmonitor.com/partners/ibm) with IBM and Red Hat on AI-driven, self-healing infrastructure."
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "Schneider Electric helps power some of the largest digital and energy ecosystems on the planet including Google and Amazon. My troubleshooting and LM Logs improvements freed up Schneider Electric's time, energy, and infrastructure resources meaning fewer redundant systems running, less compute power wasted, and faster response to issues that can impact energy systems worldwide. ",
        quote: "There’s been a constant change in the technology we manage today. We were really happy to see that LogicMonitor not only supported where we are today, but where we’re moving. The scalability was very simple.",
        quoteAuthor: "Arun Mandayam, IT Manager at Schneider Electric",
        quoteImage: '/images/alerts/arun.png',
        impact: {
          metric1: "30% reduction",
          label1: "Alert Noise Reduction",
          metric2: "One Tool",
          label2: "Engineers no longer tool-jump for troubleshooting"
        }
      }
    ]
  },
  {
    id: "data",
    title: "Secure Data",
    line_color: "purple",
    destination: "$250K annual savings for customers",
    peeks: [
          '/images/data/natural.webp',
          '/images/data/napkin.png',
          '/images/data/access4.png'
        ],
    background: "In higher education, data security and compliance are mission-critical: breaches risk exposing student records, research data, and financial information. Loyola University of Maryland, serving over 17,000 students across multiple campuses, faced growing challenges as it transitioned to a virtualized network infrastructure.",
    overview: "To meet strict institutional and regulatory requirements, Loyola's Senior Systems Engineer Mike Dieter and IT team needed a secure, efficient way to collect and manage sensitive log data across a sprawling environment. I designed access control features, simplified log collection, and created a natural language translator to democratize log search.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "Without proper access controls, one misconfigured permission could expose thousands of student health records or financial aid data: a career-ending mistake for someone like Mike and devastating for students and professors. Compliance management was complex, error-prone, and high-stakes. \n\n I led recurring user research sessions, conducting interviews and analyzing workflows to understand where our product was failing.",
        quote: "We had to manage logs from campus safety systems, VoIP devices, and servers, all with different requirements. Tech changes fast—our tools needed to keep up.",
        quoteAuthor: "Mike Dieter, Senior Systems Engineer at Loyola University of Maryland",
        features: [
          { title: "Access Control Limitations", description: "Existing tools lacked granular permissions, creating potential exposure of sensitive student and staff data" },
          { title: "Log Collection Complexity", description: "Collecting logs from diverse systems (VoIP, security, academic networks) was slow and error-prone" }
        ]
      },
      {
        station_name: "Access Control",
        phase: "Define",
        content: "I ran multiple research and validation cycles as we evolved LM's access control model. \n\nI designed Partitions: a feature that securely segregates log data so only authorized users have access. Mike could now store all the sensitive logs in a Partition, set up proper access control, and feel confident the logs have no way of getting in the wrong hands.",
        images: ['images/data/Access.png', 'images/data/access2.png','images/data/access3.png', 'images/data/access4.png'],
        
      },
      {
        station_name: "Simplified Collection",
        phase: "Ideate",
        content: "With secure boundaries established, the next problem was onboarding all those wildly different log types without human error. To help Loyola securely manage their evergrowing, complex environment, I designed pre-built templates for common log types, automating ingestion and reducing configuration errors.\n\nTo support user confidence, I simplified onboarding with:",
        features: [
          { title: "Clear, pre-configured defaults", description: "" },
          { title: "Step-by-step forms with inline documentation", description: "" },
          { title: "Scalable structure for future log types", description: "" }
        ],
        images: ['images/data/napkin.png', 'images/data/logsource.webp'],
        
      },
      {
        station_name: "Natural Language",
        phase: "Prototype",
        content: "As part of simplifying log search, I helped design a Natural Language translator, allowing users to write queries in plain English and click a button to see the technical syntax. Previously, users had to learn complex operators and log field structures. For Loyola, this meant Mike could confidently delegate log investigation to junior staff.",
        images: ['images/data/natural.webp'],
        
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "By turning complex compliance requirements into intuitive workflows with Partitions, templates, and Natural Language Search, I helped Loyola University protect data and operate with confidence as privacy laws and log types evolve. In addition to strengthening customer trust, my work also reinforced LogicMonitor’s credibility in regulated enterprise environments.",
        quote: "For the University, IT infrastructure is evolving far faster in 3-5 years now than it did in the previous 5 years. What we really like about LogicMonitor is that it gives us the flexibility to adapt to those changes as it occurs.",
        quoteAuthor: "Mike Dieter, Senior Systems Engineer at Loyola University of Maryland",
        impact: {
          metric1: "90 seconds",
          label1: "WiFi controller diagnosis time, down from 2+ hours",
          metric2: "$2-3K saved",
          label2: "Annual cost saving for Loyola",
          metric3: "Added flexibility",
          label3: "Quicker integration of new logs"
        }
      }
    ]
  },
  {
    id: "team",
    title: "Empowered Team",
    line_color: "blue",
    destination: "3 piloted solutions in 12 weeks",
    peeks: [
          '/images/team/frame1.png',
          '/images/team/proto.png',
          '/images/team/TOC2.jpeg'
        ],
    background: "Align Technology, maker of Invisalign, wanted to improve its relationship with the dentists and orthodontists that fit, use, and sell their products. Their network of dental professionals needed support with their workloads and stronger relationships.",
    overview: "I led team leaders across the company to embed design thinking into their workflows: uncovering pain points, identifying insights, and rapidly prototyping solutions that could make a real difference, fast. I broke the group into 4 teams to ensure each participant was able to engage, and adapted my tools to fit the analytical culture of Align's global teams.",
    stops: [
      {
        station_name: "Teaching Research",
        phase: "Empathize",
        content: "To help Align's professionals, we first needed to determine their needs. I taught the team user interview techniques, then conducted remote interviews with Align's doctors while team members observed and took notes, building shared understanding. Through empathy maps and brainstorming, we identified surprises and made inferences.",
        quote: "Listening through the customer interviews clarified a reality for many of us.",
        quoteAuthor: "Practice Recovery Experiences concept team",
        images: ["images/team/empathy.png"]
      },
      {
        station_name: "Teaching Reframing",
        phase: "Define",
        content: "Align's network of dental professionals ultimately needed a stronger village, a stronger community. I taught the team to reframe problems our interviewees faced. The team built their first design frames, learning to focus on needs rather than solutions.",
        quote: "The Design Thinking process provided us a way to design based on the customer needs.",
        quoteAuthor: "Practice Recovery Experiences concept team",
        images: ["images/team/frame1.png", "images/team/frame2.png"]
      },
      {
        station_name: "Brainstorming",
        phase: "Ideate",
        content: "After reframing problems our interviewees faced, I ran workshops where we brainstormed what would be effective to address the targets' needs, and how to make those things happen. I leveraged time constricted sessions with various constraints, starting with a basic brainstorm around how we may achieve the game-changers each team landed on.",
        quote: "Building off of our group's ideas enabled synergy & ability to develop better concepts.",
        quoteAuthor: "IDS Staff Assign concept team"
      },
      {
        station_name: "Rapid Prototyping",
        phase: "Prototype",
        content: "Before building out our prototypes, I identified a question or two that we aimed to answer by testing each prototype. With a key question in mind, I brought each concept to the team to start brainstorming how we could answer those questions. \n\nWe tested across media: built physical prototypes, surveys, a Facebook page, and even a (popular) podcast episode. After instructing the team on user testing, I sent the teams off to get results with real doctors who use Align. ",
        quote: "Quick testing could save the team and company time and energy to pressure test an idea long before we utilize resources to execute it completely - AGILITY!",
        quoteAuthor: "Delighted Doctor concept team",
        images: ["images/team/proto.png"]
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "What started as a one-off training became a movement: a culture shift that empowered professionals to think creatively and act empathetically. By scaling design thinking internally, Align accelerated its ability to identify and test new service ideas faster and with greater team buy-in.",
        impact: {
          metric1: "17 professionals",
          label1: "Trained in design thinking",
          metric2: "3 of 5 concepts",
          label2: "Prototypes handed off to pilot"
        },
        quote: "[4 years later:] We have made great progress on the design thinking front and working on a big program to reimagine billing - kicking the improvements we made into the next gear.",
        quoteAuthor: "VP of Customer Success at Align Technology, Volker Probst",
        quoteImage: "images/Home/volker.webp"
      }
    ]
  },
  {
    id: "future",
    title: "Imagining the Future",
    line_color: "green",
    destination: "100K+ visitors served since 2022",
    peeks: [
          '/images/future/aud4.jpeg',
          '/images/future/toolkit1.png',
          '/images/future/feedback.png'
        ],
    background: "The Exploratorium and SESI Lab needed to define and structure the theme 'Imagining the Future' for a new museum in Brazil, aligning 20 planned exhibits under one clear vision. The goal was to build confidence in underserved communities facing educational barriers and empower citizens to see themselves as capable of shaping their future.",
    overview: "I worked mostly independently with periodic input from exhibit developers. I synthesized research, strategy, and systems thinking into a shared creative direction for the SESI Lab team, creating a framework that would inspire every visitor to see themselves as capable of changing the future.",
    stops: [
      {
        station_name: "Audience Research",
        phase: "Empathize",
        content: "I considered both The Exploratorium's and SESI's brand goals, as well as the overall audience in cultural context. The stakeholders needed to create a distinctive museum experience blending social and physical science and design for repeat visits. In context, the overall needs boiled down to the following: ",
        images: ["images/future/aud1.png", "images/future/aud2.png", "images/future/aud3.png","images/future/aud4.jpeg"],
        features: [
          { title: "Build confidence", description: " in underserved communities facing educational barriers" },
          { title: "Empower citizens", description: "to see themselves as capable of shaping their future" },
          { title: "Address systemic barriers", description: "that leave people feeling, \"I'm just one person\" or, \"others are smarter\"" }
        ],
      },
      {
        station_name: "Vision Definition",
        phase: "Define",
        content: "After learning about and empathizing with our stakeholders, I iterated to define the vision. I revised it from a generic 'cool future' to something timeless: 'A world in which every Brazilian has confidence in their ability to change the future.' Confidence is tied to workforce participation, entrepreneurship, and civic engagement.",
      },
      {
        station_name: "Theory of Change",
        phase: "Ideate",
        content: "Leveraging my Stanford Graduate School of Business course experience, I created a theory of change to provide the framework for our exhibit, outlining key goals and measurable outcomes to ensure we stayed on track throughout the design process.",
        images: ["images/future/TOC.png"]
      },
      {
        station_name: "Developer Toolkit",
        phase: "Prototype",
        content: "I built a 6-step developer process that gave exhibit creators the creative freedom they needed while keeping everything tied to our thematic goal. I also designed a decision-making framework to help the manager select the final 20 exhibits. I researched exhibits worldwide and compiled a reference library with methods and outcomes.",
        images: ["images/future/toolkit1.png", "images/future/toolkit2.png", "images/future/toolkit3.png", "images/future/toolkit4.png"]
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "I established key metrics and identified the optimal method of evaluation for the museum. I also conducted a pre-mortem analysis to identify potential risks and provided actionable next steps. Today the museum is thriving, having served 100,000+ visitors since opening in 2022.",
        quote: "In this creative environment, active participation is encouraged, and the central idea of [SESI Lab] is that learning occurs in a fun and interactive way.",
        quoteAuthor: "Fabio Gatti, SESI Lab visitor",
        impact: {
          metric1: "100,000+ visitors",
          label1: "Served since 2022 opening",
          metric2: ">2000 Brazilian teachers",
          label2: "have learned new approaches to science through the new museum since opening in 2022"
        }
      }
    ]
  },
  {
    id: "health",
    title: "Health Frameworks",
    line_color: "purple",
    destination: "40% reduction in expert dependency",
    peeks: [
          '/images/health/sketch2.png',
          '/images/health/stickies.avif',
          '/images/health/LED.png'
        ],
    background: "Only 16-30% of people who could benefit from hearing aids actually use them due to stigma, cost, and overwhelming complexity. Meanwhile, 70 million Americans struggle with sleep. Bose saw an opportunity to bring its sound expertise to both hearing and sleep, but fragmented teams needed alignment.",
    overview: "I joined to help design hardware products and their apps. I learned how to align fragmented teams around user needs when the path forward wasn't clear, and how to identify and unify fragmented interaction patterns across hardware and software. Though the products were eventually discontinued, I built frameworks that team members took to their next roles.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "Working across two health-focused product lines revealed overlapping challenges:",
        quote: "I stopped going to restaurants because I couldn't follow conversations.",
        quoteAuthor: "Hearing aid user",
        features: [
          { title: "Expert access", description: "Audiologists and researchers are critical but often overextended." },
          { title: "Unclear interaction flows", description: "Users were left too confused or embarrassed to keep trying" },
          { title: "Constant change", description: "Business priorities in health shift often, making alignment difficult without a shared source of truth." }
        ],
      },
      {
        station_name: "Reduce Bottlenecks",
        phase: "Define",
        content: "To streamline collaboration across the Bose Health division, I created a centralized research tracker that improved visibility across design, research, and engineering. The tool included categorized research questions, clear ownership, and criteria for when to consult experts.",
        features: [
          { title: "Expanded Research", description: "Added 25 new research questions, categorized into 5 workstreams" },
          { title: "Consultation Guidance", description: "Defined when experts should be consulted vs. when teams should move forward independently" },
          { title: "Research Tracker", description: "Built tracker first in spreadsheets then in Trello for visibility and accountability" }
        ]
      },
      {
        station_name: "Shared Understanding",
        phase: "Ideate",
        content: "I synthesized Bose's ethnographic research and organized findings across user journey stages: daily, weekly, and occasional interactions. Then I facilitated workshops to balance user needs, technical feasibility, and design consistency, transforming siloed efforts into coordinated decisions across hardware and software.",
        images: ["images/health/stickies.avif"]
      },
      {
        station_name: "Behavior Design",
        phase: "Prototype",
        content: "Sleep interventions require habit formation through tiny, easy behaviors with immediate feedback, not complex feature sets. I used Behavior Design methodology, considering for each feature:",
        images: ["images/health/sleep.jpg", "images/health/UIDD.jpg"],
        features: [
          { title: " Desired Behavior", description: "What specific action should users take? (e.g., \"Set sleep reminder 30 min before bed\")" },
          { title: "Make it Easier (reduce friction)", description: "Reduce friction: pre-fill times, minimize taps, smart defaults" },
          { title: "Projected Effectiveness.", description: "Likelihood of habit formation based on barrier analysis" }
        ]
      },
      {
        station_name: "Impact",
        phase: "Test",
        content: "Not every product survives, but aligned teams navigate uncertainty better. When Bose exited health, the teams I worked with had shared language for user needs, research infrastructure that reduced rework, and frameworks that some took to their next roles.",
        impact: {
          metric1: "30+% reduction",
          label1: "reduction in expert dependency",
          metric2: "2",
          label2: "cross-functional workshops led"
        }
      }
    ]
  },
];