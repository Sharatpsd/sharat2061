// Single source of truth for every fact shown on the site.
// Everything here is verified by Sharat; do not add metrics, titles or claims
// that are not confirmed.

export const profile = {
  name: "Sharat Acharja Mugdho",
  firstName: "Sharat",
  title: "Junior Software Engineer",
  organization: "Betopia Group",
  department: "IT & Infrastructure (ERP, Cyber Security & MIS)",
  location: "Dhaka, Bangladesh",
  tagline:
    "Building intelligent business solutions, scalable software, and meaningful digital experiences.",
  email: "sharatacharjee6@gmail.com",
  links: {
    github: "https://github.com/Sharatpsd",
    linkedin: "https://www.linkedin.com/in/sharat-acharjya/",
    resume: "https://drive.google.com/file/d/1uTY0w8l9ayhY6BN0Lpyy7NGOpfBuY-rq/view?usp=sharing",
  },
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  statement:
    "I build software that businesses run on: ERP systems, backend services and web applications designed around how real teams actually work.",
  paragraphs: [
    "I am a Software Engineer focused on building scalable software solutions, business applications, ERP systems and modern web experiences.",
    "Today I work as a Junior Software Engineer at Betopia Group, in the IT & Infrastructure department that covers ERP, Cyber Security and MIS. Most of my days are spent inside Odoo: developing modules, customizing HRMS workflows and turning business processes into dependable software.",
    "My experience spans Odoo ERP, Python, Django, REST APIs, database management, business process automation and frontend technologies. I graduated in Computer Science & Engineering from Green University of Bangladesh in 2026.",
  ],
  principles: [
    {
      title: "Understand the workflow first",
      body: "Good business software starts with how people actually work. I map the process before I write the model.",
    },
    {
      title: "Clean architecture, practical choices",
      body: "Clear data models, readable business logic and APIs that are easy to extend when requirements change.",
    },
    {
      title: "Built to scale and to last",
      body: "I care about maintainability as much as delivery, so the system keeps working long after release day.",
    },
  ],
};

export type Role = {
  company: string;
  role: string;
  unit?: string;
  period: string;
  start: string;
  current?: boolean;
  summary: string;
  points?: string[];
  tags?: string[];
  link?: { label: string; href: string };
};

