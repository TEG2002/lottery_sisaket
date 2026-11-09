import { q } from '@/lib/db';
import { loadResults } from '@/lib/store';
import { checkTicket } from '@/lib/prizes';
import { isAdmin, denied, fail } from '@/lib/auth';
export const dynamic = 'force-dynamic';

// สลากที่ลงทะเบียนไว้และถูกรางวัล
export async function GET(req) {
  if (!isAdmin(req)) return denied();
  try {
    const results = await loadResults();
    const rows = await q(`select t.ticket_no,t.claimed_at,t.claim_note,c.name,c.phone from tickets t join customers c on c.id=t.customer_id order by t.ticket_no`);
    const out = [];
    for (const r of rows) {
      const wins = checkTicket(results, r.ticket_no).map((w) => ({ id: w.id, name: w.name, unit: w.unit }));
      if (wins.length) out.push({ ...r, wins });
    }
    return Response.json(out);
  } catch (e) { return fail(e); }
}

// บันทึกว่ารับรางวัลแล้ว / ยกเลิก
export async function POST(req) {
  if (!isAdmin(req)) return denied();
  try {
    const { ticket_no, claimed, note } = await req.json();
    await q(`update tickets set claimed_at = case when $2::boolean then now() else null end, claim_note=$3 where ticket_no=$1`,
      [ticket_no, !!claimed, note || null]);
    return Response.json({ ok: true });
  } catch (e) { return fail(e); }
}
