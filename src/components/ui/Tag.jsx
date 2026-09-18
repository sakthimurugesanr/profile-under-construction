import { clsx } from '@/lib/clsx'

export function Tag({ quiet = false, className, children }) {
  return <li className={clsx('tag', quiet && 'tag--quiet', className)}>{children}</li>
}

export function TagList({ items, label, className }) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-2', className)}>
      {label && <span className="meta mr-1">{label}</span>}
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </ul>
    </div>
  )
}
