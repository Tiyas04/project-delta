import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, Video, MessageCircle, Sparkles, Star,
  Shield, UserPlus, Loader2, Check, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// ── Floating flower petals ──────────────────────────────
const PETAL_DEFS = [
  { id: 1, left: '8%',  size: 10, dur: '8s',   delay: '0s',   opacity: 0.35, symbol: '🌸' },
  { id: 2, left: '22%', size: 8,  dur: '7s',   delay: '1.5s', opacity: 0.25, symbol: '✨' },
  { id: 3, left: '38%', size: 12, dur: '9s',   delay: '0.8s', opacity: 0.4,  symbol: '🌸' },
  { id: 4, left: '62%', size: 9,  dur: '7.5s', delay: '2.2s', opacity: 0.3,  symbol: '🎈' },
  { id: 5, left: '78%', size: 11, dur: '8.5s', delay: '1.2s', opacity: 0.35, symbol: '🌸' },
  { id: 6, left: '92%', size: 8,  dur: '6.5s', delay: '3.5s', opacity: 0.25, symbol: '✨' },
];

// ── Cameo Gold Lockets ──────────────────────────────────
function DuoLockets() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 44, gap: 0 }}>
      {/* Left Cameo (You) */}
      <div className="anim-float" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          width: 84, height: 108,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: 'radial-gradient(ellipse at center, rgba(168,63,92,0.4) 0%, rgba(10,4,11,0.9) 100%)',
          border: '2.5px solid rgba(251, 146, 60, 0.7)',
          boxShadow: '0 12px 36px rgba(10,4,11,0.7), 0 0 16px rgba(251, 146, 60, 0.25), inset 0 0 14px rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Inner portrait halo */}
          <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,164,175,0.08) 0%, transparent 80%)' }} />
          <span style={{ fontSize: 38, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>👩</span>
        </div>
        <div style={{
          position: 'absolute', bottom: 2, right: -2,
          width: 20, height: 20, borderRadius: '50%', fontSize: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a040b', border: '1.5px solid rgba(253,164,175,0.4)',
        }}>🌸</div>
      </div>

      {/* Constellation Link */}
      <div style={{ position: 'relative', width: 120, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="locketGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a83f5c" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#fda4af" stopOpacity="1" />
              <stop offset="100%" stopColor="#a83f5c" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M 10,10 Q 60,2 110,10"
            stroke="url(#locketGrad)" strokeWidth="1.5"
            strokeDasharray="4 4"
            className="anim-dash"
            fill="none"
          />
        </svg>
        {/* Pulsing heart node */}
        <div className="anim-pulse-heart" style={{ position: 'relative', zIndex: 2 }}>
          <Heart size={28} style={{
            color: '#fda4af', fill: '#fda4af',
            filter: 'drop-shadow(0 0 12px rgba(253,164,175,0.95))',
          }} />
        </div>
      </div>

      {/* Right Cameo (Me) */}
      <div className="anim-float-delayed" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          width: 84, height: 108,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: 'radial-gradient(ellipse at center, rgba(168,63,92,0.4) 0%, rgba(10,4,11,0.9) 100%)',
          border: '2.5px solid rgba(251, 146, 60, 0.7)',
          boxShadow: '0 12px 36px rgba(10,4,11,0.7), 0 0 16px rgba(251, 146, 60, 0.25), inset 0 0 14px rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 80%)' }} />
          <span style={{ fontSize: 38, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>👨</span>
        </div>
        <div style={{
          position: 'absolute', bottom: 2, left: -2,
          width: 20, height: 20, borderRadius: '50%', fontSize: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a040b', border: '1.5px solid rgba(253,164,175,0.4)',
        }}>✨</div>
      </div>
    </div>
  );
}

// ── Scrapbook Memory Book Mockup ────────────────────────
function ScrapbookMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: 900, margin: '64px auto 0', padding: '0 16px' }}
    >
      <div style={{ position: 'relative' }}>
        {/* Book shadow & leather outline */}
        <div style={{
          position: 'absolute', inset: -4, borderRadius: 28,
          background: 'linear-gradient(135deg, #4b1a2a, #230812, #000000)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }} />
        {/* Open Book Pages */}
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          background: '#fdfaf2', // Warm Ivory book page
          border: '3px solid #6b432a', // Brown leather spine outline
          color: '#3d261a', // Dark vintage ink color
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 330,
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.06)'
        }}>
          {/* Central spine fold shadow */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: 16, background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 10
          }} />

          {/* LEFT PAGE: Memories & Notes */}
          <div className="paper-line" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <h3 className="serif-brand" style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic', margin: '0 0 16px', color: '#661b2f', borderBottom: '1px dashed rgba(102,27,47,0.25)', paddingBottom: 6 }}>
              Our Diary Entry
            </h3>

            {/* Polaroid Memory */}
            <div style={{
              position: 'absolute', right: 20, top: 56, width: 100, height: 110,
              background: '#ffffff', padding: '6px 6px 16px', borderRadius: 2,
              boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
              transform: 'rotate(6deg) scale(0.95)', border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5
            }}>
              <div style={{
                width: '100%', height: 74,
                background: 'linear-gradient(135deg, rgba(168,63,92,0.4), rgba(253,164,175,0.2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
              }}>👩‍❤️‍👨</div>
              <div style={{ fontSize: 8, fontStyle: 'italic', marginTop: 5, color: '#888', letterSpacing: '0.05em' }}>Summer 2026 🪐</div>
            </div>

            {/* Written memory lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13, lineHeight: 2.15, maxWidth: '65%', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600 }}>
              <p style={{ margin: 0 }}>“Met on DuoWatch today. Set up our cozy digital room. The constellation line twinkled when we connected.”</p>
              <p style={{ margin: 0, color: '#661b2f' }}>✓ Watch sunset movies next</p>
              <p style={{ margin: 0 }}>✓ Chat late night together</p>
            </div>
          </div>

          {/* RIGHT PAGE: Active space preview */}
          <div style={{ padding: '24px 28px', background: '#f8f4e8', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(102,27,47,0.1)', paddingBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="anim-pulse-heart" style={{ display: 'inline-block' }}>❤️</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#661b2f' }}>Cozy Date Live</span>
              </div>
              <span style={{ fontSize: 10, color: '#8c606e' }}>Room: 🔒 you & me</span>
            </div>

            {/* Video mockup row */}
            <div style={{ display: 'flex', gap: 10, height: 110, marginTop: 4 }}>
              {/* Partner camera frame */}
              <div style={{
                flex: 1, borderRadius: 14, overflow: 'hidden', background: '#331a23', position: 'relative',
                border: '1.5px solid rgba(251, 146, 60, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ fontSize: 32 }}>👩</div>
                {/* audio visualizer */}
                <div style={{ position: 'absolute', bottom: 6, right: 6, display: 'flex', gap: 2, height: 12, alignItems: 'flex-end' }}>
                  {[2, 5, 3, 4].map((h, i) => (
                    <motion.div key={i}
                      style={{ width: 2, background: '#fda4af', borderRadius: 1 }}
                      animate={{ height: [`${h * 1.5}px`, `${h * 3}px`, `${h * 1.5}px`] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
              {/* Your camera frame */}
              <div style={{
                width: 80, borderRadius: 14, overflow: 'hidden', background: '#4c1f2e', position: 'relative',
                border: '1.5px solid rgba(253, 164, 175, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ fontSize: 26 }}>👨</div>
              </div>
            </div>

            {/* Mock chat bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              <div style={{ alignSelf: 'flex-start', background: '#ffffff', color: '#3d261a', padding: '6px 12px', borderRadius: '12px 12px 12px 3px', fontSize: 10, maxWidth: '80%', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                Hey love! Ready to watch? 🎬
              </div>
              <div style={{ alignSelf: 'flex-end', background: '#661b2f', color: '#fdfbf7', padding: '6px 12px', borderRadius: '12px 12px 3px 12px', fontSize: 10, maxWidth: '80%', boxShadow: '0 2px 6px rgba(102,27,47,0.2)' }}>
                Yes! Just started the room 💜
              </div>
            </div>
          </div>
        </div>
        {/* Soft bottom candle glow under the book */}
        <div style={{
          position: 'absolute', bottom: -20, left: '15%', right: '15%', height: 40,
          background: 'linear-gradient(90deg, rgba(253, 164, 175, 0.4), rgba(251, 146, 60, 0.3))',
          filter: 'blur(24px)', zIndex: -1
        }} />
      </div>
    </motion.div>
  );
}

// ── Love Letter Partner Connection panel ────────────────
function PartnerPanel() {
  const { user, partnerStatus, partnerName, sendPartnerRequest, acceptPartnerRequest, setPartnerStatus, setPartnerName } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback((e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => { sendPartnerRequest(email); setLoading(false); }, 1300);
  }, [email, sendPartnerRequest]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
      <div style={{
        background: 'rgba(45, 12, 22, 0.8)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(253, 164, 175, 0.16)',
        borderRadius: 36, position: 'relative', overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {/* Envelope Top flap style */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(253, 164, 175, 0.5), rgba(251, 146, 60, 0.5), transparent)' }} />
        <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 280, height: 120, background: 'radial-gradient(ellipse, rgba(253, 164, 175, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ padding: 36, position: 'relative', zIndex: 1 }}>
          {/* Greeting Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div className="anim-pulse-heart" style={{ display: 'inline-block', marginBottom: 14 }}>
              <Heart size={44} style={{ color: '#fda4af', fill: '#fda4af', filter: 'drop-shadow(0 0 14px rgba(253,164,175,0.7))' }} />
            </div>
            <h2 className="serif-brand" style={{ fontSize: 28, fontWeight: 700, color: '#fdfbf7', margin: 0, lineHeight: 1.2 }}>
              Dear <span style={{ background: 'linear-gradient(135deg, #fdfbf7, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{user?.name}</span>,
            </h2>
            <p style={{ fontSize: 13, color: '#e0a6aa', marginTop: 6, fontFamily: "'Outfit', sans-serif" }}>Your private date room is ready to seal.</p>
          </div>

          <AnimatePresence mode="wait">
            {/* None: invite form */}
            {partnerStatus === 'none' && (
              <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ background: 'rgba(10, 4, 11, 0.4)', border: '1px solid rgba(253, 164, 175, 0.12)', borderRadius: 20, padding: 20, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontFamily: "'Outfit', sans-serif" }}>
                    Send Love Letter Invitation
                  </p>
                  <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="email" required value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="partner@email.com"
                      style={{
                        flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253, 164, 175, 0.15)',
                        color: '#fdfbf7', borderRadius: 14, padding: '12px 14px',
                        fontSize: 13, outline: 'none', fontFamily: 'inherit',
                      }}
                    />
                    <button type="submit" disabled={loading} style={{
                      background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                      border: 'none', borderRadius: 14, padding: '12px 16px',
                      color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center',
                      flexShrink: 0, opacity: loading ? 0.6 : 1,
                      boxShadow: '0 4px 14px rgba(168,63,92,0.3)'
                    }}>
                      {loading ? <Loader2 size={16} className="anim-spin" /> : <UserPlus size={16} />}
                    </button>
                  </form>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#8c606e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>— Simulated Envelope —</p>
                  <button onClick={() => { setPartnerStatus('received'); setPartnerName('Alex'); }}
                    style={{
                      fontSize: 12, padding: '8px 18px', borderRadius: 12, cursor: 'pointer', fontWeight: 600,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253, 164, 175, 0.12)',
                      color: '#e0a6aa', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#fda4af'}
                    onMouseLeave={e => e.target.style.color = '#e0a6aa'}
                    >
                    💌 Simulate Incoming Love Letter
                  </button>
                </div>
              </motion.div>
            )}

            {/* Sent: waiting */}
            {partnerStatus === 'sent' && (
              <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ background: 'rgba(10, 4, 11, 0.4)', border: '1px solid rgba(253, 164, 175, 0.12)', borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 16 }}>
                  <Loader2 size={32} className="anim-spin" style={{ color: '#fda4af', margin: '0 auto 12px' }} />
                  <p style={{ fontWeight: 700, color: '#fdfbf7', marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>Letter Sealed & Sent!</p>
                  <p style={{ fontSize: 13, color: '#e0a6aa' }}>Waiting for <span style={{ color: '#fda4af', fontWeight: 600 }}>{partnerName}</span> to open…</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button onClick={() => {
                    setLoading(true);
                    setTimeout(() => { acceptPartnerRequest(); setLoading(false); }, 800);
                  }} style={{
                    fontSize: 12, padding: '8px 18px', borderRadius: 12, cursor: 'pointer', fontWeight: 600,
                    background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
                    color: '#4ADE80', fontFamily: 'inherit',
                  }}>
                    ✓ Simulate Letter Accepted
                  </button>
                </div>
              </motion.div>
            )}

            {/* Received: invite options styled as open letter */}
            {partnerStatus === 'received' && (
              <motion.div key="received" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(168, 63, 92, 0.15), rgba(253, 164, 175, 0.15))',
                  border: '1px solid rgba(253, 164, 175, 0.25)', borderRadius: 20, padding: 28, textAlign: 'center',
                }}>
                  <div className="anim-pulse-heart" style={{ display: 'inline-block', marginBottom: 12 }}>
                    <Heart size={36} style={{ color: '#fda4af', fill: '#fda4af', filter: 'drop-shadow(0 0 10px rgba(253,164,175,0.6))' }} />
                  </div>
                  <h3 className="serif-brand" style={{ fontWeight: 700, color: '#fdfbf7', fontSize: 22, margin: '0 0 6px' }}>Love Letter Received! 💌</h3>
                  <p style={{ fontSize: 13, color: '#e0a6aa', marginBottom: 24, fontFamily: "'Outfit', sans-serif" }}>
                    <span style={{ color: '#fda4af', fontWeight: 600 }}>{partnerName}</span> invites you to share their room.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button onClick={() => setPartnerStatus('none')} style={{
                      padding: '10px 22px', borderRadius: 14, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253, 164, 175, 0.12)',
                      color: '#e0a6aa', fontFamily: 'inherit',
                    }}>Return</button>
                    <button onClick={acceptPartnerRequest} style={{
                      padding: '10px 22px', borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: 14,
                      background: 'linear-gradient(135deg, #a83f5c, #fda4af)', border: 'none',
                      color: 'white', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', gap: 8,
                      boxShadow: '0 6px 20px rgba(168, 63, 92, 0.4)',
                    }}>
                      <Check size={16} /> Open & Accept ❤️
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Connected: enter space */}
            {partnerStatus === 'connected' && (
              <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(168, 63, 92, 0.18), rgba(253, 164, 175, 0.18))',
                  border: '1px solid rgba(253, 164, 175, 0.28)', borderRadius: 20, padding: 28, textAlign: 'center', marginBottom: 16,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    👩 <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ display: 'inline-block', margin: '0 6px' }}>❤️</motion.span> 👨
                  </div>
                  <h3 className="serif-brand" style={{ fontWeight: 700, color: '#fdfbf7', fontSize: 22, margin: '0 0 6px' }}>Sanctuary Sealed! 🎉</h3>
                  <p style={{ fontSize: 13, color: '#e0a6aa', fontFamily: "'Outfit', sans-serif" }}>
                    Connected in love with <span style={{ background: 'linear-gradient(135deg, #fdfbf7, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>{partnerName}</span>
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <Link to="/chats" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: 18, borderRadius: 18, cursor: 'pointer',
                      background: 'rgba(168, 63, 92, 0.12)', border: '1px solid rgba(253, 164, 175, 0.15)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(168,63,92,0.2)'; e.target.style.borderColor = 'rgba(253,164,175,0.25)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(168,63,92,0.12)'; e.target.style.borderColor = 'rgba(253,164,175,0.15)'; }}
                    >
                      <MessageCircle size={20} color="#fda4af" style={{ marginBottom: 8 }} />
                      <p style={{ fontWeight: 700, color: '#fdfbf7', fontSize: 14, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>Chat Diary</p>
                      <p style={{ fontSize: 11, color: '#8c606e', margin: 0 }}>Write messages</p>
                    </div>
                  </Link>
                  <Link to="/calls" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: 18, borderRadius: 18, cursor: 'pointer',
                      background: 'rgba(251, 146, 60, 0.08)', border: '1px solid rgba(251, 146, 60, 0.15)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(251,146,60,0.14)'; e.target.style.borderColor = 'rgba(251,146,60,0.25)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(251,146,60,0.08)'; e.target.style.borderColor = 'rgba(251,146,60,0.15)'; }}
                    >
                      <Video size={20} color="#fb923c" style={{ marginBottom: 8 }} />
                      <p style={{ fontWeight: 700, color: '#fdfbf7', fontSize: 14, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>Video Room</p>
                      <p style={{ fontSize: 11, color: '#8c606e', margin: 0 }}>See each other</p>
                    </div>
                  </Link>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button onClick={() => setPartnerStatus('none')} style={{ fontSize: 12, color: '#8c606e', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                    Disconnect room connection
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{ height: 4, background: 'linear-gradient(90deg, transparent, rgba(253, 164, 175, 0.22), transparent)' }} />
      </div>
    </motion.div>
  );
}

// ── Feature cards ────────────────────────────────────────
const FEATURES = [
  { Icon: Video, label: 'HD Video Dates', desc: 'Private peer-to-peer visual dates. Just the two of you.', color: '#fda4af', bg: 'rgba(168, 63, 92, 0.16)' },
  { Icon: MessageCircle, label: 'Private Journal', desc: 'Secure messages saved only for you and your partner.', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)' },
  { Icon: Shield, label: 'Locked Sanctuary', desc: 'Secured with double key validation. Absolute privacy.', color: '#fda4af', bg: 'rgba(168, 63, 92, 0.16)' },
];

// ── MAIN HOME PAGE ────────────────────────────────────────
export default function Home() {
  const { user } = useApp();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

      {/* Floating flower petals */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {PETAL_DEFS.map(p => (
          <div key={p.id} className="flower-petal" style={{ left: p.left, bottom: '5%', '--delay': p.delay, '--dur': p.dur }}>
            <span style={{ fontSize: p.size + 4, opacity: p.opacity, display: 'block' }}>{p.symbol}</span>
          </div>
        ))}
      </div>

      {user ? (
        <div style={{ width: '100%', paddingTop: 40, zIndex: 10, position: 'relative' }}>
          <PartnerPanel />
        </div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, paddingBottom: 80, position: 'relative', zIndex: 10 }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 99,
              marginBottom: 36,
              background: 'rgba(168, 63, 92, 0.12)', border: '1px solid rgba(253, 164, 175, 0.25)',
              fontSize: 12, fontWeight: 600, color: '#fda4af',
            }}>
            <Star size={12} fill="#fda4af" color="#fda4af" />
            <span style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '0.02em' }}>Your Private Digital Sanctuary</span>
            <Star size={12} fill="#fb923c" color="#fb923c" />
          </motion.div>

          {/* Lockets */}
          <DuoLockets />

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="serif-brand"
            style={{
              textAlign: 'center', fontWeight: 500, letterSpacing: '0.01em',
              fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.05,
              margin: '0 0 24px', padding: '0 16px',
              color: '#fdfbf7',
            }}>
            Be together,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #fda4af, #fb923c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'italic', fontWeight: 700
            }}>even when</span>
            <br />you're apart.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              textAlign: 'center', fontSize: 17, lineHeight: 1.7,
              color: '#e0a6aa', fontWeight: 400, maxWidth: 510,
              margin: '0 auto 44px', padding: '0 16px',
              fontFamily: "'Outfit', sans-serif",
            }}>
            Video call, chat, and keep memories — in one{' '}
            <span style={{ color: '#fda4af', fontWeight: 600, fontStyle: 'italic' }}>private diary space</span>{' '}
            built exclusively for the two of you.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 12, padding: '0 16px' }}>
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '16px 34px', borderRadius: 18,
                background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                color: 'white', fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
                boxShadow: '0 10px 32px rgba(168, 63, 92, 0.45)', fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'none'}
              >
                <Heart size={18} fill="white" /> Enter Your Sanctuary <ChevronRight size={16} />
              </button>
            </Link>
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '16px 34px', borderRadius: 18,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253, 164, 175, 0.15)',
                color: '#e0a6aa', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#fda4af'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = '#e0a6aa'; }}
              >
                <Sparkles size={18} color="#fb923c" /> Create Shared Room
              </button>
            </Link>
          </motion.div>
          <p style={{ fontSize: 12, color: '#8c606e', textAlign: 'center', marginBottom: 0, fontFamily: "'Outfit', sans-serif" }}>
            Locked Room validation · P2P Pinned Encryption
          </p>

          {/* Diary Scrapbook Mockup */}
          <ScrapbookMockup />

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, width: '100%', maxWidth: 840, marginTop: 80, padding: '0 16px' }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  padding: 28, borderRadius: 28,
                  background: f.bg, border: '1px solid rgba(253,164,175,0.12)',
                  backdropFilter: 'blur(16px)',
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${f.bg}`, marginBottom: 20,
                  border: `1.5px solid ${f.color}33`,
                }}>
                  <f.Icon size={20} color={f.color} />
                </div>
                <h3 className="serif-brand" style={{ fontWeight: 700, color: '#fdfbf7', fontSize: 18, marginBottom: 8 }}>{f.label}</h3>
                <p style={{ color: '#e0a6aa', fontSize: 14, lineHeight: 1.6, margin: 0, fontFamily: "'Outfit', sans-serif" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
