import type { Metadata } from "next";

const BASE_PATH = "/tools/qrgen";

export const metadata: Metadata = {
  title: "Free QR Code Generator | DJayTools by DJAI Academy",
  description:
    "Create a free custom QR code in your browser. Generate PNG or SVG QR codes with no account, no watermark, and no expiry.",
  alternates: {
    canonical: `${BASE_PATH}/en/`,
    languages: {
      th: `${BASE_PATH}/`,
      en: `${BASE_PATH}/en/`,
    },
  },
  openGraph: {
    title: "Free QR Code Generator | DJayTools by DJAI Academy",
    description:
      "Create custom QR codes for websites, menus, profiles, and forms. Free PNG and SVG downloads with no sign-up.",
    url: `${BASE_PATH}/en/`,
    siteName: "DJAI Academy",
    images: [`${BASE_PATH}/djai-academy-logo.webp`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | DJayTools by DJAI Academy",
    description:
      "Create custom QR codes for websites, menus, profiles, and forms. Download PNG or SVG for free.",
    images: [`${BASE_PATH}/djai-academy-logo.webp`],
  },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
