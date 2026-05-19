import { useScroll, useReducedMotion } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import ToursByCountry from './components/ToursByCountry'
import PopularDestinations from './components/PopularDestinations'
import BottomNav from './components/BottomNav'
import { useScrollSnap } from './hooks/useScrollSnap'

export default function App() {
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  /* Snap logic: only when motion is allowed */
  useScrollSnap(reducedMotion ? 0 : 300, 150)

  return (
    <div className="w-[393px] max-w-full min-h-screen flex flex-col bg-white shadow-2xl mx-auto relative">
      <Hero scrollY={scrollY} />

      <Services />
      <ToursByCountry />
      <PopularDestinations />

      <BottomNav />
    </div>
  )
}
