import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Video, MoreVertical, Search, Smile, Paperclip, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MOODS = [
  { emoji: '🧸', label: 'Cozy' },
  { emoji: '☕', label: 'Warm' },
  { emoji: '💌', label: 'Miss You' },
  { emoji: '💭', label: 'Dreaming' },
  { emoji: '🍷', label: 'Romantic' }
];

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

export default function Chats() {
  const { user, partnerStatus, partnerName, messages, addMessage } = useApp();
  const [input, setInput] = useState('');
  const [myMood, setMyMood] = useState('🧸');
  const [partnerMood, setPartnerMood] = useState('💌');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (e) => { e.preventDefault(); if (!input.trim()) return; addMessage(input); setInput(''); };

  if (!user) return <Guard title="Sign In First" desc="Please sign in to read your private couple chat diaries." to="/auth" cta="Sign In" />;
  if (partnerStatus !== 'connected') return <Guard title="Not Connected" desc="Connect with your partner from the Home page first to unlock your private chat journal." to="/" cta="Link Partner Room" />;

  const leatherSidebar = {
    background: 'rgba(45, 12, 22, 0.82)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(253, 164, 175, 0.12)',
    borderRight: '2.5px solid rgba(253, 164, 175, 0.18)',
    borderRadius: '28px 8px 8px 28px',
  };

  const paperMain = {
    background: 'rgba(45, 12, 22, 0.72)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(253, 164, 175, 0.12)',
    borderRadius: '8px 28px 28px 8px',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', gap: 6, overflow: 'hidden', height: 'calc(100vh - 12rem)', minHeight: 460 }}>

      {/* Sidebar: Styled like a notebook cover spine */}
      <div style={{ ...leatherSidebar, width: 280, display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
        {/* Contact/Header */}
        <div style={{ padding: '24px 20px 18px', borderBottom: '1px dashed rgba(253, 164, 175, 0.15)' }}>
          <p className="serif-brand" style={{ fontSize: 20, fontWeight: 700, color: '#fdfbf7', margin: '0 0 14px', fontStyle: 'italic' }}>Chat Journals</p>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#8c606e" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="text" placeholder="Search page..." style={{
              width: '100%', background: 'rgba(10, 4, 11, 0.4)', border: '1px solid rgba(253, 164, 175, 0.15)',
              color: '#fdfbf7', borderRadius: 14, padding: '9px 12px 9px 34px',
              fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }} />
          </div>
        </div>

        {/* Couple Member Status */}
        <div style={{ padding: '16px 20px', borderBottom: '1px dashed rgba(253, 164, 175, 0.15)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(168, 63, 92, 0.2), rgba(253, 164, 175, 0.08))',
            border: '1.5px solid rgba(253,164,175,0.18)',
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 16, color: 'white',
                background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                border: '1.5px solid rgba(251, 146, 60, 0.4)',
              }}>
                {partnerName.charAt(0).toUpperCase()}
              </div>
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: '50%', background: '#4ADE80', border: '2px solid #0a040b' }} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fdfbf7', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{partnerName}</p>
              <p style={{ fontSize: 11, color: '#e0a6aa', margin: 0, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Mood: {partnerMood} Online
              </p>
            </div>
          </div>
        </div>

        {/* Couple Mood Check-in Widget */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>My Mood Today</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 20 }}>
            {MOODS.map(m => {
              const active = myMood === m.emoji;
              return (
                <button
                  key={m.emoji}
                  onClick={() => setMyMood(m.emoji)}
                  title={m.label}
                  style={{
                    height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: active ? 'rgba(253, 164, 175, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${active ? 'rgba(253, 164, 175, 0.4)' : 'rgba(253, 164, 175, 0.08)'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {m.emoji}
                </button>
              );
            })}
          </div>

          <div style={{ background: 'rgba(10, 4, 11, 0.3)', border: '1px solid rgba(253, 164, 175, 0.1)', borderRadius: 16, padding: '14px 16px', marginTop: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#fda4af', margin: '0 0 6px' }}>Couple Mood Sync</p>
            <p style={{ fontSize: 11, color: '#8c606e', margin: 0, lineHeight: 1.4 }}>
              You feel {myMood} and {partnerName} is feeling {partnerMood}. A beautiful day to call!
            </p>
          </div>
        </div>

        {/* Footer info lock */}
        <div style={{ padding: '14px 20px', borderTop: '1px dashed rgba(253, 164, 175, 0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Heart size={12} fill="#fda4af" color="#fda4af" />
          <span style={{ fontSize: 11, color: '#8c606e', letterSpacing: '0.02em' }}>Diary Secured P2P</span>
        </div>
      </div>

      {/* Chat main space */}
      <div style={{ ...paperMain, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px dashed rgba(253, 164, 175, 0.15)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 16, color: 'white',
                background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
                border: '1.5px solid rgba(251, 146, 60, 0.4)',
              }}>
                {partnerName.charAt(0).toUpperCase()}
              </div>
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: '50%', background: '#4ADE80', border: '2px solid #0a040b' }} />
            </div>
            <div>
              <p className="serif-brand" style={{ fontSize: 16, fontWeight: 700, color: '#fdfbf7', margin: '0 0 2px' }}>{partnerName}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#4ADE80', fontWeight: 600 }}>
                <span className="anim-pulse-heart" style={{ display: 'inline-flex' }}>❤️</span> Active now
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link to="/calls" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253,164,175,0.1)', cursor: 'pointer',
                padding: '9px 11px', borderRadius: 12, color: '#fda4af', display: 'flex', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.03)'}
              >
                <Video size={16} />
              </button>
            </Link>
            <button style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253,164,175,0.1)', cursor: 'pointer',
              padding: '9px 11px', borderRadius: 12, color: '#8c606e', display: 'flex'
            }}>
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Chat message listings */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map(msg => {
            if (msg.sender === 'system') return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  fontSize: 11, color: '#8c606e', padding: '6px 14px', borderRadius: 99,
                  background: 'rgba(10, 4, 11, 0.4)', border: '1px solid rgba(253, 164, 175, 0.1)',
                  fontStyle: 'italic'
                }}>{msg.text}</span>
              </div>
            );
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '70%', padding: '12px 18px', fontSize: 14, lineHeight: 1.5,
                  ...(isMe
                    ? {
                        background: 'linear-gradient(135deg, #a83f5c, #60122b)',
                        color: 'white',
                        borderRadius: '20px 20px 4px 20px',
                        boxShadow: '0 4px 18px rgba(168, 63, 92, 0.35)',
                        border: '1px solid rgba(253, 164, 175, 0.15)'
                      }
                    : {
                        background: '#fbf8f0', // Parchment cream bubble!
                        color: '#3d261a', // Vintage ink color
                        borderRadius: '20px 20px 20px 4px',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
                        border: '1.5px solid #e0ceb5',
                        fontFamily: "'Outfit', sans-serif"
                      }
                    ),
                }}>{msg.text}</div>
                <span style={{ fontSize: 10, color: '#8c606e', marginTop: 4, marginLeft: 6, marginRight: 6, fontStyle: 'italic' }}>{msg.time}</span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '16px 20px', borderTop: '1px dashed rgba(253, 164, 175, 0.15)', flexShrink: 0 }}>
          <form onSubmit={send} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(10, 4, 11, 0.4)', border: '1px solid rgba(253, 164, 175, 0.15)',
              borderRadius: 20, padding: '4px 4px 4px 14px',
            }}>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 6px', color: '#8c606e', display: 'flex', flexShrink: 0 }}
              onMouseEnter={e => e.target.style.color = '#fda4af'}
              onMouseLeave={e => e.target.style.color = '#8c606e'}
              >
                <Smile size={18} />
              </button>
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder={`Write a love note to ${partnerName}...`}
                style={{ flex: 1, background: 'none', border: 'none', color: '#fdfbf7', fontSize: 14, outline: 'none', fontFamily: 'inherit', padding: '8px 0' }}
              />
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 6px', color: '#8c606e', display: 'flex', flexShrink: 0 }}
              onMouseEnter={e => e.target.style.color = '#fda4af'}
              onMouseLeave={e => e.target.style.color = '#8c606e'}
              >
                <Paperclip size={18} />
              </button>
            </div>
            <button type="submit" style={{
              width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #a83f5c, #fda4af)',
              border: 'none', cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 4px 18px rgba(168, 63, 92, 0.4)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'none'}
            >
              <Send size={16} color="white" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
