/**
 * Alt text for case-study media, keyed by the image path used in casedata.tsx.
 * Add an entry here whenever a new image is added to a case study. Images
 * without an entry fall back to a generic label (see getImageAlt).
 * Portraits of quoted people are rendered with alt="" because the person's
 * name is printed next to them.
 */
export const IMAGE_ALT: Record<string, string> = {
  // Logs: Rags to Riches
  "/images/rags/win.webp":
    "LogicMonitor logs product web page headlined \"What teams unlock when logs are connected, not siloed\", with stats: 80% faster troubleshooting, 40% time savings, 99% noise reduction, 50% less expensive",
  "/images/rags/gap3.webp":
    "Logs page showing a bar chart of log volume over time above a table of aggregated log results",
  "/images/rags/gap1.3.webp":
    "Alert detail view with a selected alert and log anomaly charts and tables beneath it",
  "/images/rags/before.webp":
    "Before: the earlier Logs screen with a log volume bar chart and a table of raw log lines, one row selected",
  "/images/rags/after.webp":
    "After: the redesigned Logs screen with a fields panel, anomaly-marked log rows and a detail panel for the selected entry",
  "/images/rags/gap1.1.webp":
    "Settings-style form screen from the logs integration work, with input fields and option groups",
  "/images/rags/gap1.2.webp":
    "Resource view with a logs tab showing a log volume chart and a list of log entries with a detail panel",
  "/images/rags/logsInResources.webp":
    "Resource tree with a logs tab and a context menu offering to view a log message on the logs page",
  "/images/rags/logsquery.webp":
    "Log search screen with annotations pointing to the natural language query bar, recent history, safely separated logs, inline errors, a hideable fields panel and button state changes",
  "/images/rags/fields.webp":
    "Row of six fields panel states showing the filter list progressively expanding and refining",
  "/images/rags/donut.webp":
    "Aggregate logs view with a donut chart of log volume and a results table",

  // Smarter Alerts
  "/images/alerts/before.webp":
    "Before: an \"Add Alert Condition\" dialog over a long, dense list of alert conditions",
  "/images/alerts/after.webp":
    "After: the logs view with a bar chart of log volume and an alert condition form open beneath it",
  "/images/alerts/buried1.webp":
    "Dense user journey map with personas at the top and rows of tasks, thoughts and opportunities across stages, on color-coded sticky notes",
  "/images/alerts/buried2.webp":
    "Flow diagram titled \"Issue arises\" branching into the paths people take to investigate an alert, such as reading the alert message, opening dashboards or resource pages",
  "/images/alerts/buried3.webp":
    "Click-flow chart showing page views and click counts between alert and resource pages",
  "/images/alerts/NewLogAlert.webp":
    "New log alert form with a red highlight, next to a hand-drawn sketch of the alert configuration",
  "/images/alerts/proactive.webp":
    "Logs view with a saved views menu open and the Track query option highlighted",
  "/images/alerts/AI1.webp":
    "Journey map spanning seven stages with a satisfaction line and screenshots under each stage",
  "/images/alerts/AI2.webp":
    "Wireframe boxes grouping alert messages and resources that could be correlated into one alert",
  "/images/alerts/AI3.webp":
    "Incident view combining a summary, related alerts, metric charts and a topology of affected resources",
  "/images/alerts/AI4.webp":
    "Product mockup across screens with results: 23% less incident workload, over 2 hours saved per incident, 90% reduced alert noise, 60% reduction in MTTR, and up and running in under 1 day with production data",

  // Secure Data
  "/images/data/Access.webp":
    "Table of log partitions with retention periods and ingestion toggles",
  "/images/data/access2.webp":
    "Add Role wizard on the permissions step, showing View and Manage checkboxes for logs and traces",
  "/images/data/access3.webp":
    "Add Role wizard permissions step with log and trace permissions selected",
  "/images/data/access4.webp":
    "Add Role wizard permissions step with a long resource list for choosing which saved views and resources a role can access",
  "/images/data/napkin.webp":
    "Napkin-style diagram titled \"Streamlined Log Management\": AWS, Windows Event, Syslog and Kubernetes logs funnel into Unified Monitoring",
  "/images/data/logsource.webp":
    "Log source setup form with a dropdown listing sources such as Syslog, Windows Event Logging and Kubernetes",
  "/images/data/natural.webp":
    "Log search screen with a natural language query typed into the search bar, highlighted in red, above a log volume chart and results",

  // Empowered Team
  "/images/team/empathy.webp":
    "Sticky notes grouped under Say, Do, Think and Feel on a wall, with sorted notes for surprises, tensions and contradictions below",
  "/images/team/frame1.webp":
    "Frame template (\"We met... We were surprised to notice... We wonder if this means... It would be game changing to...\") filled in with sticky notes about a dentist",
  "/images/team/frame2.webp":
    "Second Frame template filled in with sticky notes about an orthodontist and virtual care",
  "/images/team/proto.webp":
    "\"Align Tasks Delegation Board\" prototype instructions with photos of sticky notes on a board and numbered steps",
  "/images/team/TOC2.webp":
    "Theory of Change table: ultimate outcome, intermediate outcomes and activities for Align's doctor-facing products",

  // Imagining the Future
  "/images/future/aud1.webp":
    "Concentric audience channels diagram: Team, Industry, Education and Public",
  "/images/future/aud2.webp":
    "Grid of stakeholder groups, including SESI, CNI, SENAI, school teachers, companies, young children and tradespeople",
  "/images/future/aud3.webp":
    "Slide titled \"Exploratorium: dedicated to awareness\" with vision statements and themes such as inclusion, evidence and teaching",
  "/images/future/aud4.webp":
    "Whiteboard covered in handwritten notes under the heading \"Imagining the Future\"",
  "/images/future/TOC.webp":
    "Theory of Change table linking activities, intermediate outcomes and the ultimate outcome that every visitor has confidence in their ability to change the future",
  "/images/future/feedback.webp":
    "Feedback loop diagram from reaching a new exhibit through engagement, learning, feeling empowered and wanting to learn more",
  "/images/future/toolkit1.webp":
    "Toolkit slide titled METHODS with icons and the words collaboration, inclusion, creativity, empathize, self discovery and literacy independence",
  "/images/future/toolkit2.webp":
    "Black METHODS slide listing practices under collaboration, develop a point of view, empathize, literacy independence, inclusion, creativity and inspire questions",
  "/images/future/toolkit3.webp":
    "Slide of relevant topics to acknowledge, including water, food production, deforestation, transportation, energy, programming and pollution",
  "/images/future/toolkit4.webp":
    "Slide of intermediate outcomes, such as helping visitors feel part of something bigger and teaching design and design thinking",

  // Health Frameworks
  "/images/health/sketch2.webp":
    "Hand-drawn pencil sketch of a wearable device concept on lined paper",
  "/images/health/stickies.avif":
    "Daily Routine chart of colored sticky notes on paper, intentionally blurred",
  "/images/health/LED.webp":
    "Table mapping system states to Bluetooth LED and battery LED blink patterns",
  "/images/health/sleep.webp":
    "Scenario spreadsheet grouping daily-use scenarios, with a note about a workshop that generated use scenarios, UI requirements and assumptions",
  "/images/health/UIDD.webp":
    "Blurred UX/UI requirements, needs and scenarios document with the note that engineering found it extraordinarily readable",

  // Home
  "/images/Home/process.webp": "Design process map",
  "/images/alerts/logsvid.mp4":
    "Looping, silent product demo video from the Smarter Alerts case study",
};

/** Returns descriptive alt text for a media path, or `fallback` if none is written. */
export const getImageAlt = (src: string, fallback: string): string =>
  IMAGE_ALT[src] ?? fallback;
