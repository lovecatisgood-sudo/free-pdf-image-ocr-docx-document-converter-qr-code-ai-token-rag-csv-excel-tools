import type { Metadata } from "next";
import PdfToolsApp from "../PdfToolsApp";

export const metadata: Metadata = {
  title: "Free PDF Tools: Merge, Split, Compress and Convert PDF | DJTools",
  description: "Eight free browser PDF tools by DJAI Academy: merge, split, compress, convert, rotate, watermark, and protect PDF with AES-256.",
  keywords: ["free PDF tools", "merge PDF", "split PDF", "compress PDF", "convert PDF", "protect PDF"],
  alternates: {
    canonical: "/tools/PDFTools/en/",
    languages: {
      th: "/tools/PDFTools/",
      en: "/tools/PDFTools/en/",
      "x-default": "/tools/PDFTools/"
    }
  },
  openGraph: {
    title: "DJTools by DJAI - Free PDF Tool Set",
    description: "Private browser-based PDF tools. Free, no sign-up, no upload, and no watermark.",
    url: "/tools/PDFTools/en/",
    siteName: "DJAI Academy",
    images: ["/tools/PDFTools/djai-academy-logo.webp"],
    type: "website"
  }
};

export default function EnglishPdfToolsPage() {
  return <PdfToolsApp language="en" />;
}
