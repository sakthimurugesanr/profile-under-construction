import { useEffect, useLayoutEffect } from 'react'

// Avoids the SSR warning if this is ever prerendered.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
