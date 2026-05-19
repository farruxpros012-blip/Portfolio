import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from './Logo'

const HERO_BG = 'https://www.figma.com/api/mcp/asset/57bebdd2-def0-443f-90a7-11aad948accc'

interface HeroProps {
  scrollY: MotionValue<number>
}

export default function Hero({ scrollY }: HeroProps) {
  /* Hero height: Figma Frame 1 (956px) → Frame 2 (259px) over 0→300px scroll */
  const heroHeight = useTransform(scrollY, [0, 300], [956, 259], { clamp: true })

  /* Big headline: fades & lifts away first */
  const headlineOpacity = useTransform(scrollY, [0, 100], [1, 0], { clamp: true })
  const headlineY = useTransform(scrollY, [0, 100], [0, -30], { clamp: true })

  /* Services subtitle: fades slightly later */
  const subtitleOpacity = useTransform(scrollY, [50, 150], [1, 0], { clamp: true })
  const subtitleY = useTransform(scrollY, [50, 150], [0, -20], { clamp: true })

  /* "Проведите вверх" disappears earliest */
  const swipeOpacity = useTransform(scrollY, [0, 80], [1, 0], { clamp: true })

  /* Search bar: migrates upward toward Frame 2 position */
  const searchY = useTransform(scrollY, [0, 300], [0, -380], { clamp: true })

  /* Overlay: darkens slightly so light text remains readable when shrunk */
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.8, 0.95], { clamp: true })

  const bgStyle = {
    backgroundImage: `url(${HERO_BG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat' as const,
  }

  return (
    <motion.section
      style={{ height: heroHeight, ...bgStyle }}
      className="relative w-full flex flex-col overflow-hidden flex-shrink-0"
    >
      {/* Animated dark overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          backgroundImage:
            'linear-gradient(180deg, rgba(6,18,42,.84) 0%, rgba(6,18,42,.62) 30%, rgba(6,18,42,.10) 55%, transparent 68%, rgba(3,10,24,.50) 100%)',
        }}
      />

      {/* Logo (always visible) */}
      <header className="relative z-10 pt-8 px-5 pb-2">
        <Logo />
      </header>

      {/* Headline + subtitle (fade as user scrolls) */}
      <motion.div
        className="relative z-10 px-[22px] pt-11 flex flex-col gap-3.5"
        style={{ opacity: 1 }}
      >
        <motion.h1
          className="text-[42px] font-extrabold text-white leading-[1.04] tracking-[0.3px]"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          Всё для<br />
          <span className="text-accent italic">путешествия</span>
        </motion.h1>

        <motion.p
          className="text-[13px] font-semibold text-white/70 leading-[1.55] -tracking-[.1px] flex flex-wrap gap-x-1 gap-y-0.5"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          <span>Авиабилеты</span><span className="opacity-50"> · </span>
          <span>Отели</span><span className="opacity-50"> · </span>
          <span>Туры</span><span className="opacity-50"> · </span>
          <span>eSIM</span><span className="opacity-50"> · </span>
          <span>Экскурсии</span>
          <span className="basis-full h-0" />
          <span>Аэропорт-такси</span><span className="opacity-50"> · </span>
          <span>Трансфер</span><span className="opacity-50"> · </span>
          <span>Аренда авто</span>
        </motion.p>
      </motion.div>

      {/* Search bar (migrates up on scroll) */}
      <motion.div
        className="relative z-10 px-5 py-2 mt-3.5"
        style={{ y: searchY }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-[40px] flex items-center shadow-card">
          <div className="flex-1 flex items-center gap-3.5 px-5 py-[17px] pr-3">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="10" cy="10" r="7.2" stroke="#111" strokeWidth="1.8" />
              <path d="M15.7 15.7L20 20" stroke="#111" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-center text-[16px] font-semibold text-[#111] -tracking-[.3px]">
              Куда отправимся
            </span>
          </div>
          <div className="pl-0 p-2.5">
            <button
              type="button"
              className="w-[46px] h-[46px] rounded-full bg-brand border-[1.5px] border-brand-border flex items-center justify-center shadow-btn cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="white"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1" />

      {/* Swipe up indicator (fades earliest) */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1.5 px-5 pt-6 pb-4 cursor-pointer"
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
        <span className="text-[16px] font-semibold text-white/90 -tracking-[.3px]">
          Проведите вверх
        </span>
      </motion.div>
    </motion.section>
  )
}
