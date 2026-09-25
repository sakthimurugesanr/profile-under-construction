// All copy lives here so components stay structural.
// Replace the TODO values before you publish.

export const profile = {
  name: 'Sakthi Murugesan',
  initials: 'SM',
  role: 'Professional AI Engineer & MERN Stack Developer',
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
    'I build AI-powered applications and full-stack web applications with React, Node.js and Python, backed by PostgreSQL or MongoDB. With 2+ years of development experience, I specialize in creating scalable, maintainable applications using modern full-stack technologies.',
}

export const nav = [
  { id: 'about', label: 'About' },
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
  { value: 'MCA · AI', label: '2026–2028 · Continuing education' },
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
    note: 'Building responsive, interactive user interfaces with modern frameworks and state management.',
    items: [
      'React.js',
      'TypeScript',
      'JavaScript ES6+',
      'Redux Toolkit',
      'Next.js',
      'React Router',
      'Context API',
      'Hooks',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'MUI',
      'Tailwind CSS',
    ],
    footer: { label: 'Focus', value: 'Component-driven UI' },
  },
  {
    title: 'Backend',
    note: 'Building scalable server-side applications and RESTful APIs with Node.js and Python frameworks.',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Python',
      'FastAPI',
      'NestJS',
    ],
    footer: { label: 'Approach', value: 'API-first development' },
  },
  {
    title: 'Database',
    note: 'Working with both SQL and NoSQL databases for efficient data storage and retrieval.',
    items: [
      'MySQL',
      'MongoDB',
      'PostgreSQL',
      'SQLite',
    ],
    footer: { label: 'Strategy', value: 'Schema design & optimization' },
  },
  {
    title: 'Performance',
    note: 'Optimizing application performance through modern techniques and best practices.',
    items: [
      'Code Splitting',
      'Lazy Loading',
      'Memoization',
      'Render Optimization',
      'Lighthouse Optimization',
    ],
    footer: { label: 'Goal', value: 'Fast & efficient apps' },
  },
]

