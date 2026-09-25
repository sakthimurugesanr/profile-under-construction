import { forwardRef } from 'react'
import { clsx } from '@/lib/clsx'

/** Bordered surface used for every card on the page. */
export const Panel = forwardRef(function Panel({ as: Tag = 'div', interactive = false, flush = false, className, children, ...rest }, ref) {
  return (
    <Tag
      ref={ref}
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
})
