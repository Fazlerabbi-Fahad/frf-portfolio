export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  challenge: string;
  solution: string;
  live?: string;
  repo?: string;
  accent: "cyan" | "ember";
  metric: string;
};

export type CaseStudy = Project & {
  slug: string;
  year: string;
  role: string;
  highlights: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hrms-platform",
    title: "HRMS Platform",
    year: "2025",
    role: "Architect & full-stack engineer",
    blurb: "Enterprise human-resources system with payroll, leave and JWT-secured access.",
    stack: ["ASP.NET Core", "Angular", "EF Core", "SQL Server", "JWT"],
    challenge:
      "HR logic — payroll runs, leave accrual, role permissions — was tangled across the codebase, and concurrent edits to shared employee records were throwing EF Core concurrency exceptions in production.",
    solution:
      "Rebuilt on Clean Architecture with clear domain / application / infrastructure boundaries and a CQRS-style command-query split. Added optimistic concurrency tokens to resolve the race conditions, and isolated the payroll engine into its own module so salary logic could change without touching the rest of the system.",
    highlights: [
      "Clean Architecture with explicit layer boundaries",
      "Optimistic concurrency handling on shared records",
      "Modular payroll engine, independently testable",
      "JWT auth with role-based route protection",
    ],
    repo: "https://github.com/Fazlerabbi-Fahad",
    accent: "cyan",
    metric: "Clean Architecture",
  },
  {
    slug: "qismah-hub",
    title: "Qismah Hub",
    year: "2024",
    role: "Founder & full-stack engineer",
    blurb: "Print-on-demand operations dashboard tying together listings, orders and assets.",
    stack: ["React", "Node", "Express", "MongoDB"],
    challenge:
      "Running a print-on-demand brand across Amazon, Teepublic and Spreadshirt meant tracking listings and orders by hand across three dashboards — slow, error-prone, and impossible to get a single view of.",
    solution:
      "Built a unified MERN dashboard as one source of truth for products and order state, deployed on Firebase + Vercel. Centralized the asset library so designs and listings stayed in sync across channels.",
    highlights: [
      "Single source of truth across three sales channels",
      "Centralized asset and listing management",
      "Deployed on Firebase Hosting + Vercel API",
    ],
    live: "https://qismahhub.web.app",
    repo: "https://github.com/Fazlerabbi-Fahad",
    accent: "cyan",
    metric: "Deployed",
  },
  {
    slug: "salamiwala",
    title: "SalamiWala",
    year: "2024",
    role: "Full-stack engineer",
    blurb: "Full-stack marketplace experience with auth, listings and a responsive storefront.",
    stack: ["React", "Node", "Express", "MongoDB", "Vercel"],
    challenge:
      "A marketplace needs fast mobile browsing and secure sessions without a heavy framework getting in the way.",
    solution:
      "MERN build with JWT sessions, lazy-loaded routes and an image-optimized, mobile-first storefront. Kept the bundle lean so first paint stayed quick on slower connections.",
    highlights: [
      "JWT session handling",
      "Lazy-loaded routes, lean bundle",
      "Mobile-first responsive storefront",
    ],
    accent: "cyan",
    metric: "Mobile-first",
  },
  {
    slug: "ng-kickstart",
    title: "ng-kickstart",
    year: "2023",
    role: "Author & maintainer",
    blurb: "Published npm package — an opinionated Angular project starter.",
    stack: ["Angular", "TypeScript", "npm"],
    challenge:
      "Every new enterprise Angular app started with the same hours of boilerplate — folder structure, lint config, base patterns.",
    solution:
      "Packaged an opinionated, documented scaffold and published it to npm so the setup became a single command, reused across projects.",
    highlights: [
      "Published and versioned on npm",
      "Opinionated enterprise folder structure",
      "Reused across multiple production apps",
    ],
    repo: "https://github.com/Fazlerabbi-Fahad",
    accent: "cyan",
    metric: "Published to npm",
  },
];

