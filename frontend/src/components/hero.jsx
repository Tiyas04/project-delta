import React from 'react';
import ThreeBackground from './ThreeBackground';
import VideoCallCard from './VideoCallCard';
import { Users, ArrowRight, Video, Monitor, MessageSquare, Laptop, Smartphone, Globe, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg,#070817 0%,#0a0b1e 50%,#0d0825 100%)',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Three.js starfield */}
      <ThreeBackground />

      {/* Purple glow orbs */}
      <div className="orb animate-glow" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 70%)',
        top: -100, right: 80, zIndex: 1,
      }} />
      <div className="orb" style={{
        width: 350, height: 350,
        background: 'radial-gradient(circle,rgba(88,28,235,0.15) 0%,transparent 70%)',
        bottom: -80, left: 50, zIndex: 1,
        animation: 'glow-pulse 4s ease-in-out infinite',
        animationDelay: '1.5s',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto',
        padding: '100px 40px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr',
        gap: 60,
        alignItems: 'center',
        width: '100%',
      }}>

        {/* ── LEFT ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            width: 'fit-content',
          }}>
            <Sparkles size={12} style={{ color: 'rgba(255,255,255,0.75)' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
              Talk. Share. Stream. Together.
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 style={{
              fontSize: 'clamp(40px,4.5vw,64px)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif',
            }}>
              Your space<br />to connect,
            </h1>
            <h1 style={{
              fontSize: 'clamp(40px,4.5vw,64px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(90deg,#a855f7 0%,#ec4899 60%,#a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: 4,
            }}>
              anytime, anywhere.
            </h1>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 16, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 380,
          }}>
            HangoutX brings friends together with video calls, rooms, chat, and screen sharing — all in one place.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
            <button id="hero-create-room-btn" className="btn-primary" style={{
              padding: '14px 28px', borderRadius: 12, fontSize: 16,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Users size={16} />
              Create Room
            </button>
            <button id="hero-join-room-btn" className="btn-outline" style={{
              padding: '14px 26px', borderRadius: 12, fontSize: 16,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              Join Room
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Feature Pills */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
            {[
              { icon: <Video size={12} />, label: 'HD Video Calls' },
              { icon: <Monitor size={12} />, label: 'Screen Sharing' },
              { icon: <MessageSquare size={12} />, label: 'Real-time Chat' },
            ].map(({ icon, label }) => (
              <div key={label} id={`hero-feature-${label.toLowerCase().replace(/\s+/g, '-')}`} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: 13, color: 'rgba(255,255,255,0.6)',
                fontWeight: 500,
              }}>
                <div style={{
                  width: 28, height: 20, borderRadius: 5,
                  background: 'rgba(124,58,237,0.25)',
                  border: '1px solid rgba(124,58,237,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#c084fc',
                }}>{icon}</div>
                {label}
              </div>
            ))}
          </div>

          {/* Available on */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginTop: 12,
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Available on</span>
            {[
              { icon: <Monitor size={16} />, id: 'win' },
              { icon: <Laptop size={16} />, id: 'mac' },
              { icon: <Smartphone size={16} />, id: 'android' },
              { icon: <Globe size={16} />, id: 'web' },
            ].map(({ icon, id }, i) => (
              <div key={i} id={`hero-platform-${id}`} style={{
                width: 28, height: 28, opacity: 0.55,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'opacity 0.2s',
                color: 'white',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.55'}
              >{icon}</div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Video Call Card + Join Room ── */}
        <div style={{ position: 'relative' }} className="animate-float-slow">
          <VideoCallCard />

          {/* Join a Room — floating card below */}
          <div style={{
            position: 'absolute',
            bottom: -60, right: 0,
            width: 290,
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 18px',
            background: 'rgba(13,10,34,0.9)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 14,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(124,58,237,0.5)',
            }}>
              <Users size={20} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Join a Room</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Enter room code and connect instantly</div>
            </div>
            <div id="hero-join-room-floating-btn" style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <ArrowRight size={14} color="#a855f7" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
