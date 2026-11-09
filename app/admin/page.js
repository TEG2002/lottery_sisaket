'use client';
import { useEffect, useState, useRef } from 'react';
import { PRIZES, sideNumbers, normalizeTicketNumber } from '@/lib/prizes';

const blank = () => Object.fromEntries(PRIZES.map((p) => [p.id, Array(p.count).fill('')]));

export default function Admin() {
  const [data, setData] = useState(blank());
  const [msg, setMsg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/results', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => {
        const d = blank();
        for (const p of PRIZES) (r[p.id] || []).forEach((n, i) => (d[p.id][i] = n));
        setData(d);
      })
      .catch(() => {});
  }, []);

  const set = (id, i, rawVal) => {
    const v = normalizeTicketNumber(rawVal);
    setData((d) => ({
      ...d,
      [id]: d[id].map((x, j) => (j === i ? v : x)),
    }));
  };

  async function save() {
    setMsg(null);
    setIsSaving(true);
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': sessionStorage.getItem('pw') || '',
        },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      setMsg(res.ok ? { ok: '✅ บันทึกผลรางวัลเรียบร้อยแล้ว ข้อมูลอัปเดตขึ้นหน้าประชาชนทันที' } : { err: `❌ ${j.error}` });
    } catch (e) {
      setMsg({ err: `❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: ${e.message}` });
    } finally {
      setIsSaving(false);
    }
  }

  // เคลียร์ค่าทั้งหมด
  function clearAll() {
    if (confirm('ต้องการล้างตัวเลขผลรางวัลทั้งหมดใช่หรือไม่?')) {
      setData(blank());
      setMsg(null);
    }
  }

  return (
    <main>
      <div className="section-title-wrap" style={{ marginBottom: 16 }}>
        <h2>📝 เจ้าหน้าที่: บันทึกและจัดการผลรางวัลสลากกาชาด 2570</h2>
        <p className="sub-meta">
          กรอกหมายเลขเมื่อมีการออกรางวัลแต่ละรายการ แล้วกดบันทึกผล (สามารถทยอยบันทึกทีละรางวัลขณะออกสลากได้)
          <br />
          * รางวัลข้างเคียงรางวัลที่ 1 จะถูกคำนวณจากรางวัลที่ 1 โดยอัตโนมัติ
        </p>
      </div>

      {PRIZES.map((p) => (
        <section className="prize-card" key={p.id} style={{ marginBottom: 16 }}>
          <div className="prize-card-header">
            <div className="prize-name-group">
              <span className="prize-badge">{p.badge}</span>
              <h3 className="prize-card-title">
                {p.icon} {p.name}
              </h3>
            </div>
            <div className="prize-card-unit">
              ตัวเลข {p.digits} หลัก · ช่องกรอก {p.count} รางวัล (รางวัลละ {p.unit})
            </div>
          </div>
          <div className="grid" style={{ marginTop: 10 }}>
            {data[p.id].map((v, i) => (
              <input
                key={i}
                className="f"
                inputMode="numeric"
                maxLength={p.digits}
                placeholder={'0'.repeat(p.digits)}
                aria-label={`รางวัลที่ ${p.id} ช่อง ${i + 1}`}
                value={v}
                onChange={(e) => {
                  set(p.id, i, e.target.value);
                  // ถ้ากรอกครบตามหลัก ให้เลื่อน cursor ไปช่องถัดไปอัตโนมัติ
                  const clean = normalizeTicketNumber(e.target.value);
                  if (clean.length === p.digits) {
                    const inputs = Array.from(document.querySelectorAll('input.f'));
                    const curIndex = inputs.indexOf(e.target);
                    if (curIndex !== -1 && curIndex < inputs.length - 1) {
                      inputs[curIndex + 1].focus();
                    }
                  }
                }}
              />
            ))}
          </div>
        </section>
      ))}

      {/* รางวัลข้างเคียงรางวัลที่ 1 อัตโนมัติ */}
      <div className="prize-card" style={{ background: '#fffbeb', borderColor: 'var(--gold-500)', marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 6px', fontSize: 16, color: '#92400e' }}>
          ✨ รางวัลข้างเคียงรางวัลที่ 1 (คำนวณอัตโนมัติ 4 รางวัล):
        </h4>
        <div style={{ fontSize: 18, fontFamily: 'Chakra Petch, monospace', fontWeight: 700, color: 'var(--orange-700)' }}>
          {sideNumbers(data[1]).join(' , ') || '(รอผลรางวัลที่ 1 ครบทั้ง 2 หมายเลข)'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        <button
          type="button"
          className="btn-check"
          style={{ padding: '12px 32px', fontSize: 16 }}
          onClick={save}
          disabled={isSaving}
        >
          {isSaving ? 'กำลังบันทึก...' : '💾 บันทึกผลรางวัลขึ้นเว็บไซต์'}
        </button>

        <button
          type="button"
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: 14,
            background: 'var(--slate-200)',
            color: 'var(--slate-700)',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          onClick={clearAll}
        >
          ล้างตัวเลขทั้งหมด
        </button>
      </div>

      {msg?.ok && <p className="okmsg" style={{ fontSize: 16, marginBottom: 12 }}>{msg.ok}</p>}
      {msg?.err && <p className="err" style={{ fontSize: 16, marginBottom: 12 }}>{msg.err}</p>}

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ color: 'var(--orange-600)', fontWeight: 600 }}>
          ← กลับไปหน้าตรวจสลากของประชาชน
        </a>
      </p>
    </main>
  );
}
