export interface Challenge {
  title: string;
  problem: string;
  difficulty: string;
  solution: string;
  tradeoffs: string;
}

export interface ArchitectureDiagramData {
  title: string;
  definition: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover: string;
  tags: string[];
  links: { label: string; href: string; external?: boolean }[];
  problem: {
    description: string;
    impact: string;
  };
  challenges: Challenge[];
  solution: {
    architecture: string;
    design: string;
    details: string;
  };
  gallery: { image: string; alt: string; caption: string }[];
  highlights: { title: string; description: string }[];
  lessons: {
    well: string;
    improve: string;
    learned: string;
  };
  youtubeUrl?: string;
  architectureDiagrams?: ArchitectureDiagramData[];
}

export const projects: ProjectData[] = [
  {
    slug: "ownex",
    title: "OwnEx Properties",
    category: "Real Estate SaaS & Production Infrastructure",
    summary:
      "A premium, full-stack real estate discovery storefront and administrative CRM engine. Built for an actual client and deployed to production, it implements custom client-side asset pipelines, technical SEO indexes, and event-driven routes to handle heavy media within serverless gateway constraints.",
    cover: "/assets/covers/ownex.png",
    tags: ["Next.js 15", "TypeScript", "MongoDB Atlas", "Mongoose", "Cloudinary CDN", "Web Workers", "Discord Webhooks"],
    links: [
      { label: "Live Application", href: "http://ownexproperties.com", external: true },
      { label: "GitHub Code", href: "#", external: true },
    ],
    problem: {
      description:
        "Luxury real estate brokerages operate in highly competitive, low-latency environments where lead acquisition velocity is directly tied to revenue. Standard real estate CRMs are clunky, slow to index property inventory in search engines, and crash silently when agents attempt to upload massive high-resolution property portfolios directly in the field.",
      impact:
        "Every second of delay in indexing a new multimillion-dollar listing is a lost organic search opportunity. Additionally, direct CRM crashes during photo uploads cause database desynchronization and halt brokerage operations.",
    },
    challenges: [
      {
        title: "Bypassing Serverless Payload Gateways (413 Content Too Large)",
        problem:
          "Vercel’s serverless hosting architecture strictly rejects incoming HTTP payloads exceeding 4.5MB at the reverse-proxy layer, causing multi-file high-res property photo uploads to fail instantly.",
        difficulty:
          "Increasing the Next.js standard body limit does not override physical reverse-proxy serverless limitations. Heavy server-side processing also spikes serverless execution budgets and costs.",
        solution:
          "Engineered a client-side Web Worker pipeline that intercepts file selections. The pipeline utilizes browser-image-compression in parallel threads via Promise.all() to compress high-res assets by over 80% directly on the client's hardware before appending the compressed binary payloads to the FormData transmission stream.",
        tradeoffs:
          "Slightly increases the client's local CPU utilization during file selection, but guarantees 100% upload success, saves massive CDN storage space, and cuts serverless egress bandwidth costs.",
      },
      {
        title: "Cross-Domain Brochure Rendering Restrictions",
        problem:
          "Cloudinary CDN serves PDF assets with forced Content-Disposition: attachment headers, making direct inline browser previews within the administrative dashboard impossible without launching local PDF viewer downloads.",
        difficulty:
          "Raw bucket URL manipulation is restricted. Compiling heavy WebAssembly PDF rendering libraries (like PDF.js) in the client bundle spikes loading weights by over 2.5MB.",
        solution:
          "Created a zero-dependency React preview wrapper that wraps the Cloudinary URL inside the Google Docs Viewer API, forcing native cross-domain rendering directly inside an iframe container.",
        tradeoffs:
          "Relies on an external Google rendering service, but completely avoids bundle-bloat, maintaining a lightning-fast dashboard load speed.",
      },
      {
        title: "Non-POJO Client-Server Serialization Crashes",
        problem:
          "Passing MongoDB document records containing ObjectId parameters directly from Next.js Server Components to interactive Lead Modals (Client Components) triggers strict network boundary serialization errors.",
        difficulty:
          "Manually mapping every schema record is tedious, prone to typing bugs during updates, and creates maintenance overhead.",
        solution:
          "Implemented a deep-cloning JSON.parse(JSON.stringify(data)) utility mapping all '_id' keys to standard interface strings before pushing data across the network boundary, ensuring schema integrity.",
        tradeoffs:
          "Wastes minor CPU cycles during deep cloning of massive datasets, which we mitigate by applying database select projections (.select() and .lean()) to prune document sizes.",
      },
    ],
    solution: {
      architecture:
        "OwnEx uses a modular Event-Driven Serverless architecture. The Next.js 15 App Router handles routes and dynamic server-side rendering (SSR), and Server Actions serve as secure, typed boundaries validating payloads via Zod schemas. Mongoose ODM handles document mapping to MongoDB Atlas. When actions write data (such as listing inquiries), the server fires parallel Webhooks pushing lead cards to Discord, serving as a zero-cost, zero-latency CRM.",
      design:
        "The public UI is designed with static routing fallbacks, while the sitemap generator dynamically queries MongoDB active listings at compile-time to merge static metadata with live listing URLs, guaranteeing instant Google Search Console indexing.",
      details:
        "Media is streamed directly from Web Worker compression threads to Server Actions, which stream the buffers to Cloudinary CDN, writing the resulting secure URLs back to MongoDB. This prevents the serverless functions from holding large files in memory.",
    },
    gallery: [
      {
        image: "/assets/ownex/ownex-homepage.png",
        alt: "OwnEx Public Storefront Homepage",
        caption: "Premium client-facing property discovery marketplace optimized for SEO and technical speed.",
      },
      {
        image: "/assets/ownex/property-listings-page.png",
        alt: "Filtered Property Listings Grid",
        caption: "Client-side search filters querying MongoDB listings using clean TypeScript schemas.",
      },
      {
        image: "/assets/ownex/property-details-page.png",
        alt: "Detailed Property Listing View",
        caption: "Property detail page showing gated lead brochure triggers that capture verified broker inquiries.",
      },
      {
        image: "/assets/ownex/admin-dashboard.png",
        alt: "Administrative Dashboard Controls",
        caption: "Interactive broker dashboard managing sitemaps, Cloudinary assets, and Web Worker uploads.",
      },
    ],
    highlights: [
      {
        title: "Production Deployment",
        description: "Successfully configured client domain DNS, custom email redirects, and continuous integration pipelines.",
      },
      {
        title: "Dynamic Technical SEO",
        description: "Automated sitemap mapping that updates sitemaps in real-time as listings are modified in the database.",
      },
      {
        title: "Lead Generation Gates",
        description: "Gated PDF document downloads that capture and validate user contact information before unlocking assets.",
      },
    ],
    lessons: {
      well: "The Web Worker image compression pipeline worked exceptionally well, saving several gigabytes of CDN storage costs and ensuring zero upload failures.",
      improve:
        "For large scale data, relying on full MongoDB text searches can become slow. Integrating a dedicated search index (like Meilisearch or Algolia) would optimize filtering speeds.",
      learned:
        "Deploying to production forces you to respect physical network and gateway limits that never appear in local host mockups. Architecture must be designed with constraints in mind.",
    },
    youtubeUrl: "https://youtu.be/txAcXIbsSuk",
    architectureDiagrams: [
      {
        title: "System Overview",
        definition: `flowchart LR
    Buyer((Public Buyer)) --> NextJS[Next.js Platform]
    Admin((Property Admin)) --> NextJS
    NextJS --> MongoDB[(MongoDB Atlas)]
    NextJS --> Cloudinary[Cloudinary CDN]
    NextJS --> Discord[Discord Webhooks]
    GoogleBot((Google Search Bot)) --> NextJS`,
      },
      {
        title: "Engineering Challenges",
        definition: `flowchart TB

User((Public Buyer))
Admin((Property Admin))
Bot((Googlebot))

UI[Next.js Platform]
Actions[Server Actions]

Mongo[(MongoDB)]
Cloudinary[Cloudinary CDN]
Discord[Discord Webhooks]

Compress[Web Worker Compression]
Sitemap[Dynamic Sitemap Engine]

User --> UI
Admin --> Compress
Compress --> Actions

Actions --> Cloudinary
Actions --> Mongo
Actions --> Discord

Bot --> Sitemap
Sitemap --> Mongo`,
      },
    ],
  },
  {
    slug: "behavior-insight-engine",
    title: "Behavior Insight Engine",
    category: "AI-Powered Data Pipeline & Observability",
    summary:
      "An AI-native internal dashboard prototype built to enrich unstructured financial transaction strings into formatted, categorized behavioral intelligence. Implements strict client-server boundaries, sliding-window Promise pools, and trace observability telemetry drawers.",
    cover: "/assets/covers/behavior-insight-engine.png",
    tags: ["React 19", "Gemini 2.5 Flash", "Zustand", "Zod Schemas", "Recharts", "PapaParse", "Print stylesheets"],
    links: [
      { label: "Live Application", href: "https://behavior-insight-engine.vercel.app", external: true },
      { label: "GitHub Code", href: "https://github.com/kaushik0010/behavior-insight-engine", external: true },
    ],
    problem: {
      description:
        "Financial transactions are exported as messy, unstructured strings (e.g. 'AMZN MKTP US*2A4L'). Traditional programmatic regex tools fail to normalize these because string variants are infinite, while LLMs are slow, hit rate limits, and make mathematical calculation errors when asked to aggregate columns.",
      impact:
        "Without reliable normalization, behavioral data analysts cannot extract spending habits or category velocities. Additionally, if the AI fails or returns invalid schemas, typical web dashboards crash.",
    },
    challenges: [
      {
        title: "Managing API Rate Limits during High-Throughput Batches",
        problem:
          "Uploading a CSV containing 100+ transactions sequentially takes minutes. However, pushing all 100 rows in one massive concurrent batch triggers immediate API rate limit rejections (429 Too Many Requests).",
        difficulty:
          "Traditional sequential requests are too slow for UX, but full concurrency crashes the pipeline.",
        solution:
          "Created a sliding-window Promise pool using a custom queue helper. The queue divides the transaction array into batches of 15, allowing a maximum of 3 concurrent network requests, progressively hydrating the Zustand state as each batch resolves.",
        tradeoffs:
          "Increases client memory footprint during live queue processing, but keeps transaction velocities high while avoiding rate limit blocks.",
      },
      {
        title: "AI Schema Hallucination & State Reliability",
        problem:
          "LLMs occasionally return JSON responses with missing keys or invalid data types, which causes client components rendering the grids to crash.",
        difficulty:
          "Writing dozens of manual try-catch logic statements for every JSON key is messy and unmaintainable.",
        solution:
          "Defined a strict Zod schema validating the structured JSON returned by the Gemini SDK. The Zod parse block sits at the API boundary; if the data is malformed, Zod throws, the catch block flags that specific row as FAILED, and the UI degrades gracefully without crashing the workspace.",
        tradeoffs:
          "Invalid AI responses are discarded instead of repaired, but the entire platform remains stable and responsive.",
      },
      {
        title: "Ensuring User Trust in Black-Box AI Processing",
        problem:
          "Data analysts refuse to trust AI-generated categorizations if they cannot audit how the decision was made.",
        difficulty:
          "Logging model outputs to standard developer terminals does not help the actual non-technical analyst checking the UI.",
        solution:
          "Built a slide-out Observability Telemetry drawer. Clicking any enriched row opens a drawer exposing the exact raw input, model reasoning strings, confidence scores, processing latency, and tracing IDs.",
        tradeoffs:
          "Requires the model to output a 'reasoning' string (which slightly increases token count and latency), but builds profound user trust.",
      },
    ],
    solution: {
      architecture:
        "The Behavior Insight Engine acts as a stateless, progressive workspace. A PapaParse helper handles CSV parsing on the client, pushing the raw rows to a Zustand state machine. The Zustand store orchestrates the Promise pool batches to Next.js API Routes. The API route calls the Gemini SDK, passing a strict response schema to force JSON output. The returned data passes through the Zod validation block before mutating the Zustand store and progressively rendering the UI grid.",
      design:
        "The system separates AI synthesis from math: Gemini only normalizes merchant names and categorizes strings. Programmatic JavaScript methods then handle category spend velocities and charts (Recharts), ensuring mathematical accuracy.",
      details:
        "To export data, custom CSS print stylesheets are set up. If a user clicks 'Export Report', the dark-mode layout automatically shifts to a high-contrast, ink-saving black-and-white grid template for printing.",
    },
    gallery: [
      {
        image: "/assets/behavior-insight-engine/main-page.png",
        alt: "Behavior Insight Ingestion View",
        caption: "Stateless workspace landing page featuring drag-and-drop CSV upload templates.",
      },
      {
        image: "/assets/behavior-insight-engine/dashboard.png",
        alt: "Progressive Enrichment Grid",
        caption: "Transaction table progressively hydrating live row states, classifications, and metrics.",
      },
      {
        image: "/assets/behavior-insight-engine/telemetry.png",
        alt: "Concurrency Telemetry Panel",
        caption: "Dashboard widgets indicating processing velocities, queues, and rate-limiting limits.",
      },
      {
        image: "/assets/behavior-insight-engine/observability.png",
        alt: "Observability Telemetry Drawer",
        caption: "Slide-out audit panel exposing raw model JSON schemas, confidence scores, and reasoning logs.",
      },
      {
        image: "/assets/behavior-insight-engine/synthesis.png",
        alt: "AI Behavioral Synthesis Profile",
        caption: "Enriched dataset parsed through a secondary LLM synthesis to detect consumer micro-habits.",
      },
      {
        image: "/assets/behavior-insight-engine/report.png",
        alt: "Print-Optimized PDF View",
        caption: "Custom CSS print stylesheets rendering an ink-efficient executive summary report.",
      },
    ],
    highlights: [
      {
        title: "Observability Telemetry",
        description: "Row-level logging exposing model inputs, outputs, confidence levels, and latencies.",
      },
      {
        title: "Concurrency Queue",
        description: "Sliding-window promise pool processing batches without triggering rate limits.",
      },
      {
        title: "Defensive Zod Boundaries",
        description: "Validating AI schemas at the API layer to trap hallucinations before state mutations.",
      },
    ],
    lessons: {
      well: "Separating AI classification from arithmetic worked perfectly—charts are 100% accurate, and merchants are clean.",
      improve:
        "For production scaling, this stateless queue must be migrated to a backend worker queue (like BullMQ/Redis) to persist state during browser disconnects.",
      learned:
        "AI applications must be designed defensively. You must expect the LLM to return garbage, write schemas to catch it, and build tools to audit its decisions.",
    },
    youtubeUrl: "https://youtu.be/3VQf3VlektQ",
    architectureDiagrams: [
      {
        title: "Behavior Intelligence Processing Pipeline",
        definition: `graph TD
    A[Raw CSV Upload] --> B[Ingestion & Parsing Layer]
    B --> C{Concurrent Batch Processor}

    subgraph AI Pipeline
        C -->|Raw Strings| D[Gemini Pass 1: Enrichment]
        D -->|JSON| E[Zod Validation]
        E --> F[Structured Transaction Dataset]
        F -->|Enriched Data| G[Gemini Pass 2: Synthesis]
    end

    G --> H[Behavioral Summary & Personas]
    F --> I[Deterministic Analytics Layer]

    I --> J[Aggregation & Metrics]

    H --> K[Insight Dashboard]
    J --> K

    K --> L[Exportable Intelligence Report]`,
      },
    ],
  },
  {
    slug: "kosh",
    title: "KOSH Group Ledger",
    category: "High-Integrity Collaborative Finance Protocol",
    summary:
      "A full-stack Susu-style collaborative savings platform. Engineered to enforce strict monthly contribution windows, automated late payment penalties, and state mutation locks to guarantee ledger consistency.",
    cover: "/assets/covers/kosh.png",
    tags: ["Next.js 15", "TypeScript", "MongoDB", "Mongoose", "NextAuth", "Tailwind CSS", "Resend API"],
    links: [
      { label: "Live Application", href: "https://kosh-pearl.vercel.app", external: true },
      { label: "GitHub Code", href: "https://github.com/kaushik0010/KOSH", external: true },
    ],
    problem: {
      description:
        "Traditional savings circles (like susu funds or chit funds) rely on social pressure and spreadsheets to collect monthly funds and distribute payouts. This is prone to human error, missed payments, lack of transparency, and administrative fraud.",
      impact:
        "If a member pays late or misses a month, the total pool shrinks, delaying payouts and causing social friction. If an admin deletes the group prematurely, members lose their capital.",
    },
    challenges: [
      {
        title: "Enforcing Strict Contribution Windows & Penalty Rules",
        problem:
          "Allowing members to pay anytime breaks the savings circle payout cycle. We needed to enforce scheduled monthly contribution windows and calculate late-payment penalty logic dynamically.",
        difficulty:
          "Handling timezone differences, leap years, and database triggers to calculate late penalties up to 40% without bloating database write processes.",
        solution:
          "Engineered schema logic where contribution windows are pre-calculated during campaign initialization. When a contribution is written, the schema computes the delta between the target window deadline and current timestamp, applying a sliding penalty if late.",
        tradeoffs:
          "Requires rigid campaign configuration during setup (members cannot edit deadlines mid-campaign), but guarantees financial integrity and prevents pool manipulation.",
      },
      {
        title: "Preventing Premature Capital Liquidation",
        problem:
          "If a group admin deletes their account or group database collections while capital is locked in active campaigns, members lose their funds.",
        difficulty:
          "Next.js API route handlers must block account deletion requests if active database links exist across different collections.",
        solution:
          "Implemented strict transactional database hooks. The deletion route verifies if a user owns groups with active campaigns. If true, the database throws, the server aborts the request, and forces the admin to liquidate the pool and delete the group first.",
        tradeoffs:
          "Increases code path complexity for deletion triggers, but enforces absolute security and zero-loss guarantees for user capital.",
      },
      {
        title: "NextAuth JWT Session Synchronization",
        problem:
          "When a user deposits money and updates their wallet balance, the NextAuth session JWT cookie does not update automatically, causing visual balance discrepancies.",
        difficulty:
          "Force-refreshing the browser is poor UX, while polling the database on every route wastes MongoDB read bandwidth.",
        solution:
          "Designed a custom JWT callback in NextAuth linked to a client-side Zustand store. State updates trigger NextAuth's update() method, synchronizing session state in the background without full-page reloads.",
        tradeoffs:
          "Increases client-side state synchronization logic, but creates a seamless, low-latency financial interface.",
      },
    ],
    solution: {
      architecture:
        "KOSH is engineered with a strict document schema mapping User, Wallet, Group, and Contribution collections. NextAuth manages session persistence via JWT tokens. Next.js API Routes validate mutations using Zod, writing records via Mongoose. The database schema enforces that contribution values write directly to the user's Wallet collection and the group's Campaign collection simultaneously, maintaining transaction logs.",
      design:
        "The admin coordinates the campaign lifecycle: member approval -> initialization -> active contribution windows -> final payout execution. This mirrors real-world traditional savings structures.",
      details:
        "Transactional consistency is enforced by Mongoose validation schemas, which guarantee that deposits cannot exceed wallet balances and withdrawal requests must match the exact payouts calculated by the penalty engine.",
    },
    gallery: [
      {
        image: "/assets/kosh/KOSH_Home_Page.png",
        alt: "KOSH Platform Homepage",
        caption: "Fintech landing page establishing platform trust, savings mechanics, and security parameters.",
      },
      {
        image: "/assets/kosh/dashboard.png",
        alt: "User Wallet & Campaign Overview",
        caption: "Personal wallet dashboard indicating transactional history, deposit actions, and active group cards.",
      },
      {
        image: "/assets/kosh/individual_savings_plan.png",
        alt: "Goal Creator Menu",
        caption: "Custom form allowing users to initialize private savings timelines with specific targets.",
      },
      {
        image: "/assets/kosh/create_group.png",
        alt: "Group Savings Configuration",
        caption: "Admin menu setting up savings circles, approval policies, and member invites.",
      },
      {
        image: "/assets/kosh/group_details.png",
        alt: "Active Campaign Workspace",
        caption: "Group interface displaying active contribution trackers, member status, and pending penalties.",
      },
      {
        image: "/assets/kosh/create_campaign.png",
        alt: "Campaign Timeline Settings",
        caption: "Lifecycle configuration menu setting up contribution windows and penalty caps.",
      },
    ],
    highlights: [
      {
        title: "Campaign State Machine",
        description: "Strict state flow transitions: Draft -> Active -> Closed -> Payout -> Liquidated.",
      },
      {
        title: "Contribution Schedules",
        description: "Scheduled monthly contribution windows calculating late payment penalties capped at 40%.",
      },
      {
        title: "Zero-Leak Mutability",
        description: "Mongoose database transactional rules preventing premature group deletion during active campaigns.",
      },
    ],
    lessons: {
      well: "Reframing the app around schema mechanics and state security worked perfectly, proving full-stack integrity during interviews.",
      improve:
        "Integrating real payment gateways (such as Stripe or Plaid) would make this a viable production SaaS, but requires legal and compliance registration.",
      learned:
        "State management in collaborative applications is difficult. Relational models in document databases require defensive validation to prevent data anomalies.",
    },
    architectureDiagrams: [
      {
        title: "Group Savings Campaign Lifecycle",
        definition: `flowchart TD

    User[User] --> Group[Join Group]
    Group --> Campaign[Group Campaign]

    Campaign --> Schedule[Contribution Scheduler]

    Schedule --> Contribution{Contribution Made?}

    Contribution -->|Yes| Wallet[Campaign Savings Pool]
    Contribution -->|No| Penalty[Penalty Engine]

    Penalty --> Wallet

    Wallet --> Progress[Campaign Progress Tracking]

    Progress --> Completion{Campaign Complete?}

    Completion -->|No| Schedule

    Completion -->|Yes| Distribution[Fund Distribution Engine]

    Distribution --> Members[Group Members]

    Members --> Dashboard[User Dashboard]

    Dashboard --> Analytics[Savings Insights & History]`,
      },
    ],
  },
];
