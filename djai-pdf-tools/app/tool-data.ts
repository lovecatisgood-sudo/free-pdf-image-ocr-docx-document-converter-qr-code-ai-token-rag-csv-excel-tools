export const BASE_PATH = "/tools/PDFTools";
export const SITE_URL = `https://www.djai.academy${BASE_PATH}`;

export const toolSlugs = [
  "merge-pdf",
  "split-pdf",
  "compress-pdf",
  "images-to-pdf",
  "pdf-to-images",
  "rotate-pdf",
  "watermark-pdf",
  "protect-pdf",
  "organize-pdf",
  "add-page-numbers",
  "remove-pdf-metadata"
] as const;

export type ToolSlug = (typeof toolSlugs)[number];
export type Language = "th" | "en";

type ToolCopy = {
  label: string;
  title: string;
  short: string;
  description: string;
  keywords: string[];
};

export const toolCopy: Record<Language, Record<ToolSlug, ToolCopy>> = {
  th: {
    "merge-pdf": {
      label: "รวม PDF",
      title: "รวมไฟล์ PDF ฟรี",
      short: "รวม PDF หลายไฟล์ตามลำดับที่คุณต้องการ",
      description: "รวมไฟล์ PDF หลายไฟล์เป็นเอกสารเดียวผ่าน browser ฟรี ไม่ต้อง upload ไฟล์ ไม่ต้องสมัครบัญชี และไม่มี watermark",
      keywords: ["รวม PDF", "merge PDF", "รวมไฟล์ PDF ฟรี"]
    },
    "split-pdf": {
      label: "แยก PDF",
      title: "แยกหน้า PDF ออนไลน์ฟรี",
      short: "แยกตามช่วงหน้า ทุก N หน้า หรือเลือกเฉพาะหน้าที่ต้องการ",
      description: "แยก PDF ตามช่วงหน้า ดึงเฉพาะหน้าที่ต้องการ หรือแบ่งเอกสารทุก N หน้าได้ฟรี โดยไฟล์ไม่ออกจากอุปกรณ์ของคุณ",
      keywords: ["แยก PDF", "split PDF", "ดึงหน้า PDF"]
    },
    "compress-pdf": {
      label: "บีบอัด PDF",
      title: "บีบอัด PDF ลดขนาดไฟล์ฟรี",
      short: "ลดขนาด PDF ด้วยระดับ Light, Recommended หรือ Strong",
      description: "บีบอัด PDF และลดขนาดไฟล์ฟรีใน browser เลือกคุณภาพได้ 3 ระดับ พร้อมเปรียบเทียบขนาดก่อนดาวน์โหลด",
      keywords: ["บีบอัด PDF", "ลดขนาด PDF", "compress PDF"]
    },
    "images-to-pdf": {
      label: "รูปเป็น PDF",
      title: "แปลง JPG และ PNG เป็น PDF ฟรี",
      short: "รวมรูป JPG, PNG หรือ WebP เป็นไฟล์ PDF",
      description: "แปลง JPG, PNG และ WebP เป็น PDF ฟรี จัดลำดับรูป เลือกขนาดกระดาษและแนวหน้าได้โดยไม่ upload รูปขึ้น server",
      keywords: ["JPG เป็น PDF", "PNG เป็น PDF", "แปลงรูปเป็น PDF"]
    },
    "pdf-to-images": {
      label: "PDF เป็นรูป",
      title: "แปลง PDF เป็น JPG หรือ PNG ฟรี",
      short: "ส่งออกทุกหน้าเป็น JPG หรือ PNG และดาวน์โหลด ZIP",
      description: "แปลงทุกหน้า PDF เป็นรูป JPG หรือ PNG คุณภาพสูงฟรี ดาวน์โหลดไฟล์เดียวหรือ ZIP โดยประมวลผลใน browser",
      keywords: ["PDF เป็น JPG", "PDF เป็น PNG", "แปลง PDF เป็นรูป"]
    },
    "rotate-pdf": {
      label: "หมุน PDF",
      title: "หมุนหน้า PDF ออนไลน์ฟรี",
      short: "หมุนทุกหน้าหรือเฉพาะหน้าที่เลือก 90, 180 หรือ 270 องศา",
      description: "หมุนหน้า PDF ออนไลน์ฟรี เลือกหมุนทุกหน้าหรือระบุหน้าได้ ไฟล์เป็นส่วนตัวและไม่ถูก upload",
      keywords: ["หมุน PDF", "rotate PDF", "หมุนหน้า PDF"]
    },
    "watermark-pdf": {
      label: "ใส่ลายน้ำ",
      title: "ใส่ Watermark PDF ฟรี",
      short: "เพิ่มลายน้ำข้อความหรือรูปภาพ พร้อมปรับตำแหน่งและความโปร่งใส",
      description: "ใส่ watermark ข้อความภาษาไทย อังกฤษ หรือโลโก้ลงใน PDF ฟรี ปรับตำแหน่ง ขนาด และความโปร่งใสได้",
      keywords: ["ใส่ watermark PDF", "ลายน้ำ PDF", "ใส่โลโก้ PDF"]
    },
    "protect-pdf": {
      label: "ล็อก PDF",
      title: "ใส่รหัสผ่าน PDF ด้วย AES-256",
      short: "ป้องกัน PDF ด้วยรหัสผ่านและกำหนดสิทธิ์การใช้งาน",
      description: "ใส่รหัสผ่าน PDF ใน browser ด้วย AES-256 พร้อมกำหนดสิทธิ์พิมพ์ คัดลอก แก้ไข และกรอกฟอร์ม",
      keywords: ["ใส่รหัส PDF", "ล็อก PDF", "protect PDF"]
    },
    "organize-pdf": {
      label: "จัดหน้า PDF",
      title: "เรียงและลบหน้า PDF ฟรี",
      short: "กำหนดลำดับหน้าใหม่และตัดหน้าที่ไม่ต้องการออก",
      description: "เรียงหน้า PDF ใหม่หรือลบหน้าที่ไม่ต้องการใน browser ฟรี โดยระบุลำดับสุดท้าย เช่น 3, 1, 2, 5",
      keywords: ["เรียงหน้า PDF", "ลบหน้า PDF", "จัดหน้า PDF"]
    },
    "add-page-numbers": {
      label: "ใส่เลขหน้า",
      title: "ใส่เลขหน้า PDF ฟรี",
      short: "เพิ่มเลขหน้าด้านล่างหรือด้านบนพร้อมกำหนดเลขเริ่มต้น",
      description: "เพิ่มเลขหน้าให้ PDF ฟรี เลือกตำแหน่งและเลขเริ่มต้นได้ โดยไฟล์ประมวลผลใน browser",
      keywords: ["ใส่เลขหน้า PDF", "เพิ่มเลข PDF", "page number PDF"]
    },
    "remove-pdf-metadata": {
      label: "ลบ Metadata",
      title: "ลบ Metadata จาก PDF ฟรี",
      short: "ลบ title, author, subject, keywords และข้อมูลผู้สร้าง",
      description: "สร้างสำเนา PDF ที่ลบ metadata ระบุตัวตนออกแบบ private ใน browser โดยไม่ upload เอกสาร",
      keywords: ["ลบ metadata PDF", "ลบ author PDF", "PDF privacy"]
    }
  },
  en: {
    "merge-pdf": {
      label: "Merge PDF",
      title: "Merge PDF Files Online Free",
      short: "Combine multiple PDFs in the order you choose.",
      description: "Merge multiple PDF files into one document in your browser. Free, private, no sign-up, no uploads, and no watermark.",
      keywords: ["merge PDF free", "combine PDF files", "online PDF merger"]
    },
    "split-pdf": {
      label: "Split PDF",
      title: "Split PDF Pages Online Free",
      short: "Split by page range, every N pages, or extract selected pages.",
      description: "Split a PDF by ranges, extract selected pages, or divide a document every N pages. Free and processed locally in your browser.",
      keywords: ["split PDF free", "extract PDF pages", "PDF page splitter"]
    },
    "compress-pdf": {
      label: "Compress PDF",
      title: "Compress PDF and Reduce File Size Free",
      short: "Reduce PDF size with Light, Recommended, or Strong presets.",
      description: "Compress PDF files in your browser with three quality levels and compare the size before downloading. Free and private.",
      keywords: ["compress PDF free", "reduce PDF size", "make PDF smaller"]
    },
    "images-to-pdf": {
      label: "Images to PDF",
      title: "Convert JPG and PNG to PDF Free",
      short: "Turn JPG, PNG, or WebP images into one PDF.",
      description: "Convert JPG, PNG, and WebP images to PDF for free. Reorder images and choose page size and orientation without uploading files.",
      keywords: ["JPG to PDF", "PNG to PDF", "images to PDF free"]
    },
    "pdf-to-images": {
      label: "PDF to Images",
      title: "Convert PDF to JPG or PNG Free",
      short: "Export every PDF page as JPG or PNG and download a ZIP.",
      description: "Convert PDF pages to high-quality JPG or PNG images for free. Download one image or a ZIP, processed entirely in your browser.",
      keywords: ["PDF to JPG", "PDF to PNG", "convert PDF to images"]
    },
    "rotate-pdf": {
      label: "Rotate PDF",
      title: "Rotate PDF Pages Online Free",
      short: "Rotate all or selected pages by 90, 180, or 270 degrees.",
      description: "Rotate every PDF page or only selected pages online for free. Your document stays private and is never uploaded.",
      keywords: ["rotate PDF", "rotate PDF pages", "PDF rotator free"]
    },
    "watermark-pdf": {
      label: "Watermark PDF",
      title: "Add a Watermark to PDF Free",
      short: "Add text or image watermarks with position and opacity controls.",
      description: "Add a text, logo, or image watermark to a PDF for free. Control size, position, and opacity directly in your browser.",
      keywords: ["watermark PDF free", "add logo to PDF", "add text to PDF"]
    },
    "protect-pdf": {
      label: "Protect PDF",
      title: "Password Protect PDF with AES-256",
      short: "Secure a PDF with a password and document permissions.",
      description: "Password protect a PDF in your browser with AES-256 encryption and control printing, copying, editing, and form permissions.",
      keywords: ["password protect PDF", "lock PDF", "encrypt PDF AES-256"]
    },
    "organize-pdf": {
      label: "Organize PDF",
      title: "Reorder and Delete PDF Pages Free",
      short: "Choose a new page order and leave unwanted pages out.",
      description: "Reorder PDF pages or delete pages for free by entering the final order, such as 3, 1, 2, 5. Processing stays in your browser.",
      keywords: ["reorder PDF pages", "delete PDF pages", "organize PDF"]
    },
    "add-page-numbers": {
      label: "Add Page Numbers",
      title: "Add Page Numbers to PDF Free",
      short: "Number PDF pages at the top or bottom with a custom starting number.",
      description: "Add page numbers to a PDF for free with position and starting-number controls, processed privately in your browser.",
      keywords: ["add page numbers PDF", "number PDF pages", "PDF pagination"]
    },
    "remove-pdf-metadata": {
      label: "Remove Metadata",
      title: "Remove PDF Metadata Free",
      short: "Clear title, author, subject, keywords, and creator information.",
      description: "Create a privacy-safe PDF copy with identifying metadata removed locally in your browser.",
      keywords: ["remove PDF metadata", "remove PDF author", "PDF privacy tool"]
    }
  }
};

