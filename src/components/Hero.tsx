import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from './Logo'

const HERO_BG = 'https://www.figma.com/api/mcp/asset/57bebdd2-def0-443f-90a7-11aad948accc'

interface HeroProps {
  scrollY: MotionValue<number>
}

/**
 * Hero — full Frame 1 layout. Scrolls naturally with the page.
 * As scroll progresses (0 → 250 px) the hero gently fades out so the
 * compact <CompactHeader/> can take over at the top of the viewport.
 *
 * Internal element positions (px from top):
 *   Logo:      y=20  (same distance from top as from left)
 *   Headline:  y=158
 *   Subtitle:  y=270
 *   Search:    y=370
 *   Swipe up:  y=720
 *   Hero h:    800
 */
export default function Hero({ scrollY }: HeroProps) {
  const heroOpacity = useTransform(scrollY, [120, 280], [1, 0], { clamp: true })
  const swipeOpacity = useTransform(scrollY, [0, 80], [1, 0], { clamp: true })

  return (
    <motion.section
      style={{ opacity: heroOpacity }}
      className="relative w-full h-[800px] overflow-hidden bg-[#0a1426] flex-shrink-0"
    >
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 35%' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(6,18,42,.78) 0%, rgba(6,18,42,.55) 30%, rgba(6,18,42,.08) 55%, transparent 70%, rgba(3,10,24,.40) 100%)',
        }}
      />

      {/* Logo — top=20, left=20 (equal margins) */}
      <div className="absolute top-5 left-5 z-10">
        <Logo />
      </div>

      {/* Headline */}
      <h1 className="absolute top-[158px] left-5 right-5 z-10 text-[44px] font-extrabold text-white leading-[44px] tracking-[0.4px] pointer-events-none">
        Всё для<br />
        <span className="text-accent italic">путешествия</span>
      </h1>

      {/* Subtitle */}
      <p className="absolute top-[270px] left-5 right-5 z-10 text-[14px] font-semibold text-white/70 leading-5 -tracking-[.3px] flex flex-wrap items-center gap-x-1 gap-y-1 pointer-events-none">
        <span>Авиабилеты</span><span className="opacity-50">·</span>
        <span>Отели</span><span className="opacity-50">·</span>
        <span>Туры</span><span className="opacity-50">·</span>
        <span>eSIM</span><span className="opacity-50">·</span>
        <span>Экскурсии</span>
        <span>Аэропорт-такси</span><span className="opacity-50">·</span>
        <span>Трансфер</span><span className="opacity-50">·</span>
        <span>Аренда авто</span>
      </p>

      {/* Search bar */}
      <div className="absolute top-[370px] left-5 right-5 z-10">
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

      {/* Swipe up */}
      <motion.div
        className="absolute top-[720px] left-0 right-0 z-10 flex flex-col items-center gap-1 pointer-events-none"
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
