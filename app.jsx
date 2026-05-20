/* global React, ReactDOM, IOSDevice */

const { useState, useEffect } = React;

// ────────────────── Brand tokens ──────────────────
const T = {
  brand: '#6B4DE6',
  brandDeep: '#5236C4',
  brandSoft: '#EFEAFE',
  ink: '#1A1B47',
  ink2: '#4B4E78',
  ink3: '#8C8FB5',
  line: '#ECEAF7',
  bgTop: '#F5EFFB',
  bgMid: '#F3E8F6',
  bgBot: '#EDE6FA',
  green: '#1FB57A',
  amber: '#F2A93B',
  shadow: '0 8px 24px -10px rgba(60, 38, 140, 0.18)',
  shadowSoft: '0 4px 14px -8px rgba(60, 38, 140, 0.18)',
};

// ────────────────── Icons ──────────────────
const Icon = ({ name, size = 20, color = 'currentColor', stroke = 1.8 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'pin': return <svg {...p}><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'chev-d': return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'chev-r': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'mic': return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>;
    case 'star-f': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 3 14.6 9l6.4.5-4.9 4.3 1.5 6.2L12 16.8 6.4 20l1.5-6.2L3 9.5 9.4 9 12 3z"/></svg>;
    case 'navigation': return <svg {...p}><path d="m3 11 18-8-8 18-2-8-8-2z"/></svg>;
    case 'msg': return <svg {...p}><path d="M21 12a8 8 0 0 1-12.4 6.7L3 20l1.3-5.6A8 8 0 1 1 21 12z"/></svg>;
    case 'calendar': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/></svg>;
    default: return null;
  }
};

// ────────────────── Header (compact) ──────────────────
function Header() {
  return (
    <div style={{ padding: '6px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button style={{
        border: 0, background: 'transparent', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="pin" size={18} color={T.brand} stroke={2.2}/>
        <span style={{ color: T.ink, fontWeight: 700, fontSize: 14.5, letterSpacing: -0.2 }}>Toshkent, Yunusobod</span>
        <Icon name="chev-d" size={14} color={T.ink2} stroke={2.4}/>
      </button>
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'linear-gradient(135deg,#FFD7BC,#F4A36B)',
        display: 'grid', placeItems: 'center',
        color: '#5A2D0E', fontWeight: 700, fontSize: 12,
        border: '2px solid #fff',
        boxShadow: '0 3px 10px -3px rgba(0,0,0,0.18)',
        position: 'relative',
      }}>
        AB
        <div style={{ position: 'absolute', right: -1, bottom: -1, width: 11, height: 11, borderRadius: 999, background: T.green, border: '2px solid #fff' }}/>
      </div>
    </div>
  );
}

// ────────────────── Search ──────────────────
function SearchBar({ onMic }) {
  const phrases = [
    'Uy xizmatlarini qidiring…',
    'Santexnik, elektrik, tozalash…',
    'Konditsionerni tozalash…',
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % phrases.length), 2800); return () => clearInterval(t); }, []);
  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fff', borderRadius: 16, padding: '10px 10px 10px 14px',
        boxShadow: T.shadow, border: '1px solid '+T.line,
      }}>
        <Icon name="search" size={18} color={T.ink3}/>
        <div style={{ flex: 1, position: 'relative', height: 20, overflow: 'hidden' }}>
          {phrases.map((p, idx) => (
            <div key={idx} style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center',
              fontSize: 14, color: T.ink3,
              transform: idx === i ? 'translateY(0)' : 'translateY(20px)',
              opacity: idx === i ? 1 : 0,
              transition: 'all .45s cubic-bezier(.4,0,.2,1)',
            }}>{p}</div>
          ))}
        </div>
        <button onClick={onMic} style={{
          border: 0, cursor: 'pointer',
          width: 36, height: 36, borderRadius: 12,
          background: 'linear-gradient(135deg, #7A5CF0, #5236C4)',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 6px 14px -6px rgba(82,54,196,0.6)',
        }}>
          <Icon name="mic" size={18} color="#fff" stroke={2.2}/>
        </button>
      </div>
    </div>
  );
}

