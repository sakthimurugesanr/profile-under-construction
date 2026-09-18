import { clsx } from '@/lib/clsx'

/** Bordered surface used for every card on the page. */
export function Panel({ as: Tag = 'div', interactive = false, flush = false, className, children, ...rest }) {
  return (
    <Tag
      className={clsx(
        'panel',
        flush && 'panel--flush',
        interactive && 'panel--interactive',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
