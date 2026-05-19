import { motion } from 'framer-motion'

interface Destination {
  name: string
  rating: string
  price: string
  bgImage: string
  filled: boolean
}

const destinations: Destination[] = [
  {
    name: 'Мальдивы',
    rating: '4.8',
    price: 'от $399',
    bgImage: 'https://www.figma.com/api/mcp/asset/a7911271-5f03-4d50-bc59-4736796c3d4f',
    filled: true,
  },
  {
    name: 'Бухара',
    rating: '4.7',
    price: 'от $349',
    bgImage: 'https://www.figma.com/api/mcp/asset/89141893-7b44-4cad-906e-45c6ca910b53',
    filled: false,
  },
]

const arrowIcon = 'https://www.figma.com/api/mcp/asset/0430d9aa-3a05-4369-8a45-7c4f6c52e99e'

function Bookmark({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 1H12C12.55 1 13 1.45 13 2V16.5C13 16.85 12.62 17.06 12.33 16.87L7 13.5L1.67 16.87C1.38 17.06 1 16.85 1 16.5V2C1 1.45 1.45 1 2 1Z"
        fill={filled ? '#057a8d' : 'none'}
        stroke="#057a8d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFC400" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0.5L8.95 4.45L13.3 5.08L10.15 8.16L10.9 12.5L7 10.45L3.1 12.5L3.85 8.16L0.7 5.08L5.05 4.45L7 0.5Z"/>
    </svg>
  )
}

export default function PopularDestinations() {
  return (
    <motion.section
      className="w-full flex flex-col bg-white pb-3"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-2.5 px-5 py-3">
        <h2 className="flex-1 text-[22px] font-bold text-black leading-7 -tracking-[.26px]">
          Популярные направления
        </h2>
        <button className="h-9 px-2 pr-3 rounded-[20px] bg-white/70 backdrop-blur-xl flex items-center gap-1 border border-black/[.06]">
          <span className="text-[16px] font-semibold text-brand-light -tracking-[.31px]">Все</span>
          <img src={arrowIcon} alt="" className="w-3.5 h-3.5" />
        </button>
      </div>

      <motion.div
        className="flex flex-col gap-3 px-5"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {destinations.map((d) => (
          <motion.article
            key={d.name}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative w-full h-[104px] rounded-[24px] overflow-hidden flex flex-col justify-between p-3"
          >
            <img
              src={d.bgImage}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

            {/* Bookmark top-right */}
            <div className="relative z-10 self-end backdrop-blur-md bg-white rounded-[20px] w-9 h-9 flex items-center justify-center">
              <Bookmark filled={d.filled} />
            </div>

            {/* Bottom row: name + rating + price */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="text-[16px] font-semibold text-white -tracking-[.31px]"
                  style={{ textShadow: '0 0 32px rgba(0,0,0,.64)' }}
                >
                  {d.name}
                </span>
                <div className="flex items-center gap-1 px-0.5">
                  <Star />
                  <span
                    className="text-[13px] font-semibold text-white -tracking-[.08px]"
                    style={{ textShadow: '0 0 8px rgba(0,0,0,.64)' }}
                  >
                    {d.rating}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-[16px] px-2.5 py-1.5">
                <span className="text-[15px] font-semibold text-accent-red -tracking-[.23px] leading-5">
                  {d.price}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  )
}
