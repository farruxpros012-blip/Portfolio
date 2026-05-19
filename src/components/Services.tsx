import { motion } from 'framer-motion'

const services = [
  { label: 'Туры',              icon: 'https://www.figma.com/api/mcp/asset/40723e60-92fe-409e-b71f-27d93cee4f17' },
  { label: 'Авиабилеты',        icon: 'https://www.figma.com/api/mcp/asset/9ba4ce66-adbc-443a-9d9c-9e79fd33d358' },
  { label: 'Отели',             icon: 'https://www.figma.com/api/mcp/asset/e9f4ff8b-4543-4a7d-a46f-b9e14ecc6156' },
  { label: 'eSIM',              icon: 'https://www.figma.com/api/mcp/asset/c1e5c637-619e-4c2b-9851-7a6678aa5489' },
  { label: 'Экскурсии',         icon: 'https://www.figma.com/api/mcp/asset/1c813fc7-4c0b-4d23-b7c5-3e1c9ffee739' },
  { label: 'Такси в аэропорту', icon: 'https://www.figma.com/api/mcp/asset/59b3972d-cdd6-4ffd-a2e1-d3cf16fa3b0f' },
  { label: 'Трансфер',          icon: 'https://www.figma.com/api/mcp/asset/f4cabd5b-70ec-49bf-b0bf-3db844411067' },
  { label: 'Аренда авто',       icon: 'https://www.figma.com/api/mcp/asset/035cd7cd-39b4-4fbe-842f-6c50cdffab0b' },
  { label: 'Все',               icon: 'https://www.figma.com/api/mcp/asset/137ab9e4-b8f0-4b89-8e51-8bf413b4c64b' },
]

const arrowIcon = 'https://www.figma.com/api/mcp/asset/0430d9aa-3a05-4369-8a45-7c4f6c52e99e'

export default function Services() {
  return (
    <motion.section
      className="w-full flex flex-col bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-2.5 px-5 py-3">
        <h2 className="flex-1 text-[22px] font-bold text-black leading-7 -tracking-[.26px]">
          Сервисы
        </h2>
        <button className="h-9 px-2 pr-3 rounded-[20px] bg-white/70 backdrop-blur-xl flex items-center gap-1 border border-black/[.06]">
          <span className="text-[16px] font-semibold text-brand-light -tracking-[.31px]">Все</span>
          <img src={arrowIcon} alt="" className="w-3.5 h-3.5" />
        </button>
      </div>

      <motion.div
        className="scroll-row flex gap-3 items-stretch px-5 pb-1"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            className="shrink-0 w-[88px] bg-white border-[0.8px] border-black/10 rounded-[20px] flex flex-col items-center py-2"
          >
            <div className="flex items-center justify-center p-2 w-full">
              <img src={s.icon} alt={s.label} className="w-[30px] h-[30px] object-contain" />
            </div>
            <div className="flex items-center justify-center pb-2 px-2 w-full">
              <span className="flex-1 text-[13px] font-semibold text-black text-center leading-[18px] -tracking-[.08px] overflow-hidden text-ellipsis whitespace-nowrap">
                {s.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
