import './globals.css';

export const metadata = {
  title: 'ตรวจผลสลากกาชาด จังหวัดศรีสะเกษ 2570 | งานเทศกาลปีใหม่สี่เผ่าไท',
  description: 'ระบบตรวจผลสลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทศรีสะเกษ จังหวัดศรีสะเกษ ประจำปี 2570 ออกรางวัลวันจันทร์ที่ 4 มกราคม 2570',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ea580c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
