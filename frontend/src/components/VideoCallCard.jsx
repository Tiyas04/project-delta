import React, { useState } from 'react';
import { Users, User, Link, Monitor, Mic, Camera, MessageSquare, PhoneOff, Smile, Send } from 'lucide-react';

// Participant gradient portraits — CSS-only, no images needed
const Participant = ({ name, gradient, waving }) => (
  <div className="video-tile" style={{ position: 'relative', background: gradient, minHeight: '130px' }}>
    {/* subtle vignette */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)',
    }} />
    {/* Person silhouette — simple CSS avatar */}
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -58%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        border: '2px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700, color: 'white',
        fontFamily: 'Inter, sans-serif',
      }}>{name[0]}</div>
      {waving && (
        <div style={{ fontSize: 16, marginTop: 2 }}>👋</div>
      )}
    </div>
    {/* Name tag + audio */}
    <div style={{
      position: 'absolute', bottom: 8, left: 8,
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '3px 8px', borderRadius: 6,
      background: 'rgba(0,0,0,0.55)',
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{name}</span>
      <AudioBars />
    </div>
  </div>
);

const AudioBars = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 10 }}>
    {[3, 7, 5, 9, 4].map((h, i) => (
      <div key={i} style={{
        width: 2, borderRadius: 1,
        background: '#22c55e',
        height: h,
        animation: `audio-bar ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
      }} />
    ))}
  </div>
);

const messages = [
  { name: 'Arjun', time: '10:30 AM', text: 'Hey everyone! 👋', avatar: 'A', color: '#7c3aed' },
  { name: 'Diya',  time: '10:31 AM', text: 'Ready when you are 🚀', avatar: 'D', color: '#9333ea' },
  { name: 'Meera', time: '10:31 AM', text: "Let's go! 💜", avatar: 'M', color: '#6d28d9' },
  { name: 'Kabir', time: '10:32 AM', text: 'Screen sharing now', avatar: 'K', color: '#7c3aed' },
];

const participants = [
  { name: 'Arjun', gradient: 'linear-gradient(135deg,#2d1060 0%,#1a0850 40%,#3b1080 100%)', waving: true },
  { name: 'Diya',  gradient: 'linear-gradient(135deg,#1a0850 0%,#2d1060 50%,#4a1080 100%)', waving: true },
  { name: 'Meera', gradient: 'linear-gradient(135deg,#1e0f5c 0%,#2a1070 50%,#3a1060 100%)', waving: false },
  { name: 'Kabir', gradient: 'linear-gradient(135deg,#251065 0%,#1e0d55 40%,#351080 100%)', waving: false },
];

const VideoCallCard = () => {
  const [activeTab, setActiveTab] = useState('Chat');

  return (
    <div style={{
      display: 'flex', gap: 0,
      background: 'rgba(10,8,28,0.92)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
    }}>
      {/* ── Left: Video Grid ── */}
      <div style={{ flex: 1 }}>
        {/* Room header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 18, height: 18, borderRadius: 5,
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: 'white', fontWeight: 800,
            }}>✕</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>HangoutX Room</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Users size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>4</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={15} style={{ opacity: 0.55, cursor: 'pointer', color: 'white' }} />
            <Link size={15} style={{ opacity: 0.55, cursor: 'pointer', color: 'white' }} />
            <button style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 12,
              background: 'linear-gradient(135deg,#7c3aed,#9333ea)',
              border: 'none', color: 'white', cursor: 'pointer',
              fontFamily: 'Inter,sans-serif', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Monitor size={12} /> Share Screen
            </button>
          </div>
        </div>

        {/* 2×2 Video Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 3, padding: 8,
        }}>
          {participants.map((p) => (
            <Participant key={p.name} {...p} />
          ))}
        </div>

        {/* Control bar */}
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8,
        }}>
          {[
            { id: 'mic', icon: <Mic size={14} color="white" />, active: false },
            { id: 'camera', icon: <Camera size={14} color="white" />, active: false },
            { id: 'screen-share', icon: <Monitor size={14} color="white" />, active: true, purple: true },
            { id: 'chat', icon: <MessageSquare size={14} color="white" />, active: false },
            { id: 'users', icon: <Users size={14} color="white" />, active: false },
          ].map(({ id, icon, purple }) => (
            <button key={id} id={`videocall-control-${id}`} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: purple
                ? 'linear-gradient(135deg,#7c3aed,#9333ea)'
                : 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: purple ? '0 4px 14px rgba(124,58,237,0.4)' : 'none',
            }}>{icon}</button>
          ))}
          <button id="videocall-control-end" style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#ef4444', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(239,68,68,0.4)',
          }}>
            <PhoneOff size={14} color="white" />
          </button>
        </div>
      </div>

      {/* ── Right: Chat Panel ── */}
      <div style={{
        width: 200,
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(8,6,22,0.7)',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 16, padding: '12px 14px 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['Chat', 'People (4)'].map((tab) => (
            <button key={tab}
              id={`videocall-tab-${tab.split(' ')[0].toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`chat-tab ${activeTab === tab ? 'active' : ''}`}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif', paddingBottom: 8,
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', gap: 7, marginBottom: 10, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${msg.color}, #a855f7)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: 'white',
              }}>{msg.avatar}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{msg.name}</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{msg.time}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{msg.text}</div>
              </div>
            </div>
          ))}
          {/* Image preview */}
          <div style={{
            width: '100%', height: 56, borderRadius: 8, marginTop: 4,
            background: 'linear-gradient(135deg,#1a0850,#0d0630)',
            border: '1px solid rgba(255,255,255,0.07)',
          }} />
        </div>

        {/* Message Input */}
        <div style={{
          padding: '8px 10px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8, padding: '7px 10px', gap: 6,
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flex: 1 }}>Type a message...</span>
            <Smile size={13} style={{ opacity: 0.5, cursor: 'pointer', color: 'white' }} />
            <Send size={13} style={{ opacity: 0.7, color: '#7c3aed', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallCard;
