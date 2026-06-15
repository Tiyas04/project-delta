import React from 'react';
import ThreeBackground from './ThreeBackground';
import VideoCallCard from './VideoCallCard';
import { Users, Shield, Zap, Heart, ArrowRight } from 'lucide-react';

const stats = [
  { value: '10M+', label: 'Happy Users', icon: '👥' },
  { value: '500K+', label: 'Rooms Created', icon: '💬' },
  { value: '25M+', label: 'Minutes of Calls', icon: '🔄' },
  { value: '150+', label: 'Countries', icon: '🌐' },
];

const values = [
  {
    icon: <Users size={22} color="white" />,
    iconBg: 'linear-gradient(135deg,#4c1d95,#7c3aed)',
    title: 'People First',
    desc: 'We believe technology should bring people closer, not create distance.',
  },
  {
    icon: <Shield size={22} color="white" />,
    iconBg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
    title: 'Privacy & Security',
    desc: 'Your conversations and data are protected with end-to-end encryption and strict privacy.',
  },
  {
    icon: <Zap size={22} color="white" />,
    iconBg: 'linear-gradient(135deg,#7c2d12,#f97316)',
    title: 'Performance',
    desc: 'Optimized for speed and reliability so you can stay connected without interruptions.',
  },
  {
    icon: <Heart size={22} color="white" fill="white" />,
    iconBg: 'linear-gradient(135deg,#0e7490,#06b6d4)',
    title: 'Inclusivity',
    desc: 'HangoutX is for everyone. No matter where you are or how you connect, you belong here.',
  },
];

const About = () => {
  return (
    <section id="about" style={{
      position: 'relative',
      background: 'linear-gradient(180deg,#09091f 0%,#080a1a 100%)',
      overflow: 'hidden',
    }}>
      <ThreeBackground />

      {/* Purple glow left */}
      <div style={{
        position: 'absolute', left: '40%', top: '20%',
        width: 400, height: 400,
        background: 'radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Top: Text Left + Video Right ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto',
        padding: '100px 40px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="badge" style={{ marginBottom: 20 }}>
            ABOUT HANGOUTX
          </div>

          <h2 style={{
            fontSize: 'clamp(36px,4vw,58px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
            fontFamily: 'Outfit, sans-serif', marginBottom: 4,
          }}>
            Connecting people.
          </h2>
          <h2 style={{
            fontSize: 'clamp(36px,4vw,58px)', fontWeight: 800,
            letterSpacing: '-0.02em', lineHeight: 1.1,
            fontFamily: 'Outfit, sans-serif', marginBottom: 24,
            background: 'linear-gradient(90deg,#a855f7 0%,#ec4899 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Anywhere, anytime.
          </h2>

          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, maxWidth: 400, marginBottom: 36,
          }}>
            HangoutX was built to make communication simple, seamless, and accessible for everyone.
            Whether you're catching up with friends, collaborating with your team, or hosting a
            community, HangoutX brings you together in the best way possible.
          </p>

          {/* Stats grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            {stats.map((s) => (
              <div key={s.label} className="stat-box">
                <div style={{
                  fontSize: 24, fontWeight: 800, color: '#fff',
                  fontFamily: 'Outfit, sans-serif',
                }}>{s.value}</div>
                <div style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Video Call Card */}
        <div>
          <VideoCallCard />
        </div>
      </div>

      {/* ── Bottom: Values + CTA ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto',
        padding: '0 40px 80px',
      }}>
        {/* Values section header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="badge" style={{ marginBottom: 14 }}>OUR VALUES</div>
          <h3 style={{
            fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, color: '#fff',
            fontFamily: 'Outfit, sans-serif',
          }}>
            Built with purpose. Designed for people.
          </h3>
        </div>

        {/* Values 4-grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 14, marginBottom: 40,
        }}>
          {values.map((v) => (
            <div key={v.title} className="feature-card" style={{ padding: '20px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: v.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
                border: '1px solid rgba(255,255,255,0.1)',
              }}>{v.icon}</div>
              <h4 style={{
                fontSize: 16, fontWeight: 700, color: '#fff',
                marginBottom: 8, fontFamily: 'Outfit, sans-serif',
              }}>{v.title}</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Ready to hangout CTA bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 28px',
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Users size={20} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                Ready to hangout?
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
                Join millions of people already connecting on HangoutX.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button id="about-create-room-btn" className="btn-outline" style={{
              padding: '12px 22px', borderRadius: 10, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Users size={16} /> Create a Room
            </button>
            <button id="about-join-room-btn" className="btn-primary" style={{
              padding: '12px 22px', borderRadius: 10, fontSize: 14,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              Join a Room <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
