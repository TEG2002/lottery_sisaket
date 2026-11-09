'use client';
import { useEffect, useState, useMemo } from 'react';
import { PRIZES, SIDE_PRIZE, sideNumbers, checkTicket, normalizeTicketNumber } from '@/lib/prizes';
import { AppIcon } from '@/components/icons';

export default function Home() {
  const [results, setResults] = useState(null);
  const [q, setQ] = useState('');
  const [checked, setChecked] = useState(null);
  const [mode, setMode] = useState('single'); // 'single' | 'multi'
  const [multiInput, setMultiInput] = useState('');
  const [multiChecked, setMultiChecked] = useState(null);

  useEffect(() => {
    const load = () =>
      fetch('/api/results', { cache: 'no-store' })
        .then((r) => r.json())
        .then(setResults)
        .catch(() => {});
    load();
    const t = setInterval(load, 15000); // อัปเดตอัตโนมัติทุก 15 วินาที
    return () => clearInterval(t);
  }, []);

  // ตรวจสอบสถานะการออกรางวัล
  const drawnCount = PRIZES.filter((p) => results?.[p.id]?.length).length;
  const anyDrawn = drawnCount > 0;
  const allDrawn = drawnCount === PRIZES.length;
  const side = useMemo(() => sideNumbers(results?.[1]), [results]);

  // ผลการตรวจใบเดียว
  const wins = useMemo(() => (checked ? checkTicket(results, checked) : []), [results, checked]);
  const hit = (p, n) => checked && (p.digits === 5 ? checked === n : checked.endsWith(n));

  // ฟังก์ชันส่งตรวจใบเดียว
  function handleSingleSubmit(e) {
    e?.preventDefault();
    const clean = normalizeTicketNumber(q);
    if (clean.length === 5) {
      setChecked(clean);
    }
  }

  // ฟังก์ชันส่งตรวจหลายใบ
  function handleMultiSubmit(e) {
    e?.preventDefault();
    const tokens = multiInput
      .split(/[\s,;\n]+/)
      .map((s) => normalizeTicketNumber(s))
      .filter((s) => s.length === 5);

    if (tokens.length === 0) return;

    const uniqueTokens = Array.from(new Set(tokens));
    const list = uniqueTokens.map((num) => ({
      ticket: num,
      wins: checkTicket(results, num),
    }));
    setMultiChecked(list);
  }

  // ตัวอย่างเลขเพื่อทดสอบคลิกดู
  const sampleWinningNumbers = useMemo(() => {
    const samples = [];
    if (results?.[1]?.[0]) samples.push(results[1][0]);
    if (results?.[2]?.[0]) samples.push(results[2][0]);
    if (side?.[0]) samples.push(side[0]);
    return samples;
  }, [results, side]);

  return (
    <>
      {/* ========================================================
          TOP NAVIGATION BAR (แถบด้านบนสุด)
          ======================================================== */}
      <header className="top-nav-bar no-print">
        <div className="top-nav-inner">
          <div className="brand-group">
            <span className="brand-redcross-badge">
              <AppIcon name="cross" size={12} color="#ffffff" style={{ marginRight: 2 }} /> กาชาด
            </span>
            <span className="brand-title">สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ</span>
          </div>
          <div className="nav-links">
            <span className="nav-tag">งานเทศกาลปีใหม่สี่เผ่าไทศรีสะเกษ 2570</span>
            <a href="tel:045611591" className="nav-tel">
              <AppIcon name="phone-call" size={14} color="var(--orange-700)" /> 045-611591
            </a>
            <a href="/admin" className="nav-admin-link">
              สำหรับเจ้าหน้าที่
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO HEADER CARD (ส่วนหัวเรื่องหลัก ออกแบบโมเดิร์นสง่างาม)
          ======================================================== */}
      <div className="hero-header-card no-print">
        <div className="hero-header-box">
          <div className="hero-org-badge">
            <AppIcon name="cross" size={12} color="var(--red-600)" />
            สภากาชาดไทย · เหล่ากาชาดจังหวัดศรีสะเกษ
          </div>

          <h1 className="main-title">
            ระบบตรวจผล<span className="highlight">สลากกาชาด</span> ประจำปี 2570
          </h1>

          <p className="main-subtitle">
            งานเทศกาลปีใหม่สี่เผ่าไทศรีสะเกษ จังหวัดศรีสะเกษ · ออกสลากวันจันทร์ที่ 4 มกราคม 2570 ณ สนามหน้าศาลากลาง
          </p>

          <div className="hero-badges-row">
            <span className="hero-pill-badge">
              <AppIcon name="calendar" size={14} /> ออกสลาก 4 ม.ค. 2570 (20.30 น.)
            </span>
            <span className="hero-pill-badge">
              <AppIcon name="location" size={14} /> สนามหน้าศาลากลาง จ.ศรีสะเกษ
            </span>
            <span className="hero-pill-badge">
              <AppIcon name="ticket" size={14} /> สลากฉบับละ 100 บาท
            </span>
            <span className="hero-pill-badge">
              <AppIcon name="car" size={14} /> รางวัลที่ 1 รถฟอร์จูนเนอร์ 2 คัน
            </span>
            <span className="hero-pill-badge">
              <AppIcon name="trophy" size={14} /> รวม 127 รางวัล
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN CONTENT AREA
          ======================================================== */}
      <main className="wrap">
        {/* กล่องตรวจสลากกาชาด */}
        <section className="checker-card no-print">
          <div className="checker-mode-bar">
            <div className="checker-label-group">
              <span className="icon-box">
                <AppIcon name="ticket" size={18} />
              </span>
              <span className="text">ตรวจรางวัลสลากกาชาด</span>
            </div>

            {/* ปุ่มสลับโหมด ตรวจใบเดียว / ตรวจหลายใบ */}
            <div className="checker-tabs">
              <button
                type="button"
                className={`tab-btn ${mode === 'single' ? 'active' : ''}`}
                onClick={() => {
                  setMode('single');
                  setMultiChecked(null);
                }}
              >
                ตรวจใบเดียว
              </button>
              <button
                type="button"
                className={`tab-btn ${mode === 'multi' ? 'active' : ''}`}
                onClick={() => {
                  setMode('multi');
                  setChecked(null);
                }}
              >
                ตรวจหลายใบพร้อมกัน
              </button>
            </div>
          </div>

          {/* โหมด 1: ตรวจใบเดียว */}
          {mode === 'single' && (
            <form className="checker-form" onSubmit={handleSingleSubmit}>
              <div className="input-group">
                <div className="ticket-input-wrapper">
                  <input
                    id="ticket-no"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="00000"
                    autoComplete="off"
                    className="ticket-input"
                    value={q}
                    onChange={(e) => {
                      const clean = normalizeTicketNumber(e.target.value);
                      setQ(clean);
                      if (clean.length === 5) {
                        setChecked(clean);
                      } else {
                        setChecked(null);
                      }
                    }}
                  />
                  {q && (
                    <button
                      type="button"
                      className="clear-btn"
                      onClick={() => {
                        setQ('');
                        setChecked(null);
                      }}
                      title="ล้างข้อมูล"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-check"
                  disabled={q.length !== 5}
                >
                  <AppIcon name="search" size={16} /> ตรวจสลาก
                </button>
              </div>

              <div className="quick-hint">
                <span>
                  <AppIcon name="info" size={14} style={{ marginRight: 4 }} />
                  กรอกตัวเลขสลาก 5 หลัก (เช่น 01234)
                </span>
                {sampleWinningNumbers.length > 0 && (
                  <div className="sample-pills">
                    <span>ลองสุ่มตรวจ:</span>
                    {sampleWinningNumbers.map((num) => (
                      <button
                        key={num}
                        type="button"
                        className="sample-pill"
                        onClick={() => {
                          setQ(num);
                          setChecked(num);
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* แสดงผลการตรวจใบเดียว */}
              {checked && (
                <>
                  {!anyDrawn ? (
                    <div className="verdict wait">
                      <div className="lose-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AppIcon name="clock" size={20} color="var(--orange-600)" />
                        ยังไม่มีการออกรางวัล
                      </div>
                      <p className="lose-sub">
                        การออกรางวัลสลากกาชาดจะจัดขึ้นในคืนวันจันทร์ที่ 4 มกราคม 2570 เวลา 20.30 น.
                        ณ เวทีกลาง สนามหน้าศาลากลางจังหวัดศรีสะเกษ กรุณากลับมาตรวจอีกครั้ง
                      </p>
                    </div>
                  ) : wins.length > 0 ? (
                    <div className="verdict win">
                      <div className="win-header">
                        <AppIcon name="party" size={24} color="var(--green-700)" />
                        <span>ขอแสดงความยินดีด้วย! สลากหมายเลข {checked} ถูกรางวัล</span>
                        <span className="win-badge">{wins.length} รายการ</span>
                      </div>

                      <div className="win-list">
                        {wins.map((w, i) => (
                          <div key={i} className="win-item">
                            <div className="win-item-info">
                              <span className="prize-icon-box">
                                <AppIcon name={w.iconKey || 'trophy'} size={20} />
                              </span>
                              <div>
                                <div className="win-item-title">
                                  {w.label}: {w.name}
                                </div>
                                <div className="win-item-sub">
                                  รางวัลละ {w.unit}
                                </div>
                              </div>
                            </div>
                            <div className="win-item-num">
                              {w.isSuffix ? `เลขท้าย ${w.number}` : `เลข ${w.number}`}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="claim-box">
                        <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <AppIcon name="document" size={16} /> กำหนดการและสถานที่รับรางวัล:
                        </strong>
                        <div style={{ marginTop: 6, lineHeight: 1.7 }}>
                          • <strong>ระยะเวลา:</strong> ภายใน 30 วัน นับแต่วันออกรางวัล (ตั้งแต่วันที่ 5 ม.ค. ถึง 3 ก.พ. 2570 ในวันและเวลาราชการ) หากพ้นกำหนดถือว่าสละสิทธิ์
                          <br />
                          • <strong>สถานที่:</strong> สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ บริเวณศาลากลางจังหวัดศรีสะเกษ
                          <br />
                          • <strong>หลักฐาน:</strong> สลากกาชาดฉบับจริง พร้อมบัตรประจำตัวประชาชน
                          <br />
                          • <strong>ติดต่อสอบถาม:</strong> โทร. 045-611591
                        </div>
                      </div>
                    </div>
                  ) : !allDrawn ? (
                    <div className="verdict partial">
                      <div className="lose-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AppIcon name="alert" size={20} color="#b45309" />
                        ยังไม่พบรางวัลในรอบที่ประกาศแล้ว
                      </div>
                      <p className="lose-sub">
                        สลากหมายเลข <strong>{checked}</strong> ยังไม่ตรงกับรางวัลที่ประกาศแล้ว (ขณะนี้ประกาศผลแล้ว {drawnCount} จาก {PRIZES.length} รางวัล)
                        <br />
                        กรุณากลับมาตรวจซ้ำอีกครั้งเมื่อประกาศผลครบทุกรางวัล
                      </p>
                    </div>
                  ) : (
                    <div className="verdict lose">
                      <div className="lose-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AppIcon name="info" size={18} color="var(--slate-500)" />
                        สลากหมายเลข {checked} ไม่ถูกรางวัลในงวดนี้
                      </div>
                      <p className="lose-sub">
                        เหล่ากาชาดจังหวัดศรีสะเกษ ขอขอบพระคุณทุกท่านที่ได้ร่วมทำบุญซื้อสลากกาชาดสมนาคุณ
                        รายได้ทั้งหมดนำไปช่วยเหลือกิจการสาธารณกุศลและสงเคราะห์ผู้ยากไร้ในจังหวัดศรีสะเกษ
                      </p>
                    </div>
                  )}
                </>
              )}
            </form>
          )}

          {/* โหมด 2: ตรวจหลายใบพร้อมกัน */}
          {mode === 'multi' && (
            <form className="checker-form" onSubmit={handleMultiSubmit}>
              <textarea
                className="multi-textarea"
                rows={3}
                placeholder="วางหรือพิมพ์เลขสลาก 5 หลัก หลายๆ ใบ คั่นด้วยเว้นวรรค จุลภาค (,) หรือขึ้นบรรทัดใหม่ เช่น 01234 05678 12345"
                value={multiInput}
                onChange={(e) => setMultiInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn-check"
                disabled={!multiInput.trim()}
              >
                <AppIcon name="search" size={16} /> ตรวจทั้งหมดพร้อมกัน
              </button>

              {multiChecked && (
                <div className="batch-results" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 700, margin: '8px 0', fontSize: 15 }}>
                    ผลการตรวจทั้งหมด {multiChecked.length} ใบ (ถูกรางวัล {multiChecked.filter((x) => x.wins.length > 0).length} ใบ):
                  </div>
                  {multiChecked.map((item) => (
                    <div
                      key={item.ticket}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: item.wins.length > 0 ? '#f0fdf4' : '#ffffff',
                        border: `1px solid ${item.wins.length > 0 ? 'var(--green-600)' : 'var(--slate-200)'}`,
                        borderRadius: 8,
                        marginBottom: 8,
                        fontSize: 14.5,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {item.wins.length > 0 ? (
                          <AppIcon name="party" size={18} color="var(--green-600)" />
                        ) : (
                          <AppIcon name="ticket" size={18} color="var(--slate-400)" />
                        )}
                        <strong>เลข {item.ticket}</strong>
                        {item.wins.length > 0 ? (
                          <span style={{ color: 'var(--green-700)', fontWeight: 700 }}>
                            ถูก{item.wins.map((w) => `${w.label} (${w.name})`).join(', ')}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--slate-400)' }}>
                            ไม่ถูกรางวัล
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          )}
        </section>

        {/* ========================================================
            ALL RESULTS SECTION (ผลการออกรางวัลทั้งหมด)
            ======================================================== */}
        <div className="print-only print-header">
          <h2>ประกาศผลการออกรางวัลสลากกาชาดสมนาคุณ ประจำปี 2570</h2>
          <h3>งานเทศกาลปีใหม่สี่เผ่าไทศรีสะเกษ จังหวัดศรีสะเกษ</h3>
          <p>
            ออกรางวัล ณ สนามหน้าศาลากลางจังหวัดศรีสะเกษ วันจันทร์ที่ 4 มกราคม 2570
            {results?.updatedAt && ` · ประกาศผล ณ วันที่ ${new Date(results.updatedAt).toLocaleDateString('th-TH')}`}
          </p>
        </div>

        <div className="section-header">
          <div className="section-title-wrap">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AppIcon name="trophy" size={26} color="var(--orange-600)" /> ผลการออกรางวัลสลากกาชาด 2570
            </h2>
            <span className="title-line" />
            <p className="sub-meta">
              {results?.updatedAt ? (
                <>
                  <span className="live-indicator">
                    <span className="pulse-dot" /> อัปเดตล่าสุด {new Date(results.updatedAt).toLocaleString('th-TH')}
                  </span>
                </>
              ) : (
                '⏳ รอผลการออกรางวัล (วันที่ 4 ม.ค. 2570)'
              )}
            </p>
          </div>
          <button
            type="button"
            className="btn-print no-print"
            onClick={() => window.print()}
            title="พิมพ์ใบประกาศผลรางวัล"
          >
            <AppIcon name="printer" size={15} /> พิมพ์ใบตรวจผล
          </button>
        </div>

        {/* รายการรางวัล */}
        <div className="prize-list">
          {/* รางวัลที่ 1 */}
          {(() => {
            const p = PRIZES[0];
            const nums = results?.[p.id] || [];
            return (
              <section key={p.id} className="prize-card grand">
                <div className="prize-card-header">
                  <div className="prize-name-group">
                    <span className="prize-icon-box">
                      <AppIcon name="car" size={22} />
                    </span>
                    <span className="prize-badge">{p.badge}</span>
                    <h3 className="prize-card-title">{p.name}</h3>
                  </div>
                  <div className="prize-card-unit">
                    รางวัลละ {p.unit} · จำนวน {p.count} รางวัล
                  </div>
                </div>
                <div className="prize-chips">
                  {nums.length > 0 ? (
                    nums.map((n) => (
                      <span key={n} className={`prize-chip ${hit(p, n) ? 'hit' : ''}`}>
                        {n}
                      </span>
                    ))
                  ) : (
                    <span className="prize-empty">
                      <AppIcon name="clock" size={14} /> รอผลการออกรางวัลที่ 1
                    </span>
                  )}
                </div>
              </section>
            );
          })()}

          {/* รางวัลข้างเคียงรางวัลที่ 1 */}
          <section className="prize-card">
            <div className="prize-card-header">
              <div className="prize-name-group">
                <span className="prize-icon-box">
                  <AppIcon name="sparkle" size={22} />
                </span>
                <span className="prize-badge">{SIDE_PRIZE.badge}</span>
                <h3 className="prize-card-title">
                  {SIDE_PRIZE.title}: {SIDE_PRIZE.name}
                </h3>
              </div>
              <div className="prize-card-unit">
                รางวัลละ {SIDE_PRIZE.unit} · จำนวน {SIDE_PRIZE.count} รางวัล (เลขถัดขึ้น/ถัดลงของรางวัลที่ 1)
              </div>
            </div>
            <div className="prize-chips">
              {side.length > 0 ? (
                side.map((n) => (
                  <span key={n} className={`prize-chip ${checked === n ? 'hit' : ''}`}>
                    {n}
                  </span>
                ))
              ) : (
                <span className="prize-empty">
                  <AppIcon name="clock" size={14} /> รอผลออกรางวัลที่ 1 (คำนวณอัตโนมัติ)
                </span>
              )}
            </div>
          </section>

          {/* รางวัลที่ 2 ถึง 6 */}
          {PRIZES.slice(1).map((p) => {
            const nums = results?.[p.id] || [];
            return (
              <section key={p.id} className="prize-card">
                <div className="prize-card-header">
                  <div className="prize-name-group">
                    <span className="prize-icon-box">
                      <AppIcon name={p.iconKey || 'trophy'} size={22} />
                    </span>
                    <span className="prize-badge">{p.badge}</span>
                    <h3 className="prize-card-title">{p.name}</h3>
                  </div>
                  <div className="prize-card-unit">
                    รางวัลละ {p.unit} ·{' '}
                    {p.id === 6
                      ? 'ประมาณ 100 รางวัล (หมุน 1 ครั้ง ตรงกับเลขท้าย 3 ตัว)'
                      : `จำนวน ${p.count} รางวัล`}
                  </div>
                </div>
                <div className="prize-chips">
                  {nums.length > 0 ? (
                    nums.map((n) => (
                      <span key={n} className={`prize-chip ${hit(p, n) ? 'hit' : ''}`}>
                        {p.digits === 3 ? `xxx${n}` : n}
                      </span>
                    ))
                  ) : (
                    <span className="prize-empty">
                      <AppIcon name="clock" size={14} /> รอผลการออกรางวัล
                    </span>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* ========================================================
            TERMS & CONDITIONS (เงื่อนไขและการรับรางวัล)
            ======================================================== */}
        <section className="conditions-section no-print">
          <div className="section-title-wrap">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AppIcon name="document" size={24} color="var(--orange-600)" /> เงื่อนไขและกำหนดเวลาการรับรางวัล
            </h2>
            <span className="title-line" />
            <p className="sub-meta">สลากกาชาดสมนาคุณ จัดพิมพ์ 99,999 ฉบับ ฉบับละ 100 บาท รวม 127 รางวัล</p>
          </div>

          <div className="conditions-grid">
            <div className="cond-card">
              <div className="cond-icon-box">
                <AppIcon name="ticket" size={22} />
              </div>
              <h4 className="cond-title">การจ่ายรางวัล</h4>
              <p className="cond-text">
                รางวัลจะจ่ายแก่ผู้ถือสลากฉบับจริงที่ถูกรางวัลนำมาขอรับเท่านั้น สลากที่ชำรุด ลบเลือน หรือแก้ไขจะไม่สามารถรับรางวัลได้
              </p>
            </div>

            <div className="cond-card">
              <div className="cond-icon-box">
                <AppIcon name="clock" size={22} />
              </div>
              <h4 className="cond-title">กำหนดเวลารับรางวัล</h4>
              <p className="cond-text">
                ต้องนำสลากมาขอรับรางวัล<strong>ภายใน 30 วัน</strong> นับแต่วันออกรางวัล (ตั้งแต่วันที่ 5 มกราคม ถึง 3 กุมภาพันธ์ 2570 ในวันและเวลาราชการ) หากพ้นกำหนดถือว่าสละสิทธิ์
              </p>
            </div>

            <div className="cond-card">
              <div className="cond-icon-box">
                <AppIcon name="building" size={22} />
              </div>
              <h4 className="cond-title">สถานที่ติดต่อรับรางวัล</h4>
              <p className="cond-text">
                สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ บริเวณศาลากลางจังหวัดศรีสะเกษ
                <br />
                โทรศัพท์: <a href="tel:045611591">045-611591</a>
              </p>
            </div>

            <div className="cond-card">
              <div className="cond-icon-box">
                <AppIcon name="heart" size={22} />
              </div>
              <h4 className="cond-title">เพื่อสาธารณกุศล</h4>
              <p className="cond-text">
                รายได้จากการจำหน่ายสลากทั้งหมด นำไปใช้ในกิจการสาธารณกุศล ช่วยเหลือผู้ประสบภัย ผู้ยากไร้ และผู้ด้อยโอกาสในจังหวัดศรีสะเกษ
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="no-print">
        <div>
          เหล่ากาชาดจังหวัดศรีสะเกษ · โทร. <a href="tel:045611591">045-611591</a> ·{' '}
          <a href="/admin">ระบบเจ้าหน้าที่</a>
        </div>
        <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>
          ผลบนเว็บไซต์นี้เพื่อความสะดวก ผลการออกรางวัลที่ประกาศ ณ สถานที่ออกรางวัลอย่างเป็นทางการเป็นเกณฑ์
        </div>
      </footer>
    </>
  );
}
