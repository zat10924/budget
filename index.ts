// Edge Function: chat-push — يرسل إشعارًا للشريك عند رسالة جديدة
import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

webpush.setVapidDetails(Deno.env.get('VAPID_SUBJECT')!, Deno.env.get('VAPID_PUBLIC')!, Deno.env.get('VAPID_PRIVATE')!);
const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  if (req.headers.get('x-webhook-secret') !== Deno.env.get('WEBHOOK_SECRET')) return new Response('forbidden', { status: 403 });
  const { record } = await req.json();
  if (!record) return new Response('no record');
  const { data: subs } = await sb.from('budget_push').select('endpoint,sub').eq('household_id', record.household_id).neq('user_id', record.user_id);
  const payload = JSON.stringify({ title: '💬 ' + (record.sender || 'الشريك'), body: String(record.body || '').slice(0, 100), tag: 'chat' });
  await Promise.all((subs || []).map(async (s) => {
    try { await webpush.sendNotification(s.sub, payload); }
    catch (e) { if (e.statusCode === 404 || e.statusCode === 410) await sb.from('budget_push').delete().eq('endpoint', s.endpoint); }
  }));
  return new Response('ok');
});
