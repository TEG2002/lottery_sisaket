import { q } from '@/lib/db';
import { isAdmin, denied, fail, parseTickets } from '@/lib/auth';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return denied();
  try {
    const s = (new URL(req.url).searchParams.get('q') || '').trim();
    const rows = await q(
      `select c.id,c.name,c.phone,c.address,c.note,c.created_at,
        coalesce(array_agg(t.ticket_no order by t.ticket_no) filter (where t.ticket_no is not null),'{}') as tickets
       from customers c left join tickets t on t.customer_id=c.id
       where $1::text='' or c.name ilike '%'||$1::text||'%' or c.phone like '%'||$1::text||'%'
         or exists(select 1 from tickets x where x.customer_id=c.id and x.ticket_no=$1::text)
       group by c.id order by c.id desc limit 200`, [s]);
    return Response.json(rows);
  } catch (e) { return fail(e); }
}

export async function POST(req) {
  if (!isAdmin(req)) return denied();
  let id;
  try {
    const b = await req.json();
    const name = String(b.name || '').trim();
    if (!name) return Response.json({ error: 'กรุณากรอกชื่อลูกค้า' }, { status: 400 });
    const tickets = parseTickets(b.tickets);
    if (!tickets.length) return Response.json({ error: 'กรุณากรอกเลขสลากอย่างน้อย 1 ใบ' }, { status: 400 });
    const dup = await q(`select ticket_no from tickets where ticket_no = any($1::text[])`, [tickets]);
    if (dup.length) return Response.json({ error: `เลขนี้ถูกลงทะเบียนแล้ว: ${dup.map((d) => d.ticket_no).join(', ')}` }, { status: 409 });
    const c = await q(`insert into customers(name,phone,address,note) values($1,$2,$3,$4) returning id`,
      [name, b.phone?.trim() || null, b.address?.trim() || null, b.note?.trim() || null]);
    id = c[0].id;
    await q(`insert into tickets(ticket_no,customer_id) select unnest($1::text[]), $2`, [tickets, id]);
    return Response.json({ id, count: tickets.length });
  } catch (e) {
    if (id) await q(`delete from customers where id=$1`, [id]).catch(() => {});
    return fail(e);
  }
}

export async function DELETE(req) {
  if (!isAdmin(req)) return denied();
  try { await q(`delete from customers where id=$1`, [Number(new URL(req.url).searchParams.get('id'))]); return Response.json({ ok: true }); }
  catch (e) { return fail(e); }
}
