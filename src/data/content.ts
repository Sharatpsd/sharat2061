// Single source of truth for every fact shown on the site.
// Everything here is verified by Sharat; do not add metrics, titles or claims
// that are not confirmed.

export const profile = {
  name: "Sharat Acharja Mugdho",
  firstName: "Sharat",
  title: "Junior Software Engineer",
  specialty: "ERP Specialist",
  organization: "Betopia Group",
  organizationUrl: "https://betopiagroup.com/",
  department: "ERP Team · IT & Infrastructure",
  location: "Dhaka, Bangladesh",
  tagline: "I build and run ERP systems with Odoo, Python and Django. Simple, reliable software that companies use every day.",
  email: "sharatacharjee6@gmail.com",
  links: {
    github: "https://github.com/Sharatpsd",
    linkedin: "https://www.linkedin.com/in/sharat-acharjya/",
    resume: "https://drive.google.com/file/d/1uTY0w8l9ayhY6BN0Lpyy7NGOpfBuY-rq/view?usp=sharing",
  },
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "erp", label: "ERP" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  statement:
    "I build software that companies use every day. Today, that means the ERP system for all of Betopia Group.",
  paragraphs: [
    "I am a software engineer and ERP specialist at Betopia Group. I handle the company-wide HRMS on Odoo and build features for Accounting and Sales.",
    "I started with web projects in Python and Django at Robo Tech Valley. Now I work in-house, building new features and improving the systems our teams rely on.",
    "I write Python every day and I am comfortable with JavaScript frameworks like React. I also work well with AI coding agents such as Claude and Codex, which help me plan, build and test faster.",
    "I hold a B.Sc. in Computer Science & Engineering from Green University of Bangladesh (2026).",
  ],
  principles: [
    {
      title: "Understand the need first",
      body: "I learn how people work before I write any code.",
    },
    {
      title: "Keep it clean and simple",
      body: "Clear data, clear logic, and code that is easy to change.",
    },
    {
      title: "Build to last",
      body: "Software that keeps working well long after launch.",
    },
  ],
};

export const erp = {
  core: [
    { name: "HRMS", body: "The full HR system for the whole company: employees, attendance, leave, payroll and HR documents." },
    { name: "Accounting", body: "Key accounting features and the business rules behind them." },
    { name: "Sales", body: "Key sales features, from orders to reports." },
  ],
  related: ["Attendance", "Leave", "Payroll", "HR Documents", "Approvals", "Dashboards", "Reports", "Procurement KPIs"],
};

export type Role = {
  company: string;
  companyUrl?: string;
  role: string;
  unit?: string;
  period: string;
  current?: boolean;
  summary: string;
  points?: string[];
  tags?: string[];
  link?: { label: string; href: string };
};

export const experience: Role[] = [
  {
    company: "Betopia Group",
    companyUrl: "https://betopiagroup.com/",
    role: "Junior Software Engineer",
    unit: "ERP Team",
    period: "15 October 2026 – Present",
    current: true,
    summary: "Promoted to Junior Software Engineer. I handle the HRMS for the whole company and build features for Accounting and Sales.",
    points: [
      "Company-wide HRMS on Odoo",
      "Accounting features",
      "Sales features",
      "New in-house features",
      "Dashboards and reports",
      "Workflow automation",
      "Fixes and improvements",
      "Database and business logic",
    ],
    tags: ["Odoo", "Python", "XML", "OWL", "PostgreSQL"],
  },
  {
    company: "Betopia Group",
    companyUrl: "https://betopiagroup.com/",
    role: "Trainee",
    unit: "ERP Team",
    period: "15 July 2026 – 14 October 2026",
    summary: "Joined the ERP team and worked on Odoo modules for company use.",
    tags: ["Odoo", "Python", "PostgreSQL"],
  },
  {
    company: "Robo Tech Valley",
    companyUrl: "https://www.robotechvalley.com/",
    role: "Python & Django",
    unit: "Full-time",
    period: "January 2026 – June 2026",
    summary: "Built web projects with Python and Django.",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
  },
  {
    company: "Robo Tech Valley",
    companyUrl: "https://www.robotechvalley.com/",
    role: "Internship",
    period: "November 2025 – December 2025",
    summary: "Started my career with backend work in Python and Django.",
    tags: ["Python", "Django", "DRF"],
    link: {
      label: "Internship certificate",
      href: "https://drive.google.com/file/d/1Jw82jFGXPvliJHYxBPOUh6oIlpm-j8mE/view?usp=sharing",
    },
  },
];

export type SkillGroup = { key: string; title: string; note: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    key: "erp",
    title: "ERP",
    note: "My main work: Odoo modules for HR, accounting and sales.",
    items: ["Odoo 19", "HRMS", "Accounting", "Sales", "Python ORM", "XML Views", "OWL", "Workflow Automation"],
  },
  {
    key: "backend",
    title: "Backend",
    note: "APIs and server code with clean structure and secure login.",
    items: ["Django", "Django REST Framework", "REST API", "Node.js"],
  },
  {
    key: "frontend",
    title: "Frontend",
    note: "Clean, responsive screens that connect to the backend.",
    items: ["React.js", "Vite", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    key: "languages",
    title: "Languages",
    note: "Python every day, JavaScript for the frontend.",
    items: ["Python", "JavaScript"],
  },
  {
    key: "ai",
    title: "AI Agents",
    note: "I use AI coding agents to plan, build and test faster, and I review every change.",
    items: ["Claude", "Codex"],
  },
  {
    key: "database",
    title: "Database",
    note: "Data models and queries that business logic depends on.",
    items: ["PostgreSQL"],
  },
  {
    key: "tools",
    title: "Tools",
    note: "My daily tools to build, test and ship.",
    items: ["Git", "GitHub", "PyCharm", "Postman", "Figma"],
  },
];

