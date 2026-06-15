import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, Video, MessageSquare, Shield, Zap, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/login';
import Signup from '../components/signup';
import ThreeBackground from '../components/ThreeBackground';

/* ── Feature highlights shown on the right panel ── */
const FEATURES = [
  { icon: <Video size={16} />, text: 'Crystal-clear HD video calls' },
  { icon: <MessageSquare size={16} />, text: 'Real-time chat & messaging' },
  { icon: <Users size={16} />, text: 'Public & private rooms' },
  { icon: <Shield size={16} />, text: 'End-to-end encrypted' },
  { icon: <Zap size={16} />, text: 'Ultra-low latency streaming' },
];

/* ── Floating stat badge ── */
const StatBadge = ({ value, label, style }) => (
  <div style={{
    position: 'absolute',
    padding: '10px 16px',
    background: 'rgba(10,8,28,0.85)',
    border: '1px solid rgba(124,58,237,0.3)',
    borderRadius: 12,
    backdropFilter: 'blur(12px)',
    display: 'flex', flexDirection: 'column', gap: 2,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    ...style,
  }}>
    <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>{value}</span>
    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{label}</span>
  </div>
);

/* ── Mini video avatar tile ── */
const AvatarTile = ({ initials, gradient, style }) => (
  <div style={{
    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
    background: gradient,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 18, fontWeight: 800, color: 'white',
    fontFamily: 'Inter, sans-serif',
    border: '2px solid rgba(255,255,255,0.1)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    ...style,
  }}>
    {initials}
  </div>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg,#070817 0%,#0a0b1e 50%,#0d0825 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Three.js starfield */}
      <ThreeBackground />

      {/* ── Back to Home Button ── */}
      <button
        id="auth-back-home-btn"
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 18px', borderRadius: 12,
          background: 'rgba(10,8,28,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          backdropFilter: 'blur(16px)',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(10,8,28,0.8)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={15} />
        Back to Home
      </button>

      {/* Glow orbs matching hero section */}
      <div className="orb animate-glow" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)',
        top: -150, right: -100, zIndex: 1,
      }} />
      <div className="orb" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle,rgba(88,28,235,0.15) 0%,transparent 70%)',
        bottom: -100, left: 0, zIndex: 1,
        animation: 'glow-pulse 4s ease-in-out infinite',
        animationDelay: '2s',
      }} />

      {/* ── Main container ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1080,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 640,
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(10,8,28,0.8)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
      }}>

        {/* ════ LEFT: Form Panel ════ */}
        <div style={{
          padding: '52px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          overflowY: 'auto',
        }}>
          <AnimatePresence mode="wait">
            {isLogin ? (
              <Login key="login" onToggle={() => setIsLogin(false)} />
            ) : (
              <Signup key="signup" onToggle={() => setIsLogin(true)} />
            )}
          </AnimatePresence>
        </div>

        {/* ════ RIGHT: Showcase Panel ════ */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg,rgba(124,58,237,0.08) 0%,rgba(13,8,37,0.9) 100%)',
          padding: '52px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Decorative glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 300, height: 300,
            background: 'radial-gradient(circle,rgba(168,85,247,0.2) 0%,transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40,
            width: 200, height: 200,
            background: 'radial-gradient(circle,rgba(88,28,235,0.15) 0%,transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <div className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>
              <Star size={11} />
              <span>The #1 Platform for Real Connections</span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 800,
              lineHeight: 1.12, letterSpacing: '-0.02em',
              marginBottom: 16, color: '#fff',
            }}>
              Your space to{' '}
              <span style={{
                background: 'linear-gradient(90deg,#a855f7 0%,#ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                connect & hangout
              </span>
            </h2>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 36, maxWidth: 340 }}>
              Join millions of people who use HangoutX to stay close to the people who matter — anytime, anywhere.
            </p>

            {/* Feature List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
              {FEATURES.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: 'rgba(124,58,237,0.2)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c084fc',
                  }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* ── Mini video call mockup ── */}
            <div style={{
              background: 'rgba(8,6,22,0.7)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 14, position: 'relative',
            }}>
              {/* Room header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>HangoutX Room #2847</span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={10} /> 4 online
                </span>
              </div>

              {/* Avatars grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { initials: 'A', gradient: 'linear-gradient(135deg,#2d1060,#3b1080)' },
                  { initials: 'D', gradient: 'linear-gradient(135deg,#1a0850,#4a1080)' },
                  { initials: 'M', gradient: 'linear-gradient(135deg,#1e0f5c,#2a1070)' },
                  { initials: 'K', gradient: 'linear-gradient(135deg,#251065,#351080)' },
                ].map(({ initials, gradient }) => (
                  <AvatarTile key={initials} initials={initials} gradient={gradient}
                    style={{ width: '100%', height: 52, fontSize: 16 }}
                  />
                ))}
              </div>

              {/* Control bar */}
              <div style={{
                display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10,
              }}>
                {[
                  { color: 'rgba(255,255,255,0.1)', icon: '🎙️' },
                  { color: 'rgba(255,255,255,0.1)', icon: '📷' },
                  { color: 'linear-gradient(135deg,#7c3aed,#9333ea)', icon: '🖥️' },
                  { color: '#ef4444', icon: '📵' },
                ].map((ctrl, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: ctrl.color, border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, cursor: 'pointer',
                  }}>
                    {ctrl.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat badges */}
            <StatBadge value="10M+" label="Active Users" style={{ top: -14, right: 20 }} />
            <StatBadge value="99.9%" label="Uptime" style={{ bottom: 90, right: -16 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
