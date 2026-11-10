// Edit this file to add your projects, skills, and contact links.

const siteConfig = {
  name: "Visions Creative LLC",
  email: "sophia.fay.f@gmail.com",
  calendarBookingUrl:
    "https://calendar.google.com/calendar/u/0/r/eventedit?text=Project+call+with+Visions+Creative+LLC&add=sophia.fay.f@gmail.com&details=A+short+intro+call+about+a+new+website.+Email:+sophia.fay.f@gmail.com",
  kicker: "Design, engineering, and delivery",
  title: "Visions Creative LLC | Websites for businesses",
  description:
    "Visions Creative LLC designs, builds, and launches websites for shops, practices, and organizations.",
  linkedinUrl: "https://www.linkedin.com/in/sophia-feldman/",
  headline: "Websites that work.",
  headlineLines: ["Websites", "that work."],
  tagline: "I design, build, and launch.",
  work: {
    title: "Projects",
    desc: "",
  },
  contact: {
    title: "Contact",
    desc: "",
    links: [
      { label: "sophia.fay.f@gmail.com", type: "email", value: "sophia.fay.f@gmail.com" },
      { label: "Book a call", type: "calendar" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sophia-feldman/" },
    ],
  },
};

const categoryLabels = {
  entrepreneurship: "Entrepreneurship",
  web: "Web",
  pm: "PM",
  consulting: "Consulting",
  ai: "AI",
  education: "Education",
  internship: "Internship",
};

const timelineEntries = [
  {
    dateLabel: "2026",
    sortDate: "2026-09-20",
    category: "web",
    title: "Visions Studio",
    organization: "Founder · visionsstudio.us",
    summary: "Founder-built full-stack shop: Stripe, webhooks, GA, Search Console.",
    impact: "Live store on a custom domain with real sales and marketing I run myself.",
    projectIndex: 1,
  },
  {
    dateLabel: "August 2026",
    sortDate: "2026-09-19",
    category: "web",
    title: "Path to Peace Psychotherapy",
    organization: "Client work",
    summary: "Migrated a therapy practice off Squarespace to Next.js and Vercel.",
    impact: "Lower hosting costs and a Postmark inquiry flow for new patient requests.",
    projectIndex: 0,
  },
  {
    dateLabel: "September 2026",
    sortDate: "2026-09-01",
    category: "web",
    title: "Bread Breakers",
    organization: "Full-stack client build",
    summary: "Rebuilt site plus a staff dashboard for events, blog posts, and user access.",
    impact: "The team runs events and the blog themselves, no code required.",
    projectIndex: 4,
  },
  {
    dateLabel: "2026",
    sortDate: "2026-08-15",
    category: "ai",
    title: "ISAT Advising Agent",
    organization: "Agentic AI · James Madison University",
    summary: "Live RAG chatbot with LangGraph, pgvector, and Next.js.",
    impact: "Grounded answers from official docs instead of generic LLM output.",
    projectIndex: 3,
  },
  {
    dateLabel: "2025-2026",
    sortDate: "2025-09-01",
    category: "pm",
    title: "E3 Sponsor Database",
    organization: "Madison Consulting Club · Empowerment3",
    summary: "Led a three-person team on a sponsor CRM for Empowerment3.",
    impact: "One searchable database with template outreach replaced scattered records.",
    projectIndex: 2,
  },
  {
    dateLabel: "Summer 2025",
    sortDate: "2025-06-01",
    category: "ai",
    title: "Software Development Intern",
    organization: "Advocara",
    summary: "Multimodal LLM pipeline for medical bill parsing.",
    impact: "Reconciled OCR, vision-language, and source docs; smoke tests at 70% coverage.",
    tools: ["Python", "OpenAI API", "OCR", "Vision-language models", "LLM pipelines", "Testing"],
  },
  {
    dateLabel: "Summer 2024",
    sortDate: "2024-06-01",
    category: "internship",
    title: "Administrative Technology Assistant",
    organization: "Advocara",
    summary: "GitHub repos and project structure for a nonprofit dev team.",
    impact: "Cleaner version control so the team could ship faster.",
    tools: ["Git", "GitHub", "Repo setup", "Documentation"],
  },
  {
    dateLabel: "2020-2022",
    sortDate: "2020-03-01",
    category: "entrepreneurship",
    title: "Founded Visions Clothing",
    organization: "Visions Studio",
    summary: "Designed, sewed, and sold handmade pieces online.",
    impact: "$1,500+ across 36 sales. That is where Visions Studio started.",
    tools: ["E-commerce", "Brand", "Product design", "Fulfillment"],
  },
];

const projects = [
  {
    title: "Path to Peace Psychotherapy",
    context: "Client work",
    client: "Path to Peace Psychotherapy",
    year: "August 2026",
    projectType: ["Website", "Client Work"],
    role: ["Web development", "Deployment"],
    featuredOnClientGrid: true,
    featuredOrder: 1,
    gridTags: ["websites"],
    kicker: "Website",
    clientTeaser: "A therapy practice site. New inquiries actually arrive.",
    clientBlurb:
      "A trauma therapy practice in Reston, VA. I moved them off Squarespace, cut the monthly bill, and built a contact form that actually reaches the office.",
    summary:
      "Production site for a trauma therapy practice in Reston, VA.",
    detail:
      "They were on Squarespace and paying every month for a template they couldn't really change. I rebuilt the site in <strong>Next.js</strong>, moved it to <strong>Vercel</strong>, and wired up <strong>Postmark</strong> so new patient inquiries go through a flow the practice can rely on.",
    Task: "Migrate from Squarespace to Vercel and build a contact flow with Postmark.",
    Impact:
      "Cut hosting costs and replaced a flaky inquiry form with a Postmark email flow that actually delivers.",
    tools: ["Next.js", "Vercel", "Postmark API", "JavaScript"],
    liveUrl: "https://path2-peace.vercel.app/",
    githubUrl: "https://github.com/SophiaFeld1/Path2Peace",
    image: "assets/path-to-peace-preview.png",
  },
  {
    title: "Visions Studio",
    context: "Visions Studio",
    client: "Visions Clothing",
    year: "2026",
    projectType: ["E-commerce", "Full-stack", "Founder-led"],
    role: ["Founder", "Full-stack development", "Marketing"],
    featuredOnClientGrid: true,
    featuredOrder: 3,
    gridTags: ["ecommerce", "websites"],
    kicker: "Online shop",
    clientTeaser: "A clothing shop. Browse, check out, pay.",
    clientBlurb:
      "A clothing brand's online store. Checkout, payments, and order handling, live and selling.",
    summary:
      "I'm the founder. I built the full-stack shop at visionsstudio.us, run the marketing, and process real orders.",
    detail:
      "This is my brand and my codebase. I designed and built the entire storefront on <strong>Next.js</strong> with a custom domain, <strong>Stripe</strong> checkout, and <strong>webhooks</strong> for order handling. I set up <strong>Google Analytics</strong> and <strong>Google Search Console</strong> to track traffic and search performance. I've sold through the site, not just deployed it.",
    Task:
      "Build and operate a full-stack e-commerce site: product pages, Stripe payments, webhooks, analytics, and marketing.",
    Impact:
      "A live store on visionsstudio.us with real sales, Stripe integration, and marketing I run myself.",
    tools: [
      "Next.js",
      "Vercel",
      "Stripe",
      "Stripe Webhooks",
      "Google Analytics",
      "Google Search Console",
      "E-commerce",
    ],
    liveUrl: "https://visionsstudio.us/",
    githubUrl: "https://github.com/sophiafeld1/Visions",
    image: "assets/visions-preview.png?v=3",
  },
  {
    title: "E3 Sponsor Database",
    context: "Madison Consulting Club",
    client: "Empowerment3",
    year: "Spring 2026",
    projectType: ["Consulting", "Database", "Web App"],
    role: ["Project lead", "Full-stack development"],
    featuredOnClientGrid: true,
    featuredOrder: 4,
    gridTags: ["consulting"],
    kicker: "Custom tool",
    clientTeaser: "Sponsor contacts and follow-ups, in one place.",
    clientBlurb:
      "A community empowerment center at JMU. Years of scattered sponsor records now live in one searchable place, with outreach emails ready to send.",
    summary:
      "Sponsor CRM for Empowerment3, a community empowerment center at JMU.",
    detail:
      "Empowerment3 had sponsor records spread across semesters with no single place to search or follow up. I was PM on a three-person team and built the app: <strong>Streamlit</strong> front end, <strong>SQLite</strong> backend, template-driven outreach emails.",
    Task: "Centralize sponsor records into one searchable database with outreach templates.",
    Impact: "Staff stopped digging through old files. Outreach is faster and more consistent.",
    tools: ["Streamlit", "Python", "Pandas", "SQL"],
    liveUrl: "https://sophiafeld1-empowerment3-app-bbtrse.streamlit.app/",
    githubUrl: "https://github.com/sophiafeld1/Empowerment3",
    clientUrl: "https://www.jmu.edu/chbs/kinesiology/empowerment3/",
    clientLabel: "Empowerment3",
    image: "assets/e3-sponsor-database.png",
  },
  {
    title: "ISAT Advising Agent",
    context: "Agentic AI",
    client: "James Madison University · ISAT Program",
    year: "2026",
    projectType: ["AI Application", "Full-stack", "Agentic Systems"],
    role: ["Full-stack development", "AI engineering"],
    featuredOnClientGrid: true,
    featuredOrder: 5,
    gridTags: ["ai"],
    kicker: "Custom site",
    clientTeaser: "Answers student questions from the program's own materials.",
    clientBlurb:
      "Prospective students ask in plain English. The site answers from the program's own handbooks, web pages, and advising documents, not guesswork.",
    summary:
      "Multi-agent RAG chatbot with a Next.js frontend, LangGraph orchestration, and pgvector-backed retrieval.",
    detail:
      "ISAT program info lives across PDFs, web pages, and advising docs that don't always agree. I built the full stack: web scraping and chunking pipelines, <strong>pgvector</strong> embeddings in <strong>PostgreSQL</strong>, a <strong>LangGraph</strong> agent workflow, and a <strong>Next.js</strong> chat UI you can try on the live site. The repo includes tests and a project walkthrough below.",
    Task:
      "Build an agentic RAG system that ingests official ISAT documents and answers advising questions with sourced responses.",
    Impact:
      "End-to-end AI product: ingestion, vector search, multi-agent routing, and a frontend. Grounded answers instead of generic LLM output.",
    tools: [
      "LangGraph",
      "RAG",
      "pgvector",
      "PostgreSQL",
      "OpenAI API",
      "Next.js",
      "Python",
      "Web scraping",
    ],
    liveUrl: "https://isat-recruiter-2w1a.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/ISATRecruiter",
    image: "assets/isat-recruiter-preview.png?v=2",
    embedLivePreview: false,
    presentationTitle: "Project overview",
    presentationDownload: "assets/FINAL_CAPSTONE_PRESENTATION.pdf",
    presentationSlides: Array.from({ length: 15 }, (_, index) => {
      const slideNumber = String(index + 1).padStart(2, "0");
      if (index === 10) {
        return {
          type: "video",
          src: "assets/capstone-demo.mp4",
          poster: "assets/capstone-slides/slide-11.png",
          alt: "Course schedule planner demo",
        };
      }
      return {
        type: "image",
        src: `assets/capstone-slides/slide-${slideNumber}.png`,
        alt: `Project overview slide ${index + 1}`,
      };
    }),
  },
  {
    title: "Bread Breakers",
    context: "Full-stack client build",
    client: "Bread Breakers",
    year: "2026",
    projectType: ["Full-stack", "Web App", "Community platform"],
    role: ["Full-stack development", "Deployment"],
    featuredOnClientGrid: true,
    featuredOrder: 2,
    gridTags: ["websites"],
    kicker: "Organization website",
    clientTeaser: "Events, sign-ups, and a team dashboard in one place.",
    clientBlurb:
      "A community dinner group. I rebuilt their website and gave their team a private dashboard to post events, publish blog posts, and control who can log in.",
    summary:
      "Next.js rebuild of a community dinner group's site, with a password-protected staff dashboard for events, blog posts, and user access.",
    detail:
      "Bread Breakers needed a site their own team could keep up to date. I rebuilt it in <strong>Next.js</strong> and added a staff dashboard behind a login. Organizers create and edit events, upload event photos, and publish <strong>Substack</strong> posts to the blog, while an admin account controls who can sign in. Events live in <strong>PostgreSQL</strong> through <strong>Prisma</strong>, each one has an add-to-calendar link, and guests sign up right on the event page. The public site also covers donations, an FAQ, and a page for starting Bread Breakers in a new community.",
    Task:
      "Rebuild the public site and give the team a dashboard to run events, the blog, and user access on their own.",
    Impact:
      "The team updates events and the blog without touching code, and new communities have a clear path to start their own dinners.",
    tools: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Authentication", "Substack", "Vercel"],
    liveUrl: "https://breadbreakerscommunity.org/",
    githubUrl: "https://github.com/sophiafeld1/breadbreakers-site",
    image: "assets/bread-breakers-preview.png?v=2",
  },
];
