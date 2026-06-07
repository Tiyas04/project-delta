import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, MonitorUp, Settings, Heart, Radio, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Guard({ title, desc, to, cta }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: '40px 24px' }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
          boxShadow: '0 8px 32px rgba(168,63,92,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Heart size={38} color="white" fill="white" />
        </div>
      </motion.div>
      <h2 className="serif-brand" style={{ fontSize: 28, fontWeight: 700, color: '#fdfbf7', margin: 0 }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#e0a6aa', maxWidth: 360, lineHeight: 1.6, margin: 0, fontFamily: "'Outfit', sans-serif" }}>{desc}</p>
      <Link to={to} style={{ textDecoration: 'none', marginTop: 8 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 14,
          background: 'linear-gradient(135deg, #a83f5c, #fda4af)', color: 'white',
          fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 28px rgba(168,63,92,0.35)', fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}>
          <Heart size={15} fill="white" /> {cta}
        </button>
      </Link>
    </div>
  );
}

function VoiceWave() {
  const bars = [2, 5, 9, 7, 12, 9, 7, 5, 3, 7, 10, 6];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3.5, height: 40, marginBottom: 20 }}>
      {bars.map((h, i) => (
        <motion.div key={i}
          style={{ width: 4, borderRadius: 4, background: 'linear-gradient(to top, #fb923c, #fda4af)' }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
          initial={{ height: h * 2.5 }}
        />
      ))}
    </div>
  );
}

function CtrlBtn({ isActive, onClick, children, label, danger, brand }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
        padding: '14px 18px', borderRadius: 18, cursor: 'pointer', minWidth: 64,
        background: danger && isActive ? 'rgba(239,68,68,0.12)' : brand && isActive ? 'rgba(253,164,175,0.14)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${danger && isActive ? 'rgba(239,68,68,0.3)' : brand && isActive ? 'rgba(253,164,175,0.22)' : 'rgba(253,164,175,0.1)'}`,
        color: danger && isActive ? '#FCA5A5' : brand && isActive ? '#fda4af' : '#e0a6aa',
        fontFamily: 'inherit',
        transition: 'all 0.2s',
      }}
    >
      {children}
      {label && <span style={{ fontSize: 10, fontWeight: 600 }}>{label}</span>}
    </motion.button>
  );
}

