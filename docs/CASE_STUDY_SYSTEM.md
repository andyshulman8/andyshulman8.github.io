# Case Study System

This document explains how the portfolio case studies are structured, rendered, and navigated.  
It’s intended for content editors, designers, and engineers who need to understand the underlying system.

## Philosophy

- **Show, don’t tell:** Visuals take priority over walls of text.  
- **Scannable:** Short paragraphs, clear headers, bullets.  
- **Human-centered:** Real problems, real customers, real constraints.  
- **Process + Outcome:** Not just what was done, but why it mattered.  

## Data Structure

Each case study follows the same schema:

```ts
interface CaseStudyData {
  id: string;
  title: string;
  line_color: LineColor;
  destination: string;
  peeks: (string | {src: string, type: string})[];
  //The type field is more specific in the actual code. It's \'image\' | \'video\', not just string. See <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/pages/casedata.tsx">src/pages/casedata.tsx</traycer-file> line 35

  allImpact?: {metric: string, label: string}[];
  before?: string;
  after?: string;
  background: string;
  overview: string;
  stops: Stop[];
}
```

### Stop Schema

```ts
interface Stop {
  station_name: string;
  subtitle?: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  quoteImage?: string;
  insights?: string[];
  features?: {title: string; description: string}[];
  numberedFeatures?: {title: string; description: string}[];
  callout?: string;
  impact?: {metric1: string, label1: string, ...};
  //The actual interface is more structured with metric1/label1, metric2/label2, and optional metric3/label3. See <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/pages/casedata.tsx">src/pages/casedata.tsx</traycer-file> lines 19-26
  images?: string[];
}
```

Rendering Logic
---------------

-   **Overview view:** Shows background, peeks carousel, impact metrics, before/after.

-   **Journey view:** Linear progression through stops with a progress bar.

-   **Navigation flows:** Homepage → Case Study Overview → Stop → Overview.

### Special Components

-   `NumberedFeatures`: Ordered lists of features.

-   `VisionTimeline`: Timeline for "Imagining the Future" case study.

-   `CalloutBox`: Highlighted insights supporting markdown links.

Adding a New Case Study
-----------------------

1.  Add entry to homepage cards.
<!-- Comment: More specifically, add entry to <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/data/caseStudies.ts">src/data/caseStudies.ts</traycer-file> which defines the CaseStudy interface used for homepage cards -->


2.  Add full data in `casedata.tsx` following the schema.
<!-- Comment: The actual file path is <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/pages/casedata.tsx">src/pages/casedata.tsx</traycer-file>, not just casedata.tsx -->


3.  Update `viewToIndex` mapping.
<!-- Comment: This mapping is in <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/components/CaseStudyWrapper.tsx">src/components/CaseStudyWrapper.tsx</traycer-file> lines 7-9 -->


4.  Add images to `/public/images/{caseId}/`.

5.  Test routing (`/{caseId}` and `/{caseId}/{stopIndex}`).