export async function adminFetch(url, opts = {}) {
  const r = await fetch(url, {
    ...opts, cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': sessionStorage.getItem('pw') || '', ...opts.headers },
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'เกิดข้อผิดพลาด');
  return j;
}
