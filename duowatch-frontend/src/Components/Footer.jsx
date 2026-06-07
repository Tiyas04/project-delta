import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10, padding: '24px 20px',
      borderTop: '1px solid rgba(253, 164, 175, 0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12,
      maxWidth: 1280, margin: '40px auto 0', width: '100%', boxSizing: 'border-box',
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
        <Heart size={13} fill="#fda4af" color="#fda4af" />
        <span className="serif-brand" style={{
          fontSize: 16, fontWeight: 700,
          background: 'linear-gradient(135deg, #fdfbf7, #fda4af)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>DuoWatch</span>
      </Link>
      <p style={{ fontSize: 11, color: '#8c606e', textAlign: 'center', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
        Made with ❤️ for couples everywhere — © {new Date().getFullYear()} DuoWatch
      </p>
      <p style={{ fontSize: 12, color: '#e0a6aa', fontStyle: 'italic', margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>
        "Watch, talk, and be together."
      </p>
    </footer>
  );
}