export const experience: Role[] = [
  {
    company: "Betopia Group",
    role: "Junior Software Engineer",
    unit: "IT & Infrastructure (ERP, Cyber Security & MIS)",
    period: "July 2026 – Present",
    start: "2026",
    current: true,
    summary:
      "Developing and maintaining enterprise ERP software on Odoo, with a focus on HRMS and business workflow automation.",
    points: [
      "Odoo ERP development",
      "HRMS development and customization",
      "Business workflow automation",
      "ERP module development",
      "Dashboard development",
      "Backend engineering",
      "Database and business logic management",
      "Enterprise software maintenance and improvements",
    ],
  },
  {
    company: "Robo Tech Valley",
    role: "Employee",
    period: "January 2026 – June 2026",
    start: "2026",
    summary: "Continued at Robo Tech Valley as an employee after completing the internship.",
    tags: ["Django", "Django REST Framework", "PostgreSQL", "REST API"],
  },
  {
    company: "Robo Tech Valley",
    role: "Internship",
    period: "November 2025 – December 2025",
    start: "2025",
    summary: "Started my professional journey with backend development using Django and Django REST Framework.",
    tags: ["Django", "DRF", "PostgreSQL", "JWT"],
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
    title: "ERP & Enterprise",
    note: "My daily work: modelling business processes in Odoo and shipping them as maintainable modules.",
    items: ["Odoo 19", "Python ORM", "XML Views", "OWL", "ERP Customization", "HRMS", "Business Workflow Automation"],
  },
  {
    key: "backend",
    title: "Backend",
    note: "APIs and services with clear contracts, authentication and well-structured business logic.",
    items: ["Django", "Django REST Framework", "REST API", "Node.js"],
  },
  {
    key: "frontend",
    title: "Frontend",
    note: "Responsive interfaces that connect cleanly to the APIs behind them.",
    items: ["React.js", "Vite", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    key: "languages",
    title: "Programming",
    note: "Python for backend and ERP work, JavaScript across the frontend.",
    items: ["Python", "JavaScript"],
  },
  {
    key: "database",
    title: "Database",
    note: "Relational data modelling and the queries business logic depends on.",
    items: ["PostgreSQL"],
  },
  {
    key: "tools",
    title: "Tools",
    note: "The everyday toolkit for building, testing and shipping.",
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
    kind: "Full-stack web application",
    title: "Bite — Food Delivery App",
    description:
      "A full-stack food delivery application built with Django REST Framework and React, modelled on the workflow of real delivery platforms for the Bangladesh market.",
    stack: ["Django", "Django REST Framework", "React", "Vite", "PostgreSQL", "REST API"],
    contributions: [
      "REST API design with JWT authentication",
      "Restaurant browsing, menus, cart and multi-step checkout",
      "Separate dashboards for customers, restaurant owners and delivery staff",
      "Restaurant partner onboarding flow",
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
      "A custom employee management module developed with Odoo 19, demonstrating ERP customization, ORM operations, employee data management and custom business workflows.",
    stack: ["Odoo 19", "Python", "XML", "PostgreSQL", "Odoo ORM"],
    contributions: [
      "Employee, department and designation models built on the Odoo ORM",
      "Attendance, leave, document and asset management",
      "Configurable multi-step approval workflows",
      "Kanban, list and form views plus dashboards in XML",
    ],
    links: [{ label: "Source code", href: "https://github.com/Sharatpsd/odoo-employee-management" }],
  },
  {
    id: "erp",
    index: "03",
    kind: "Professional work · Betopia Group",
    title: "Enterprise ERP & HRMS Development",
    description:
      "Building and customizing enterprise ERP solutions on Odoo as part of Betopia Group's IT & Infrastructure team, across the HR lifecycle and management reporting.",
    stack: ["Odoo", "Python", "XML", "OWL", "PostgreSQL"],
    contributions: [
      "HRMS and employee management",
      "Attendance and leave management",
      "Payroll workflows and HR documents",
      "Management, KPI and procurement dashboards",
      "Business process automation",
    ],
    links: [],
    note: "Company work is confidential. No proprietary code, screenshots or business data are shown.",
  },
  {
    id: "research",
    index: "04",
    kind: "Academic research · Thesis",
    title: "Explainable Deep Learning for Ocular Disease Classification",
    description:
      "Explainable Deep Learning Framework for Multi-Disease Ocular Classification and Myopia Severity Estimation, built on retinal fundus images from the ODIR-5K dataset.",
    stack: ["Python", "ResNet50", "Transfer learning", "Grad-CAM", "SHAP"],
    contributions: [
      "Multi-disease ocular classification on ODIR-5K",
      "ResNet50 backbone with a custom classification head",
      "Severity-aware myopia estimation",
      "Explainability with Grad-CAM and SHAP visualizations",
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
  {
    title: "ERP Development & Customization",
    body: "Custom Odoo modules, views and business logic that fit how an organization actually operates.",
  },
  {
    title: "Backend Development",
    body: "Reliable server-side systems in Python and Django with clean data models and clear business rules.",
  },
  {
    title: "Full-Stack Web Development",
    body: "End-to-end web applications with Django or Node.js on the backend and React on the frontend.",
  },
  {
    title: "REST API Development",
    body: "Well-structured, authenticated APIs that frontends and other systems can depend on.",
  },
  {
    title: "Business Workflow Automation",
    body: "Approvals, sequences, notifications and reports that replace manual, error-prone steps.",
  },
  {
    title: "Database & System Integration",
    body: "PostgreSQL data modelling and integrations that keep information consistent across systems.",
  },
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
