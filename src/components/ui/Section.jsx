import { clsx } from '@/lib/clsx'
import { useReveal } from '@/hooks/useReveal'

/** Section wrapper that also owns the scroll reveal for its children. */
export function Section({ id, tone = 'base', className, children }) {
  const ref = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={clsx('section', tone === 'alt' ? 'section--alt' : 'section--base', className)}
    >
      <div className="shell flex flex-col gap-12 md:gap-16">{children}</div>
    </section>
  )
}