// ────────────────── Hero banner ──────────────────
function HeroBanner() {
  return (
    <div style={{ padding: '16px 20px 0' }}>
      <div style={{
        position: 'relative', borderRadius: 22, overflow: 'hidden',
        height: 180, background: 'linear-gradient(135deg, #7A5CF0 0%, #5236C4 100%)',
        boxShadow: T.shadow,
      }}>
        {/* hero image */}
        <img
          src={(window.__resources && window.__resources.heroImg) || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80&auto=format&fit=crop"}
          alt="Home services"
          referrerPolicy="no-referrer"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />

        {/* gradient overlay for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(60,38,140,0.92) 0%, rgba(60,38,140,0.6) 55%, rgba(60,38,140,0.15) 100%)',
          pointerEvents: 'none',
        }}/>

        {/* decorative blob */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* content */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: 20,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          color: '#fff', pointerEvents: 'none',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px', borderRadius: 999,
              fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#7CF1B5' }}/>
              BUGUNGI TAKLIF
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.15, marginTop: 10, maxWidth: 220 }}>
              Birinchi xizmat<br/>uchun <span style={{ color: '#FFD17A' }}>20% chegirma</span>
            </div>
          </div>
          <button style={{
            pointerEvents: 'auto',
            alignSelf: 'flex-start',
            border: 0, cursor: 'pointer',
            background: '#fff', color: T.brandDeep,
            padding: '9px 18px', borderRadius: 999,
            fontWeight: 800, fontSize: 13, letterSpacing: 0.1,
            boxShadow: '0 6px 16px -6px rgba(0,0,0,0.3)',
          }}>Boshlash</button>
        </div>
      </div>
    </div>
  );
}

// ────────────────── Categories ──────────────────
// Same uniform style — image slot for each (user drops a real photo)
const CATS = [
  { id: 'clean', name: 'Tozalash', tone: 'linear-gradient(135deg,#B8D8FF,#5A8FD8)' },
  { id: 'plumb', name: 'Santexnika', tone: 'linear-gradient(135deg,#B5E6CB,#3FAA77)' },
  { id: 'ac', name: 'Konditsioner', tone: 'linear-gradient(135deg,#C4DCF5,#5288C8)' },
  { id: 'elec', name: 'Elektrik', tone: 'linear-gradient(135deg,#FFE2A3,#E5A23B)' },
  { id: 'paint', name: "Bo'yoq", tone: 'linear-gradient(135deg,#F8C6D8,#D26A93)' },
  { id: 'move', name: 'Yuk tashish', tone: 'linear-gradient(135deg,#D6C7F5,#8470D4)' },
  { id: 'garden', name: 'Bog\u02BCbonlik', tone: 'linear-gradient(135deg,#C7E7BD,#5FA84C)' },
  { id: 'tutor', name: 'Repetitor', tone: 'linear-gradient(135deg,#F4CDAE,#D27E48)' },
];

