import React, { useState, useEffect } from 'react';
import { Shield, Search, Terminal, Activity, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  activeView?: string;
  systemStatus?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, activeView = 'command-centre', systemStatus = 'CONNECTED' }) => {
  const [timeKinshasa, setTimeKinshasa] = useState('');
  const [timeLubumbashi, setTimeLubumbashi] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // Kinshasa is UTC+1 (WAT)
      const kinshasa = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Kinshasa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      // Lubumbashi is UTC+2 (CAT)
      const lubumbashi = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lubumbashi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      setTimeKinshasa(kinshasa);
      setTimeLubumbashi(lubumbashi);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '56px',
        backgroundColor: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand & Emblem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--text-inverse)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '16px',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <Shield size={20} strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
              RAWBANK
            </span>
            <span
              style={{
                color: 'var(--color-gold)',
                fontWeight: 600,
                fontSize: '12px',
                padding: '1px 6px',
                background: 'var(--color-gold-fill)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-gold-border)',
              }}
            >
              SENTIENT
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Fraud Intelligence Platform • aXtrLabs
          </div>
        </div>
      </div>

      {/* Synthetic Environment Notice Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-full)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--sev-safe-text)',
            boxShadow: '0 0 6px var(--sev-safe-text)',
          }}
        />
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sev-safe-text)', letterSpacing: '0.03em' }}>
          SYNTHETIC BANKING ENVIRONMENT
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>| Zero Real PII</span>
      </div>

      {/* Right Controls: Search, Clocks, Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="btn btn-secondary"
          style={{
            padding: '5px 12px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            gap: '8px',
          }}
          title="Search Customers, Transactions, Alerts (Ctrl+K)"
        >
          <Search size={14} />
          <span>Quick Search</span>
          <kbd
            style={{
              padding: '1px 4px',
              fontSize: '10px',
              backgroundColor: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* DR Congo Clocks */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-secondary)',
            borderLeft: '1px solid var(--border-subtle)',
            paddingLeft: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} color="var(--color-gold)" />
            <span>KIN:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{timeKinshasa || '--:--:--'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>FBM:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{timeLubumbashi || '--:--:--'}</span>
          </div>
        </div>

        {/* System Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            borderLeft: '1px solid var(--border-subtle)',
            paddingLeft: '16px',
          }}
        >
          <Activity size={14} color="var(--sev-safe-text)" />
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>ONLINE</span>
        </div>
      </div>
    </header>
  );
};