export type TimelineItem = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const projects: Project[] = [
  {
    title: "HRMS Platform",
    blurb: "Enterprise human-resources system with payroll, leave and JWT-secured access.",
    stack: ["ASP.NET Core", "Angular", "EF Core", "SQL Server", "JWT"],
    challenge: "Payroll and leave logic spread across teams, with concurrency conflicts on shared records.",
    solution: "Clean Architecture with CQRS-style separation, optimistic concurrency handling, and a modular payroll engine.",
    repo: "https://github.com/Fazlerabbi-Fahad",
    accent: "cyan",
    metric: "Clean Architecture",
  },
  {
    title: "Qismah Hub",
    blurb: "Print-on-demand operations dashboard tying together listings, orders and assets.",
    stack: ["React", "Node", "Express", "MongoDB"],
    challenge: "Manual tracking of listings across Amazon, Teepublic and Spreadshirt.",
    solution: "Unified MERN dashboard with a single source of truth for products and order state.",
    live: "https://qismahhub.web.app",
    accent: "cyan",
    metric: "Deployed",
  },
  {
    title: "SalamiWala",
    blurb: "Full-stack marketplace experience with auth, listings and a responsive storefront.",
    stack: ["React", "Node", "Express", "MongoDB", "Vercel"],
    challenge: "Needed fast, mobile-first browsing with secure user sessions.",
    solution: "MERN stack with JWT sessions, lazy-loaded routes and an image-optimized storefront.",
    accent: "cyan",
    metric: "Mobile-first",
  },
  {
    title: "ng-kickstart",
    blurb: "Published npm package — an opinionated Angular project starter.",
    stack: ["Angular", "TypeScript", "npm"],
    challenge: "Repeated boilerplate setting up enterprise Angular apps.",
    solution: "A reusable, documented scaffold published to npm and used across projects.",
    repo: "https://github.com/Fazlerabbi-Fahad",
    accent: "cyan",
    metric: "Published to npm",
  },
];

export const timeline: TimelineItem[] = [
  {
    period: "Now",
    role: "Full-Stack Software Engineer",
    org: "PriyoShop · Dhaka",
    detail: "Distribution and inventory systems with Angular, ASP.NET Core, C# and SQL Server.",
  },
  {
    period: "Prior",
    role: "Software Engineer",
    org: "Kompass Technologies",
    detail: "Full-stack delivery across enterprise web applications.",
  },
  {
    period: "Building",
    role: "Founder",
    org: "Qismah Tees",
    detail: "A print-on-demand brand serving US buyers across dog-breed and disc-golf niches.",
  },
  {
    period: "Foundation",
    role: "BSc, Computer Science",
    org: "AIUB",
    detail: "Where the systems thinking started.",
  },
];

export const skillGroups = [
  { label: "Frontend", accent: "cyan", items: ["React", "TypeScript", "Angular", "TailwindCSS", "Framer Motion"] },
  { label: "Backend", accent: "cyan", items: ["Node", "Express", "ASP.NET Core", "C#"] },
  { label: "Data", accent: "cyan", items: ["MongoDB", "SQL Server", "EF Core"] },
  { label: "Craft", accent: "ember", items: ["Travel writing", "Photography", "Storytelling"] },
] as const;

export const clientFocus = [
  "Remote-first startups",
  "Agencies needing senior full-stack delivery",
  "Founders shipping their first product",
  "Teams modernizing legacy enterprise apps",
];

export const blogTeasers = [
  { title: "Breaking the build-but-never-ship loop", cat: "Engineering", read: "6 min" },
  { title: "Clean Architecture, honestly: when it helps", cat: "Architecture", read: "9 min" },
  { title: "What an OCR pipeline taught me about patience", cat: "Notes", read: "5 min" },
];

export const travelTeasers = [
  { album: "Bandarban", coords: "22.19°N, 92.21°E", tone: "Hills and low cloud." },
  { album: "Sajek Valley", coords: "23.38°N, 92.29°E", tone: "Above the clouds." },
  { album: "Cox's Bazar", coords: "21.43°N, 91.97°E", tone: "The longest beach." },
];
