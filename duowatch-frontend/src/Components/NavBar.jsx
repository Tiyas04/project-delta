import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Video, Home, LogOut, User, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { C, glass } from '../styles/tokens';

const NAV_LINKS = [
  { name: 'Home', path: '/', Icon: Home },
  { name: 'Chat', path: '/chats', Icon: MessageCircle },
  { name: 'Call', path: '/calls', Icon: Video },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, partnerStatus, partnerName } = useApp();

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10, 4, 11, 0.7)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(253, 164, 175, 0.08)',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 20px',
        height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: 38, height: 32, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Heart size={19} fill="#a83f5c" color="#a83f5c" style={{ position: 'absolute', left: 0, top: 2, filter: 'drop-shadow(0 2px 8px rgba(168,63,92,0.4))' }} />
            <Heart size={19} fill="#fda4af" color="#fda4af" style={{ position: 'absolute', right: 0, bottom: 2, filter: 'drop-shadow(0 2px 8px rgba(253,164,175,0.4))' }} />
          </div>
          <div>
            <div className="serif-brand" style={{
              fontSize: 22, fontWeight: 700, lineHeight: 1.1,
              background: 'linear-gradient(135deg, #fdfbf7, #fda4af)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', letterSpacing: '0.02em',
            }}>
              DuoWatch
            </div>
            <div style={{ fontSize: 9, color: '#e0a6aa', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Date Space
            </div>
          </div>
        </Link>

        {/* Center pill nav */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: 2, padding: '5px',
          background: 'rgba(40, 15, 30, 0.4)',
          border: '1px solid rgba(253, 164, 175, 0.1)',
          borderRadius: 20,
        }}>
          {NAV_LINKS.map(({ name, path, Icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={name} to={path} style={{ textDecoration: 'none', position: 'relative' }}>
                {active && (
                  <motion.div layoutId="nav-bg" style={{
                    position: 'absolute', inset: 0, borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(168, 63, 92, 0.3), rgba(253, 164, 175, 0.15))',
                    border: '1px solid rgba(253, 164, 175, 0.15)',
                  }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <div style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px', borderRadius: 14,
                  color: active ? '#fdfbf7' : '#8c606e',
                  fontSize: 14, fontWeight: 600,
                  transition: 'color 0.2s',
                }}>
                  <Icon size={14} color={active ? '#fda4af' : 'currentColor'} />
                  <span style={{ fontFamily: "'Outfit', sans-serif" }}>{name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Partner status */}
          {user && partnerStatus === 'connected' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 99,
              background: 'rgba(168, 63, 92, 0.12)',
              border: '1px solid rgba(253, 164, 175, 0.22)',
              fontSize: 12, fontWeight: 600, color: '#fda4af',
            }}>
              <span className="anim-pulse-heart" style={{ display: 'inline-flex' }}>
                <Heart size={11} fill="#fda4af" color="#fda4af" />
              </span>
              <span style={{ fontFamily: "'Outfit', sans-serif" }}>{partnerName}</span>
              <Lock size={10} color="#fb923c" style={{ marginLeft: 2 }} />
            </div>
          )}

          {user ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '8px 14px', borderRadius: 14, fontSize: 13, fontWeight: 600, color: '#e0a6aa',
                  background: 'rgba(40, 15, 30, 0.3)', border: '1px solid rgba(253, 164, 175, 0.08)',
                  display: 'flex', alignItems: 'center', gap: 7,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(253, 164, 175, 0.22)'; e.currentTarget.style.color = '#fda4af'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253, 164, 175, 0.08)'; e.currentTarget.style.color = '#e0a6aa'; }}
                >
                  <User size={13} color="#fda4af" /> {localStorage.getItem('duowatch_nickname') || user.name}
                </div>
              </Link>
              <button onClick={() => { logout(); navigate('/'); }} style={{
                padding: '8px 12px', borderRadius: 14, cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(253, 164, 175, 0.1)',
                color: '#8c606e', display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#fda4af'}
              onMouseLeave={e => e.target.style.color = '#8c606e'}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 16,
                background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                color: 'white', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 6px 20px rgba(168, 63, 92, 0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.target.style.transform = 'none'}
              >
                <Heart size={14} fill="white" />
                Start a Date
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
