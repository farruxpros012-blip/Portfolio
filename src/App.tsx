import { useScroll, useReducedMotion } from 'framer-motion'
import Hero from './components/Hero'
import CompactHeader from './components/CompactHeader'
import Services from './components/Services'
import ToursByCountry from './components/ToursByCountry'
import PopularDestinations from './components/PopularDestinations'
import BottomNav from './components/BottomNav'
import { useScrollSnap } from './hooks/useScrollSnap'

export default function App() {
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  useScrollSnap(reducedMotion ? 0 : 300, 150)

  return (
    /* translateZ(0) makes fixed children position relative to this container
       (not the viewport) so they always align perfectly with mx-auto */
    <div
      className="w-[440px] max-w-full min-h-screen flex flex-col bg-white mx-auto relative"
      style={{ transform: 'translateZ(0)' }}
    >
      <Hero scrollY={scrollY} />

      <Services />
      <ToursByCountry />
      <PopularDestinations />

      {/* Spacer so the fixed BottomNav (~94px) doesn't cover content */}
      <div className="h-[94px] bg-white shrink-0" />

      <CompactHeader scrollY={scrollY} />
      <BottomNav scrollY={scrollY} />
    </div>
  )
}
