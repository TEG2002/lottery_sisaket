'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/client';
import { SIDE_PRIZE } from '@/lib/prizes';

export default function Winners() {
  const [list, setList] = useState(null);
  const [err, setErr] = useState(null);

  const load = () =>
    adminFetch('/api/winners')
      .then((r) => {
        setList(r);
        setErr(null);
      })
      .catch((e) => setErr(e.message));

  useEffect(() => {
    load();
  }, []);

  async function toggle(w) {
    const claimed = !w.claimed_at;
    const note = claimed
      ? prompt('หมายเหตุการรับรางวัล (เช่น ชื่อผู้มารับแทน หรือหลักฐาน) ปล่อยว่างได้') ?? ''
      : '';
    try {
      await adminFetch('/api/winners', {
        method: 'POST',
        body: JSON.stringify({ ticket_no: w.ticket_no, claimed, note }),
      });
      load();
    } catch (e) {
      setErr(e.message);
    }
  }

  const left = list?.filter((w) => !w.claimed_at).length;

  return (
    <main>
      <div className="section-title-wrap" style={{ marginBottom: 16 }}>
        <h2>🏆 ทะเบียนผู้ถูกรางวัล (สลากที่ลงทะเบียนไว้)</h2>
        <p className="sub-meta">
          {list
            ? `ตรวจพบผู้ถูกรางวัล ${list.length} ใบ (ยังไม่ได้รับรางวัล ${left} ใบ)`
            : 'กำลังโหลดข้อมูล...'}
          <br />
          <small style={{ color: 'var(--slate-500)' }}>
            * สลากที่ไม่ได้ลงทะเบียนล่วงหน้า ประชาชนสามารถนำสลากจริงมาติดต่อตรวจรับรางวัลได้ที่สำนักงานเหล่ากาชาดฯ
          </small>
        </p>
      </div>

      {err && <p className="err" style={{ marginBottom: 16 }}>❌ {err}</p>}

      {list?.length === 0 && (
        <div
          className="prize-card"
          style={{ textAlign: 'center', padding: '36px', color: 'var(--slate-400)' }}
        >
          ยังไม่มีผู้ถูกรางวัลจากสลากที่ลงทะเบียนไว้ (หรือยังไม่ได้บันทึกผลการออกรางวัล)
        </div>
      )}

      {list?.map((w) => (
        <section
          className="prize-card"
          key={w.ticket_no}
          style={
            w.claimed_at
              ? { opacity: 0.7, background: '#f8fafc', marginBottom: 12 }
              : { border: '1.5px solid var(--orange-300)', marginBottom: 12 }
          }
        >
          <div className="prize-card-header">
            <div className="prize-name-group">
              <span className="prize-chip" style={{ fontSize: 20, padding: '2px 10px' }}>
                {w.ticket_no}
              </span>
              <h3 className="prize-card-title">{w.name}</h3>
              {w.phone && <span className="prize-badge">{w.phone}</span>}
              {w.claimed_at ? (
                <span
                  style={{
                    background: '#e2e8f0',
                    color: '#475569',
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 9999,
                    fontWeight: 600,
                  }}
                >
                  ✓ รับรางวัลแล้ว
                </span>
              ) : (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#b45309',
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 9999,
                    fontWeight: 600,
                  }}
                >
                  ⏳ ยังไม่ได้รับรางวัล
                </span>
              )}
            </div>
            <div className="prize-card-unit" style={{ color: 'var(--orange-700)', fontWeight: 700 }}>
              {w.wins
                .map((x) =>
                  x.id === 7 ? `${SIDE_PRIZE.title}: ${x.name}` : `รางวัลที่ ${x.id}: ${x.name}`
                )
                .join(' + ')}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn"
              style={{
                padding: '6px 16px',
                fontSize: 14,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: w.claimed_at ? '#64748b' : 'var(--green-600)',
                color: '#fff',
                fontWeight: 600,
              }}
              onClick={() => toggle(w)}
            >
              {w.claimed_at
                ? `รับแล้วเมื่อ ${new Date(w.claimed_at).toLocaleDateString('th-TH')} (คลิกเพื่อยกเลิก)`
                : '✅ บันทึกว่ารับรางวัลแล้ว'}
            </button>
            {w.claim_note && (
              <span style={{ fontSize: 13, color: 'var(--slate-600)' }}>
                หมายเหตุ: {w.claim_note}
              </span>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
