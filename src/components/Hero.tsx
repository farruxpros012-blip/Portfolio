import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from './Logo'

const HERO_BG = 'https://www.figma.com/api/mcp/asset/57bebdd2-def0-443f-90a7-11aad948accc'

interface HeroProps {
  scrollY: MotionValue<number>
}

/**
 * Hero — morphs between Figma Frame 1 (956×440) and Frame 2 (259×440).
 *
 * Figma positions (px, with 59px iPhone status-bar area at top):
 *   Logo:      y=67   (always visible, same in F1 & F2)
 *   Headline:  y=217  (F1 only, fades)
 *   Subtitle:  y=345  (F1 only, fades)
 *   Search:    y=421 (F1) → y=163 (F2)
 *   Swipe up:  y=838  (F1 only, fades)
 *   Hero h:    956 (F1) → 259 (F2)
 */
export default function Hero({ scrollY }: HeroProps) {
  const heroHeight = useTransform(scrollY, [0, 300], [956, 259], { clamp: true })

  /* Frame 1 → Frame 2 element transitions */
  const headlineOpacity = useTransform(scrollY, [0, 100], [1, 0], { clamp: true })
  const subtitleOpacity = useTransform(scrollY, [50, 150], [1, 0], { clamp: true })
  const swipeOpacity    = useTransform(scrollY, [0, 80],  [1, 0], { clamp: true })
  const searchTop       = useTransform(scrollY, [0, 300], [421, 163], { clamp: true })

  /* Frame 1 (light bottom gradient) fades out; Frame 2 (dark top gradient) fades in */
  const f1OverlayOpacity = useTransform(scrollY, [0, 300], [1, 0], { clamp: true })
  const f2OverlayOpacity = useTransform(scrollY, [0, 300], [0, 1], { clamp: true })

  return (
    <motion.section
      style={{ height: heroHeight }}
      className="relative w-full overflow-hidden flex-shrink-0 bg-[#0a1426]"
    >
      {/* Background image (positioned to show sky/horizon when compressed) */}
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 35%' }}
      />

      {/* Frame 1 overlay (warm dark, full hero) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: f1OverlayOpacity,
          backgroundImage:
            'linear-gradient(180deg, rgba(6,18,42,.78) 0%, rgba(6,18,42,.55) 30%, rgba(6,18,42,.08) 55%, transparent 70%, rgba(3,10,24,.40) 100%)',
        }}
      />

      {/* Frame 2 overlay (Figma: rgba(0,0,0,.64) → transparent at 63%) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: f2OverlayOpacity,
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 63%)',
        }}
      />

      {/* Logo — Figma: y=67, x=20 (after 59px status bar + 8px py) */}
      <div className="absolute top-[67px] left-5 z-10">
        <Logo />
      </div>

      {/* Headline — Figma: y=217 (F1 only) */}
      <motion.h1
        className="absolute top-[217px] left-5 right-5 z-10 text-[44px] font-extrabold text-white leading-[44px] tracking-[0.4px] pointer-events-none"
        style={{ opacity: headlineOpacity }}
      >
        Всё для<br />
        <span className="text-accent italic">путешествия</span>
      </motion.h1>

      {/* Subtitle — Figma: y=345 (F1 only) */}
      <motion.p
        className="absolute top-[310px] left-5 right-5 z-10 text-[14px] font-semibold text-white/70 leading-[20px] -tracking-[.3px] flex flex-wrap items-center gap-x-1 gap-y-1 pointer-events-none"
        style={{ opacity: subtitleOpacity }}
      >
        <span>Авиабилеты</span><span className="opacity-50">·</span>
        <span>Отели</span><span className="opacity-50">·</span>
        <span>Туры</span><span className="opacity-50">·</span>
        <span>eSIM</span><span className="opacity-50">·</span>
        <span>Экскурсии</span>
        <span>Аэропорт-такси</span><span className="opacity-50">·</span>
        <span>Трансфер</span><span className="opacity-50">·</span>
        <span>Аренда авто</span>
      </motion.p>

      {/* Search bar — Figma: F1 y=421 → F2 y=163 */}
      <motion.div
        className="absolute left-5 right-5 z-10"
        style={{ top: searchTop }}
      >
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
      </motion.div>

      {/* Swipe up — Figma: y=838 (F1 only) */}
      <motion.div
        className="absolute top-[838px] left-0 right-0 z-10 flex flex-col items-center gap-1 pointer-events-none"
        style={{ opacity: swipeOpacity }}
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
          <path
            d="M2 12L12 2L22 12"
            stroke="rgba(255,255,255,.88)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[15px] font-semibold text-white/90 -tracking-[.3px] leading-5">
          Проведите вверх
        </span>
      </motion.div>
    </motion.section>
  )
}
