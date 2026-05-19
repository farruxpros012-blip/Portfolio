import { motion, useTransform, type MotionValue } from 'framer-motion'

interface NavItem {
  label: string
  active: boolean
  icon: React.ReactNode
}

function SearchIcon({ active }: { active: boolean }) {
  const stroke = active ? '#057a8d' : 'rgba(60,60,67,0.6)'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke={stroke} strokeWidth="1.8" />
      <path d="M17 17L21 21" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SavedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 3h12c.55 0 1 .45 1 1v17c0 .35-.38.56-.67.38L12 17.5l-6.33 3.87C5.38 21.56 5 21.35 5 21V4c0-.55.45-1 1-1z"
        stroke="rgba(60,60,67,0.6)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function OrdersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="16" height="14" rx="2" stroke="rgba(60,60,67,0.6)" strokeWidth="1.8" />
      <path d="M9 3v4M15 3v4M4 11h16" stroke="rgba(60,60,67,0.6)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="rgba(60,60,67,0.6)" strokeWidth="1.8" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="rgba(60,60,67,0.6)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const items: NavItem[] = [
  { label: 'Поиск',     active: true,  icon: <SearchIcon active /> },
  { label: 'Cохранено', active: false, icon: <SavedIcon /> },
  { label: 'Заказы',    active: false, icon: <OrdersIcon /> },
  { label: 'Профиль',   active: false, icon: <ProfileIcon /> },
]

interface BottomNavProps {
  scrollY: MotionValue<number>
}

export default function BottomNav({ scrollY }: BottomNavProps) {
  /* Slide-up + fade-in once user has scrolled past hero (>100px) */
  const navY = useTransform(scrollY, [100, 250], [120, 0], { clamp: true })
  const navOpacity = useTransform(scrollY, [100, 250], [0, 1], { clamp: true })
  const pointerEvents = useTransform(scrollY, (v) => (v > 100 ? 'auto' : 'none'))

  return (
    <motion.div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[393px] max-w-full bg-white z-30 border-t border-black/[.06]"
      style={{ y: navY, opacity: navOpacity, pointerEvents }}
    >
      <div className="px-3 py-1 flex items-center w-full">
        {items.map((it) => (
          <button
            key={it.label}
            className={[
              'flex-1 flex flex-col items-center py-1.5 rounded-[32px]',
              it.active ? 'bg-[#ecf2f3]' : '',
            ].join(' ')}
          >
            {it.icon}
            <span
              className={[
                'text-[12px] font-medium leading-4 text-center mt-0.5',
                it.active ? 'text-brand' : 'text-black/60',
              ].join(' ')}
            >
              {it.label}
            </span>
          </button>
        ))}
      </div>
      <div className="h-8 flex items-center justify-center">
        <div className="w-[134px] h-[5px] rounded-full bg-black" />
      </div>
    </motion.div>
  )
}
