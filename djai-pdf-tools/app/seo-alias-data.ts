import type { PdfSeoPage } from "./PdfToolsApp";
import type { Language, ToolSlug } from "./tool-data";

export type PdfSeoAlias = {
  slug: string;
  tool: ToolSlug;
  keywords: Record<Language, string[]>;
  copy: Record<Language, PdfSeoPage>;
};

export const pdfSeoAliases: Record<"jpg-to-pdf" | "pdf-to-jpg", PdfSeoAlias> = {
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    tool: "images-to-pdf",
    keywords: {
      th: ["JPG เป็น PDF", "แปลง JPG เป็น PDF ฟรี", "รวมรูปเป็น PDF"],
      en: ["JPG to PDF free", "convert JPG to PDF", "combine JPG images into PDF"]
    },
    copy: {
      th: {
        slug: "jpg-to-pdf",
        label: "JPG เป็น PDF",
        title: "แปลง JPG เป็น PDF ออนไลน์ฟรี",
        short: "รวมรูป JPG หลายรูปเป็น PDF เดียว พร้อมจัดลำดับและเลือกขนาดกระดาษ",
        description: "แปลง JPG เป็น PDF ฟรีใน browser รวมรูปหลายไฟล์ จัดลำดับ เลือก A4 หรือ Letter โดยไม่ upload รูปขึ้น server",
        guide: {
          title: "วิธีแปลง JPG หลายรูปเป็น PDF",
          intro: "เหมาะกับการรวมใบเสร็จ รูปเอกสาร งานสมัคร หรือภาพหลายหน้าเป็น PDF เดียวที่ส่งต่อได้ง่าย",
          steps: ["เลือกรูป JPG หนึ่งไฟล์หรือหลายไฟล์", "จัดลำดับและเลือกขนาดกระดาษ", "สร้างและดาวน์โหลด PDF"]
        }
      },
      en: {
        slug: "jpg-to-pdf",
        label: "JPG to PDF",
        title: "Convert JPG to PDF Online Free",
        short: "Combine multiple JPG images into one PDF with page size and ordering controls.",
        description: "Convert JPG to PDF free in your browser. Combine and reorder images, choose A4 or Letter, and never upload files to a server.",
        guide: {
          title: "How to convert JPG images to PDF",
          intro: "Combine receipts, photographed documents, application pages, or image sets into one PDF that is easy to share.",
          steps: ["Choose one or more JPG images", "Arrange them and select a page size", "Create and download the PDF"]
        }
      }
    }
  },
  "pdf-to-jpg": {
    slug: "pdf-to-jpg",
    tool: "pdf-to-images",
    keywords: {
      th: ["PDF เป็น JPG", "แปลง PDF เป็นรูป", "PDF to JPG ฟรี"],
      en: ["PDF to JPG free", "convert PDF to images", "save PDF pages as JPG"]
    },
    copy: {
      th: {
        slug: "pdf-to-jpg",
        label: "PDF เป็น JPG",
        title: "แปลง PDF เป็น JPG ออนไลน์ฟรี",
        short: "ส่งออกทุกหน้า PDF เป็น JPG และดาวน์โหลดเป็นไฟล์เดียวหรือ ZIP",
        description: "แปลง PDF เป็น JPG ฟรี ส่งออกทุกหน้าเป็นรูปความละเอียดสูงและดาวน์โหลด ZIP โดยไฟล์ประมวลผลใน browser",
        guide: {
          title: "วิธีแปลงหน้า PDF เป็นรูป JPG",
          intro: "ใช้รูป JPG จาก PDF สำหรับ presentation, social media, preview หรือระบบที่ไม่รองรับเอกสาร PDF",
          steps: ["เลือกไฟล์ PDF", "เลือก JPG และระดับความละเอียด", "ดาวน์โหลดรูปหรือ ZIP"]
        }
      },
      en: {
        slug: "pdf-to-jpg",
        label: "PDF to JPG",
        title: "Convert PDF to JPG Online Free",
        short: "Export every PDF page as JPG and download one image or a ZIP archive.",
        description: "Convert PDF pages to high-quality JPG images free in your browser. Download a single image or ZIP without uploading the PDF.",
        guide: {
          title: "How to convert PDF pages to JPG",
          intro: "Create JPG images from a PDF for presentations, social media, previews, and systems that do not accept PDF documents.",
          steps: ["Choose a PDF file", "Select JPG and a resolution", "Download the image or ZIP archive"]
        }
      }
    }
  }
};

export function pdfAliasHref(alias: PdfSeoAlias, language: Language) {
  return `/tools/PDFTools/${alias.slug}/${language === "en" ? "en/" : ""}`;
}
