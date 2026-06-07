import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, User, Sparkles, Calendar, Quote, Check, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EMOJI_AVATARS = ['👩', '👨', '🧸', '🐱', '🦊', '🦁', '🦉', '🐨', '🐼', '🐰'];

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

export default function Profile() {
  const { user, partnerStatus, partnerName } = useApp();
  const [nickname, setNickname] = useState(() => localStorage.getItem('duowatch_nickname') || '');
  const [avatar, setAvatar] = useState(() => localStorage.getItem('duowatch_avatar') || '👩');
  const [anniversary, setAnniversary] = useState(() => localStorage.getItem('duowatch_anniversary') || '');
  const [motto, setMotto] = useState(() => localStorage.getItem('duowatch_motto') || 'Watch, talk, and be together.');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user && !nickname) {
      setNickname(user.name);
    }
  }, [user, nickname]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('duowatch_nickname', nickname);
    localStorage.setItem('duowatch_avatar', avatar);
    localStorage.setItem('duowatch_anniversary', anniversary);
    localStorage.setItem('duowatch_motto', motto);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getDaysInLove = () => {
    if (!anniversary) return null;
    const start = new Date(anniversary);
    const today = new Date();
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  if (!user) return <Guard title="Sign In First" desc="Please sign in to customize your romantic couple profile." to="/auth" cta="Sign In" />;

  const cardStyle = {
    background: 'rgba(45, 12, 22, 0.75)',
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(253, 164, 175, 0.15)',
    borderRadius: 36,
    boxShadow: '0 32px 80px rgba(10, 4, 11, 0.4)',
    overflow: 'hidden',
  };

  const inputUnderline = (focused) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: focused ? '2.5px solid #fda4af' : '1px solid rgba(253, 164, 175, 0.22)',
    color: '#fdfbf7',
    padding: '10px 4px',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    width: '100%',
    boxSizing: 'border-box'
  });

  const daysCount = getDaysInLove();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 840, margin: '20px auto 0', width: '100%' }}
    >
      <h1 className="serif-brand" style={{ fontSize: 34, fontWeight: 700, textAlign: 'center', marginBottom: 28, color: '#fdfbf7', letterSpacing: '0.01em' }}>
        Our Love Story <span style={{ fontStyle: 'italic', color: '#fda4af' }}>Profile</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 20, flexWrap: 'wrap' }}>
        {/* LEFT COLUMN: Profile editing */}
        <div style={cardStyle}>
          {/* Top Envelope Flap Shadow Line */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, transparent, rgba(253, 164, 175, 0.35), transparent)' }} />
          
          <form onSubmit={handleSave} style={{ padding: '30px 28px' }}>
            <h3 className="serif-brand" style={{ fontSize: 22, color: '#fda4af', fontStyle: 'italic', margin: '0 0 20px', borderBottom: '1px dashed rgba(253,164,175,0.15)', paddingBottom: 8 }}>My Stationery</h3>
            
            {/* Avatar Selector */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Select My Cameo Avatar</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {EMOJI_AVATARS.map(e => {
                  const active = avatar === e;
                  return (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setAvatar(e)}
                      style={{
                        width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
                        fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: active ? 'rgba(253,164,175,0.25)' : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${active ? '#fda4af' : 'rgba(253,164,175,0.1)'}`,
                        transition: 'all 0.2s',
                      }}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                <div style={{
                  width: 58, height: 58, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(168,63,92,0.4) 0%, rgba(10,4,11,0.9) 100%)',
                  border: '2px solid rgba(251, 146, 60, 0.55)', fontSize: 28, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)'
                }}>{avatar}</div>
                <div style={{ fontSize: 12, color: '#e0a6aa', fontStyle: 'italic' }}>This cameo will represent you in locket portraits.</div>
              </div>
            </div>

            {/* Nickname Input */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>My Nickname</label>
              <input
                type="text"
                required
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="Love Nickname"
                style={inputUnderline(true)}
              />
            </div>

            {/* Anniversary Date */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Anniversary Anniversary Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={14} color="#8c606e" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="date"
                  value={anniversary}
                  onChange={e => setAnniversary(e.target.value)}
                  style={{
                    ...inputUnderline(false),
                    paddingRight: 32,
                    colorScheme: 'dark'
                  }}
                />
              </div>
            </div>

            {/* Save Button */}
            <button type="submit" style={{
              width: '100%', padding: '12px 20px', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #a83f5c, #fda4af)', color: 'white',
              fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 6px 20px rgba(168,63,92,0.4)', transition: 'all 0.2s', marginTop: 10
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'none'}
            >
              {saved ? <><Check size={16} /> Saved Successfully</> : <><Save size={16} /> Save Love Card</>}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Milestones & Motto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Milestone Display */}
          <div style={{ ...cardStyle, flex: 1, padding: '30px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            <div style={{ height: 4, position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.35), transparent)' }} />
            
            <div className="anim-pulse-heart" style={{ marginBottom: 12 }}>
              <Heart size={48} fill="#fda4af" color="#fda4af" style={{ filter: 'drop-shadow(0 0 14px rgba(253,164,175,0.7))' }} />
            </div>

            {daysCount !== null ? (
              <>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>Loving Journey</h4>
                <div className="serif-brand" style={{ fontSize: 52, fontWeight: 700, color: '#fdfbf7', margin: '0 0 8px', fontStyle: 'italic', lineHeight: 1 }}>
                  {daysCount} Days
                </div>
                <p style={{ fontSize: 13, color: '#e0a6aa', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                  of loving each other and counting every second 🪐
                </p>
              </>
            ) : (
              <>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Loving Journey</h4>
                <p style={{ fontSize: 13, color: '#e0a6aa', maxWidth: 280, lineHeight: 1.6, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                  Enter your Relationship Anniversary Date on the left to show your dynamic milestone counters!
                </p>
              </>
            )}

            {partnerStatus === 'connected' && (
              <div style={{
                marginTop: 24, padding: '6px 14px', borderRadius: 99,
                background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.22)',
                fontSize: 12, fontWeight: 600, color: '#fb923c', display: 'flex', alignItems: 'center', gap: 6
              }}>
                <Sparkles size={11} /> Connected Room Active with {partnerName}
              </div>
            )}
          </div>

          {/* Couple Motto Section */}
          <div style={{ ...cardStyle, padding: '28px' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, transparent, rgba(253, 164, 175, 0.35), transparent)' }} />
            
            <h3 className="serif-brand" style={{ fontSize: 20, color: '#fda4af', fontStyle: 'italic', margin: '0 0 16px', borderBottom: '1px dashed rgba(253,164,175,0.15)', paddingBottom: 8 }}>Our Couple Motto</h3>
            
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <Quote size={18} color="rgba(253,164,175,0.2)" style={{ position: 'absolute', left: 4, top: 4 }} />
              <textarea
                value={motto}
                onChange={e => setMotto(e.target.value)}
                placeholder="Write our secret love motto..."
                rows={3}
                style={{
                  width: '100%', background: 'rgba(10, 4, 11, 0.4)',
                  border: '1px solid rgba(253, 164, 175, 0.15)', color: '#fdfbf7',
                  borderRadius: 16, padding: '12px 14px 12px 30px',
                  fontSize: 13, outline: 'none', fontFamily: 'inherit',
                  resize: 'none', boxSizing: 'border-box', lineHeight: 1.6
                }}
              />
            </div>
            
            <button onClick={handleSave} style={{
              width: '100%', padding: '10px 18px', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(253, 164, 175, 0.15)',
              color: '#e0a6aa', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#fda4af'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.color = '#e0a6aa'; }}
            >
              <Quote size={13} /> Update Motto
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
