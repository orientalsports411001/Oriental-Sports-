/**
 * Broadcast an event on the Supabase Realtime channel `oriental_sports_sync`.
 * Uses the Supabase REST Broadcast endpoint so it works reliably across
 * Node.js server routes, route handlers, and server actions without requiring
 * external WebSocket dependencies.
 */
export async function broadcastRealtimeEvent(event: string, payload: Record<string, any>) {
  try {
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
    const supaKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('supabase-demo')
        ? process.env.SUPABASE_SERVICE_ROLE_KEY
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';

    if (!supaUrl || !supaKey) return;

    await fetch(`${supaUrl}/realtime/v1/api/broadcast`, {
      method: 'POST',
      headers: {
        apikey: supaKey,
        Authorization: `Bearer ${supaKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            topic: 'oriental_sports_sync',
            event,
            payload,
          },
        ],
      }),
    });
  } catch (err) {
    console.warn('[broadcastRealtimeEvent] Broadcast notice:', err);
  }
}
