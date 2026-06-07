// DuoWatch Design Tokens — romantic aesthetic color palette and component tokens
export const C = {
  bg: '#0a040b', // Deep Blackberry Velvet background
  bgCard: 'rgba(40, 15, 30, 0.35)', // Warm Velvet Wine
  bgCardHover: 'rgba(56, 20, 42, 0.45)', // Lighter warm wine hover
  border: 'rgba(253, 164, 175, 0.08)', // Soft rose tint border
  borderBrand: 'rgba(253, 164, 175, 0.22)', // More visible rose border
  purple: '#a83f5c', // Deep Mauve / Rose Wine
  pink: '#fda4af', // Blush Pink accent
  cyan: '#fb923c', // Warm Candlelight Amber
  textPrimary: '#fdfbf7', // Warm Ivory
  textSecondary: '#e0a6aa', // Dusty Rose Gold
  textMuted: '#8c606e', // Deep Muted Rose
  green: '#4ADE80', // Keep green active status
  cream: '#fbf8f0', // Parchment cream for chat bubbles / details
  wineDark: '#60122b', // Wine dark for gradients
};

export const gradients = {
  brand: 'linear-gradient(135deg, #a83f5c 0%, #fda4af 100%)', // Mauve to Blush
  brandCool: 'linear-gradient(135deg, #701c34 0%, #fb923c 100%)', // Berry to Amber
  brandSoft: 'linear-gradient(135deg, rgba(168, 63, 92, 0.15) 0%, rgba(253, 164, 175, 0.15) 100%)',
  purpleGlow: 'radial-gradient(circle, rgba(168, 63, 92, 0.22) 0%, transparent 70%)',
  pinkGlow: 'radial-gradient(circle, rgba(253, 164, 175, 0.18) 0%, transparent 70%)',
  darkTop: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(112, 28, 52, 0.25) 0%, transparent 60%)',
};

// Glass card style
export const glass = (extra = {}) => ({
  background: 'rgba(40, 15, 30, 0.35)',
  backdropFilter: 'blur(24px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
  border: '1px solid rgba(253, 164, 175, 0.08)',
  borderRadius: 36, // Curved, softer romantic edges
  ...extra,
});

// Brand card with rose tint
export const glassBrand = (extra = {}) => ({
  background: 'rgba(168, 63, 92, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(253, 164, 175, 0.18)',
  borderRadius: 36,
  ...extra,
});

// Brand button
export const btnBrand = {
  background: 'linear-gradient(135deg, #a83f5c 0%, #fda4af 100%)',
  color: 'white',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 8px 32px rgba(168, 63, 92, 0.45)',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  fontSize: 15,
};

// Ghost button
export const btnGhost = {
  background: 'rgba(255, 255, 255, 0.04)',
  color: '#e0a6aa',
  fontWeight: 600,
  border: '1px solid rgba(253, 164, 175, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  fontSize: 15,
};

// Input
export const inputStyle = {
  background: 'rgba(10, 4, 11, 0.4)',
  border: '1px solid rgba(253, 164, 175, 0.15)',
  color: '#fdfbf7',
  borderRadius: 18,
  padding: '12px 16px',
  fontSize: 14,
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'all 0.2s ease',
};
