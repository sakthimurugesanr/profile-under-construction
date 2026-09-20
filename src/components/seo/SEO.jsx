import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'Sakthi Murugesan - React AI Engineer & MERN Stack Developer',
  description = 'Expert React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development. Building innovative AI-powered applications with React, Node.js, Python, and modern web technologies.',
  keywords = 'React AI Engineer, MERN Stack Developer, Artificial Intelligence, Machine Learning, Full Stack Developer, React.js, Node.js, Python, FastAPI, LangChain, RAG, Vector Database, AI/ML, Web Development, TypeScript, MongoDB, PostgreSQL, AI Application Development, LLM Integration, Groq, HuggingFace, Semantic Search, Computer Vision, Natural Language Processing, Deep Learning, Neural Networks, Software Engineer, Frontend Developer, Backend Developer, Fullstack Developer, AI Engineer, ML Engineer, Data Science, Web Scraping, API Development, Cloud Deployment, Docker, Git, Agile Development, Remote Developer, Freelance Developer, Coimbatore Developer, India Developer, Hire React Developer, Hire AI Engineer, Hire MERN Stack Developer',
  ogImage = 'https://sakthimurugesan.com/sakthi.png',
  twitterImage = 'https://sakthimurugesan.com/sakthi.png',
  canonicalUrl = 'https://sakthimurugesan.com/',
  type = 'website',
  author = 'Sakthi Murugesan',
  schema = null
}) => {
  const siteName = 'Sakthi Murugesan Portfolio'
  const fullTitle = `${title} | ${siteName}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="category" content="Technology, Artificial Intelligence, Web Development, Software Engineering, Machine Learning" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="theme-color" content="#050506" />
      
      {/* Technical Meta Tags */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/sakthi.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/sakthi.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/sakthi.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/sakthi.png" />
      <link rel="shortcut icon" href="/sakthi.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@sakthimurugesan" />
      <meta name="twitter:site" content="@sakthimurugesan" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hreflang="en" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO