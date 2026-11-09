'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/client';

const empty = { name: '', phone: '', tickets: '', address: '', note: '' };

export default function Customers() {
  const [f, setF] = useState(empty);
  const [list, setList] = useState([]);
  const [s, setS] = useState('');
  const [msg, setMsg] = useState(null);

  const load = (term = s) =>
    adminFetch(`/api/customers?q=${encodeURIComponent(term)}`)
      .then(setList)
      .catch((e) => setMsg({ err: e.message }));

  useEffect(() => {
    load('');
  }, []);

  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function add(e) {
    e.preventDefault();
    setMsg(null);
    try {
      const r = await adminFetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(f),
      });
      setMsg({ ok: `บันทึกข้อมูลแล้วเรียบร้อย ${r.count} ใบ` });
      setF(empty);
      load();
    } catch (er) {
      setMsg({ err: er.message });
    }
  }

  async function del(c) {
    if (!confirm(`ยืนยันการลบ ${c.name} และสลากจำนวน ${c.tickets.length} ใบ?`)) return;
    try {
      await adminFetch(`/api/customers?id=${c.id}`, { method: 'DELETE' });
      load();
    } catch (er) {
      setMsg({ err: er.message });
    }
  }

  return (
    <main>
      <div className="section-title-wrap" style={{ marginBottom: 16 }}>
        <h2>👥 ทะเบียนลูกค้าและสลากที่จำหน่าย</h2>
        <p className="sub-meta">บันทึกข้อมูลผู้ซื้อสลาก เพื่อตรวจสอบผู้ถูกรางวัลและอำนวยความสะดวกในการติดต่อรับรางวัล</p>
      </div>

      {/* ฟอร์มเพิ่มลูกค้า */}
      <form className="prize-card" onSubmit={add} style={{ marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>➕ เพิ่มข้อมูลผู้ซื้อสลากใหม่</h3>
        <div className="grid">
          <input
            className="t"
            placeholder="ชื่อ-นามสกุล *"
            value={f.name}
            onChange={on('name')}
            required
          />
          <input
            className="t"
            placeholder="เบอร์โทรศัพท์ (ถ้ามี)"
            inputMode="tel"
            value={f.phone}
            onChange={on('phone')}
          />
        </div>
        <textarea
          className="t"
          rows={3}
          placeholder="เลขสลาก คั่นด้วยเว้นวรรค/จุลภาค หรือระบุเป็นช่วง เช่น 00001 00005 00010-00020 *"
          value={f.tickets}
          onChange={on('tickets')}
          required
        />
        <div className="grid">
          <input
            className="t"
            placeholder="ที่อยู่ (ถ้ามี)"
            value={f.address}
            onChange={on('address')}
          />
          <input
            className="t"
            placeholder="หมายเหตุเพิ่มเติม"
            value={f.note}
            onChange={on('note')}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <button className="btn-check" style={{ padding: '8px 24px', fontSize: 15 }}>
            บันทึกข้อมูลลูกค้า
          </button>
          {msg?.ok && <span className="okmsg">✅ {msg.ok}</span>}
          {msg?.err && <span className="err">❌ {msg.err}</span>}
        </div>
      </form>

      {/* ค้นหา */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="grid"
        style={{ margin: '16px 0', alignItems: 'center' }}
      >
        <input
          className="t"
          style={{ marginBottom: 0 }}
          placeholder="🔍 ค้นหาชื่อ / เบอร์โทร / เลขสลาก 5 หลัก"
          value={s}
          onChange={(e) => setS(e.target.value)}
        />
        <button className="btn-check" style={{ padding: '10px 22px', fontSize: 15 }}>
          ค้นหา
        </button>
      </form>

      {/* รายการลูกค้า */}
      {list.length === 0 && (
        <div className="prize-card" style={{ textAlign: 'center', padding: '30px', color: 'var(--slate-400)' }}>
          ยังไม่พบข้อมูลผู้ซื้อสลาก
        </div>
      )}

      {list.map((c) => (
        <section className="prize-card" key={c.id} style={{ marginBottom: 14 }}>
          <div className="prize-card-header">
            <div className="prize-name-group">
              <h3 className="prize-card-title">{c.name}</h3>
              {c.phone && <span className="prize-badge">{c.phone}</span>}
            </div>
            <div className="prize-card-unit">
              {[c.address, c.note].filter(Boolean).join(' · ')} · <strong>สลาก {c.tickets.length} ใบ</strong>
            </div>
          </div>
          <div className="prize-chips" style={{ marginTop: 10 }}>
            {c.tickets.slice(0, 50).map((t) => (
              <span className="prize-chip" key={t} style={{ fontSize: 16, padding: '2px 10px' }}>
                {t}
              </span>
            ))}
            {c.tickets.length > 50 && (
              <span className="prize-empty">และอีก {c.tickets.length - 50} ใบ</span>
            )}
          </div>
          <div style={{ marginTop: 14, textAlign: 'right' }}>
            <button
              type="button"
              className="btn"
              style={{
                padding: '4px 14px',
                fontSize: 13,
                background: 'var(--red-600)',
                color: '#fff',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => del(c)}
            >
              ลบรายการนี้
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}
