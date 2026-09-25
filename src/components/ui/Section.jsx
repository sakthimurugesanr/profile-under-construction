import { clsx } from '@/lib/clsx'
import { forwardRef } from 'react'
import { sectionSEO } from '@/data/seo'

/** Semantic section wrapper; the shared observer handles scroll reveals. */
export const Section = forwardRef(function Section({ id, tone = 'base', className, children, ...rest }, ref) {

  return (
    <section
      {...rest}
      id={id}
      aria-label={sectionSEO[id]?.heading}
      ref={ref}
      className={clsx('section', tone === 'alt' ? 'section--alt' : 'section--base', className)}
    >
      <div className="shell flex flex-col gap-12 md:gap-16">{children}</div>
    </section>
  )
})
