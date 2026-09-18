/** Tiny class joiner — avoids a dependency for something this small. */
export function clsx(...parts) {
  return parts.filter(Boolean).join(' ')
}
