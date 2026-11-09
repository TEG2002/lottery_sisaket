import { neon } from '@neondatabase/serverless';
let sql, ready;

// สร้างตารางอัตโนมัติครั้งแรกที่เรียกใช้
export async function q(text, params = []) {
  if (!sql) {
    if (!process.env.DATABASE_URL) throw new Error('ยังไม่ได้ตั้งค่า DATABASE_URL');
    sql = neon(process.env.DATABASE_URL);
  }
  if (!ready) {
    ready = (async () => {
      await sql`create table if not exists kv(key text primary key, value jsonb not null)`;
      await sql`create table if not exists customers(
        id serial primary key, name text not null, phone text, address text, note text,
        created_at timestamptz not null default now())`;
      await sql`create table if not exists tickets(
        ticket_no char(5) primary key,
        customer_id int not null references customers(id) on delete cascade,
        sold_at timestamptz not null default now(),
        claimed_at timestamptz, claim_note text)`;
    })().catch((e) => { ready = null; throw e; });
  }
  await ready;
  return sql.query(text, params);
}
