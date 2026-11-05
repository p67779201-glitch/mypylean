import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Emails every registered app user a short streak nudge.
// Designed to be attached to a daily scheduled workflow (dashboard → Workflows).
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun !== false;

    const users = await base44.asServiceRole.entities.User.list();
    const recipients = users.filter((u) => u.email);

    const subject = 'Your study streak is waiting';
    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2>One lesson keeps the streak alive</h2>
        <p>You have not studied today yet. A single lesson, practice task or logged session is enough to keep the streak going.</p>
        <p>Open EduTrack Progress → the dashboard shows your streak and the next lesson to pick up.</p>
        <p style="color:#666;font-size:12px">You are receiving this because you have an account on EduTrack Progress.</p>
      </div>
    `;

    if (dryRun) {
      return Response.json({ dryRun: true, recipients: recipients.length, emails: recipients.map((u) => u.email) });
    }

    let sent = 0;
    let failed = 0;
    for (const recipient of recipients) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: recipient.email,
          subject,
          html,
          category: 'transactional',
        });
        sent += 1;
      } catch {
        failed += 1;
      }
    }

    return Response.json({ dryRun: false, sent, failed, recipients: recipients.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}