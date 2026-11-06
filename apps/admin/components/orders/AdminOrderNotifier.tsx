'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LatestOrderInfo {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone?: string;
  total_amount: number;
  status: string;
  created_at: string;
}

/**
 * Play a high-clarity subtle notification chime via Web Audio API.
 * Uses two harmonious sine wave frequencies (D5 587Hz -> A5 880Hz)
 * with natural acoustic decay. No external audio assets required.
 */
function playOrderChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // First tone (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.16);

    // Second tone (A5) - higher chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.0, now + 0.12);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.46);
  } catch (err) {
    // Audio autostart may be suppressed before user interaction; safe to ignore
  }
}

const SEEN_KEY = 'os_seen_order_numbers_v2';
const WATERMARK_KEY = 'os_latest_order_created_at_v2';

function loadSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
}

function saveSeen(seen: Set<string>) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(seen).slice(-200)));
  } catch {}
}

/**
 * An order is announced only if (a) it was never announced/seen before in
 * this browser and (b) it was created after the newest order seen so far.
 * The old "latest order number changed" check re-announced old orders every
 * time a stale read flipped the "latest" back and forth between two orders.
 */
export function AdminOrderNotifier() {
  const [activeAlert, setActiveAlert] = useState<LatestOrderInfo | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let isCancelled = false;
    const seen = loadSeen();
    let watermark = 0;
    try {
      watermark = Number(localStorage.getItem(WATERMARK_KEY) || 0);
    } catch {}
    let primed = watermark > 0;

    const consider = (latest: LatestOrderInfo, announce: boolean) => {
      const key = latest.order_number || latest.id;
      const createdAt = new Date(latest.created_at).getTime() || 0;
      const isNew = !seen.has(key) && createdAt > watermark;

      seen.add(key);
      saveSeen(seen);
      if (createdAt > watermark) {
        watermark = createdAt;
        try {
          localStorage.setItem(WATERMARK_KEY, String(watermark));
        } catch {}
      }
      if (!isNew || !announce) return;

      playOrderChime();
      setActiveAlert(latest);
      window.dispatchEvent(new CustomEvent('os_catalog_updated'));
    };

    const checkLatestOrder = async () => {
      try {
        const res = await fetch('/api/orders/latest', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (isCancelled || !data?.success || !data.latestOrder) return;
        // First run in a fresh browser: record the current latest silently.
        consider(data.latestOrder, primed);
        primed = true;
      } catch {
        // Safe network error swallow
      }
    };

    checkLatestOrder();
    timer = setInterval(checkLatestOrder, 7000);

    return () => {
      isCancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  if (!activeAlert) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 9999,
        maxWidth: 420,
        width: 'calc(100vw - 48px)',
        backgroundColor: '#121214',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderLeft: '4px solid #C8102E',
        borderRadius: 8,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(200, 16, 46, 0.2)',
        padding: '16px 18px',
        animation: 'slideInAlert 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        color: '#FFFFFF',
        fontFamily: 'inherit',
      }}
    >
      <style>{`
        @keyframes slideInAlert {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: '#C8102E',
                color: '#FFFFFF',
                padding: '2px 7px',
                borderRadius: 2,
              }}
            >
              NEW ORDER
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
              #{activeAlert.order_number}
            </span>
          </div>

          <div style={{ fontSize: 13, color: '#D4D4D8', lineHeight: 1.4, marginTop: 4 }}>
            <strong style={{ color: '#FFFFFF' }}>{activeAlert.customer_name}</strong> placed an order for{' '}
            <strong style={{ color: '#10B981', fontFamily: 'monospace', fontSize: 13.5 }}>
              ₹{activeAlert.total_amount.toLocaleString('en-IN')}
            </strong>
          </div>

          {activeAlert.customer_phone && (
            <div style={{ fontSize: 11.5, color: '#A1A1AA', marginTop: 3 }}>
              Contact: +91 {activeAlert.customer_phone.replace(/\D/g, '').slice(-10)}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setActiveAlert(null)}
          aria-label="Dismiss notification"
          style={{
            background: 'none',
            border: 'none',
            color: '#71717A',
            fontSize: 18,
            cursor: 'pointer',
            padding: '2px 6px',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* Action Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <Link
          href={`/orders/${activeAlert.id || activeAlert.order_number}`}
          onClick={() => setActiveAlert(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C8102E',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 4,
            minHeight: 38,
            flex: 1,
          }}
        >
          View Order & Advance Stage →
        </Link>
        <button
          onClick={() => setActiveAlert(null)}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#A1A1AA',
            fontSize: 12,
            fontWeight: 600,
            padding: '8px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            minHeight: 38,
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

