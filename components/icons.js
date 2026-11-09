'use client';

export function AppIcon({ name, size = 18, color = 'currentColor', className = '', style = {} }) {
  const common = {
    width: size,
    height: size,
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    ...style,
  };

  switch (name) {
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" fill={color} style={common} className={className} aria-hidden="true">
          <path d="M9 2.5h6v6.5h6.5v6H15v6.5H9V15H2.5V9H9V2.5z" />
        </svg>
      );

    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m12 6h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
          <path d="M12 16v5m-4 0h8" />
        </svg>
      );

    case 'ticket':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
          <path d="M13 5v14M9 9h.01M9 12h.01M9 15h.01" />
        </svg>
      );

    case 'car':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3.5c0-.9-.7-1.7-1.5-1.9C18.7 10.2 16 9.8 16 9.8l-2.2-4.3c-.3-.5-.9-.8-1.5-.8H7.7c-.6 0-1.2.3-1.5.8L4 9.8s-2.7.4-4.5.8C-.7 10.8 0 11.6 0 12.5V16c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
          <path d="M5 10l1.8-3.5h7.4L16 10" />
        </svg>
      );

    case 'gold':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M4 18l3-8h10l3 8H4z" />
          <path d="M7 10l3-5h4l3 5" />
          <path d="M9 14h6" />
        </svg>
      );

    case 'phone':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <path d="M10 5h4" />
          <circle cx="12" cy="18" r="0.8" fill={color} />
        </svg>
      );

    case 'motorcycle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <circle cx="5" cy="16" r="3" />
          <circle cx="19" cy="16" r="3" />
          <path d="M12 16h2l3-6h-3l-2 3H8l-3-3" />
          <path d="M14 7h2m-1 0v3" />
        </svg>
      );

    case 'fridge':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="5" y1="10" x2="19" y2="10" />
          <line x1="9" y1="6" x2="9" y2="8" />
          <line x1="9" y1="13" x2="9" y2="16" />
        </svg>
      );

    case 'fan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2" fill={color} />
          <path d="M12 10c0-3 2-4 3-4s1 2-1 4m-4 2c-3 0-4-2-4-3s2-1 4 1m2 4c0 3-2 4-3 4s-1-2 1-4m4-2c3 0 4 2 4 3s-2 1-4-1" />
        </svg>
      );

    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" />
          <circle cx="19" cy="4" r="1" fill={color} />
          <circle cx="4" cy="18" r="1" fill={color} />
        </svg>
      );

    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );

    case 'location':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );

    case 'phone-call':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );

    case 'search':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );

    case 'printer':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );

    case 'party':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M5.8 11.3L2 22l10.7-3.8L5.8 11.3z" />
          <path d="M4 3h.01M8 7h.01M16 3h.01M20 7h.01M13 10h.01M17 14h.01M21 11h.01" />
        </svg>
      );

    case 'clock':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );

    case 'building':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          <path d="M9 10h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );

    case 'document':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );

    case 'shield-check':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case 'info':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );

    case 'alert':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={common} className={className} aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );

    default:
      return null;
  }
}
