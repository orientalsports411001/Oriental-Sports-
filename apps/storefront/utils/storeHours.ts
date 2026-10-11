import { useEffect, useState } from 'react';
import { STORE_SCHEDULE } from '../data/storeInfo';

export interface StoreStatus {
  isOpen: boolean;
  /** Short sentence for the UI, e.g. "Open today until 8:30 PM". */
  label: string;
  /** Today's hours, e.g. "10:30 AM – 8:30 PM". */
  today: string;
}

const fmt = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
};

/** Store status in Pune time, independent of the visitor's own time zone. */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STORE_SCHEDULE.timeZone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const isSunday = get('weekday') === 'Sun';
  const mins = Number(get('hour')) * 60 + Number(get('minute'));
  const hours = isSunday ? STORE_SCHEDULE.sunday : STORE_SCHEDULE.weekdays;
  const today = `${fmt(hours.open)} – ${fmt(hours.close)}`;

  if (mins >= hours.open && mins < hours.close) {
    return { isOpen: true, label: `Open today until ${fmt(hours.close)}`, today };
  }
  if (mins < hours.open) {
    return { isOpen: false, label: `Opens today at ${fmt(hours.open)}`, today };
  }
  // After closing: tomorrow is Monday if today is Sunday, else Mon–Sat or Sunday.
  const tomorrowIsSunday = get('weekday') === 'Sat';
  const next = tomorrowIsSunday ? STORE_SCHEDULE.sunday : STORE_SCHEDULE.weekdays;
  return { isOpen: false, label: `Closed now · Opens tomorrow ${fmt(next.open)}`, today };
}

/** Re-evaluates every minute so the label stays correct on long visits. */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState<StoreStatus>(() => getStoreStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
