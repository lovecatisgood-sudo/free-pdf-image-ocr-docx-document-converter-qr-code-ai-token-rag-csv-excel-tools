import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_PATH = "/tools/qrgen";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "สร้าง QR Code ฟรี | DJayTools by DJAI Academy",
  description:
    "สร้าง QR code ฟรีใน browser ดาวน์โหลดเป็น PNG หรือ SVG ได้ ไม่ต้องสมัครบัญชี ไม่มี watermark และไม่มีวันหมดอายุ",
  applicationName: "DJayTools Free QR Generator",
  alternates: {
    canonical: `${BASE_PATH}/`,
    languages: {
      th: `${BASE_PATH}/`,
      en: `${BASE_PATH}/en/`,
    },
  },
  openGraph: {
    title: "สร้าง QR Code ฟรี | DJayTools by DJAI Academy",
    description:
      "สร้าง QR code สำหรับเว็บไซต์ เมนู โปรไฟล์ และฟอร์ม ดาวน์โหลด PNG หรือ SVG ฟรี ไม่ต้องสมัครบัญชี",
    url: `${BASE_PATH}/`,
    siteName: "DJAI Academy",
    images: [`${BASE_PATH}/djai-academy-logo.webp`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "สร้าง QR Code ฟรี | DJayTools by DJAI Academy",
    description:
      "สร้าง QR code สำหรับเว็บไซต์ เมนู โปรไฟล์ และฟอร์ม ดาวน์โหลด PNG หรือ SVG ฟรี",
    images: [`${BASE_PATH}/djai-academy-logo.webp`],
  },
  icons: {
    icon: `${BASE_PATH}/favicon.svg`,
    shortcut: `${BASE_PATH}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
        {GA_ID ? <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </> : null}
      </body>
    </html>
  );
}
