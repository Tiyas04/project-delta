import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const links = ['Home', 'Features', 'About', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(
            links.find(l => l.toLowerCase() === e.target.id) || 'Home'
          );
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 40px',
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,10,26,0.95)' : 'rgba(8,10,26,0.5)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.03)',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div
        id="nav-logo"
        onClick={() => scrollTo('Home')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(124,58,237,0.5)',
        }}>
          <Zap size={15} fill="white" color="white" />
        </div>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18,
          color: 'white',
        }}>HangoutX</span>
      </div>

      {/* Center Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {links.map((link) => (
          <button
            key={link}
            id={`nav-link-${link.toLowerCase()}`}
            onClick={() => scrollTo(link)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500,
              color: active === link ? '#a855f7' : 'rgba(255,255,255,0.65)',
              position: 'relative', padding: '4px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { if (active !== link) e.target.style.color = 'rgba(255,255,255,0.9)'; }}
            onMouseLeave={e => { if (active !== link) e.target.style.color = 'rgba(255,255,255,0.65)'; }}
          >
            {link}
            {active === link && (
              <span style={{
                position: 'absolute', bottom: -6, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg,#7c3aed,#a855f7)',
                borderRadius: 99,
                display: 'block',
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Get Started */}
      <button
        id="nav-btn-get-started"
        className="btn-primary"
        onClick={() => navigate('/auth')}
        style={{
          padding: '10px 22px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          gap: 6,
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Get Started
        <ArrowRight size={14} />
      </button>
    </nav>
  );
};

export default Navbar;