export default function Calls() {
  const { user, partnerStatus, partnerName } = useApp();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [camError, setCamError] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [gestures, setGestures] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!user || partnerStatus !== 'connected') return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [user, partnerStatus]);

  useEffect(() => {
    if (!user || partnerStatus !== 'connected') return;
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch { setCamError('Camera access denied'); }
    })();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [user, partnerStatus]);

  useEffect(() => { localStream?.getAudioTracks().forEach(t => { t.enabled = !muted; }); }, [muted, localStream]);
  useEffect(() => { localStream?.getVideoTracks().forEach(t => { t.enabled = !videoOff; }); }, [videoOff, localStream]);

  const triggerGesture = (symbol) => {
    const batch = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random().toString(),
      symbol,
      left: (Math.random() * 80 + 10) + '%',
      bottom: '15%',
      size: Math.floor(Math.random() * 20 + 24),
      delay: (Math.random() * 0.4),
      dur: (Math.random() * 1.5 + 1.5),
    }));
    setGestures(prev => [...prev, ...batch]);
  };

  // Clean up completed gestures to avoid bloating DOM
  useEffect(() => {
    if (gestures.length > 0) {
      const timer = setTimeout(() => {
        setGestures(prev => prev.slice(12));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [gestures]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (!user) return <Guard title="Sign In First" desc="Please sign in to join your partner on a cozy video date." to="/auth" cta="Sign In" />;
  if (partnerStatus !== 'connected') return <Guard title="Room Not Ready" desc="Connect with your partner from the Home page to unlock your video room." to="/" cta="Link Partner Room" />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, height: 'calc(100vh - 12rem)', minHeight: 460, maxWidth: 900, margin: '0 auto', width: '100%', position: 'relative' }}>

      {/* ── Gesture animations overlay ── */}
      <AnimatePresence>
        {gestures.map(g => (
          <motion.div
            key={g.id}
            initial={{ opacity: 1, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -320, scale: 1.5, rotate: [0, 20, -20, 10] }}
            exit={{ opacity: 0 }}
            transition={{ duration: g.dur, ease: 'easeOut', delay: g.delay }}
            style={{
              position: 'absolute', left: g.left, bottom: g.bottom,
              fontSize: g.size, pointerEvents: 'none', zIndex: 100
            }}
          >
            {g.symbol}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Video calling Polaroid canvas ── */}
      <div style={{
        width: '100%', flex: 1, display: 'flex', flexDirection: 'row', gap: 16, padding: '16px 20px',
        position: 'relative', overflow: 'hidden', minHeight: 0
      }}>
        {/* Ambient background glow inside video board */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(253, 164, 175, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* ── Remote Polaroid (partner) ── */}
        <div style={{
          flex: 1, background: '#ffffff', padding: '12px 12px 52px 12px', borderRadius: 4,
          transform: 'rotate(-1.5deg)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          border: '1.5px solid rgba(0,0,0,0.06)', position: 'relative', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            flex: 1, borderRadius: 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a040b', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VoiceWave />
              {/* Halos */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="anim-ring" style={{
                  position: 'absolute', width: 120, height: 120, borderRadius: '50%',
                  border: '1px solid rgba(251, 146, 60, 0.4)',
                  background: 'rgba(251, 146, 60, 0.04)',
                }} />
                <div style={{
                  width: 96, height: 96, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 32, color: 'white', position: 'relative',
                  background: 'radial-gradient(circle, #a83f5c 0%, #60122b 100%)',
                  border: '2px solid rgba(253, 164, 175, 0.45)',
                  boxShadow: '0 0 36px rgba(168, 63, 92, 0.55)',
                }}>
                  {partnerName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99,
                background: 'rgba(253, 164, 175, 0.12)', border: '1px solid rgba(253, 164, 175, 0.22)',
                fontSize: 11, fontWeight: 600, color: '#fda4af', marginTop: 24
              }}>
                <Radio size={11} className="anim-glow" />
                Live Connection Active
              </div>
            </div>

            {/* Date Active Timer overlay */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 10,
              background: 'rgba(10, 4, 11, 0.8)', border: '1px solid rgba(253, 164, 175, 0.15)',
              fontSize: 11, fontWeight: 700, color: '#fdfbf7',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'glowPulse 2s infinite' }} />
              {fmt(seconds)}
            </div>
          </div>

          {/* Polaroid handwriting caption */}
          <div className="serif-brand" style={{
            position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center',
            fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: '#3d261a'
          }}>
            {partnerName} 🧸
          </div>
        </div>

        {/* ── Local Polaroid (you) ── */}
        <div style={{
          width: 220, background: '#ffffff', padding: '8px 8px 38px 8px', borderRadius: 4,
          transform: 'rotate(2deg)', boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          border: '1.5px solid rgba(0,0,0,0.06)', position: 'relative', display: 'flex', flexDirection: 'column',
          flexShrink: 0
        }}>
          <div style={{
            flex: 1, borderRadius: 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a040b', overflow: 'hidden',
          }}>
            {localStream && !videoOff ? (
              <video ref={videoRef} autoPlay playsInline muted
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 18, color: 'white',
                  background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(253, 164, 175, 0.1)',
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <p style={{ fontSize: 12, color: '#8c606e', fontWeight: 500 }}>{camError || 'Camera Off'}</p>
              </div>
            )}

            {muted && (
              <div style={{
                position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 6,
                background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)',
                fontSize: 9, fontWeight: 700, color: '#FCA5A5',
              }}>MUTED</div>
            )}
          </div>

          <div className="serif-brand" style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
            fontSize: 15, fontStyle: 'italic', fontWeight: 700, color: '#3d261a'
          }}>
            Me 🍷
          </div>
        </div>
      </div>

      {/* ── Call Control Bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifySelf: 'center', gap: 10, padding: '12px 24px',
        background: 'rgba(45, 12, 22, 0.88)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(253, 164, 175, 0.18)',
        borderRadius: 28, width: 'auto',
        boxShadow: '0 8px 32px rgba(10, 4, 11, 0.4)',
      }}>
        {/* Call options */}
        <CtrlBtn isActive={muted} onClick={() => setMuted(!muted)} danger label={muted ? 'Muted' : 'Mute'}>
          {muted ? <MicOff size={18} /> : <Mic size={18} />}
        </CtrlBtn>
        <CtrlBtn isActive={videoOff} onClick={() => setVideoOff(!videoOff)} danger label={videoOff ? 'Off' : 'Camera'}>
          {videoOff ? <VideoOff size={18} /> : <VideoIcon size={18} />}
        </CtrlBtn>
        <CtrlBtn isActive={sharing} onClick={() => setSharing(!sharing)} brand label="Share">
          <MonitorUp size={18} />
        </CtrlBtn>

        {/* Divider */}
        <div style={{ width: 1, height: 42, background: 'rgba(253, 164, 175, 0.15)', margin: '0 4px' }} />

        {/* Interactive Couple Emojis */}
        <div style={{ display: 'flex', gap: 6 }}>
          <motion.button
            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            onClick={() => triggerGesture('💋')}
            style={{ width: 42, height: 42, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(253, 164, 175, 0.08)', border: '1px solid rgba(253, 164, 175, 0.15)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Send Kiss"
          >
            💋
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            onClick={() => triggerGesture('🤗')}
            style={{ width: 42, height: 42, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(251, 146, 60, 0.06)', border: '1px solid rgba(251, 146, 60, 0.15)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Send Hug"
          >
            🤗
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            onClick={() => triggerGesture('✨')}
            style={{ width: 42, height: 42, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(253, 164, 175, 0.08)', border: '1px solid rgba(253, 164, 175, 0.15)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Send Sparks"
          >
            ✨
          </motion.button>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 42, background: 'rgba(253, 164, 175, 0.15)', margin: '0 4px' }} />

        {/* End call */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
              padding: '12px 20px', borderRadius: 18, cursor: 'pointer', minWidth: 80,
              background: 'linear-gradient(135deg, #b91c1c, #7f1d1d)',
              color: 'white', fontFamily: 'inherit',
              boxShadow: '0 6px 20px rgba(185, 28, 28, 0.4)',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}>
              <PhoneOff size={18} />
              <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>End Date</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
