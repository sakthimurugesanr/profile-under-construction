import { useEffect, useState } from 'react'
import { coarsePointer } from '@/lib/gsap'

/** True on devices with a real mouse — used to gate the custom cursor. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches && !coarsePointer())
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}
