import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from './Logo'

const HERO_BG = 'https://www.figma.com/api/mcp/asset/57bebdd2-def0-443f-90a7-11aad948accc'

interface CompactHeaderProps {
  scrollY: MotionValue<number>
}

/**
 * CompactHeader — Frame 2's pinned top bar.
 * Fixed at top of viewport; slides down + fades in once user scrolls
 * past the Frame 1 hero. Contains: logo + search bar (Figma layout).
 */
export default function CompactHeader({ scrollY }: CompactHeaderProps) {
  const opacity = useTransform(scrollY, [150, 320], [0, 1], { clamp: true })
  const y = useTransform(scrollY, [150, 320], [-60, 0], { clamp: true })
  const pointerEvents = useTransform(scrollY, (v) => (v > 150 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-[440px] max-w-full h-[180px] z-40 overflow-hidden bg-[#0a1426]"
    >
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 25%' }}
      />

      {/* Dark top gradient (Figma exact) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 63%)',
        }}
      />

      {/* Logo — top:20, left:20 */}
      <div className="absolute top-5 left-5 z-10">
        <Logo />
      </div>

      {/* Search bar — anchored to bottom of compact header */}
      <div className="absolute bottom-4 left-5 right-5 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] flex items-center shadow-[0px_4px_8px_rgba(0,0,0,0.2)]">
          <div className="flex-1 flex items-center gap-4 pl-5 py-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="1.8" />
              <path d="M17 17L21 21" stroke="#111" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-center text-[16px] font-semibold text-black -tracking-[.31px] leading-[21px]">
              Куда отправимся
            </span>
          </div>
          <div className="p-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-brand border-[1.5px] border-brand-border flex items-center justify-center shadow-[0px_4px_8px_rgba(0,0,0,0.24)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