export type Project = {
  id: string;
  index: string;
  kind: string;
  title: string;
  description: string;
  stack: string[];
  contributions: string[];
  links: { label: string; href: string }[];
  note?: string;
};

export const projects: Project[] = [
  {
    id: "bite",
    index: "01",
    kind: "Full-stack web app",
    title: "Bite — Food Delivery App",
    description:
      "A full-stack food delivery app built with Django REST Framework and React, made for the Bangladesh market.",
    stack: ["Django", "Django REST Framework", "React", "Vite", "PostgreSQL", "REST API"],
    contributions: [
      "REST API with JWT login",
      "Restaurants, menus, cart and checkout",
      "Dashboards for customers, restaurant owners and delivery staff",
      "Restaurant partner sign-up",
    ],
    links: [
      { label: "Live site", href: "https://bite-bd.onrender.com/" },
      { label: "Source code", href: "https://github.com/Sharatpsd/Food-Delivery-App-" },
    ],
  },
  {
    id: "odoo",
    index: "02",
    kind: "ERP module",
    title: "Odoo Employee Management System",
    description:
      "A custom Odoo 19 module to manage employees, with ORM operations and custom business workflows.",
    stack: ["Odoo 19", "Python", "XML", "PostgreSQL", "Odoo ORM"],
    contributions: [
      "Employee, department and designation models",
      "Attendance, leave, documents and assets",
      "Multi-step approval workflows",
      "Kanban, list and form views, plus dashboards",
    ],
    links: [{ label: "Source code", href: "https://github.com/Sharatpsd/odoo-employee-management" }],
  },
  {
    id: "erp",
    index: "03",
    kind: "Company work · Betopia Group",
    title: "Company-wide ERP: HRMS, Accounting & Sales",
    description:
      "I handle the HRMS for the whole of Betopia Group on Odoo, and build key features for Accounting and Sales.",
    stack: ["Odoo", "Python", "XML", "OWL", "PostgreSQL"],
    contributions: [
      "HRMS for the whole company",
      "Attendance, leave and payroll",
      "HR documents and approvals",
      "Accounting and sales features",
      "Dashboards, KPIs and reports",
    ],
    links: [],
    note: "Company work is private. No code, screenshots or business data are shown.",
  },
  {
    id: "research",
    index: "04",
    kind: "Research · Thesis",
    title: "Explainable Deep Learning for Eye Disease Classification",
    description:
      "Explainable Deep Learning Framework for Multi-Disease Ocular Classification and Myopia Severity Estimation, using eye images from the ODIR-5K dataset.",
    stack: ["Python", "ResNet50", "Transfer learning", "Grad-CAM", "SHAP"],
    contributions: [
      "Finds several eye diseases from one image",
      "ResNet50 model with a custom output layer",
      "Estimates how severe myopia is",
      "Shows why the model decided, with Grad-CAM and SHAP",
    ],
    links: [
      { label: "Research paper", href: "https://drive.google.com/file/d/1EkV9sDJQ2V4Pq7loVsDbD5z4v42Br2lD/view" },
      { label: "Source code", href: "https://github.com/Sharatpsd/Explainable-Ocular-Disease-Classification-" },
    ],
  },
];

export const research = {
  auc: 0.8066,
  accuracy: 84.95,
  classes: ["Normal", "Diabetes", "Glaucoma", "Cataract", "AMD", "Hypertension", "Myopia", "Other"],
};

export const services = [
  { title: "ERP Development", body: "Custom Odoo modules, screens and business rules that fit how a company works." },
  { title: "Backend Development", body: "Reliable server code in Python and Django." },
  { title: "Full-Stack Web Apps", body: "Complete web apps with Django on the backend and React on the frontend." },
  { title: "REST APIs", body: "Clean, secure APIs that other apps can depend on." },
  { title: "Workflow Automation", body: "Approvals, alerts and reports that replace manual work." },
  { title: "Database & Integration", body: "PostgreSQL data models and links between systems." },
];

export const education = [
  {
    school: "Green University of Bangladesh",
    degree: "Bachelor's Degree in Computer Science & Engineering",
    detail: "Graduated",
    year: "2026",
  },
  {
    school: "Bajitpur Government College",
    degree: "Higher Secondary Certificate · Science",
    detail: "GPA 4.67",
    year: "2020",
  },
  {
    school: "Bajitpur Hafez Abdur Razzak Pilot High School",
    degree: "Secondary School Certificate · Science",
    detail: "GPA 4.33",
    year: "2018",
  },
];

// Clearer one-line descriptions (from each repo's README) where the GitHub
// description is missing or informal. Others use GitHub's own description.
export const repoNotes: Record<string, string> = {
  "Food-Delivery-App-":
    "Bite — full-stack food delivery platform with Django REST Framework, React, JWT authentication and role-based dashboards.",
  "odoo-employee-management":
    "Custom Odoo 19 module for employees, departments, attendance, leave, documents, assets and approval workflows.",
};

// Repositories highlighted in the development activity section.
export const featuredRepos = [
  "Food-Delivery-App-",
  "odoo-employee-management",
  "Explainable-Ocular-Disease-Classification-",
  "django-realtime-chat-api",
  "DailyDairyShop",
  "chai-order-system",
];
