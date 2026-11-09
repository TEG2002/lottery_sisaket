import { loadResults, saveResults } from '@/lib/store';
import { PRIZES } from '@/lib/prizes';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return Response.json(await loadResults(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('Error loading results:', e);
    return Response.json({ updatedAt: null }, { headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(req) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.headers.get('x-admin-password') !== pw)
    return Response.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  const body = await req.json();
  const clean = {};
  for (const p of PRIZES) {
    const list = (body[p.id] || []).map((s) => String(s).trim()).filter(Boolean);
    if (list.some((s) => !new RegExp(`^\\d{${p.digits}}$`).test(s)))
      return Response.json({ error: `รางวัลที่ ${p.id} ต้องเป็นตัวเลข ${p.digits} หลัก` }, { status: 400 });
    if (new Set(list).size !== list.length)
      return Response.json({ error: `รางวัลที่ ${p.id} มีเลขซ้ำกัน` }, { status: 400 });
    clean[p.id] = list;
  }
  return Response.json(await saveResults(clean));
}
