import { useEffect, useState } from 'react'

const sectionTitles = {
  top: 'Sakthi Murugesan - Professional React AI Engineer & MERN Stack Developer',
  about: 'About - Sakthi Murugesan | Professional React AI Engineer Background',
  work: 'Experience - Sakthi Murugesan | Professional Work History',
  stack: 'Tech Stack - Sakthi Murugesan | Skills & Technologies',
  projects: 'Projects - Sakthi Murugesan | AI & Full Stack Portfolio',
  background: 'Education - Sakthi Murugesan | Academic Background',
  contact: 'Contact - Sakthi Murugesan | Hire Professional React AI Engineer'
}

const sectionDescriptions = {
  top: 'Professional React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development.',
  about: 'Learn about Sakthi Murugesan\'s background as a Professional React AI Engineer and MERN Stack Developer, including education, skills, and professional journey.',
  work: 'Explore Sakthi Murugesan\'s professional experience as a React Developer and MERN Stack Engineer at leading technology companies.',
  stack: 'Discover the complete technology stack of Sakthi Murugesan, including React, Node.js, Python, AI/ML frameworks, and modern web development tools.',
  projects: 'View innovative AI and full-stack projects by Sakthi Murugesan, including AI Resume Analyzer, Data Analysis Agent, and enterprise applications.',
  background: 'Review Sakthi Murugesan\'s educational background in Computer Applications and software engineering fundamentals.',
  contact: 'Get in touch with Sakthi Murugesan, Professional React AI Engineer and MERN Stack Developer, for collaboration and job opportunities.'
}

export function useDynamicTitle() {
  const [currentSection, setCurrentSection] = useState('top')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in middle of viewport
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setCurrentSection(sectionId)
          
          // Map section IDs to our titles (handle different IDs)
          const titleMap = {
            'top': sectionTitles.top,
            'about': sectionTitles.about,
            'work': sectionTitles.work,
            'stack': sectionTitles.stack,
            'projects': sectionTitles.projects,
            'background': sectionTitles.background,
            'contact': sectionTitles.contact
          }
          
          const descMap = {
            'top': sectionDescriptions.top,
            'about': sectionDescriptions.about,
            'work': sectionDescriptions.work,
            'stack': sectionDescriptions.stack,
            'projects': sectionDescriptions.projects,
            'background': sectionDescriptions.background,
            'contact': sectionDescriptions.contact
          }
          
          // Update document title
          const newTitle = titleMap[sectionId] || sectionTitles.top
          document.title = newTitle
          
          // Update meta description if the element exists
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            const newDescription = descMap[sectionId] || sectionDescriptions.top
            metaDescription.setAttribute('content', newDescription)
          }
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return currentSection
}