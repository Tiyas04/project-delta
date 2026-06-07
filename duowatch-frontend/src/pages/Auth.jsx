import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Heart, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Field({ icon: Icon, type, placeholder, value, onChange, suffix }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      position: 'relative',
      borderBottom: focused ? '2px solid #fda4af' : '1px solid rgba(253, 164, 175, 0.2)',
      transition: 'all 0.3s ease',
      marginBottom: 6
    }}>
      <Icon size={15} color={focused ? "#fda4af" : "#8c606e"} style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.3s' }} />
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={onChange} required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', background: 'transparent',
          border: 'none', color: '#fdfbf7',
          padding: '14px 36px 14px 30px',
          fontSize: 14, outline: 'none', fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
      />
      {suffix && (
        <div style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }}>
          {suffix}
        </div>
      )}
    </div>
  );
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) { setError('Please fill in all fields.'); return; }
    setError('');
    login(isLogin ? email.split('@')[0] : name, email);
    navigate('/');
  };

  const handleGoogle = () => { login('Google User', 'google@example.com'); navigate('/'); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}
    >
      <div style={{ width: '100%', maxWidth: 410 }}>
        {/* Envelope Styled Card */}
        <div style={{
          background: 'rgba(45, 12, 22, 0.75)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(253, 164, 175, 0.15)',
          borderRadius: 36, overflow: 'hidden', position: 'relative',
          boxShadow: '0 32px 80px rgba(10, 4, 11, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          {/* Top Envelope Flap Shadow Line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 8,
            background: 'linear-gradient(180deg, rgba(253, 164, 175, 0.15), transparent)'
          }} />

          <div style={{ padding: '44px 36px 36px', position: 'relative', zIndex: 1 }}>
            {/* Wax Seal Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 18 }}>
                {/* Glow behind seal */}
                <div style={{
                  position: 'absolute', inset: -10, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251, 146, 60, 0.35) 0%, transparent 70%)',
                  filter: 'blur(6px)', zIndex: 0
                }} />
                {/* Seal circle */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: 'relative', zIndex: 1,
                    width: 66, height: 66, borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #fcaa74 0%, #b85b1c 65%, #662704 100%)',
                    border: '2px solid rgba(251, 146, 60, 0.35)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Heart size={26} color="#4f1202" fill="#4f1202" style={{ opacity: 0.8 }} />
                </motion.div>
              </div>

              <h1 className="serif-brand" style={{ fontSize: 32, fontWeight: 700, color: '#fdfbf7', margin: '0 0 6px', letterSpacing: '0.01em' }}>
                {isLogin ? 'Welcome Back, My Love' : 'Begin Your Story'}
              </h1>
              <p style={{ fontSize: 13, color: '#e0a6aa', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                {isLogin ? 'Enter your private space to see them again 💌' : 'Create a private sanctuary just for the two of you ✨'}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom: 18, padding: '12px 16px', borderRadius: 14, textAlign: 'center',
                background: 'rgba(253, 164, 175, 0.08)', border: '1px solid rgba(253, 164, 175, 0.2)',
                fontSize: 13, fontWeight: 600, color: '#fda4af',
              }}>{error}</div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              {!isLogin && (
                <Field icon={UserPlus} type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
              )}
              <Field icon={Mail} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
              <Field icon={Lock} type={showPw ? 'text' : 'password'} placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)}
                suffix={
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#8c606e', display: 'flex' }}
                    onMouseEnter={e => e.target.style.color = '#fda4af'}
                    onMouseLeave={e => e.target.style.color = '#8c606e'}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              <button type="submit" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '15px 24px', borderRadius: 16, marginTop: 10,
                background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(168, 63, 92, 0.45)', fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.target.style.transform = 'none'}
              >
                {isLogin ? <><LogIn size={16} /> Open Envelope</> : <><Sparkles size={16} /> Seal & Register</>}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(253, 164, 175, 0.1)' }} />
              <span style={{ fontSize: 11, color: '#8c606e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or write with</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(253, 164, 175, 0.1)' }} />
            </div>

            {/* Google */}
            <button onClick={handleGoogle} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '14px 24px', borderRadius: 16, marginBottom: 24,
              background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(253, 164, 175, 0.12)',
              color: '#e0a6aa', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#fda4af'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = '#e0a6aa'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fda4af" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#a83f5c" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fb923c" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fda4af" />
              </svg>
              Google Account
            </button>

            {/* Switch */}
            <div style={{ textAlign: 'center', fontSize: 14, color: '#8c606e' }}>
              {isLogin ? "New here? " : "Already have an account? "}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  background: 'linear-gradient(135deg, #fb923c, #fda4af)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'inherit',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.target.style.opacity = '0.8'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </div>
          {/* Envelope Bottom Seal Line */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.35), transparent)' }} />
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#8c606e', marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Heart size={12} fill="#fda4af" color="#fda4af" /> Private & secure — only two people per room
        </p>
      </div>
    </motion.div>
  );
}
