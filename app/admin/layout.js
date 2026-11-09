'use client';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const [pw, setPw] = useState('');
  useEffect(() => setPw(sessionStorage.getItem('pw') || ''), []);

  return (
    <div className="wrap admin">
      <nav className="nav">
        <a href="/admin">📝 บันทึกผลรางวัล</a>
        <a href="/admin/customers">👥 ลูกค้า / สลากที่ขาย</a>
        <a href="/admin/winners">🏆 ผู้ถูกรางวัล</a>
        <a href="/" style={{ color: 'var(--orange-600)', marginLeft: 'auto' }}>
          ← กลับหน้าตรวจสลากประชาชน
        </a>
        <label style={{ marginLeft: 16 }}>
          🔑 รหัสผ่านเจ้าหน้าที่
          <input
            className="f"
            type="password"
            placeholder="รหัสผ่าน"
            value={pw}
            style={{ width: 140 }}
            onChange={(e) => {
              setPw(e.target.value);
              sessionStorage.setItem('pw', e.target.value);
            }}
          />
        </label>
      </nav>
      {children}
    </div>
  );
}
