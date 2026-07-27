"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  Download,
  FileArchive,
  FileImage,
  FileLock2,
  Files,
  FileStack,
  GraduationCap,
  Hash,
  ImagePlus,
  ListOrdered,
  LoaderCircle,
  LockKeyhole,
  Menu,
  Minimize2,
  Tags,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  WandSparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { ProcessingOptions, ProcessResult } from "./pdf-actions";
import { BASE_PATH, SITE_URL, homeHref, toolCopy, toolGuides, toolHref, toolSlugs, type Language, type ToolSlug } from "./tool-data";

const icons: Record<ToolSlug, LucideIcon> = {
  "merge-pdf": Files,
  "split-pdf": FileStack,
  "compress-pdf": Minimize2,
  "images-to-pdf": ImagePlus,
  "pdf-to-images": FileImage,
  "rotate-pdf": RotateCw,
  "watermark-pdf": Sparkles,
  "protect-pdf": FileLock2,
  "organize-pdf": ListOrdered,
  "add-page-numbers": Hash,
  "remove-pdf-metadata": Tags
};

function linkedBuilderName(text: string, href: string) {
  return text.split("Siamese Cat Dev").map((part, index) => (
    <Fragment key={`${index}-${part.slice(0, 12)}`}>
      {index > 0 && <a className="siamese-dev-link" href={href}>Siamese Cat Dev</a>}
      {part}
    </Fragment>
  ));
}

const defaultOptions: ProcessingOptions = {
  splitMode: "extract",
  pageRanges: "1",
  everyPages: 1,
  compression: "recommended",
  imagePageSize: "a4",
  imageOrientation: "auto",
  imageFormat: "jpg",
  imageScale: 1.5,
  rotation: 90,
  selectedPages: "",
  watermarkType: "text",
  watermarkText: "CONFIDENTIAL",
  watermarkImage: null,
  watermarkOpacity: 28,
  watermarkPosition: "center",
  watermarkSize: 42,
  password: "",
  allowPrint: true,
  allowCopy: false,
  allowModify: false,
  allowForms: true,
  pageOrder: "1-3",
  pageNumberPosition: "bottom-center",
  pageNumberStart: 1
};

