import { clsx } from '@/lib/clsx'

/**
 * Heading + optional standfirst, separated from the section by a rule.
 * No numbered markers: these sections are not a sequence.
 */
export function SectionHeader({ title, kicker, note, className }) {
  return (
    <header className={clsx('flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between', className)}>
      <div data-reveal className="will-reveal">
        {kicker && <p className="meta mb-2">{kicker}</p>}
        <h2 className="heading">{title}</h2>
      </div>
      {note && (
        <p data-reveal className="will-reveal copy md:max-w-sm md:text-right">
          {note}
        </p>
      )}
    </header>
  )
}
