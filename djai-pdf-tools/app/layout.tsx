import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_PATH = "/tools/PDFTools";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "เครื่องมือ PDF ฟรี | DJTools by DJAI Academy",
  description: "รวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ และล็อก PDF ฟรีใน browser ไฟล์ไม่ถูก upload และไม่ต้องสมัครบัญชี",
  applicationName: "DJTools by DJAI Academy - Free PDF Tool Set",
  icons: {
    icon: `${BASE_PATH}/favicon.svg`
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
