// รางวัลตามเงื่อนไขสลากกาชาด ประจำปี 2570 (รวม 127 รางวัล, สลาก 99,999 ฉบับ)
export const PRIZES = [
  { id: 1, name: 'รถยนต์โตโยต้า ฟอร์จูนเนอร์ 2.4 LEADER G Plus', unit: '1 คัน', count: 2, digits: 5, iconKey: 'car', icon: '🚙', badge: 'รางวัลที่ 1' },
  { id: 2, name: 'ทองคำแท่ง น้ำหนัก 1 บาท', unit: '1 แท่ง', count: 3, digits: 5, iconKey: 'gold', icon: '🥇', badge: 'รางวัลที่ 2' },
  { id: 3, name: 'iPhone 16 Pro', unit: '1 เครื่อง', count: 3, digits: 5, iconKey: 'phone', icon: '📱', badge: 'รางวัลที่ 3' },
  { id: 4, name: 'รถจักรยานยนต์ Honda Wave', unit: '1 คัน', count: 5, digits: 5, iconKey: 'motorcycle', icon: '🏍️', badge: 'รางวัลที่ 4' },
  { id: 5, name: 'ตู้เย็น 2 ประตู ขนาด 7.4 คิว', unit: '1 เครื่อง', count: 10, digits: 5, iconKey: 'fridge', icon: '🧊', badge: 'รางวัลที่ 5' },
  { id: 6, name: 'พัดลมตั้งพื้น 16 นิ้ว (เลขท้าย 3 ตัว)', unit: '1 เครื่อง', count: 1, digits: 3, iconKey: 'fan', icon: '🌀', badge: 'รางวัลเลขท้าย 3 ตัว' },
];

export const SIDE_PRIZE = {
  id: 7,
  title: 'รางวัลข้างเคียงรางวัลที่ 1',
  name: 'ทองคำแท่ง น้ำหนัก 1 สลึง',
  unit: '1 แท่ง',
  count: 4,
  digits: 5,
  iconKey: 'sparkle',
  icon: '✨',
  badge: 'รางวัลข้างเคียง',
};

const pad = (n) => String(n).padStart(5, '0');

export function sideNumbers(first = []) {
  const firstList = (first || []).filter((s) => /^\d{5}$/.test(String(s).trim()));
  const firstSet = new Set(firstList.map((s) => String(s).trim()));
  const out = new Set();

  for (const s of firstSet) {
    const n = Number(s);
    // ถัดลง 1 หมายเลข (แบบวงล้อ 00000 -> 99999)
    const prev = n === 0 ? 99999 : n - 1;
    // ถัดขึ้น 1 หมายเลข (แบบวงล้อ 99999 -> 00000)
    const next = n === 99999 ? 0 : n + 1;

    out.add(pad(prev));
    out.add(pad(next));
  }

  // ไม่รวมหมายเลขที่ตรงกับรางวัลที่ 1 เอง
  for (const s of firstSet) {
    out.delete(s);
  }

  return Array.from(out).sort();
}

// แปลงเลขอารบิกหรือเลขไทยเป็นสตริงตัวเลขอารบิก
export function normalizeTicketNumber(str = '') {
  const thaiMap = { '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9' };
  return String(str)
    .replace(/[๐-๙]/g, (ch) => thaiMap[ch] || ch)
    .replace(/\D/g, '');
}

// คืนรายการรางวัลที่ตรงกับเลขสลาก 5 หลัก
export function checkTicket(results, rawTicket) {
  const ticket = normalizeTicketNumber(rawTicket);
  const wins = [];
  if (!ticket || ticket.length !== 5) return wins;

  for (const p of PRIZES) {
    for (const n of results?.[p.id] || []) {
      if (p.digits === 5 ? ticket === n : ticket.endsWith(n)) {
        wins.push({
          ...p,
          number: n,
          isSuffix: p.digits === 3,
          label: p.id === 6 ? 'รางวัลเลขท้าย 3 ตัว' : `รางวัลที่ ${p.id}`,
        });
      }
    }
  }

  const side = sideNumbers(results?.[1]);
  if (side.includes(ticket)) {
    wins.push({
      ...SIDE_PRIZE,
      number: ticket,
      isSide: true,
      label: 'รางวัลข้างเคียงรางวัลที่ 1',
    });
  }

  return wins;
}