export const experience = [
  {
    company: 'Cannyfore Technology Solutions Pvt Ltd',
    title: 'React Developer',
    period: 'Sep 2024 — Present',
    duration: '2 yrs 1 mo',
    place: 'Coimbatore, Tamil Nadu, India',
    type: 'Full-time',
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
    title: 'MERN Stack Developer',
    period: 'Mar 2024 — Jun 2024',
    duration: '4 mos',
    place: 'Coimbatore, Tamil Nadu, India',
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
    duration: '1 yr 11 mos',
    place: 'Coimbatore, Tamil Nadu, India',
    type: 'Full-time',
    summary:
      'Two years of enterprise client work before the switch to engineering  the reason requirements conversations do not intimidate me.',
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
    kind: 'Personal Project',
    name: 'AI Resume Analyzer',
    company: 'Full Stack AI',
    blurb:
      'An AI-powered Resume Analyzer that extracts information from resumes, matches them against job descriptions, and provides compatibility scores using RAG-based AI technology.',
    overview: 'Complete AI system with user authentication, resume upload, JD analysis, and skill matching using vector embeddings and LLM.',
    responsibilities: [
      'Built full-stack application with React frontend and FastAPI backend',
      'Implemented user profile management and resume upload system',
      'Integrated RAG (Retrieval-Augmented Generation) for intelligent matching',
      'Developed JD parsing and skill extraction using NLP',
      'Created scoring algorithm based on semantic similarity',
      'Implemented vector embeddings for efficient resume-JD matching',
    ],
    tags: ['React.js', 'FastAPI', 'Python', 'RAG', 'LLM', 'Vector DB', 'NLP', 'AI/ML'],
    detail: { label: 'Type', value: 'AI/ML Application' },
    repo: 'https://github.com/sakthimurugesanr/AI-Resume_New_Frondend',
  },
  {
    kind: 'Personal Project',
    name: 'Data Analysis Agent',
    company: 'AI/ML',
    blurb:
      'A FastAPI backend for dynamically analyzing web content using web scraping, vector embeddings, and LLM. Features semantic search, QnA, and automatic visualization generation.',
    overview: 'Intelligent web scraping tool with LLM powered analysis, DuckDB integration, and automatic chart generation for numeric data.',
    responsibilities: [
      'Built FastAPI backend for web content analysis',
      'Implemented web scraping with clean data extraction',
      'Integrated DuckDB for structured data storage and queries',
      'Created vector embeddings for semantic search using HuggingFace',
      'Connected OpenRouter LLMs for natural language QnA',
      'Developed automatic visualization with base64-encoded images',
      'Enabled CORS for frontend integration',
    ],
    tags: ['FastAPI', 'Python', 'Web Scraping', 'DuckDB', 'LLM', 'Vector Search', 'Data Visualization'],
    detail: { label: 'Type', value: 'Web Scraping + AI' },
    repo: 'https://github.com/sakthimurugesanr/DataAnalysisAgent',
  },
  {
    kind: 'Personal Project',
    name: 'E-Store (E-commerce Platform)',
    company: 'MERN Stack',
    blurb:
      'Full-featured e-commerce website built with MERN stack featuring role-based access control (RBAC), product management, advanced filters, and pagination.',
    overview: 'Complete e-commerce solution with separate user and admin dashboards, product CRUD operations, and advanced filtering capabilities.',
    responsibilities: [
      'Developed full-stack e-commerce application using MERN',
      'Implemented Role-Based Access Control (RBAC)',
      'Built admin dashboard for product management',
      'Created product listing with advanced filters',
      'Implemented pagination for better performance',
      'Developed responsive UI for all devices',
      'Integrated authentication and authorization',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RBAC', 'REST APIs', 'Authentication'],
    detail: { label: 'Type', value: 'Full Stack Web App' },
    repo: 'https://github.com/sakthimurugesanr/E-Store',
  },
  {
    kind: 'Personal Project',
    name: 'MovieDB Clone',
    company: 'Frontend',
    blurb:
      'A fully responsive movie database application clone using free APIs. Browse movies, view details, and explore content with a Netflix-style interface.',
    overview: 'Movie browsing application with API integration, responsive design, and modern UI/UX.',
    responsibilities: [
      'Cloned MovieDB application with free API integration',
      'Built fully responsive interface for all screen sizes',
      'Implemented movie search and filtering',
      'Created detailed movie information pages',
      'Designed modern, user-friendly UI',
      'Optimized performance and loading states',
    ],
    tags: ['React.js', 'JavaScript', 'API Integration', 'Responsive Design', 'CSS3'],
    detail: { label: 'Type', value: 'Frontend Application' },
    repo: 'https://github.com/sakthimurugesanr/MovieDB',
  },
  {
    kind: 'Personal Project',
    name: 'LangChain & LangGraph Demo',
    company: 'AI/ML',
    blurb:
      'Two powerful AI projects: RAG Pipeline using FAISS vector DB and Multi-Tool Agent with Wikipedia, Weather, and Calculator tools. Built with Groq LLM and HuggingFace embeddings.',
    overview: 'Demonstrates LangChain RAG pipeline and LangGraph multi-tool agent with conversation memory and tool orchestration.',
    responsibilities: [
      'Built RAG pipeline with CSV data ingestion',
      'Implemented FAISS vector database for semantic search',
      'Created multi-tool agent with Wikipedia, Weather, Calculator',
      'Integrated Groq LLM (LLaMA 3.3 70B) for intelligence',
      'Used HuggingFace embeddings for vector generation',
      'Implemented conversation memory and context management',
      'Built tool orchestration with decision logic',
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'RAG', 'FAISS', 'Groq', 'HuggingFace', 'Vector DB'],
    detail: { label: 'Type', value: 'AI Agent Framework' },
    repo: 'https://github.com/sakthimurugesanr/Langchain-Langgraph-Demo',
  },
]

export const education = [
  {
    id: 'education-bcom', year: '2018', endYear: '2021',
    degree: 'Bachelor of Commerce (BCom)',
    school: "Park's Collage of Arts and Science",
    years: 'Jun 2018 – Mar 2021',
    field: 'Business/Commerce, General',
    status: 'Grade A',
    note: 'An academic foundation in business and commerce, followed by a transition into technology and full-stack development.',
  },
  {
    id: 'education-mca', year: '2026', endYear: '2028',
    degree: 'Master of Computer Applications',
    school: 'Sikkim Manipal University – Distance Education',
    years: '2026 – 2028',
    field: 'Artificial Intelligence',
    status: '2026–2028 programme',
    note: 'Continuing education in computer applications with a focus on artificial intelligence.',
  },
]

export const contactFacts = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Based in', value: profile.location },
  { label: 'Timezone', value: profile.timezone },
  { label: 'Availability', value: profile.availability },
]
