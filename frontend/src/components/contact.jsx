import React, { useState } from 'react';
import ThreeBackground from './ThreeBackground';
import { Mail, Headphones, Phone, MapPin, User, Tag, PenLine, Send, MessageSquare } from 'lucide-react';

const SocialIcon = ({ label }) => {
  const icons = {
    Discord: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.045.03.06a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
    Twitter: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    Instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.325 12 18.325c3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.163-6.162-6.163zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    LinkedIn: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };
  return icons[label] || null;
};

const contactInfo = [
  {
    icon: <Mail size={18} color="white" />,
    iconBg: 'linear-gradient(135deg,#6d28d9,#9333ea)',
    title: 'Email Us',
    value: 'hello@hangoutx.com',
    valueColor: '#a855f7',
  },
  {
    icon: <Headphones size={18} color="white" />,
    iconBg: 'linear-gradient(135deg,#5b21b6,#7c3aed)',
    title: 'Support',
    value: 'support@hangoutx.com',
    valueColor: '#a855f7',
  },
  {
    icon: <Phone size={18} color="white" />,
    iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    title: 'Call Us',
    value: '+1 (123) 456-7890',
    valueColor: '#a855f7',
  },
  {
    icon: <MapPin size={18} color="white" />,
    iconBg: 'linear-gradient(135deg,#4c1d95,#6d28d9)',
    title: 'Our Office',
    value: '123 Connect Street,\nSan Francisco, CA 94107, USA',
    valueColor: 'rgba(255,255,255,0.6)',
  },
];

const InputRow = ({ id, icon, placeholder, name, value, onChange, type = 'text' }) => (
  <div style={{ position: 'relative' }}>
    <div style={{
      position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
      color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
      display: 'flex', alignItems: 'center',
    }}>{icon}</div>
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      style={{
        width: '100%', padding: '14px 14px 14px 40px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 10, color: '#fff',
        fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box',
      }}
      onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
    />
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" style={{
      position: 'relative',
      background: 'linear-gradient(180deg,#080a1a 0%,#07091a 100%)',
      overflow: 'hidden',
      padding: '100px 0',
    }}>
      <ThreeBackground />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', right: -100, top: '30%',
        width: 400, height: 400,
        background: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 1,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto', padding: '0 40px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr',
          gap: 32,
          alignItems: 'start',
        }}>

          {/* ── LEFT ── */}
          <div>
            <div className="badge" style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Mail size={12} /> LET'S CONNECT
            </div>
            <h2 style={{
              fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 800,
              color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif', marginBottom: 16,
            }}>
              We'd love to<br />hear from{' '}
              <span style={{
                background: 'linear-gradient(90deg,#a855f7,#ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>you!</span>
            </h2>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7,
              marginBottom: 28, maxWidth: 280,
            }}>
              Have questions, feedback, or partnership ideas? Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {['Discord', 'Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                <div key={s} id={`contact-social-${s.toLowerCase()}`} className="social-btn">
                  <SocialIcon label={s} />
                </div>
              ))}
            </div>

            {/* Decorative circles */}
            <div style={{ position: 'relative', height: 120, marginTop: 24, opacity: 0.15 }}>
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: 100, height: 100, borderRadius: '50%',
                border: '1px solid #a855f7',
              }} />
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                width: 70, height: 70, borderRadius: '50%',
                border: '1px solid #7c3aed',
              }} />
            </div>
          </div>

          {/* ── CENTER: Form ── */}
          <div className="contact-card" style={{ padding: '28px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MessageSquare size={18} color="white" />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                Send us a message
              </span>
            </div>

            {sent ? (
              <div style={{
                textAlign: 'center', padding: '40px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 48 }}>🎉</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Message Sent!</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>We'll get back to you soon. 💜</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <InputRow id="contact-input-name" icon={<User size={16} />} name="name" placeholder="Your Name" value={form.name} onChange={onChange} />
                  <InputRow id="contact-input-email" icon={<Mail size={16} />} name="email" placeholder="Your Email" type="email" value={form.email} onChange={onChange} />
                </div>

                {/* Subject */}
                <InputRow id="contact-input-subject" icon={<Tag size={16} />} name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />

                {/* Message */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 14, top: 14,
                    color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
                    display: 'flex', alignItems: 'center',
                  }}>
                    <PenLine size={16} />
                  </div>
                  <textarea
                    id="contact-textarea-message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Message"
                    required
                    rows={6}
                    style={{
                      width: '100%', padding: '14px 14px 14px 40px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: 10, color: '#fff',
                      fontFamily: 'Inter, sans-serif', fontSize: 14,
                      resize: 'vertical', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                  />
                </div>

                <button id="contact-submit-btn" type="submit" className="btn-primary" style={{
                  padding: '14px', borderRadius: 10, fontSize: 15,
                  fontWeight: 700, justifyContent: 'center', marginTop: 4,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Send Message
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact Info ── */}
          <div>
            <h3 style={{
              fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16,
              fontFamily: 'Inter, sans-serif',
            }}>Other ways to reach us</h3>

            {contactInfo.map((c) => (
              <div key={c.title} className="contact-info-card">
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>
                    {c.title}
                  </div>
                  <div style={{
                    fontSize: 13, color: c.valueColor, lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                  }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
