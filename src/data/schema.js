// Comprehensive structured data for SEO rich snippets
import { profile, projects, experience, education } from './site'

const baseUrl = 'https://sakthimurugesan.com'

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": profile.name,
  "url": baseUrl,
  "jobTitle": "React AI Engineer & MERN Stack Developer",
  "description": "Expert React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development. Building innovative AI-powered applications with React, Node.js, Python, and modern web technologies.",
  "image": `${baseUrl}/sakthi.png`,
  "sameAs": [
    profile.links.github,
    profile.links.linkedin,
    "https://twitter.com/sakthimurugesan"
  ],
  "knowsAbout": [
    "React.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "FastAPI",
    "LangChain",
    "RAG (Retrieval-Augmented Generation)",
    "Vector Databases",
    "LLM Integration",
    "Natural Language Processing",
    "Computer Vision",
    "Deep Learning",
    "Neural Networks",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Web Development",
    "MERN Stack",
    "RESTful APIs",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Express.js",
    "Next.js",
    "Responsive Design",
    "UI/UX Development",
    "Cloud Deployment",
    "Docker",
    "Git",
    "Agile Development"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": education.school,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "email": profile.email,
  "availableForHire": true,
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Remote",
      "addressCountry": "Worldwide"
    }
  }
}

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": `${profile.name} - AI & Full Stack Development Services`,
  "description": "Professional AI and full stack web development services specializing in React, Node.js, Python, Machine Learning, and modern web technologies",
  "provider": {
    "@type": "Person",
    "name": profile.name
  },
  "areaServed": "Worldwide",
  "serviceType": [
    "AI Application Development",
    "Machine Learning Integration",
    "React Development",
    "Node.js Development",
    "Full Stack Development",
    "Web Application Development",
    "Frontend Development",
    "Backend Development",
    "API Development",
    "Database Design",
    "UI/UX Implementation",
    "RAG Pipeline Development",
    "LLM Integration",
    "Vector Database Implementation",
    "Natural Language Processing",
    "Computer Vision Solutions"
  ],
  "priceRange": "$$"
}

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": `${profile.name} Portfolio`,
  "url": baseUrl,
  "description": "Portfolio of Sakthi Murugesan - React AI Engineer and MERN Stack Developer specializing in AI-powered applications and full-stack web development",
  "author": {
    "@type": "Person",
    "name": profile.name
  },
  "publisher": {
    "@type": "Person",
    "name": profile.name
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${baseUrl}/?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

export const projectSchemas = projects.map(project => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.name,
  "description": project.blurb,
  "url": project.repo,
  "author": {
    "@type": "Person",
    "name": profile.name
  },
  "keywords": project.tags.join(", "),
  "applicationCategory": project.kind,
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "1"
  }
}))

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": `${profile.name} - AI & Full Stack Development`,
  "url": baseUrl,
  "logo": `${baseUrl}/logo.png`,
  "description": "AI and full stack development services by Sakthi Murugesan",
  "founder": {
    "@type": "Person",
    "name": profile.name
  },
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": profile.email,
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    profile.links.github,
    profile.links.linkedin,
    "https://twitter.com/sakthimurugesan"
  ]
}

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Portfolio",
      "item": `${baseUrl}/#projects`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Experience",
      "item": `${baseUrl}/#experience`
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Skills",
      "item": `${baseUrl}/#stack`
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Contact",
      "item": `${baseUrl}/#contact`
    }
  ]
}

export const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": `${profile.name} - React AI Engineer & MERN Stack Developer Portfolio`,
  "description": "Explore the portfolio of Sakthi Murugesan, an expert React AI Engineer and MERN Stack Developer specializing in AI-powered applications and full-stack web development.",
  "author": {
    "@type": "Person",
    "name": profile.name
  },
  "publisher": {
    "@type": "Person",
    "name": profile.name
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": baseUrl
  }
}

export const getAllSchemas = () => [
  personSchema,
  professionalServiceSchema,
  webSiteSchema,
  organizationSchema,
  breadcrumbSchema,
  articleSchema,
  ...projectSchemas
]