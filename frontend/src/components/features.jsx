import React, { useEffect, useRef } from 'react';
import ThreeBackground from './ThreeBackground';
import { Video, MessageSquare, Users, Monitor, Building2, Shield, Zap, FolderOpen, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: <Video size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
    badge: 'HD',
    title: 'HD Video Calls',
    desc: 'Crystal clear video calls with high quality audio for real conversations.',
  },
  {
    icon: <MessageSquare size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#6d28d9,#a855f7)',
    badge: 'Realtime',
    title: 'Real-time Chat',
    desc: 'Instant messaging with your friends and groups. Share text, emojis, and files.',
  },
  {
    icon: <Users size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#5b21b6,#8b5cf6)',
    badge: 'Unlimited',
    title: 'Create & Join Rooms',
    desc: "Create your own room or join any room instantly with a code. It's quick and easy.",
  },
  {
    icon: <Monitor size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#1e3a8a,#6366f1)',
    badge: 'Instant',
    title: 'Screen Sharing',
    desc: 'Share your screen in high quality. Perfect for tutorials, presentations and more.',
  },
  {
    icon: <Building2 size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#164e63,#0ea5e9)',
    badge: 'Groups',
    title: 'Large Capacity Rooms',
    desc: 'Host massive rooms with your community. More people, more fun.',
  },
  {
    icon: <Shield size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#065f46,#10b981)',
    badge: 'Secure',
    title: 'Safe & Secure',
    desc: 'Your privacy is our priority. End-to-end encrypted calls and data protection.',
  },
  {
    icon: <Zap size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#7c2d12,#f97316)',
    badge: 'Fast',
    title: 'Super Low Latency',
    desc: 'Optimized infrastructure for smooth, lag-free calls and seamless experiences.',
  },
  {
    icon: <FolderOpen size={24} color="white" />,
    iconBg: 'linear-gradient(135deg,#134e4a,#14b8a6)',
    badge: 'Share',
    title: 'Share Files Easily',
    desc: 'Share files, documents, images and more with anyone in the room or chat.',
  },
];

const FeatureCard = ({ icon, iconBg, badge, title, desc }) => (
  <div className="feature-card" style={{ position: 'relative' }}>
    {/* Badge top-right */}
    <div style={{
      position: 'absolute', top: 16, right: 16,
      padding: '3px 10px', borderRadius: 6,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
    }}>{badge}</div>

    {/* Icon */}
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: iconBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 18,
      boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {icon}
    </div>

    <h3 style={{
      fontSize: 18, fontWeight: 700, color: '#fff',
      marginBottom: 10, fontFamily: 'Outfit, sans-serif',
    }}>{title}</h3>
    <p style={{
      fontSize: 14, color: 'rgba(255,255,255,0.45)',
      lineHeight: 1.65, marginBottom: 16,
    }}>{desc}</p>

    <div id={`feature-link-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
      <span style={{
        fontSize: 14, fontWeight: 600, color: '#a855f7',
        transition: 'color 0.2s',
      }}>Learn more</span>
      <ArrowRight size={14} color="#a855f7" />
    </div>
  </div>
);

const Features = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.feature-card');
    if (!cards) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(28px)';
      c.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease`;
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" style={{
      position: 'relative',
      padding: '100px 0',
      background: 'linear-gradient(180deg,#080a1a 0%,#09091f 100%)',
      overflow: 'hidden',
    }}>
      <ThreeBackground />

      {/* Big purple glow center-top */}
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse,rgba(124,58,237,0.18) 0%,transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none', zIndex: 1,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto', padding: '0 40px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="badge" style={{ marginBottom: 18 }}>
            POWERFUL FEATURES
          </div>
          <h2 style={{
            fontSize: 'clamp(32px,3.8vw,52px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.12,
            marginBottom: 8, fontFamily: 'Outfit, sans-serif',
          }}>
            Everything you need
          </h2>
          <h2 style={{
            fontSize: 'clamp(32px,3.8vw,52px)', fontWeight: 800,
            letterSpacing: '-0.02em', lineHeight: 1.12,
            marginBottom: 20, fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(90deg,#a855f7 0%,#ec4899 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            to hangout together
          </h2>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.45)',
            maxWidth: 500, margin: '0 auto', lineHeight: 1.65,
          }}>
            Built for seamless communication, collaboration, and connection.<br />
            All the tools you need, in one place.
          </p>
        </div>

        {/* 2×4 Feature Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
