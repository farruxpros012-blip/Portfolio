import { useEffect } from 'react'

/**
 * Snap scroll position when the user stops scrolling, after `delay` ms.
 * If scrollY < threshold/2 → snap to 0.
 * If threshold/2 ≤ scrollY < threshold → snap to threshold.
 * Beyond threshold, do nothing (allow free scrolling through new sections).
 */
export function useScrollSnap(threshold = 300, delay = 150) {
  useEffect(() => {
    let timer: number | undefined
    let isSnapping = false

    const onScroll = () => {
      if (isSnapping) return
      if (timer !== undefined) window.clearTimeout(timer)

      timer = window.setTimeout(() => {
        const y = window.scrollY
        if (y <= 0 || y >= threshold) return

        const target = y < threshold / 2 ? 0 : threshold
        isSnapping = true
        window.scrollTo({ top: target, behavior: 'smooth' })

        window.setTimeout(() => {
          isSnapping = false
        }, 600)
      }, delay)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [threshold, delay])
}
