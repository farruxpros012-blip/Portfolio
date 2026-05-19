import { motion } from 'framer-motion'

interface CityPrice {
  city: string
  price: string
}

interface Tour {
  country: string
  bgImage: string
  priceFrom: string
  meta: string
  cities: CityPrice[]
}

const tours: Tour[] = [
  {
    country: 'Турция',
    bgImage: 'https://www.figma.com/api/mcp/asset/cf46e1b6-def3-42e9-b989-7acb88a74594',
    priceFrom: 'от 5 100 000 сум',
    meta: '7 ночй · 2 чел · Ultra All Inclusve',
    cities: [
      { city: 'Анталия', price: '7.2 млн' },
      { city: 'Стамбул', price: '5.1 млн' },
      { city: 'Бодрум',  price: '8.4 млн' },
      { city: 'Измир',   price: '6.2 млн' },
    ],
  },
  {
    country: 'Дубай',
    bgImage: 'https://www.figma.com/api/mcp/asset/cdd1654b-4bce-4706-8d80-66a79c962fd7',
    priceFrom: 'от 6 800 000 сум',
    meta: '7 ночй · 2 чел · Завтраки',
    cities: [
      { city: 'Дубай Марина',     price: '6.8 млн' },
      { city: 'Пальма Джумейра',  price: '7.4 млн' },
      { city: 'Даунтаун Дубай',   price: '7.1 млн' },
      { city: 'Дейра',            price: '6.0 млн' },
    ],
  },
]

export default function ToursByCountry() {
  return (
    <motion.section
      className="w-full flex flex-col bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="px-5 py-3">
        <h2 className="text-[22px] font-bold text-black leading-7 -tracking-[.26px]">
          Туры по странам
        </h2>
        <p className="text-[13px] font-normal text-black/60 leading-[18px] -tracking-[.08px]">
          Полулярные направления
        </p>
      </div>

      <motion.div
        className="scroll-row flex gap-3 items-stretch px-5 pb-1"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {tours.map((t) => (
          <motion.article
            key={t.country}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="shrink-0 w-[260px] bg-white border border-black/10 rounded-[24px] overflow-hidden flex flex-col"
          >
            {/* Image header with country tag */}
            <div className="relative h-[100px] flex flex-col items-start p-3 bg-neutral-200">
              <img
                src={t.bgImage}
                alt={t.country}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative bg-brand border-[1.5px] border-brand-border rounded-[16px] px-2.5 py-1.5 flex items-center justify-center">
                <span className="text-[15px] font-semibold text-white -tracking-[.23px] leading-5">
                  {t.country}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2 px-3 pt-2 pb-3 whitespace-nowrap">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1.5 text-[16px] -tracking-[.31px] leading-[21px]">
                  <span className="font-semibold text-black">{t.country}:</span>
                  <span className="font-normal text-black">{t.priceFrom}</span>
                </div>
                <div className="text-[13px] font-normal text-black/60 leading-[18px] -tracking-[.08px]">
                  {t.meta}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-[234px]">
                {t.cities.map((c) => (
                  <div
                    key={c.city}
                    className="bg-black/[.04] rounded-[12px] px-2 py-1 w-[113px] flex flex-col"
                  >
                    <span className="text-[13px] text-black leading-[18px] -tracking-[.08px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {c.city}
                    </span>
                    <span className="text-[16px] font-semibold text-accent-red leading-[21px] -tracking-[.31px]">
                      {c.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  )
}
