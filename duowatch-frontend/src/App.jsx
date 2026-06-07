import { useMemo, useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Chats from './pages/Chats';
import Calls from './pages/Calls';
import Profile from './pages/Profile';

// ── Custom GSAP-powered trailing cursor ─────────────────
function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Only bind custom cursor on devices that support hover (pointers)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const onMouseMove = (e) => {
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorRingRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        gsap.to(cursorRingRef.current, {
          scale: 1.4,
          borderColor: '#fb923c',
          backgroundColor: 'rgba(251, 146, 60, 0.06)',
          duration: 0.2,
        });
        gsap.to(cursorDotRef.current, {
          scale: 1.3,
          backgroundColor: '#fb923c',
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        gsap.to(cursorRingRef.current, {
          scale: 1,
          borderColor: 'rgba(253, 164, 175, 0.45)',
          backgroundColor: 'transparent',
          duration: 0.2,
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          backgroundColor: '#fda4af',
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Small glowing core dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#fda4af',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px #fda4af, 0 0 20px #fda4af',
        }}
      />
      {/* Floating lag ring styled with a delicate heart */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(253, 164, 175, 0.45)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.2s, background-color 0.2s',
        }}
      >
        <Heart size={8} fill="rgba(253, 164, 175, 0.6)" color="transparent" />
      </div>
    </>
  );
}

// ── Deterministic star positions ──────────────────────
function Stars() {
  const stars = useMemo(() => (
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: ((i * 47 + 11) % 100).toFixed(1) + '%',
      left: ((i * 71 + 17) % 100).toFixed(1) + '%',
      size: ((i * 19) % 3) + 1,
      dur: (((i * 7) % 5) + 2) + 's',
      delay: (((i * 11) % 6)) + 's',
    }))
  ), []);
  return (
    <>
      {stars.map(s => (
        <span key={s.id} className="star" style={{
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          '--dur': s.dur,
          '--delay': s.delay,
        }} />
      ))}
    </>
  );
}

// ── Constellation connection ──────────────────────────
function Constellation() {
  return (
    <div style={{
      position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
      width: 280, height: 80, pointerEvents: 'none', opacity: 0.5, zIndex: 1
    }}>
      <svg width="100%" height="100%" viewBox="0 0 280 80">
        <line x1="40" y1="40" x2="240" y2="40" stroke="#fda4af" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="40" cy="40" r="3.5" fill="#fda4af" style={{ filter: 'drop-shadow(0 0 8px #fda4af)' }} />
        <circle cx="240" cy="40" r="3.5" fill="#fb923c" style={{ filter: 'drop-shadow(0 0 8px #fb923c)' }} />
      </svg>
      <div style={{ position: 'absolute', left: 28, top: 48, fontSize: 10, color: '#fda4af', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>You</div>
      <div style={{ position: 'absolute', right: 28, top: 48, fontSize: 10, color: '#fb923c', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>Me</div>
    </div>
  );
}

// ── Global click heart emitter ──────────────────────────
function ClickParticles() {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const id = Math.random().toString();
      setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 1000);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', overflow: 'hidden' }}>
      {clicks.map(c => (
        <motion.div
          key={c.id}
          initial={{ opacity: 1, scale: 0.5, x: c.x - 12, y: c.y - 12 }}
          animate={{ opacity: 0, scale: 1.6, y: c.y - 75, rotate: [0, 15, -15] }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'absolute', color: '#fda4af' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ── Background with candle glow + stars ───────────────
function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
    }}>
      {/* Base Dark Blackberry Velvet */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 55% at 50% -8%, rgba(168, 63, 92, 0.18) 0%, #0a040b 58%)',
      }} />
      <Stars />
      <Constellation />

      {/* Warm Rose Ambient Orb */}
      <div className="anim-glow" style={{
        position: 'absolute', width: 800, height: 800, top: '-20%', left: '-10%',
        background: 'radial-gradient(circle, rgba(253, 164, 175, 0.12) 0%, transparent 70%)',
        filter: 'blur(90px)',
      }} />

      {/* Warm Golden Candlelight Orb */}
      <div className="anim-glow" style={{
        position: 'absolute', width: 700, height: 700, bottom: '-20%', right: '-10%',
        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animationDelay: '3s',
      }} />

      {/* Soft Center Wine Glow */}
      <div className="anim-glow" style={{
        position: 'absolute', width: 450, height: 450, top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(168, 63, 92, 0.09) 0%, transparent 70%)',
        filter: 'blur(75px)',
        animationDelay: '1.5s',
      }} />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
      background: '#0a040b', color: '#fdfbf7', overflowX: 'hidden',
      position: 'relative',
    }}>
      <Background />
      <CustomCursor />
      <ClickParticles />
      <NavBar />
      <main style={{
        position: 'relative', zIndex: 10, flex: 1,
        width: '100%', maxWidth: 1280, margin: '0 auto',
        padding: '24px 20px', display: 'flex', flexDirection: 'column',
      }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/calls" element={<Calls />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