function CategoryRow() {
  return (
    <div style={{ padding: '20px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>Xizmatlar</div>
        <button style={{ border: 0, background: 'transparent', cursor: 'pointer', color: T.brand, fontWeight: 700, fontSize: 13 }}>Barchasi</button>
      </div>

      <div className="cat-scroll" style={{
        display: 'flex', gap: 12, overflowX: 'auto',
        paddingTop: 12, paddingBottom: 4,
        paddingLeft: 20, paddingRight: 20,
        scrollPaddingLeft: 20,
        scrollbarWidth: 'none',
        boxSizing: 'border-box',
      }}>
        <style>{`.cat-scroll::-webkit-scrollbar{display:none}`}</style>
        {CATS.map((c) => (
          <button key={c.id} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            flexShrink: 0, padding: 0, width: 72,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: c.tone,
              border: '2px solid #fff',
              boxShadow: T.shadowSoft,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <image-slot
                id={`cat-${c.id}`}
                shape="rect"
                placeholder={c.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              ></image-slot>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.ink, textAlign: 'center', lineHeight: 1.1 }}>{c.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ────────────────── Providers (compact) ──────────────────
const PROVIDERS = [
  { id: 'p1', name: 'Madina Karimova', role: 'Tozalash mutaxassisi', rating: 4.9, km: 0.8, price: '65 000', tone: 'linear-gradient(135deg,#FFD9C5,#E89B73)', initials: 'MK' },
  { id: 'p2', name: 'Bekzod Yusupov', role: 'Usta santexnik', rating: 5.0, km: 1.2, price: '90 000', tone: 'linear-gradient(135deg,#C8DAFF,#6C8DD6)', initials: 'BY' },
  { id: 'p3', name: 'Diyora Aliyeva', role: 'Elektrik', rating: 4.8, km: 2.1, price: '80 000', tone: 'linear-gradient(135deg,#FFE2C6,#E0905E)', initials: 'DA' },
];

function ProviderFeed() {
  return (
    <div style={{ padding: '22px 20px 0' }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: T.ink, letterSpacing: -0.3, marginBottom: 12 }}>
        Top mutaxassislar
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PROVIDERS.map(p => <ProviderCard key={p.id} p={p}/>)}
      </div>
    </div>
  );
}

function ProviderCard({ p }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: 14,
      boxShadow: T.shadow, border: '1px solid '+T.line,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* avatar */}
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: p.tone, flexShrink: 0,
          overflow: 'hidden', position: 'relative',
        }}>
          <image-slot
            id={`prov-${p.id}`}
            shape="rect"
            placeholder={p.initials}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          ></image-slot>
        </div>

        {/* info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
          <div style={{ fontSize: 12.5, color: T.ink2, marginTop: 1 }}>{p.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11.5, color: T.ink3, fontWeight: 500 }}>
            <Icon name="navigation" size={11} color={T.ink3} stroke={2}/>
            {p.km} km uzoqlikda
          </div>
        </div>

        {/* rating pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: T.brandSoft, color: T.ink,
          padding: '5px 9px', borderRadius: 999,
          fontSize: 12, fontWeight: 800,
          flexShrink: 0,
        }}>
          <Icon name="star-f" size={11} color={T.brand}/> {p.rating.toFixed(1)}
        </div>
      </div>

      {/* actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1, border: 0, cursor: 'pointer', borderRadius: 14,
          padding: '13px 14px', fontWeight: 800, fontSize: 14,
          background: 'linear-gradient(135deg, #7A5CF0, #5236C4)',
          color: '#fff', letterSpacing: 0.1,
          boxShadow: '0 8px 18px -8px rgba(82,54,196,0.6)',
        }}>Band qilish</button>
        <button style={{
          width: 48, height: 48, border: '1px solid '+T.line, cursor: 'pointer', borderRadius: 14,
          background: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <Icon name="msg" size={18} color={T.ink2}/>
        </button>
      </div>
    </div>
  );
}

// ────────────────── Bottom Nav ──────────────────
function BottomNav({ tab, setTab }) {
  const items = [
    { id: 'home', icon: 'compass', label: 'Bosh sahifa' },
    { id: 'book', icon: 'calendar', label: 'Buyurtmalar', badge: 2 },
    { id: 'msg', icon: 'msg', label: 'Xabarlar', badge: 5 },
    { id: 'me', icon: 'user', label: 'Profil' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 26, paddingTop: 14, paddingLeft: 12, paddingRight: 12,
      background: 'linear-gradient(180deg, rgba(237,230,250,0) 0%, rgba(237,230,250,0.85) 35%, #ECE4F7 100%)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20,
        padding: '6px 6px',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        boxShadow: '0 10px 30px -10px rgba(60,38,140,0.25)',
        border: '1px solid '+T.line,
      }}>
        {items.map(it => {
          const active = it.id === tab;
          return (
            <button key={it.id} onClick={() => setTab(it.id)} style={{
              border: 0, background: 'transparent', cursor: 'pointer',
              padding: '6px 4px', borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              position: 'relative',
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 38, height: 28, borderRadius: 10,
                  background: active ? T.brandSoft : 'transparent',
                  display: 'grid', placeItems: 'center',
                  transition: 'all .2s',
                }}>
                  <Icon name={it.icon} size={19} color={active ? T.brand : T.ink3} stroke={2}/>
                </div>
                {it.badge && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    minWidth: 15, height: 15, borderRadius: 999,
                    background: '#EF4D6C', color: '#fff',
                    fontSize: 9, fontWeight: 800,
                    display: 'grid', placeItems: 'center',
                    padding: '0 4px', border: '2px solid #fff',
                  }}>{it.badge}</div>
                )}
              </div>
              <div style={{
                fontSize: 10, fontWeight: active ? 800 : 600,
                color: active ? T.brand : T.ink3, letterSpacing: 0.1,
              }}>{it.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────── Voice overlay ──────────────────
function VoiceOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(20,15,55,0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 24, padding: 24,
    }}>
      <style>{`
        @keyframes pulse1 { 0%,100% { transform: scale(1); opacity: .35 } 50% { transform: scale(1.4); opacity: 0 } }
        @keyframes pulse2 { 0%,100% { transform: scale(1); opacity: .45 } 50% { transform: scale(1.25); opacity: .1 } }
        @keyframes bar { 0%,100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }
      `}</style>
      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', animation: 'pulse1 1.6s ease-out infinite' }}/>
        <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', animation: 'pulse2 1.6s ease-out infinite' }}/>
        <div style={{
          position: 'absolute', inset: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg,#9A7CF8,#5236C4)',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 18px 40px -10px rgba(82,54,196,0.9)',
        }}>
          <Icon name="mic" size={36} color="#fff" stroke={2}/>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 36 }}>
        {[0,1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            width: 4, height: 36, background: 'rgba(255,255,255,0.85)', borderRadius: 4,
            transformOrigin: 'center', animation: `bar ${0.6 + i*0.08}s ease-in-out ${i*0.06}s infinite`,
          }}/>
        ))}
      </div>
      <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, textAlign: 'center', letterSpacing: -0.2 }}>
        Tinglayapman…
      </div>
      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, textAlign: 'center', maxWidth: 280 }}>
        "Bugun kechqurun santexnik kerak" deb ayting
      </div>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{
        marginTop: 8, border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
        background: 'rgba(255,255,255,0.1)', color: '#fff',
        padding: '10px 28px', borderRadius: 999, fontWeight: 700, fontSize: 13,
      }}>Bekor qilish</button>
    </div>
  );
}

// ────────────────── Recent history (Section 2) ──────────────────
const RECENT = [
  { id: 'r1', name: 'Madina K.', service: 'Umumiy tozalash', date: '12 May', tone: 'linear-gradient(135deg,#FFD9C5,#E89B73)', initials: 'MK', needsReview: true },
  { id: 'r2', name: 'Bekzod Y.', service: 'Kran ta\u2019mirlash', date: '4 May', tone: 'linear-gradient(135deg,#C8DAFF,#6C8DD6)', initials: 'BY', needsReview: false },
  { id: 'r3', name: 'Diyora A.', service: 'Elektrik chaqiruvi', date: '28 Apr', tone: 'linear-gradient(135deg,#FFE2C6,#E0905E)', initials: 'DA', needsReview: false },
];

function RecentHistory() {
  return (
    <div style={{ padding: '22px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>Oxirgi buyurtmalarim</div>
        <button style={{ border: 0, background: 'transparent', cursor: 'pointer', color: T.brand, fontWeight: 700, fontSize: 13 }}>Tarix</button>
      </div>
      <div className="recent-scroll" style={{
        display: 'flex', gap: 10, overflowX: 'auto',
        paddingTop: 12, paddingBottom: 4,
        paddingLeft: 20, paddingRight: 20,
        scrollbarWidth: 'none',
      }}>
        <style>{`.recent-scroll::-webkit-scrollbar{display:none}`}</style>
        {RECENT.map(r => (
          <div key={r.id} style={{
            flexShrink: 0, width: 200,
            background: '#fff', borderRadius: 16, padding: 12,
            border: '1px solid '+T.line, boxShadow: T.shadowSoft,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: r.tone, flexShrink: 0,
                display: 'grid', placeItems: 'center',
                color: '#fff', fontWeight: 800, fontSize: 13,
              }}>{r.initials}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                <div style={{ fontSize: 11, color: T.ink3, marginTop: 1 }}>{r.date}</div>
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: T.ink2, fontWeight: 500, lineHeight: 1.25 }}>{r.service}</div>
            {r.needsReview ? (
              <button style={{
                border: 0, cursor: 'pointer', borderRadius: 10,
                padding: '8px 10px', fontWeight: 700, fontSize: 12,
                background: '#FDF1DC', color: '#9C6A12',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}>
                <Icon name="star-f" size={12} color="#E59A1F"/> Sharh qoldiring
              </button>
            ) : (
              <button style={{
                border: 0, cursor: 'pointer', borderRadius: 10,
                padding: '8px 10px', fontWeight: 700, fontSize: 12,
                background: T.brandSoft, color: T.brand,
              }}>Qayta band qilish</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────── Themed sub-categories ──────────────────
const THEMES = [
  {
    name: 'Uy xizmatlari',
    items: [
      { id: 'plumb', name: 'Santexnik', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#B5E6CB,#3FAA77)' },
      { id: 'elec', name: 'Elektrik', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#FFE2A3,#E5A23B)' },
      { id: 'clean', name: 'Tozalovchi', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#B8D8FF,#5A8FD8)' },
      { id: 'ac', name: 'Konditsioner', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#C4DCF5,#5288C8)' },
      { id: 'paint', name: "Bo'yoqchi", img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#F8C6D8,#D26A93)' },
    ],
  },
  {
    name: "Sog'liq",
    items: [
      { id: 'doc', name: 'Shifokor', img: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#C8DAFF,#6C8DD6)' },
      { id: 'nurse', name: 'Hamshira', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#FFD9C5,#E89B73)' },
      { id: 'dent', name: 'Stomatolog', img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#B5E6CB,#3FAA77)' },
      { id: 'phys', name: 'Massajchi', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#F4CDAE,#D27E48)' },
    ],
  },
  {
    name: "Go'zallik",
    items: [
      { id: 'hair', name: 'Sartarosh', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#F8C6D8,#D26A93)' },
      { id: 'nails', name: 'Manikur', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#F4CDAE,#D27E48)' },
      { id: 'makeup', name: 'Vizajist', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#D6C7F5,#8470D4)' },
      { id: 'cosm', name: 'Kosmetolog', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#FFD9C5,#E89B73)' },
    ],
  },
  {
    name: "Ta'lim",
    items: [
      { id: 'tutor', name: 'Repetitor', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#FBEAE0,#D9722B)' },
      { id: 'lang', name: 'Til kursi', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#C7E7BD,#5FA84C)' },
      { id: 'coach', name: 'Murabbiy', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#C8DAFF,#6C8DD6)' },
      { id: 'it', name: 'IT kursi', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format&fit=crop', tone: 'linear-gradient(135deg,#D6C7F5,#8470D4)' },
    ],
  },
];

function ThemedCategories() {
  return (
    <div style={{ padding: '22px 0 0' }}>
      {THEMES.map((theme, ti) => (
        <div key={theme.name} style={{ marginTop: ti === 0 ? 0 : 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>{theme.name}</div>
            <button style={{ border: 0, background: 'transparent', cursor: 'pointer', color: T.brand, fontWeight: 700, fontSize: 13 }}>Hammasi</button>
          </div>
          <div className="theme-scroll" style={{
            display: 'flex', gap: 12, overflowX: 'auto',
            paddingTop: 12, paddingBottom: 4,
            paddingLeft: 20, paddingRight: 20,
            scrollbarWidth: 'none',
          }}>
            <style>{`.theme-scroll::-webkit-scrollbar{display:none}`}</style>
            {theme.items.map(it => (
              <button key={it.id} style={{
                border: 0, background: 'transparent', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                flexShrink: 0, padding: 0, width: 104,
              }}>
                <div style={{
                  width: 104, height: 104, borderRadius: 20,
                  background: it.tone,
                  overflow: 'hidden', position: 'relative',
                  boxShadow: T.shadowSoft, border: '2px solid #fff',
                }}>
                  <img
                    src={it.img}
                    alt={it.name}
                    referrerPolicy="no-referrer"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, textAlign: 'center', lineHeight: 1.15 }}>{it.name}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ────────────────── App shell ──────────────────
function HomeApp() {
  const [tab, setTab] = useState('home');
  const [voice, setVoice] = useState(false);
  const isPrint = typeof window !== 'undefined' && window.__PRINT_MODE;

  return (
    <div data-screen-label="01 Home" style={{
      width: '100%', height: '100%', position: 'relative',
      background: `linear-gradient(180deg, ${T.bgTop} 0%, ${T.bgMid} 35%, ${T.bgBot} 100%)`,
      fontFamily: '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif',
      color: T.ink, overflow: 'hidden',
    }}>
      <div style={{
        position: isPrint ? 'relative' : 'absolute',
        inset: isPrint ? undefined : 0,
        overflowY: isPrint ? 'visible' : 'auto', overflowX: 'hidden',
        paddingTop: 18, paddingBottom: 110,
        WebkitOverflowScrolling: 'touch',
        minHeight: isPrint ? '100%' : undefined,
      }}>
        {/* blob backdrop */}
        <div style={{
          position: 'absolute', top: -40, right: -60, width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,179,255,0.5), transparent 65%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: 280, left: -80, width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,225,0.35), transparent 65%)',
          pointerEvents: 'none',
        }}/>

        <Header/>
        <HeroBanner/>
        <SearchBar onMic={() => setVoice(true)}/>
        <CategoryRow/>
        <RecentHistory/>
        <ProviderFeed/>
        <ThemedCategories/>

        <div style={{ height: 30 }}/>
      </div>

      <BottomNav tab={tab} setTab={setTab}/>
      <VoiceOverlay open={voice} onClose={() => setVoice(false)}/>
    </div>
  );
}

function App() {
  return (
    <div style={{
      minHeight: '100vh', background: '#E9E4F4',
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 430,
        position: 'relative', height: '100vh',
        boxShadow: '0 0 60px -20px rgba(60,38,140,0.35)',
        overflow: 'hidden',
      }}>
        <HomeApp/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
