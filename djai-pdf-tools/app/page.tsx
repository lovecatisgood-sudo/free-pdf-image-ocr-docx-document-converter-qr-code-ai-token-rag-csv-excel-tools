import type { Metadata } from "next";
import PdfToolsApp from "./PdfToolsApp";

export const metadata: Metadata = {
  title: "เครื่องมือ PDF ฟรี: รวม แยก บีบอัด และแปลง PDF | DJTools",
  description: "เครื่องมือ PDF ฟรี 8 รายการจาก DJAI Academy รวม PDF แยก PDF บีบอัด แปลง JPG/PDF หมุน ใส่ลายน้ำ และล็อกด้วย AES-256",
  keywords: ["เครื่องมือ PDF ฟรี", "รวม PDF", "แยก PDF", "บีบอัด PDF", "แปลง PDF", "ล็อก PDF"],
  alternates: {
    canonical: "/tools/PDFTools/",
    languages: {
      th: "/tools/PDFTools/",
      en: "/tools/PDFTools/en/",
      "x-default": "/tools/PDFTools/"
    }
  },
  openGraph: {
    title: "DJTools by DJAI - เครื่องมือ PDF ฟรี",
    description: "จัดการ PDF แบบ private ใน browser ฟรี ไม่ต้องสมัครและไม่มี watermark",
    url: "/tools/PDFTools/",
    siteName: "DJAI Academy",
    images: ["/tools/PDFTools/djai-academy-logo.webp"],
    type: "website"
  }
};

export default function ThaiPdfToolsPage() {
  return <PdfToolsApp language="th" />;
}
