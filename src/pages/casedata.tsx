// caseStudyData.js

// 1. Define the types here so this file knows what they are
type LineColor = 'red' | 'blue' | 'purple' | 'green';

interface Stop {
  station_name: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  insights?: string[];
  impact?: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
  };
}

export interface CaseStudyData {
  id: string;
  title: string;
  line_color: LineColor; // This is the key part!
  destination: string;
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
    background: "Before LogicMonitor had acquired (and properly integrated) a logs product, users were forced to jump between disconnected tools during critical moments. RaySearch Labs' Senior IT Solutions Engineer spent 50-60% of his time manually reviewing logs.",
    overview: "I joined and took over design for LogicMonitor Logs, helping users bridge the critical gap between knowing that something is wrong and solving the problem. Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product that LogicMonitor itself relied on.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "I led recurring user research sessions, conducting Zoom interviews and analyzing users' current workflows to understand where our product was failing. Working with customers like RaySearch Labs (who develop pioneering cancer treatment software), I discovered three critical gaps.",
        quote: "I needed to see my entire environment from a single pane of glass. To monitor everything on the network, whether it be a server to a workstation to a piece of networking equipment.",
        quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
        insights: [
          "Disconnected Tools: Critical troubleshooting moments are only more stressful when you have siloed apps, forced to juggle various tools and processes",
          "Inefficient Filtering: Competitors offered advanced search, while our users react: 'Why is LM Logs search so small? I don't expect a diet logs product'",
          "Raw Data Overload: Without proper and integrated visualizations, the benefit of LM Logs was buried"
        ]
      },
      {
        station_name: "Unified Platform",
        phase: "Ideate",
        content: "I designed seamless workflows connecting logs across the platform. Added logs widgets capabilities to dashboards, made logs visible alongside device and service data, and displayed anomalous logs available within alerts. LogicMonitor allows its users to access a plethora of tools to help monitor their infrastructure.",
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
  {
    id: "alerts",
    title: "Smarter Alerts",
    line_color: "purple",
    destination: "30% reduction in alert fatigue",
    background: "Schneider Electric, a 160-year-old global leader in energy management trusted by Google and Amazon, had IT teams surrounded by noise: juggling 17,000 daily alerts, manually troubleshooting repetitive issues, and losing valuable hours to false alarms and reactive monitoring.",
    overview: "With 25,000+ network devices and a rapidly expanding cloud environment, tool sprawl and alert fatigue had become major obstacles. I designed new alert types, query tracking capabilities, and laid the foundation for Edwin AI—ultimately contributing to LogicMonitor's 2025 partnership with IBM and Red Hat on AI-driven, self-healing infrastructure.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "Through interviews, testing, and journey mapping with a recurring loop of 30+ LogicMonitor customers, three key challenges emerged: Alert Fatigue (thousands of daily alerts buried critical issues), Slow Troubleshooting (engineers spent hours diagnosing incidents—even repeated ones), and Reactive Monitoring (teams discovered problems only after they escalated).",
        quote: "We're like headless chickens running around. If you spend your efforts in different directions, the chances of them negating or canceling out are greater.",
        quoteAuthor: "Sankeet Lokhande, Senior Engineer at Schneider Electric",
        insights: [
          "Alert Fatigue: Thousands of daily alerts buried critical issues in noise",
          "Slow Troubleshooting: Engineers spent hours diagnosing incidents—even repeated ones",
          "Reactive Monitoring: Teams discovered problems only after they escalated"
        ]
      },
      {
        station_name: "Smarter Alerts",
        phase: "Define",
        content: "I introduced alert groups and 'stateful' alerts that clear automatically when issues resolve. Users could now choose between 3 alert types, build groups of alerts on the fly, group related alerts, define alert logic within time windows, and view all important alert information directly from their email.",
        insights: [
          "Users needed to know when getting way more logs of a certain type than normal",
          "Users needed to know when not receiving a certain log",
          "Instead of drowning in false positives, teams saw fewer, smarter alerts tied directly to actionable data"
        ]
      },
      {
        station_name: "Proactive Monitoring",
        phase: "Ideate",
        content: "Once the immediate noise problem was solved, I turned to helping teams prevent issues before they caused downtime. I designed Saved Views and Query Tracking, enabling users to save, share, and track search results as metrics over time—for example, automatically monitoring 404 error spikes.",
      },
      {
        station_name: "AI Foundation",
        phase: "Prototype",
        content: "Leadership asked me to extend this thinking platform-wide as they needed a unified alerts vision. I designed flows and defined troubleshooting principles: Make leveraging LM's tools seamless, provide clear one-click starting points, and serve value without hunting. This work became the foundation for Edwin AI.",
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "My initial alert designs became the end result built into Edwin AI. This work positioned LogicMonitor for their 2025 partnership with IBM and Red Hat on AI-driven, self-healing infrastructure. Schneider Electric's improvements freed up their time, energy, and infrastructure resources.",
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
    background: "In higher education, data security and compliance are mission-critical: breaches risk exposing student records, research data, and financial information. Loyola University of Maryland, serving over 17,000 students across multiple campuses, faced growing challenges as it transitioned to a virtualized network infrastructure.",
    overview: "To meet strict institutional and regulatory requirements, Loyola's Senior Systems Engineer Mike Dieter and IT team needed a secure, efficient way to collect and manage sensitive log data across a sprawling environment. I designed access control features, simplified log collection, and created a natural language translator to democratize log search.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "I led recurring user research sessions, conducting interviews and analyzing workflows to understand where our product was failing. Without proper access controls, one misconfigured permission could expose thousands of student health records or financial aid data: a career-ending mistake for someone like Mike and devastating for students and professors.",
        quote: "We had to manage logs from campus safety systems, VoIP devices, and servers, all with different requirements. Tech changes fast—our tools needed to keep up.",
        quoteAuthor: "Mike Dieter, Senior Systems Engineer at Loyola University of Maryland",
        insights: [
          "Access Control Limitations: Existing tools lacked granular permissions, creating potential exposure of sensitive student and staff data",
          "Log Collection Complexity: Collecting logs from diverse systems (VoIP, security, academic networks) was slow and error-prone"
        ]
      },
      {
        station_name: "Access Control",
        phase: "Define",
        content: "I designed Partitions: a feature that securely segregates log data so only authorized users have access. Mike could now store all the sensitive logs in a Partition, set up proper access control, and feel confident the logs have no way of getting in the wrong hands. I ran multiple research and validation cycles as we evolved LM's access control model.",
      },
      {
        station_name: "Simplified Collection",
        phase: "Ideate",
        content: "To help Loyola securely manage their evergrowing, complex environment, I designed pre-built templates for common log types, automating ingestion and reducing configuration errors. Users could easily bring in cloud or on-premises logs and instantly start monitoring from one single pane of glass instead of jumping to different platforms.",
        insights: [
          "Clear, pre-configured defaults",
          "Step-by-step forms with inline documentation",
          "Scalable structure for future log types"
        ]
      },
      {
        station_name: "Natural Language",
        phase: "Prototype",
        content: "As part of simplifying log search, I helped design a Natural Language translator, allowing users to write queries in plain English and click a button to see the technical syntax. Previously, users had to learn complex operators and log field structures. For Loyola, this meant Mike could confidently delegate log investigation to junior staff.",
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "By turning complex compliance requirements into intuitive workflows, I helped Loyola University protect data and operate with confidence as privacy laws and log types evolve. My work reinforced LogicMonitor's credibility in regulated enterprise environments.",
        quote: "For the University, IT infrastructure is evolving far faster in 3-5 years now than it did in the previous 5 years. What we really like about LogicMonitor is that it gives us the flexibility to adapt to those changes as it occurs.",
        quoteAuthor: "Mike Dieter, Senior Systems Engineer at Loyola University of Maryland",
        impact: {
          metric1: "90 seconds",
          label1: "WiFi controller diagnosis time",
          metric2: "$250K saved",
          label2: "Annual cost saving by consolidating to LM Logs"
        }
      }
    ]
  },
  {
    id: "team",
    title: "Empowered Team",
    line_color: "blue",
    destination: "3 piloted solutions in 12 weeks",
    background: "Align Technology, maker of Invisalign, wanted to improve its relationship with the dentists and orthodontists that fit, use, and sell their products. Their network of dental professionals needed support with their workloads and stronger relationships.",
    overview: "I led team leaders across the company to embed design thinking into their workflows: uncovering pain points, identifying insights, and rapidly prototyping solutions that could make a real difference, fast. I broke the group into 4 teams to ensure each participant was able to engage, and adapted my tools to fit the analytical culture of Align's global teams.",
    stops: [
      {
        station_name: "Teaching Research",
        phase: "Empathize",
        content: "To help Align's professionals, we first needed to determine their needs. I taught the team user interview techniques, then conducted remote interviews with Align's doctors while team members observed and took notes, building shared understanding. Through empathy maps and brainstorming, we identified surprises and made inferences.",
        quote: "Listening through the customer interviews clarified a reality for many of us.",
        quoteAuthor: "Practice Recovery Experiences concept team",
      },
      {
        station_name: "Teaching Reframing",
        phase: "Define",
        content: "Align's network of dental professionals ultimately needed a stronger village, a stronger community. I taught the team to reframe problems our interviewees faced. The team built their first design frames, learning to focus on needs rather than solutions.",
        quote: "The Design Thinking process provided us a way to design based on the customer needs.",
        quoteAuthor: "Practice Recovery Experiences concept team"
      },
      {
        station_name: "Brainstorming",
        phase: "Ideate",
        content: "After reframing problems our interviewees faced, I ran workshops where we brainstormed what would be effective to address the targets' needs, and how to make those things happen. I leveraged time-constrained sessions with various constraints, starting with a basic brainstorm around how we may achieve the game-changers each team landed on.",
        quote: "Building off of our group's ideas enabled synergy & ability to develop better concepts.",
        quoteAuthor: "IDS Staff Assign concept team"
      },
      {
        station_name: "Rapid Prototyping",
        phase: "Prototype",
        content: "Before building out our prototypes, I identified a question or two that we aimed to answer by testing each prototype. With a key question in mind, I brought each concept to the team to start brainstorming how we could answer those questions. We tested across media: built physical prototypes, surveys, a Facebook page, and even a popular podcast episode.",
        quote: "Quick testing could save the team and company time and energy to pressure test an idea long before we utilize resources to execute it completely - AGILITY!",
        quoteAuthor: "Delighted Doctor concept team"
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "I utilized worksheets to help the group organize our thoughts. 3 of the 5 concepts tested well, achieving the goal of my contract: provide solutions robust enough to pilot. I crafted a Theory of Change for each, as well as conducted a premortem. The impact extended beyond the pilots: Align brought me back for a second engagement to embed design thinking into their global culture transformation.",
        impact: {
          metric1: "17 professionals",
          label1: "Trained in design thinking",
          metric2: "3 of 5 concepts",
          label2: "Prototypes handed off to pilot"
        }
      }
    ]
  },
  {
    id: "future",
    title: "Imagining the Future",
    line_color: "green",
    destination: "100K+ visitors served since 2022",
    background: "The Exploratorium and SESI Lab needed to define and structure the theme 'Imagining the Future' for a new museum in Brazil, aligning 20 planned exhibits under one clear vision. The goal was to build confidence in underserved communities facing educational barriers and empower citizens to see themselves as capable of shaping their future.",
    overview: "I worked mostly independently with periodic input from exhibit developers. I synthesized research, strategy, and systems thinking into a shared creative direction for the SESI Lab team, creating a framework that would inspire every visitor to see themselves as capable of changing the future.",
    stops: [
      {
        station_name: "Audience Research",
        phase: "Empathize",
        content: "I considered both The Exploratorium's and SESI's brand goals, as well as the overall audience in cultural context. The stakeholders needed to create a distinctive museum experience blending social and physical science, design for repeat visits, and address systemic barriers like broken educational systems that leave people feeling powerless.",
      },
      {
        station_name: "Vision Definition",
        phase: "Define",
        content: "After learning about and empathizing with our stakeholders, I iterated to define the vision. I revised it from a generic 'cool future' to something timeless: 'A world in which every Brazilian has confidence in their ability to change the future.' Confidence is tied to workforce participation, entrepreneurship, and civic engagement.",
      },
      {
        station_name: "Theory of Change",
        phase: "Ideate",
        content: "For visitors who've been told 'you can't,' confidence doesn't come from one exhibit, it comes from an ecosystem. I facilitated ideation to map how exhibits could work together to shift that narrative. I created a theory of change to provide the framework for our exhibit, outlining key goals and measurable outcomes.",
      },
      {
        station_name: "Developer Toolkit",
        phase: "Prototype",
        content: "I built a 6-step developer process that gave exhibit creators the creative freedom they needed while keeping everything tied to our thematic goal. I also designed a decision-making framework to help the manager select the final 20 exhibits. I researched exhibits worldwide and compiled a reference library with methods and outcomes.",
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "I established key metrics and identified the optimal method of evaluation for the museum. I also conducted a pre-mortem analysis to identify potential risks and provided actionable next steps. Today the museum is thriving, having served 100,000+ visitors since opening in 2022.",
        quote: "In this creative environment, active participation is encouraged, and the central idea of [SESI Lab] is that learning occurs in a fun and interactive way.",
        quoteAuthor: "Fabio Gatti, SESI Lab visitor",
        impact: {
          metric1: "100,000+ visitors",
          label1: "Served since 2022 opening",
          metric2: "Framework for Impact",
          label2: "Exhibit developers now have direction rooted in inclusion"
        }
      }
    ]
  },
  {
    id: "health",
    title: "Health Frameworks",
    line_color: "purple",
    destination: "40% reduction in expert dependency",
    background: "Only 16-30% of people who could benefit from hearing aids actually use them due to stigma, cost, and overwhelming complexity. Meanwhile, 70 million Americans struggle with sleep. Bose saw an opportunity to bring its sound expertise to both hearing and sleep, but fragmented teams needed alignment.",
    overview: "I joined to help design hardware products and their apps. I learned how to align fragmented teams around user needs when the path forward wasn't clear, and how to identify and unify fragmented interaction patterns across hardware and software. Though the products were eventually discontinued, I built frameworks that team members took to their next roles.",
    stops: [
      {
        station_name: "Discovery",
        phase: "Empathize",
        content: "Working across two health-focused product lines revealed overlapping challenges: Expert access (audiologists and researchers critical but overextended), Unclear interaction flows (users left confused or embarrassed), and Constant change (business priorities shift often, making alignment difficult without a shared source of truth).",
        quote: "I stopped going to restaurants because I couldn't follow conversations.",
        quoteAuthor: "Hearing aid user",
      },
      {
        station_name: "Reduce Bottlenecks",
        phase: "Define",
        content: "To streamline collaboration across the Bose Health division, I created a centralized research tracker that improved visibility across design, research, and engineering. The tool included categorized research questions, clear ownership, and criteria for when to consult experts. This reduced expert dependency by 40%.",
        insights: [
          "Added 25 new research questions, categorized into 5 workstreams",
          "Defined when experts should be consulted vs. when teams should move forward independently",
          "Built tracker first in spreadsheets then in Trello for visibility and accountability"
        ]
      },
      {
        station_name: "Shared Understanding",
        phase: "Ideate",
        content: "I synthesized Bose's ethnographic research and organized findings across user journey stages: daily, weekly, and occasional interactions. Then I facilitated workshops to balance user needs, technical feasibility, and design consistency, transforming siloed efforts into coordinated decisions across hardware and software.",
      },
      {
        station_name: "Behavior Design",
        phase: "Prototype",
        content: "Sleep interventions require habit formation through tiny, easy behaviors with immediate feedback, not complex feature sets. I used Behavior Design methodology, considering for each feature: Desired Behavior, Make it Easier (reduce friction), and Projected Effectiveness. I also explored hardware interface designs balancing accessibility with discretion for stigmatized products.",
      },
      {
        station_name: "Launch & Impact",
        phase: "Test",
        content: "Not every product survives, but aligned teams navigate uncertainty better. When Bose exited health, the teams I worked with had shared language for user needs, research infrastructure that reduced rework, and frameworks that some took to their next roles. I delivered an On-Product UI Specification and taught Behavior Design practices across teams.",
        impact: {
          metric1: "40% reduction",
          label1: "Expert dependency through tracker system",
          metric2: "7 workshops",
          label2: "Built alignment across fragmented teams"
        }
      }
    ]
  },
];