export const isAdmin = (req) => !!process.env.ADMIN_PASSWORD && req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
export const denied = () => Response.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
export const fail = (e) => Response.json({ error: e.message || 'เกิดข้อผิดพลาด' }, { status: 500 });

// "00001, 00005 00010-00020" หรือเลขไทย -> ['00001','00005','00010',...]
export function parseTickets(text = '') {
  const thaiMap = { '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9' };
  const normalized = String(text).replace(/[๐-๙]/g, (ch) => thaiMap[ch] || ch);
  const out = new Set();
  for (const tok of normalized.split(/[\s,;]+/).filter(Boolean)) {
    const m = tok.match(/^(\d{1,5})(?:-(\d{1,5}))?$/);
    if (!m) throw new Error(`เลขสลากไม่ถูกต้อง: ${tok}`);
    const a = Number(m[1]), b = m[2] ? Number(m[2]) : a;
    if (b < a || b - a > 1000) throw new Error(`ช่วงเลขไม่ถูกต้อง: ${tok} (สูงสุด 1,000 ใบต่อช่วง)`);
    for (let n = a; n <= b; n++) out.add(String(n).padStart(5, '0'));
  }
  return [...out];
}
