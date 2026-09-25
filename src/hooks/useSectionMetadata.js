import { useEffect } from 'react'
import { metadataForSection } from '@/data/seo'

// Section descriptions follow the visible content. Canonical, social metadata
// and structured data continue to describe the complete portfolio.
export function useSectionMetadata(active) {
  useEffect(() => {
    const { title, description } = metadataForSection(active)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [active])

  useEffect(() => () => {
    const home = metadataForSection('top')
    document.title = home.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', home.description)
  }, [])
}
