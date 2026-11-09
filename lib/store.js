import { q } from './db';
export async function loadResults() {
  const r = await q(`select value from kv where key='results'`);
  return r[0]?.value || { updatedAt: null };
}
export async function saveResults(data) {
  const v = { ...data, updatedAt: new Date().toISOString() };
  await q(`insert into kv(key,value) values('results',$1) on conflict(key) do update set value=excluded.value`, [JSON.stringify(v)]);
  return v;
}
