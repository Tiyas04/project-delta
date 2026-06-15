import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const InputField = ({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, action }) => {
  return (
    <div>
      <label htmlFor={id} style={{
        display: 'block', fontSize: 13, fontWeight: 600,
        color: 'rgba(255,255,255,0.6)', marginBottom: 8, letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={16} style={{
          position: 'absolute', left: 16, top: '50%',
          transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)',
          pointerEvents: 'none',
        }} />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          style={{
            width: '100%', padding: '14px 44px 14px 44px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, color: '#fff',
            fontFamily: 'Outfit, sans-serif', fontSize: 15,
            outline: 'none', boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(168,85,247,0.6)';
            e.target.style.background = 'rgba(124,58,237,0.08)';
            e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            e.target.style.background = 'rgba(255,255,255,0.04)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {action && (
          <button type="button" onClick={action.onClick} style={{
            position: 'absolute', right: 14, top: '50%',
            transform: 'translateY(-50%)', background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 2,
            display: 'flex', alignItems: 'center',
          }}>
            {action.icon}
          </button>
        )}
      </div>
    </div>
  );
};

const SocialButton = ({ icon, label, id }) => (
  <button
    id={id}
    type="button"
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '12px 16px', borderRadius: 12,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
      transition: 'all 0.2s ease', width: '100%',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    }}
  >
    {icon}
    {label}
  </button>
);

const Login = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}
    >
      {/* Logo mark */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.5)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: 'white', fontFamily: 'Outfit, sans-serif' }}>
            HangoutX
          </span>
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800, marginBottom: 8,
          letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif', color: '#fff',
        }}>
          Welcome back
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.5 }}>
          Sign in to continue your conversations
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <InputField
          id="login-email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <InputField
          id="login-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={Lock}
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          action={{
            onClick: () => setShowPassword(v => !v),
            icon: showPassword ? <EyeOff size={16} /> : <Eye size={16} />,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
          <a id="login-forgot-password" href="#" style={{
            fontSize: 13, color: '#a855f7', textDecoration: 'none',
            fontWeight: 600, transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#c084fc'}
            onMouseLeave={e => e.target.style.color = '#a855f7'}
          >
            Forgot password?
          </a>
        </div>

        <button
          id="login-submit-btn"
          type="submit"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '15px 24px', borderRadius: 12, fontSize: 15, fontWeight: 700,
            background: 'linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)',
            color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif', marginTop: 4,
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)';
          }}
        >
          Sign In
          <ArrowRight size={17} />
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Or continue with</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Social Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SocialButton
          id="login-github-btn"
          label="GitHub"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          }
        />
        <SocialButton
          id="login-google-btn"
          label="Google"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        />
      </div>

      <p style={{ marginTop: 28, textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
        Don't have an account?{' '}
        <button
          id="login-toggle-signup"
          onClick={onToggle}
          style={{
            background: 'none', border: 'none', color: '#a855f7',
            fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
            fontSize: 14, padding: 0,
          }}
        >
          Create one
        </button>
      </p>
    </motion.div>
  );
};

export default Login;
