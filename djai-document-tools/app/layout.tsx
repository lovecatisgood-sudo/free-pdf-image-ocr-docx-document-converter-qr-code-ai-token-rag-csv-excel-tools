import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.djai.academy"),
  title: "DJAI Document Tools",
  description: "Free private browser tools for documents, AI context, OCR, CSV and spreadsheets.",
  icons: { icon: "/tools/djai-assets/djai-academy-logo-small.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        {children}
        {GA_ID ? <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </> : null}
      </body>
    </html>
  );
}