const ui = {
  th: {
    nav: { tools: "เครื่องมือทั้งหมด", course: "คอร์ส Vibe Coding", development: "พัฒนาเว็บไซต์", blog: "บทความ", language: "EN" },
    heroEyebrow: "DJTools by DJAI Academy",
    heroTitle: "เครื่องมือ PDF ระดับมืออาชีพ ใช้ฟรีทุกคน",
    heroText: "รวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ และป้องกัน PDF โดยไฟล์ทำงานใน browser และไม่ออกจากอุปกรณ์ของคุณ",
    heroButton: "เริ่มใช้เครื่องมือฟรี",
    trust: ["ฟรี 100%", "ไม่ต้องสมัคร", "ไม่มี watermark", "ประมวลผลในอุปกรณ์"],
    allTools: "11 เครื่องมือ PDF ที่ใช้งานได้จริง",
    allToolsText: "เลือกงานที่ต้องการ ไฟล์จะถูกประมวลผลใน browser โดยไม่ส่งขึ้น server",
    open: "เปิดเครื่องมือ",
    workspace: "พื้นที่ทำงาน",
    uploadTitle: "วางไฟล์ที่นี่",
    uploadPdf: "เลือก PDF",
    uploadImages: "เลือกรูปภาพ",
    uploadHint: "รองรับไฟล์สูงสุด 100 MB ต่อไฟล์",
    files: "ไฟล์ที่เลือก",
    settings: "ตั้งค่าผลลัพธ์",
    process: "ประมวลผลไฟล์",
    processing: "กำลังประมวลผลใน browser...",
    clear: "เริ่มใหม่",
    resultTitle: "ไฟล์ของคุณพร้อมแล้ว",
    resultText: "ประมวลผลเสร็จบนอุปกรณ์นี้ และไม่มีไฟล์ถูกส่งไปยัง server",
    download: "ดาวน์โหลดไฟล์",
    original: "ไฟล์ต้นฉบับ",
    result: "ไฟล์ผลลัพธ์",
    items: "รายการ",
    continue: "ทำงานต่อด้วยเครื่องมืออื่น",
    privacyTitle: "Private by design",
    privacyText: "PDF รูปภาพ และรหัสผ่านของคุณทำงานใน memory ของ browser เท่านั้น DJAI และ Siamese Cat Dev ไม่ได้รับ จัดเก็บ หรือดูไฟล์เหล่านี้ ข้อมูลจะหายเมื่อปิดหรือ refresh หน้า",
    devEyebrow: "จากงานเอกสารสู่ระบบธุรกิจ",
    devTitle: "ต้องการ portal เอกสารหรือ workflow สำหรับบริษัท?",
    devText: "DJAI และ Siamese Cat Dev พัฒนาเว็บไซต์ web application ระบบจัดการเอกสาร CRM automation และ AI workflow ที่เหมาะกับกระบวนการจริงของธุรกิจ",
    devButton: "คุยเรื่องพัฒนาเว็บไซต์",
    portfolioButton: "ดูผลงาน",
    courseEyebrow: "สร้างเครื่องมือของคุณเอง",
    courseTitle: "เรียน Vibe Coding แล้วเปลี่ยน workflow ให้เป็น product",
    courseText: "เรียนกระบวนการตั้งแต่ idea, plan, build ไปจนถึง launch เว็บไซต์ application และ automation ด้วย AI",
    courseButton: "สำรวจคอร์ส",
    builderEyebrow: "Built with intention by",
    builderTitle: "Siamese Cat Dev",
    builderText: "Created with intention by Siamese Cat Dev. Siamese Cat Dev is a product designer, project manager, and software development partner with nearly 10 years of experience building digital products for real businesses. He is also a student at DJAI Academy and a development/training partner who helps transform ideas into usable products.",
    builderLink: "รู้จักผู้พัฒนา",
    seoTitle: "เครื่องมือ PDF ฟรีที่ให้ความสำคัญกับ privacy",
    seoText: "DJTools ช่วยจัดการเอกสารทั่วไปโดยไม่ต้องติดตั้งโปรแกรมหรือสร้างบัญชี เหมาะกับนักเรียน ผู้สอน freelancer ธุรกิจขนาดเล็ก และทีมที่ไม่ต้องการส่งเอกสารให้ conversion server ภายนอก",
    faqTitle: "คำถามเกี่ยวกับ DJTools PDF",
    faq: [
      ["เครื่องมือ PDF นี้ฟรีจริงหรือไม่?", "ฟรีสำหรับ core tools ทั้งหมด ไม่ต้องสมัคร ไม่มี watermark และไม่มีค่าใช้จ่ายหลังดาวน์โหลด"],
      ["ไฟล์ PDF ถูก upload ไปที่ไหน?", "ไฟล์ไม่ถูก upload ไปยัง DJAI การอ่าน แก้ไข และสร้างผลลัพธ์เกิดขึ้นใน browser บนอุปกรณ์ของคุณ"],
      ["บีบอัด PDF แล้วคุณภาพจะลดลงหรือไม่?", "Light รักษาโครงสร้างเดิม ส่วน Recommended และ Strong จะ render หน้าใหม่เพื่อลดขนาด จึงอาจทำให้ข้อความค้นหาไม่ได้และ interactive form ถูก flatten"],
      ["ใช้บนโทรศัพท์ได้หรือไม่?", "ใช้ได้ใน browser รุ่นใหม่ แต่ PDF ขนาดใหญ่หรือหลายร้อยหน้าเหมาะกับคอมพิวเตอร์ที่มี memory มากกว่า"]
    ],
    footerPrivacy: "Privacy-first PDF tools",
    copyright: "DJTools by DJAI Academy"
  },
  en: {
    nav: { tools: "All tools", course: "Vibe Coding course", development: "Web development", blog: "Blog", language: "ไทย" },
    heroEyebrow: "DJTools by DJAI Academy",
    heroTitle: "Professional PDF tools, completely free",
    heroText: "Merge, split, compress, convert, rotate, watermark, and protect PDFs in your browser. Your files never leave your device.",
    heroButton: "Start using tools for free",
    trust: ["100% free", "No sign-up", "No watermark", "On-device processing"],
    allTools: "Eleven practical PDF tools",
    allToolsText: "Choose a task. Your files are processed locally in the browser and are never sent to a server.",
    open: "Open tool",
    workspace: "PDF workspace",
    uploadTitle: "Drop your files here",
    uploadPdf: "Select PDF",
    uploadImages: "Select images",
    uploadHint: "Up to 100 MB per file",
    files: "Selected files",
    settings: "Output settings",
    process: "Process files",
    processing: "Processing in your browser...",
    clear: "Start over",
    resultTitle: "Your file is ready",
    resultText: "Processing finished on this device. No file was sent to a server.",
    download: "Download file",
    original: "Original",
    result: "Result",
    items: "Items",
    continue: "Continue with another tool",
    privacyTitle: "Private by design",
    privacyText: "Your PDFs, images, and passwords exist only in your browser memory. DJAI and Siamese Cat Dev do not receive, store, or view them. The data disappears when you close or refresh this page.",
    devEyebrow: "From documents to business systems",
    devTitle: "Need a document portal or workflow for your company?",
    devText: "DJAI and Siamese Cat Dev build websites, web applications, document systems, CRM platforms, automation, and AI workflows around real business processes.",
    devButton: "Discuss web development",
    portfolioButton: "View our work",
    courseEyebrow: "Build your own tool",
    courseTitle: "Learn Vibe Coding and turn a workflow into a product",
    courseText: "Learn the path from idea and planning to building and launching websites, applications, and automation with AI.",
    courseButton: "Explore the course",
    builderEyebrow: "Built with intention by",
    builderTitle: "Siamese Cat Dev",
    builderText: "Created with intention by Siamese Cat Dev. Siamese Cat Dev is a product designer, project manager, and software development partner with nearly 10 years of experience building digital products for real businesses. He is also a student at DJAI Academy and a development/training partner who helps transform ideas into usable products.",
    builderLink: "Meet the builder",
    seoTitle: "Free PDF tools built around privacy",
    seoText: "DJTools handles everyday document tasks without installing software or creating an account. It is designed for students, educators, freelancers, small businesses, and teams that do not want to send documents to an external conversion server.",
    faqTitle: "Questions about DJTools PDF",
    faq: [
      ["Are these PDF tools really free?", "Yes. All core tools are free, with no account, watermark, or charge after processing."],
      ["Where are my PDF files uploaded?", "Nowhere. Reading, editing, and creating the result happens in your browser on your device."],
      ["Does PDF compression reduce quality?", "Light keeps the document structure. Recommended and Strong render new pages to reduce size, which can flatten forms and make text non-searchable."],
      ["Can I use the tools on a phone?", "Yes, in a modern browser. Very large PDFs or documents with hundreds of pages work better on a computer with more memory."]
    ],
    footerPrivacy: "Privacy-first PDF tools",
    copyright: "DJTools by DJAI Academy"
  }
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function Segmented<T extends string | number>({ values, value, onChange }: {
  values: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="segmented">
      {values.map((item) => (
        <button type="button" className={item.value === value ? "active" : ""} onClick={() => onChange(item.value)} key={item.value}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ToolSettings({ tool, language, options, update }: {
  tool: ToolSlug;
  language: Language;
  options: ProcessingOptions;
  update: <K extends keyof ProcessingOptions>(key: K, value: ProcessingOptions[K]) => void;
}) {
  const en = language === "en";
  if (tool === "merge-pdf") return <p className="setting-note">{en ? "Use the arrow buttons to arrange PDFs before merging." : "ใช้ปุ่มลูกศรเพื่อจัดลำดับ PDF ก่อนรวมไฟล์"}</p>;
  if (tool === "split-pdf") return (
    <>
      <label>{en ? "Split method" : "วิธีแยกไฟล์"}</label>
      <Segmented values={[
        { value: "extract", label: en ? "Extract pages" : "ดึงหน้า" },
        { value: "ranges", label: en ? "Page groups" : "แบ่งช่วง" },
        { value: "every", label: en ? "Every N pages" : "ทุก N หน้า" }
      ]} value={options.splitMode} onChange={(value) => update("splitMode", value)} />
      {options.splitMode === "every" ? (
        <label className="field-label">{en ? "Pages per file" : "จำนวนหน้าต่อไฟล์"}<input type="number" min="1" value={options.everyPages} onChange={(event) => update("everyPages", Number(event.target.value))} /></label>
      ) : (
        <label className="field-label">{options.splitMode === "ranges" ? (en ? "Groups separated by semicolons" : "แยกแต่ละกลุ่มด้วย ;") : (en ? "Pages to extract" : "หน้าที่ต้องการดึง")}
          <input value={options.pageRanges} onChange={(event) => update("pageRanges", event.target.value)} placeholder={options.splitMode === "ranges" ? "1-3; 4-6; 8" : "1-3, 5, 8"} />
        </label>
      )}
    </>
  );
  if (tool === "compress-pdf") return (
    <>
      <label>{en ? "Compression level" : "ระดับการบีบอัด"}</label>
      <Segmented values={[
        { value: "light", label: "Light" },
        { value: "recommended", label: en ? "Recommended" : "แนะนำ" },
        { value: "strong", label: "Strong" }
      ]} value={options.compression} onChange={(value) => update("compression", value)} />
      <p className="setting-note warning">{options.compression === "light"
        ? (en ? "Lossless structure optimization. Savings depend on the source PDF." : "ปรับโครงสร้างโดยไม่ลดคุณภาพ ขนาดที่ลดได้ขึ้นอยู่กับไฟล์ต้นฉบับ")
        : (en ? "Pages are flattened as images for smaller files. Links, forms, and searchable text may be lost." : "หน้า PDF จะถูก flatten เป็นรูปเพื่อลดขนาด link, form และข้อความที่ค้นหาได้อาจหายไป")}</p>
    </>
  );
  if (tool === "images-to-pdf") return (
    <div className="setting-grid">
      <label className="field-label">{en ? "Page size" : "ขนาดกระดาษ"}<select value={options.imagePageSize} onChange={(event) => update("imagePageSize", event.target.value as ProcessingOptions["imagePageSize"])}><option value="auto">Auto</option><option value="a4">A4</option><option value="letter">Letter</option></select></label>
      <label className="field-label">{en ? "Orientation" : "แนวกระดาษ"}<select value={options.imageOrientation} onChange={(event) => update("imageOrientation", event.target.value as ProcessingOptions["imageOrientation"])}><option value="auto">Auto</option><option value="portrait">{en ? "Portrait" : "แนวตั้ง"}</option><option value="landscape">{en ? "Landscape" : "แนวนอน"}</option></select></label>
    </div>
  );
  if (tool === "pdf-to-images") return (
    <div className="setting-grid">
      <div><label>{en ? "Image format" : "รูปแบบไฟล์"}</label><Segmented values={[{ value: "jpg", label: "JPG" }, { value: "png", label: "PNG" }]} value={options.imageFormat} onChange={(value) => update("imageFormat", value)} /></div>
      <label className="field-label">{en ? "Resolution" : "ความละเอียด"}<select value={options.imageScale} onChange={(event) => update("imageScale", Number(event.target.value))}><option value="1">Standard</option><option value="1.5">High</option><option value="2">Very high</option></select></label>
    </div>
  );
  if (tool === "rotate-pdf") return (
    <>
      <label>{en ? "Rotate clockwise" : "หมุนตามเข็มนาฬิกา"}</label>
      <Segmented values={[{ value: 90, label: "90°" }, { value: 180, label: "180°" }, { value: 270, label: "270°" }]} value={options.rotation} onChange={(value) => update("rotation", value)} />
      <label className="field-label">{en ? "Pages (leave blank for all)" : "ระบุหน้า (เว้นว่างเพื่อหมุนทุกหน้า)"}<input value={options.selectedPages} onChange={(event) => update("selectedPages", event.target.value)} placeholder="1-3, 5" /></label>
    </>
  );
  if (tool === "organize-pdf") return (
    <>
      <label className="field-label">{en ? "Final page order" : "ลำดับหน้าสุดท้าย"}<input value={options.pageOrder} onChange={(event) => update("pageOrder", event.target.value)} placeholder="3, 1-2, 5" /></label>
      <p className="setting-note warning">{en ? "Pages left out are removed. You can repeat a page if a duplicate is needed." : "หน้าที่ไม่ระบุจะถูกลบ และสามารถระบุหน้าเดิมซ้ำเพื่อทำสำเนาได้"}</p>
    </>
  );
  if (tool === "add-page-numbers") return (
    <div className="setting-grid">
      <label className="field-label">{en ? "Position" : "ตำแหน่ง"}<select value={options.pageNumberPosition} onChange={(event) => update("pageNumberPosition", event.target.value as ProcessingOptions["pageNumberPosition"])}><option value="bottom-left">{en ? "Bottom left" : "ล่างซ้าย"}</option><option value="bottom-center">{en ? "Bottom center" : "ล่างกลาง"}</option><option value="bottom-right">{en ? "Bottom right" : "ล่างขวา"}</option><option value="top-left">{en ? "Top left" : "บนซ้าย"}</option><option value="top-center">{en ? "Top center" : "บนกลาง"}</option><option value="top-right">{en ? "Top right" : "บนขวา"}</option></select></label>
      <label className="field-label">{en ? "Start at" : "เริ่มที่เลข"}<input type="number" min="0" value={options.pageNumberStart} onChange={(event) => update("pageNumberStart", Number(event.target.value))} /></label>
    </div>
  );
  if (tool === "remove-pdf-metadata") return <p className="setting-note warning">{en ? "This clears title, author, subject, keywords, creator, producer, and document dates. Page content is not changed." : "ระบบจะลบ title, author, subject, keywords, creator, producer และวันที่ของเอกสาร โดยไม่เปลี่ยนเนื้อหาในหน้า"}</p>;
  if (tool === "watermark-pdf") return (
    <>
      <label>{en ? "Watermark type" : "ประเภทลายน้ำ"}</label>
      <Segmented values={[{ value: "text", label: en ? "Text" : "ข้อความ" }, { value: "image", label: en ? "Image" : "รูปภาพ" }]} value={options.watermarkType} onChange={(value) => update("watermarkType", value)} />
      {options.watermarkType === "text" ? (
        <label className="field-label">{en ? "Watermark text" : "ข้อความลายน้ำ"}<input value={options.watermarkText} onChange={(event) => update("watermarkText", event.target.value)} /></label>
      ) : (
        <label className="field-label">{en ? "PNG or JPG logo" : "โลโก้ PNG หรือ JPG"}<input type="file" accept="image/png,image/jpeg" onChange={(event) => update("watermarkImage", event.target.files?.[0] || null)} /></label>
      )}
      <div className="setting-grid">
        <label className="field-label">{en ? "Position" : "ตำแหน่ง"}<select value={options.watermarkPosition} onChange={(event) => update("watermarkPosition", event.target.value as ProcessingOptions["watermarkPosition"])}><option value="center">{en ? "Center" : "กลาง"}</option><option value="top-left">{en ? "Top left" : "ซ้ายบน"}</option><option value="top-right">{en ? "Top right" : "ขวาบน"}</option><option value="bottom-left">{en ? "Bottom left" : "ซ้ายล่าง"}</option><option value="bottom-right">{en ? "Bottom right" : "ขวาล่าง"}</option></select></label>
        <label className="range-label">{en ? "Opacity" : "ความโปร่งใส"} <strong>{options.watermarkOpacity}%</strong><input type="range" min="5" max="100" value={options.watermarkOpacity} onChange={(event) => update("watermarkOpacity", Number(event.target.value))} /></label>
        <label className="range-label">{en ? "Width" : "ความกว้าง"} <strong>{options.watermarkSize}%</strong><input type="range" min="10" max="85" value={options.watermarkSize} onChange={(event) => update("watermarkSize", Number(event.target.value))} /></label>
        <label className="field-label">{en ? "Pages (blank for all)" : "ระบุหน้า (ว่าง = ทุกหน้า)"}<input value={options.selectedPages} onChange={(event) => update("selectedPages", event.target.value)} placeholder="1-3, 5" /></label>
      </div>
    </>
  );
  return (
    <>
      <label className="field-label">{en ? "Password" : "รหัสผ่าน"}<input type="password" autoComplete="new-password" value={options.password} onChange={(event) => update("password", event.target.value)} minLength={8} /></label>
      <p className="setting-note"><LockKeyhole size={15} /> AES-256 · {en ? "Keep this password safe. DJAI cannot recover it." : "เก็บรหัสผ่านให้ปลอดภัย DJAI ไม่สามารถกู้คืนได้"}</p>
      <div className="permission-grid">
        {([
          ["allowPrint", en ? "Allow printing" : "อนุญาตให้พิมพ์"],
          ["allowCopy", en ? "Allow copying" : "อนุญาตให้ copy"],
          ["allowModify", en ? "Allow editing" : "อนุญาตให้แก้ไข"],
          ["allowForms", en ? "Allow form filling" : "อนุญาตให้กรอก form"]
        ] as Array<[keyof ProcessingOptions, string]>).map(([key, label]) => (
          <label className="check-label" key={key}><input type="checkbox" checked={Boolean(options[key])} onChange={(event) => update(key, event.target.checked as never)} /> <span><Check size={14} /></span>{label}</label>
        ))}
      </div>
    </>
  );
}

export type PdfSeoPage = {
  slug: string;
  label: string;
  title: string;
  short: string;
  description: string;
  guide: { title: string; intro: string; steps: [string, string, string] };
};

export default function PdfToolsApp({ language, initialTool, seoPage }: { language: Language; initialTool?: ToolSlug; seoPage?: PdfSeoPage }) {
  const copy = ui[language];
  const en = language === "en";
  const devHref = en ? "https://www.djai.academy/siamese_cat/dev/en/" : "https://www.djai.academy/siamese_cat/dev/";
  const activeTool = initialTool || "merge-pdf";
  const activeCopy = seoPage || toolCopy[language][activeTool];
  const activeGuide = seoPage?.guide || toolGuides[language][activeTool];
  const ActiveIcon = icons[activeTool];
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState(defaultOptions);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<(ProcessResult & { url: string; originalSize: number }) | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const isImageInput = activeTool === "images-to-pdf";
  const allowsMultiple = activeTool === "merge-pdf" || activeTool === "images-to-pdf";
  const accept = isImageInput ? "image/jpeg,image/png,image/webp" : "application/pdf,.pdf";
  const related = useMemo(() => toolSlugs.filter((slug) => slug !== activeTool).slice(0, 4), [activeTool]);

  useEffect(() => () => {
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [result]);

  function updateOption<K extends keyof ProcessingOptions>(key: K, value: ProcessingOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  function addFiles(incoming: FileList | File[]) {
    const selected = Array.from(incoming).filter((file) => isImageInput ? file.type.startsWith("image/") : (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")));
    setError("");
    setResult(null);
    setFiles((current) => allowsMultiple ? [...current, ...selected] : selected.slice(0, 1));
  }

  function moveFile(index: number, offset: number) {
    setFiles((current) => {
      const next = [...current];
      const target = index + offset;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function clearWorkspace() {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setError("");
    setOptions(defaultOptions);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function run() {
    setError("");
    if (activeTool === "protect-pdf" && options.password.length < 8) {
      setError(en ? "Use a password with at least 8 characters." : "กรุณาใช้รหัสผ่านอย่างน้อย 8 ตัวอักษร");
      return;
    }
    setProcessing(true);
    try {
      const { processFiles } = await import("./pdf-actions");
      const processed = await processFiles(activeTool, files, options);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ ...processed, url: URL.createObjectURL(processed.blob), originalSize: files.reduce((sum, file) => sum + file.size, 0) });
      window.setTimeout(() => document.getElementById("pdf-result")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to process this file.";
      setError(message);
    } finally {
      setProcessing(false);
    }
  }

  const publicSlug = seoPage?.slug || initialTool;
  const canonical = publicSlug ? `${SITE_URL}/${publicSlug}/${en ? "en/" : ""}` : `${SITE_URL}/${en ? "en/" : ""}`;
  const languageHref = seoPage
    ? `${BASE_PATH}/${seoPage.slug}/${en ? "" : "en/"}`
    : initialTool ? toolHref(initialTool, en ? "th" : "en") : homeHref(en ? "th" : "en");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: initialTool ? activeCopy.title : "DJTools by DJAI Academy - Free PDF Tool Set",
      url: canonical,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web browser",
      description: initialTool ? activeCopy.description : copy.heroText,
      featureList: toolSlugs.map((slug) => toolCopy[language][slug].label),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "DJAI Academy", url: en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" },
        { "@type": "ListItem", position: 2, name: en ? "Free Tools" : "เครื่องมือฟรี", item: en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" },
        { "@type": "ListItem", position: 3, name: initialTool ? activeCopy.title : "DJTools PDF", item: canonical }
      ]
    },
    ...(initialTool ? [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: activeGuide.title,
      description: activeGuide.intro,
      totalTime: "PT2M",
      step: activeGuide.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, name: text, text }))
    }] : [])
  ];

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header">
        <a className="brand" href={homeHref(language)} aria-label="DJTools by DJAI Academy">
          <Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy" width={114} height={61} loading="eager" unoptimized />
          <span><strong>DJTools</strong><small>PDF · by DJAI Academy</small></span>
        </a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <a className="active" href={homeHref(language)}>PDF</a>
          <a href={en ? "https://www.djai.academy/tools/resizeimg/en/" : "https://www.djai.academy/tools/resizeimg/"}>{en ? "Image" : "รูปภาพ"}</a>
          <a href={en ? "https://www.djai.academy/tools/document/en/" : "https://www.djai.academy/tools/document/"}>{en ? "Document" : "เอกสาร"}</a>
          <a href={en ? "https://www.djai.academy/tools/ai/en/" : "https://www.djai.academy/tools/ai/"}>AI</a>
          <a href={en ? "https://www.djai.academy/tools/spreadsheet/en/" : "https://www.djai.academy/tools/spreadsheet/"}>{en ? "Spreadsheet" : "ตารางข้อมูล"}</a>
          <a href={en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/"}>{copy.nav.tools}</a>
          <a className="language-link" href={languageHref} hrefLang={en ? "th" : "en"}>{copy.nav.language}</a>
        </nav>
      </header>

      <section className={`hero ${initialTool ? "tool-hero" : ""}`}>
        <div className="hero-content">
          {initialTool && <a className="back-link" href={homeHref(language)}><ArrowLeft size={17} /> {copy.nav.tools}</a>}
          <p className="eyebrow">{initialTool ? activeCopy.label : copy.heroEyebrow}</p>
          <h1>{initialTool ? activeCopy.title : copy.heroTitle}</h1>
          <p>{initialTool ? activeCopy.description : copy.heroText}</p>
          <a className="primary-button" href="#workspace">{copy.heroButton}<ArrowDown size={19} /></a>
        </div>
        <div className="hero-visual" aria-label="DJTools PDF workflow">
          <div className="logo-stage"><Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy logo" width={192} height={103} loading="eager" unoptimized /><strong>DJTools</strong><span>Free PDF Tool Set</span></div>
          <div className="file-sheet sheet-back"><span>PDF</span></div>
          <div className="file-sheet sheet-front"><FileArchive size={48} /><strong>{initialTool ? activeCopy.label : "PDF"}</strong><small>PRIVATE · FREE</small></div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Product promises">
        {copy.trust.map((item, index) => <div key={item}>{index === 3 ? <ShieldCheck /> : <Check />}<span>{item}</span></div>)}
      </section>

      {!initialTool && (
        <section className="tools-section" id="tools">
          <div className="section-heading"><p className="eyebrow">PDF TOOLKIT</p><h2>{copy.allTools}</h2><p>{copy.allToolsText}</p></div>
          <div className="tools-grid">
            {toolSlugs.map((slug, index) => {
              const Icon = icons[slug];
              const item = toolCopy[language][slug];
              return <a className={`tool-card accent-${index % 4}`} href={toolHref(slug, language)} key={slug}><span className="tool-icon"><Icon /></span><div><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.label}</h3><p>{item.short}</p></div><strong>{copy.open}<ArrowRight size={16} /></strong></a>;
            })}
          </div>
        </section>
      )}

      <section className="workspace-section" id="workspace">
        <div className="workspace-heading"><span className="tool-icon"><ActiveIcon /></span><div><p className="eyebrow">{copy.workspace}</p><h2>{activeCopy.title}</h2><p>{activeCopy.short}</p></div></div>
        <div className="workspace-card">
          <div className="upload-column">
            <button
              type="button"
              className={`drop-zone ${dragging ? "dragging" : ""}`}
              onClick={() => fileInput.current?.click()}
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}
            >
              <span><Upload /></span><strong>{copy.uploadTitle}</strong><small>{isImageInput ? "JPG · PNG · WebP" : "PDF"} · {copy.uploadHint}</small><b>{isImageInput ? copy.uploadImages : copy.uploadPdf}</b>
            </button>
            <input ref={fileInput} className="visually-hidden" type="file" accept={accept} multiple={allowsMultiple} onChange={(event) => event.target.files && addFiles(event.target.files)} />
            {files.length > 0 && <div className="file-list"><div className="file-list-title"><strong>{copy.files}</strong><span>{files.length}</span></div>{files.map((file, index) => <div className="file-row" key={`${file.name}-${file.lastModified}-${index}`}><span className="file-type">{isImageInput ? <FileImage /> : <FileArchive />}</span><div><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></div>{allowsMultiple && <div className="file-order"><button type="button" aria-label="Move up" title="Move up" onClick={() => moveFile(index, -1)} disabled={index === 0}><ArrowUp /></button><button type="button" aria-label="Move down" title="Move down" onClick={() => moveFile(index, 1)} disabled={index === files.length - 1}><ArrowDown /></button></div>}<button className="remove-file" type="button" aria-label="Remove file" title="Remove file" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 /></button></div>)}</div>}
          </div>
          <div className="settings-column">
            <div className="settings-title"><span>{copy.settings}</span><ShieldCheck size={18} /></div>
            <ToolSettings tool={activeTool} language={language} options={options} update={updateOption} />
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="process-button" type="button" onClick={run} disabled={processing || !files.length}>{processing ? <LoaderCircle className="spin" /> : <WandSparkles />}<span>{processing ? copy.processing : copy.process}</span><ArrowRight /></button>
            <button className="clear-button" type="button" onClick={clearWorkspace}>{copy.clear}</button>
          </div>
        </div>
      </section>

      {result && (
        <section className="result-section" id="pdf-result" aria-live="polite">
          <div className="success-mark"><Check /></div><p className="eyebrow">SUCCESS</p><h2>{copy.resultTitle}</h2><p>{copy.resultText}</p>
          <div className="result-stats"><div><span>{copy.original}</span><strong>{formatBytes(result.originalSize)}</strong></div><div><span>{copy.result}</span><strong>{formatBytes(result.blob.size)}</strong></div><div><span>{copy.items}</span><strong>{result.itemCount}</strong></div>{result.note && <div><span>MODE</span><strong>{result.note}</strong></div>}</div>
          <a className="download-button" href={result.url} download={result.fileName}><Download />{copy.download}</a>
          <button className="clear-button light" type="button" onClick={clearWorkspace}>{copy.clear}</button>
          <div className="continue-tools"><h3>{copy.continue}</h3><div>{related.map((slug) => { const Icon = icons[slug]; return <a href={toolHref(slug, language)} key={slug}><Icon /><span>{toolCopy[language][slug].label}</span><ArrowRight /></a>; })}</div></div>
        </section>
      )}

      {initialTool && <section className="tool-guide"><div><p className="eyebrow">HOW TO</p><h2>{activeGuide.title}</h2><p>{activeGuide.intro}</p></div><ol>{activeGuide.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></section>}

      <section className="privacy-band"><ShieldCheck /><div><h2>{copy.privacyTitle}</h2><p>{linkedBuilderName(copy.privacyText, devHref)}</p></div></section>

      <section className="conversion-band development-band"><div><p className="eyebrow">{copy.devEyebrow}</p><h2>{copy.devTitle}</h2><p>{linkedBuilderName(copy.devText, devHref)}</p><div className="button-row"><a className="primary-button" href={en ? "https://www.djai.academy/development/en/" : "https://www.djai.academy/development/"}>{copy.devButton}<ArrowRight /></a><a className="secondary-button" href={en ? "https://www.djai.academy/portfolio/en/" : "https://www.djai.academy/portfolio/"}>{copy.portfolioButton}</a></div></div><div className="system-visual"><span><Files /></span><ArrowRight /><span><WandSparkles /></span><ArrowRight /><span><ShieldCheck /></span></div></section>

      <section className="conversion-band course-band"><div className="course-symbol"><GraduationCap /></div><div><p className="eyebrow">{copy.courseEyebrow}</p><h2>{copy.courseTitle}</h2><p>{copy.courseText}</p><a className="secondary-button" href={en ? "https://www.djai.academy/course/detail/en/" : "https://www.djai.academy/course/detail/"}>{copy.courseButton}<BookOpen /></a></div></section>

      <section className="builder-section" id="builder"><a className="builder-logo" href={devHref}><Image src={`${BASE_PATH}/siamese-cat-dev-logo.webp`} alt="Siamese Cat Dev logo" width={640} height={540} loading="lazy" unoptimized /></a><div><p className="eyebrow">{copy.builderEyebrow}</p><h2>{linkedBuilderName(copy.builderTitle, devHref)}</h2><p>{linkedBuilderName(copy.builderText, devHref)}</p><a className="text-link" href={devHref}>{copy.builderLink}<ArrowRight /></a></div></section>

      <section className="seo-section"><div><p className="eyebrow">FREE PDF TOOLS</p><h2>{copy.seoTitle}</h2><p>{copy.seoText}</p></div><div className="faq-list"><h2>{copy.faqTitle}</h2>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <footer><div className="footer-brand"><a className="brand" href={homeHref(language)}><Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy" width={114} height={61} loading="lazy" unoptimized /><span><strong>DJTools</strong><small>PDF · by DJAI Academy</small></span></a><p>{copy.footerPrivacy}</p></div><div className="footer-links"><div><strong>DJAI</strong><a href={en ? "https://www.djai.academy/en/" : "https://www.djai.academy/"}>DJAI Academy</a><a href={en ? "https://www.djai.academy/course/en/" : "https://www.djai.academy/course/"}>{copy.nav.course}</a><a href={en ? "https://www.djai.academy/blog/en/" : "https://www.djai.academy/blog/"}>{copy.nav.blog}</a></div><div><strong>BUILD</strong><a href={en ? "https://www.djai.academy/development/en/" : "https://www.djai.academy/development/"}>{copy.nav.development}</a><a href={en ? "https://www.djai.academy/portfolio/en/" : "https://www.djai.academy/portfolio/"}>{copy.portfolioButton}</a><a href={en ? "https://www.djai.academy/siamese_cat/dev/en/" : "https://www.djai.academy/siamese_cat/dev/"}>Siamese Cat Dev</a></div><div><strong>TOOLS</strong>{toolSlugs.slice(0, 4).map((slug) => <a href={toolHref(slug, language)} key={slug}>{toolCopy[language][slug].label}</a>)}</div></div><p className="copyright">© 2026 {copy.copyright}</p></footer>
    </main>
  );
}