type ToolGuide = {
  title: string;
  intro: string;
  steps: [string, string, string];
};

export const toolGuides: Record<Language, Record<ToolSlug, ToolGuide>> = {
  th: {
    "merge-pdf": {
      title: "วิธีรวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียว",
      intro: "เหมาะสำหรับรวมใบเสนอราคา เอกสารสมัครงาน บทเรียน หรือรายงานหลายส่วน โดยคุณจัดลำดับไฟล์ก่อนสร้าง PDF ฉบับสุดท้ายได้",
      steps: ["เลือก PDF อย่างน้อยสองไฟล์", "ใช้ปุ่มลูกศรจัดลำดับเอกสาร", "กดประมวลผลแล้วดาวน์โหลด PDF ที่รวมแล้ว"]
    },
    "split-pdf": {
      title: "วิธีแยกหรือดึงหน้าจาก PDF",
      intro: "เลือกดึงบางหน้า แบ่งเป็นหลายช่วง หรือแยกทุก N หน้า เหมาะกับเอกสารยาวที่ต้องส่งเฉพาะส่วนให้ผู้รับ",
      steps: ["เลือก PDF ที่ต้องการแยก", "ระบุหน้า เช่น 1-3, 5 หรือแบ่งกลุ่มด้วย ;", "ดาวน์โหลด PDF หรือ ZIP ที่สร้างเสร็จ"]
    },
    "compress-pdf": {
      title: "วิธีบีบอัด PDF ให้มีขนาดเล็กลง",
      intro: "ใช้ Light เพื่อรักษาโครงสร้างเดิม หรือ Recommended และ Strong สำหรับ PDF ที่เน้นขนาดไฟล์เล็ก เช่นเอกสาร scan และไฟล์ส่งทางอีเมล",
      steps: ["เลือกไฟล์ PDF", "เลือกระดับ compression ตามคุณภาพที่ต้องการ", "เปรียบเทียบขนาดก่อนและหลังแล้วดาวน์โหลด"]
    },
    "images-to-pdf": {
      title: "วิธีแปลง JPG, PNG และ WebP เป็น PDF",
      intro: "รวมรูปถ่าย ใบเสร็จ หน้าเอกสาร หรือภาพงานออกแบบเป็น PDF เดียว พร้อมเลือก A4, Letter หรือขนาดตามรูปต้นฉบับ",
      steps: ["เลือกรูปและจัดลำดับ", "กำหนดขนาดและแนวกระดาษ", "สร้างและดาวน์โหลด PDF"]
    },
    "pdf-to-images": {
      title: "วิธีแปลงหน้า PDF เป็น JPG หรือ PNG",
      intro: "ส่งออกทุกหน้าเป็นรูปสำหรับ presentation, social post, preview หรือระบบที่ไม่รับ PDF หลายหน้าจะถูกจัดรวมเป็น ZIP อัตโนมัติ",
      steps: ["เลือก PDF", "เลือกรูปแบบ JPG หรือ PNG และความละเอียด", "ดาวน์โหลดรูปหรือ ZIP"]
    },
    "rotate-pdf": {
      title: "วิธีหมุนหน้า PDF ที่กลับด้าน",
      intro: "แก้เอกสาร scan หรือหน้าที่วางแนวผิดด้วยการหมุน 90, 180 หรือ 270 องศา โดยเลือกได้ว่าจะหมุนทุกหน้าหรือเฉพาะบางหน้า",
      steps: ["เลือกไฟล์ PDF", "เลือกองศาและระบุหน้าที่ต้องการ", "ประมวลผลแล้วดาวน์โหลด PDF ใหม่"]
    },
    "watermark-pdf": {
      title: "วิธีใส่ข้อความหรือโลโก้ Watermark ใน PDF",
      intro: "เพิ่มข้อความ confidential, draft, ชื่อบริษัท หรือโลโก้ลงบนทุกหน้าหรือหน้าที่เลือก พร้อมควบคุมตำแหน่ง ขนาด และความโปร่งใส",
      steps: ["เลือก PDF และประเภทลายน้ำ", "ตั้งค่าตำแหน่ง ขนาด และ opacity", "ตรวจการตั้งค่าแล้วสร้าง PDF ที่มีลายน้ำ"]
    },
    "protect-pdf": {
      title: "วิธีล็อก PDF ด้วยรหัสผ่าน AES-256",
      intro: "ป้องกันเอกสารสำคัญด้วยรหัสผ่านและกำหนดสิทธิ์การพิมพ์ copy แก้ไข และกรอก form รหัสผ่านไม่ถูกส่งหรือจัดเก็บโดย DJAI",
      steps: ["เลือก PDF และตั้งรหัสผ่านที่เดายาก", "กำหนดสิทธิ์ของผู้เปิดเอกสาร", "ดาวน์โหลด PDF ที่เข้ารหัสและเก็บรหัสผ่านให้ปลอดภัย"]
    },
    "organize-pdf": {
      title: "วิธีเรียงหรือลบหน้า PDF",
      intro: "ระบุลำดับหน้าสุดท้ายที่ต้องการ หน้าใดที่ไม่ระบุจะถูกตัดออกจากไฟล์ผลลัพธ์",
      steps: ["เลือกไฟล์ PDF", "ใส่ลำดับหน้า เช่น 3, 1-2, 5", "สร้างและดาวน์โหลด PDF ที่จัดหน้าแล้ว"]
    },
    "add-page-numbers": {
      title: "วิธีเพิ่มเลขหน้าใน PDF",
      intro: "เพิ่มเลขหน้าสำหรับรายงาน คู่มือ และเอกสารส่งงาน พร้อมเลือกตำแหน่งและเลขเริ่มต้น",
      steps: ["เลือกไฟล์ PDF", "เลือกตำแหน่งและเลขเริ่มต้น", "สร้างและดาวน์โหลด PDF ที่มีเลขหน้า"]
    },
    "remove-pdf-metadata": {
      title: "วิธีลบ Metadata จาก PDF",
      intro: "ลบข้อมูล title, author, subject, keywords, creator และ producer ก่อนแชร์เอกสาร",
      steps: ["เลือกไฟล์ PDF", "ตรวจคำอธิบายข้อมูลที่จะถูกลบ", "สร้างและดาวน์โหลดสำเนาที่ลบ metadata"]
    }
  },
  en: {
    "merge-pdf": {
      title: "How to merge multiple PDF files into one",
      intro: "Combine proposals, application documents, lessons, or report sections while keeping full control of the final file order.",
      steps: ["Select at least two PDF files", "Arrange the documents with the arrow controls", "Process and download the merged PDF"]
    },
    "split-pdf": {
      title: "How to split or extract pages from a PDF",
      intro: "Extract selected pages, create separate page groups, or divide a long document every N pages before sharing only what is needed.",
      steps: ["Select the PDF to split", "Enter pages such as 1-3, 5 or separate groups with semicolons", "Download the resulting PDF or ZIP"]
    },
    "compress-pdf": {
      title: "How to compress a PDF and reduce file size",
      intro: "Use Light to preserve document structure or Recommended and Strong for smaller scanned PDFs and email attachments.",
      steps: ["Select a PDF file", "Choose a compression level for your quality target", "Compare the sizes and download the result"]
    },
    "images-to-pdf": {
      title: "How to convert JPG, PNG, and WebP images to PDF",
      intro: "Combine photos, receipts, scanned pages, or design images into one PDF with automatic, A4, or Letter page sizing.",
      steps: ["Select and arrange your images", "Choose the page size and orientation", "Create and download the PDF"]
    },
    "pdf-to-images": {
      title: "How to convert PDF pages to JPG or PNG",
      intro: "Export PDF pages for presentations, social posts, previews, or systems that only accept images. Multi-page results download as a ZIP.",
      steps: ["Select a PDF", "Choose JPG or PNG and a resolution", "Download the image or ZIP file"]
    },
    "rotate-pdf": {
      title: "How to rotate sideways or upside-down PDF pages",
      intro: "Correct scanned pages with 90, 180, or 270 degree rotation and apply the change to every page or only selected pages.",
      steps: ["Select the PDF", "Choose an angle and optional page range", "Process and download the corrected PDF"]
    },
    "watermark-pdf": {
      title: "How to add a text or logo watermark to PDF",
      intro: "Add confidential, draft, company text, or a logo to all or selected pages while controlling position, scale, and opacity.",
      steps: ["Select a PDF and watermark type", "Set position, size, opacity, and pages", "Create and download the watermarked PDF"]
    },
    "protect-pdf": {
      title: "How to password protect a PDF with AES-256",
      intro: "Secure a sensitive document with a password and control printing, copying, editing, and form filling. DJAI never receives the password.",
      steps: ["Select a PDF and create a strong password", "Choose the permissions available to readers", "Download the encrypted PDF and store the password safely"]
    },
    "organize-pdf": {
      title: "How to reorder or delete PDF pages",
      intro: "Enter the final page sequence you need. Pages left out of the sequence are removed from the result.",
      steps: ["Select a PDF file", "Enter an order such as 3, 1-2, 5", "Create and download the organized PDF"]
    },
    "add-page-numbers": {
      title: "How to add page numbers to a PDF",
      intro: "Number reports, manuals, and submissions with a selected position and custom starting number.",
      steps: ["Select a PDF file", "Choose the position and starting number", "Create and download the numbered PDF"]
    },
    "remove-pdf-metadata": {
      title: "How to remove metadata from a PDF",
      intro: "Clear title, author, subject, keywords, creator, and producer details before sharing a document.",
      steps: ["Select a PDF file", "Review what information will be cleared", "Create and download the metadata-safe copy"]
    }
  }
};

export function toolHref(slug: ToolSlug, language: Language) {
  return `${BASE_PATH}/${slug}/${language === "en" ? "en/" : ""}`;
}

export function homeHref(language: Language) {
  return `${BASE_PATH}/${language === "en" ? "en/" : ""}`;
}
