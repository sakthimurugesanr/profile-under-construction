// All copy lives here so components stay structural.
// Replace the TODO values before you publish.

export const profile = {
  name: 'Sakthi Murugesan',
  initials: 'SM',
  role: 'React & Node.js developer',
  location: 'Coimbatore, Tamil Nadu, India',
  timezone: 'IST (UTC +5:30)',
  availability: 'Open to work — 30 day notice',
  email: 'sakthicareer001@gmail.com',
  links: {
    github: 'https://github.com/sakthimurugesanr',
    linkedin: 'https://www.linkedin.com/in/rsakthimurugesan/',
    resume: '/assets/resume/resume.pdf',
  },
  intro:
    'I build web applications end to end — React interfaces on the front, Node and Express services behind them, PostgreSQL or MongoDB underneath. With an MCA degree and 2+ years of experience, I specialize in creating scalable, maintainable applications using modern full-stack technologies.',
}

export const nav = [
  { id: 'work', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]

export const facts = [
  { value: '2024', label: 'Writing React full time since' },
  { value: '4 yrs', label: 'In client-facing and engineering roles' },
  { value: 'MERN', label: 'Primary stack, plus PostgreSQL' },
  { value: 'MCA', label: 'Master of Computer Applications' },
]

export const marquee = [
  'React',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Redux Toolkit',
  'Tailwind CSS',
  'REST APIs',
  'Git',
]

export const stack = [
  {
    title: 'Frontend',
    note: 'Component-driven interfaces, shared state, and layouts that hold up from 320px to ultrawide.',
    items: [
      'React',
      'JavaScript (ES2015+)',
      'Redux Toolkit',
      'Tailwind CSS',
      'Semantic HTML',
      'CSS Grid & Flexbox',
    ],
    footer: { label: 'Approach', value: 'Small components, lifted state' },
  },
  {
    title: 'Backend',
    note: 'Express services with layered routing, token auth, validation, and predictable error handling.',
    items: ['Node.js', 'Express', 'REST API design', 'JWT auth', 'CORS & headers', 'MVC structure'],
    footer: { label: 'Contract', value: 'JSON over HTTP' },
  },
  {
    title: 'Data',
    note: 'Relational schemas when the data has shape, documents when it does not.',
    items: ['PostgreSQL', 'MongoDB', 'Mongoose', 'Schema design', 'Indexing basics'],
    footer: { label: 'Habit', value: 'Read the query plan' },
  },
  {
    title: 'Tooling',
    note: 'Day-to-day workflow: branches, reviews, API checks, and a terminal that stays open.',
    items: ['Git & GitHub', 'Postman', 'Vite', 'Linux CLI', 'npm scripts'],
    footer: { label: 'Workflow', value: 'Branch, review, merge' },
  },
]

export const experience = [
  {
    company: 'Cannyfore Technology Solutions',
    title: 'React Developer',
    period: 'Sep 2024 — Present',
    place: 'Coimbatore, India',
    type: 'Full time',
    current: true,
    summary:
      'Turning product specs into React components and wiring them to the Node and Express services behind them.',
    points: [
      'Build reusable components and keep state and side effects in custom hooks.',
      'Lay out responsive screens with Tailwind, from small phones up to wide desktops.',
      'Integrate REST endpoints, including loading, empty and error states.',
      'Test across browsers and trim bundle size where it matters.',
    ],
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Node.js'],
  },
  {
    company: 'ASGlobalSoftTech',
    title: 'MERN Stack Developer, Intern',
    period: 'Mar 2024 — Jun 2024',
    place: '4 months · Coimbatore, India',
    type: 'Internship',
    summary: 'First professional exposure to the full JavaScript stack, front to database.',
    points: [
      'Wrote Express controllers and routes over Mongoose models.',
      'Modelled MongoDB collections for the features I was building.',
      'Managed client state with Redux Toolkit slices.',
      'Checked endpoints with Postman collections before handing them over.',
    ],
    tags: ['React', 'Redux', 'Express', 'MongoDB', 'Node.js'],
  },
  {
    company: 'Access Healthcare Services',
    title: 'Senior Client Partner',
    period: 'Mar 2022 — Jan 2024',
    place: '1 yr 11 mos · Coimbatore, India',
    type: 'Full time',
    summary:
      'Two years of enterprise client work before the switch to engineering — the reason requirements conversations do not intimidate me.',
    points: [
      'Handled day-to-day communication with enterprise healthcare clients.',
      'Tracked delivery against agreed service levels and reported on it.',
      'Ran root cause analysis on escalations with the teams involved.',
      'Translated client process changes into instructions the floor could follow.',
    ],
    tags: ['Client communication', 'SLA reporting', 'Escalation handling', 'Process documentation'],
  },
]

export const projects = [
  {
    kind: 'Internal Product',
    name: 'Human Resource Management System',
    company: 'Cannyfore',
    blurb:
      'A full-scale HRMS developed from the ground up to manage employee information, leave workflows, performance management, and role-based operations. Worked as part of a 3-member development team.',
    overview: 'Full-stack Human Resource Management System handling employee data, leave management, performance tracking, and role-based access control.',
    responsibilities: [
      'Developed the application from scratch using React.js and TypeScript',
      'Built reusable and maintainable React components for different HR workflows',
      'Developed Employee Management, Leave Management, and Performance Management modules',
      'Implemented complete CRUD operations and integrated REST APIs',
      'Managed application state using Redux Toolkit',
      'Implemented role-based access control for different users',
      'Developed responsive interfaces for desktop, tablet, and mobile',
      'Integrated frontend with Node.js and Express.js backend services',
      'Worked with MySQL for application data',
      'Integrated SMTP/email functionality for system workflows',
      'Performed debugging, testing, and production issue resolution',
      'Worked on frontend performance optimization',
    ],
    tags: ['React.js', 'TypeScript', 'Redux Toolkit', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'SMTP'],
    detail: { label: 'Role', value: 'Full Stack Developer' },
    repo: '#',
  },
  {
    kind: 'Internal AI Project',
    name: 'AI Resume Analyzer',
    company: 'Cannyfore',
    blurb:
      'An AI-powered Resume Analyzer designed to analyze resumes and extract meaningful information. Combines modern web development with AI/RAG concepts for intelligent document processing.',
    overview: 'AI-powered system for automated resume analysis and evaluation using LLM, embeddings, and vector search technologies.',
    responsibilities: [
      'Developed the frontend interface for uploading and analyzing resumes',
      'Created reusable and responsive React components',
      'Implemented resume upload and user interaction workflows',
      'Integrated frontend components with backend/API services',
      'Worked on processing resume information and presenting analysis results in a structured UI',
      'Explored AI-powered resume analysis and document processing workflows',
      'Worked with AI/RAG concepts: document processing, embeddings, retrieval, and LLM-based analysis',
      'Implemented form handling, validation, loading states, and error handling',
      'Optimized the UI for different screen sizes',
      'Debugged frontend and API integration issues',
    ],
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'AI', 'RAG', 'LLM', 'Vector Search', 'PostgreSQL'],
    detail: { label: 'Role', value: 'Full Stack / AI Enthusiast' },
    repo: '#',
  },
  {
    kind: 'Internal Product',
    name: 'E-Warehouse Management System',
    company: 'Cannyfore',
    blurb:
      'An E-Warehouse Management System focused on managing warehouse operations through a centralized web application with structured workflows and data management.',
    overview: 'Warehouse management platform providing structured interface for operational data and streamlined workflow management.',
    responsibilities: [
      'Developed responsive frontend interfaces using React.js',
      'Created reusable components for warehouse management workflows',
      'Implemented data-driven screens and CRUD-based operations',
      'Integrated REST APIs between frontend and backend services',
      'Implemented form validation and user-friendly data-entry workflows',
      'Managed application state and API responses',
      'Developed responsive layouts for desktop, tablet, and mobile devices',
      'Worked on backend API integration and data handling',
      'Debugged UI, API, and functional issues during development',
      'Performed testing across different workflows and fixed identified issues',
      'Focused on maintainability, performance, and consistent user experience',
    ],
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS'],
    detail: { label: 'Role', value: 'Full Stack Developer' },
    repo: '#',
  },
]

export const education = {
  degree: 'Master of Computer Applications (MCA)',
  school: "Park's College of Engineering and Technology",
  years: '2021 — 2024',
  field: 'Computer Applications and Software Development',
  note: 'Comprehensive education in computer science fundamentals, programming languages, database management, web technologies, and software engineering principles. Gained strong foundation in data structures, algorithms, and modern development practices.',
  strengths: [
    'Full-stack web development',
    'Database design and optimization',
    'Software engineering principles',
    'Problem-solving and algorithms',
  ],
}

export const contactFacts = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Based in', value: profile.location },
  { label: 'Timezone', value: profile.timezone },
  { label: 'Availability', value: profile.availability },
]
