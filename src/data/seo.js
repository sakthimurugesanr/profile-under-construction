export const sectionSEO = {
  top: {
    heading: 'Sakthi Murugesan | Professional AI Engineer',
    title: 'Sakthi Murugesan | Professional AI Engineer',
    description: 'Sakthi Murugesan is a professional AI engineer and MERN stack developer building AI-powered applications with React, Node.js and Python. Explore his work.',
  },
  about: {
    heading: 'About Sakthi Murugesan',
    title: 'Sakthi Murugesan | About the AI & MERN Stack Developer',
    description: 'Meet Sakthi Murugesan, a Coimbatore-based AI engineer and MERN stack developer with 2+ years of experience building full-stack applications.',
  },
  work: {
    heading: 'Professional Experience',
    title: 'Sakthi Murugesan | Professional Experience',
    description: 'Explore Sakthi Murugesan’s professional experience, development responsibilities and work with React, Node.js, APIs and full-stack applications.',
  },
  stack: {
    heading: 'AI & Full-Stack Development Skills',
    title: 'Sakthi Murugesan | AI, React, Node.js & Python Skills',
    description: 'Explore Sakthi Murugesan’s frontend, backend, database and AI skills, including React, TypeScript, Node.js, Python, FastAPI and RAG technologies.',
  },
  projects: {
    heading: 'AI & MERN Stack Projects',
    title: 'Sakthi Murugesan | AI & MERN Stack Projects',
    description: 'Explore Sakthi Murugesan’s AI Resume Analyzer, Data Analysis Agent, MERN e-commerce application, MovieDB clone and LangChain and LangGraph projects.',
  },
  background: {
    heading: 'Education & Software Engineering Background',
    title: 'Sakthi Murugesan | BCom & MCA Education',
    description: 'Explore Sakthi Murugesan’s BCom at Park’s Collage of Arts and Science and 2026–2028 MCA in Artificial Intelligence at Sikkim Manipal University.',
  },
  contact: {
    heading: 'Contact Sakthi Murugesan',
    title: 'Sakthi Murugesan | Contact for AI & Full-Stack Development',
    description: 'Contact Sakthi Murugesan about AI and full-stack development opportunities. Find his email, GitHub, LinkedIn, location and availability.',
  },
}

export function metadataForSection(id) {
  return sectionSEO[id] || sectionSEO.top
}
