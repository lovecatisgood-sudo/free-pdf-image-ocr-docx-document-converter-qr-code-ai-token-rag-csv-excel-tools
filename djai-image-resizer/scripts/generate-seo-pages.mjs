import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");
const siteRoot = "https://www.djai.academy/tools/resizeimg";

export const presets = [
  {
    slug: "jpg-to-png", mode: "dimensions", format: "image/png",
    th: ["แปลง JPG เป็น PNG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง JPG เป็น PNG ฟรี", "แปลงรูป JPG เป็น PNG ฟรีใน browser โดยไม่อัปโหลดไฟล์ ไม่ต้องสมัคร และไม่มี watermark", "วิธีแปลง JPG เป็น PNG", "เลือก JPG แล้วระบบจะตั้ง PNG ให้ทันที เหมาะกับงานออกแบบและระบบที่ต้องการไฟล์ PNG", ["เลือกรูป JPG จากอุปกรณ์", "ตรวจสอบขนาดและ PNG ที่ตั้งไว้", "ประมวลผลแล้วดาวน์โหลด PNG"]],
    en: ["Convert JPG to PNG Free Online | DJAI Image Tools", "Convert JPG to PNG for free", "Convert JPG images to PNG free in your browser with no upload, account, watermark, or server storage.", "How to convert JPG to PNG", "Choose a JPG and PNG is selected automatically for design or publishing workflows that require PNG files.", ["Choose a JPG from your device", "Review the dimensions and PNG output", "Process and download the PNG"]]
  },
  {
    slug: "png-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง PNG เป็น JPG ฟรี ลดขนาดรูป | DJAI Image Tools", "แปลง PNG เป็น JPG ฟรี", "แปลง PNG เป็น JPG ฟรี พร้อมปรับคุณภาพและลดขนาดไฟล์ใน browser โดยรูปไม่ถูกอัปโหลด", "วิธีแปลง PNG เป็น JPG", "JPG เหมาะกับรูปถ่ายและไฟล์ที่ต้องการขนาดเล็กลง พื้นที่โปร่งใสจะเปลี่ยนเป็นพื้นหลังสีขาว", ["เลือกรูป PNG", "เลือกคุณภาพ JPG", "ประมวลผลและดาวน์โหลด JPG"]],
    en: ["Convert PNG to JPG Free and Reduce Size | DJAI Image Tools", "Convert PNG to JPG for free", "Convert PNG to JPG free with quality controls and private browser processing. No upload, account, or watermark.", "How to convert PNG to JPG", "JPG is practical for photographs and smaller downloads. Transparent areas use a white background because JPG has no transparency.", ["Choose a PNG image", "Select a suitable JPG quality", "Process and download the JPG"]]
  },
  {
    slug: "jpg-to-webp", mode: "dimensions", format: "image/webp",
    th: ["แปลง JPG เป็น WebP ฟรี สำหรับเว็บไซต์ | DJAI Image Tools", "แปลง JPG เป็น WebP ฟรี", "แปลง JPG เป็น WebP ฟรี เพื่อรูปเว็บไซต์ที่โหลดเร็วขึ้น พร้อมควบคุมคุณภาพใน browser", "วิธีแปลง JPG เป็น WebP", "WebP ช่วยลดน้ำหนักรูปสำหรับเว็บไซต์และแอป ใช้ quality slider เพื่อหาสมดุลระหว่างความคมชัดและขนาดไฟล์", ["เลือกรูป JPG", "ปรับคุณภาพ WebP", "เปรียบเทียบขนาดแล้วดาวน์โหลด"]],
    en: ["Convert JPG to WebP Free for Websites | DJAI Image Tools", "Convert JPG to WebP for free", "Convert JPG to WebP free for faster websites with private browser processing and quality control.", "How to convert JPG to WebP", "WebP can reduce image weight for modern websites. Use the quality control to balance visual detail and download size.", ["Choose a JPG image", "Adjust WebP quality", "Compare the size and download"]]
  },
  {
    slug: "png-to-webp", mode: "dimensions", format: "image/webp",
    th: ["แปลง PNG เป็น WebP ฟรี ออนไลน์ | DJAI Image Tools", "แปลง PNG เป็น WebP ฟรี", "แปลง PNG เป็น WebP ฟรี รักษาพื้นโปร่งใสและลดขนาดไฟล์โดยประมวลผลใน browser", "วิธีแปลง PNG เป็น WebP", "WebP รองรับพื้นโปร่งใสและมักเหมาะกับรูปเว็บไซต์ที่ต้องการไฟล์เล็กกว่า PNG", ["เลือกรูป PNG", "เลือกคุณภาพ WebP", "ดูผลลัพธ์และดาวน์โหลด"]],
    en: ["Convert PNG to WebP Free Online | DJAI Image Tools", "Convert PNG to WebP for free", "Convert PNG to WebP free while preserving transparency, processed privately in your browser.", "How to convert PNG to WebP", "WebP supports transparency and can be smaller than PNG for web use. Preview and compare the result before downloading.", ["Choose a PNG image", "Select WebP quality", "Review and download the result"]]
  },
  {
    slug: "webp-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง WebP เป็น JPG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง WebP เป็น JPG ฟรี", "แปลง WebP เป็น JPG ฟรีสำหรับระบบหรือโปรแกรมที่ต้องการ JPG โดยไม่อัปโหลดรูป", "วิธีแปลง WebP เป็น JPG", "ใช้เมื่อแบบฟอร์ม โปรแกรม หรืออุปกรณ์ปลายทางไม่รองรับ WebP แล้วดาวน์โหลดไฟล์ JPG ที่ใช้ได้กว้างขึ้น", ["เลือกไฟล์ WebP", "กำหนดคุณภาพ JPG", "ประมวลผลและดาวน์โหลด JPG"]],
    en: ["Convert WebP to JPG Free Online | DJAI Image Tools", "Convert WebP to JPG for free", "Convert WebP to JPG free for forms, software, and devices that require JPG. Your image stays on your device.", "How to convert WebP to JPG", "Use JPG when a form or application does not accept WebP. Select the quality and download a widely compatible file.", ["Choose a WebP image", "Set JPG quality", "Process and download the JPG"]]
  },
  {
    slug: "webp-to-png", mode: "dimensions", format: "image/png",
    th: ["แปลง WebP เป็น PNG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง WebP เป็น PNG ฟรี", "แปลง WebP เป็น PNG ฟรีสำหรับงานออกแบบ โดยไฟล์อยู่ในอุปกรณ์และไม่ถูกอัปโหลด", "วิธีแปลง WebP เป็น PNG", "PNG เหมาะกับงานกราฟิก ระบบที่ต้องการ lossless และรูปโปร่งใส เครื่องมือแปลงพร้อมลบ metadata", ["เลือกไฟล์ WebP", "ตรวจสอบ PNG ที่ตั้งไว้", "ประมวลผลและดาวน์โหลด PNG"]],
    en: ["Convert WebP to PNG Free Online | DJAI Image Tools", "Convert WebP to PNG for free", "Convert WebP to PNG free for design workflows. Files remain on your device and are never uploaded.", "How to convert WebP to PNG", "PNG is useful for graphics, lossless workflows, and transparency. Conversion also removes image metadata.", ["Choose a WebP image", "Confirm PNG output", "Process and download the PNG"]]
  },
  {
    slug: "compress-image", mode: "target", targetKb: 200,
    th: ["บีบอัดรูป ลดขนาดไฟล์ JPG PNG WebP ฟรี | DJAI", "บีบอัดรูปและลดขนาดไฟล์ฟรี", "บีบอัดรูป JPG PNG และ WebP ให้ใกล้ขนาด KB ที่ต้องการ ฟรีและเป็นส่วนตัวใน browser", "วิธีบีบอัดรูปให้ไฟล์เล็กลง", "กำหนดขนาดเป้าหมายเป็น KB แล้วเครื่องมือจะปรับคุณภาพและขนาดภาพเท่าที่จำเป็น", ["เลือกรูปที่ต้องการลดขนาด", "ใส่ขนาด KB เป้าหมาย", "ตรวจขนาดแล้วดาวน์โหลด"]],
    en: ["Compress JPG PNG WebP Images Free Online | DJAI", "Compress images and reduce file size", "Compress JPG, PNG, and WebP images toward a target KB size free with private browser processing.", "How to compress an image", "Enter a target in KB and the tool adjusts quality and dimensions only as needed for email, forms, and websites.", ["Choose the image to reduce", "Enter a target size in KB", "Review the result and download"]]
  },
  {
    slug: "resize-image", mode: "percentage", percent: 50,
    th: ["Resize รูปตาม Pixel หรือเปอร์เซ็นต์ฟรี | DJAI", "Resize และย่อรูปออนไลน์ฟรี", "Resize รูปตาม pixel เปอร์เซ็นต์ หรือ preset สำหรับ social media ฟรี พร้อมล็อกอัตราส่วนภาพ", "วิธี Resize รูปโดยไม่ทำให้ภาพยืด", "ย่อหรือขยายรูปตามเปอร์เซ็นต์ กำหนด pixel หรือใช้ preset โดยระบบล็อกอัตราส่วนภาพไว้เป็นค่าเริ่มต้น", ["เลือกรูปจากอุปกรณ์", "เลือกเปอร์เซ็นต์ pixel หรือ preset", "ตรวจขนาดใหม่แล้วดาวน์โหลด"]],
    en: ["Resize Image by Pixels or Percentage Free | DJAI", "Resize images online for free", "Resize images by pixels, percentage, or social media presets free while keeping the aspect ratio.", "How to resize an image without stretching", "Scale by percentage, enter pixel dimensions, or use a preset. Aspect ratio protection is enabled by default.", ["Choose an image", "Select percentage, dimensions, or preset", "Review the size and download"]]
  },
  {
    slug: "image-to-100kb", mode: "target", targetKb: 100,
    th: ["ลดขนาดรูปให้ใกล้ 100 KB ฟรี | DJAI Image Tools", "ลดขนาดรูปให้ใกล้ 100 KB", "บีบอัด JPG PNG หรือ WebP ให้ใกล้ 100 KB ฟรี เหมาะกับแบบฟอร์มสมัครงานและระบบอัปโหลดไฟล์", "วิธีลดรูปให้ใกล้ 100 KB", "ตั้งค่า 100 KB ไว้แล้ว เครื่องมือจะพยายามให้ใกล้เป้าหมายหรือเล็กกว่าโดยรักษาคุณภาพให้ดีที่สุด", ["เลือกรูป JPG PNG หรือ WebP", "ใช้ค่าเป้าหมาย 100 KB", "ตรวจขนาดและดาวน์โหลด"]],
    en: ["Compress Image to Approximately 100 KB Free | DJAI", "Compress an image to approximately 100 KB", "Reduce a JPG, PNG, or WebP image toward 100 KB free for forms, applications, and upload limits.", "How to reduce an image to 100 KB", "The 100 KB target is selected automatically. The tool aims for the target or slightly below while preserving useful quality.", ["Choose a supported image", "Use the 100 KB target", "Review the actual size and download"]]
  },
  {
    slug: "image-to-500kb", mode: "target", targetKb: 500,
    th: ["ลดขนาดรูปให้ใกล้ 500 KB ฟรี | DJAI Image Tools", "ลดขนาดรูปให้ใกล้ 500 KB", "บีบอัด JPG PNG หรือ WebP ให้ใกล้ 500 KB ฟรีใน browser เหมาะกับอีเมล เว็บไซต์ และแบบฟอร์ม", "วิธีลดรูปให้ใกล้ 500 KB", "ตั้งค่า 500 KB ไว้แล้ว เหมาะกับงานที่ต้องการภาพคมชัดแต่มีข้อจำกัดขนาดไฟล์", ["เลือกรูปที่ต้องการบีบอัด", "ใช้ค่าเป้าหมาย 500 KB", "เปรียบเทียบแล้วดาวน์โหลด"]],
    en: ["Compress Image to Approximately 500 KB Free | DJAI", "Compress an image to approximately 500 KB", "Reduce a JPG, PNG, or WebP image toward 500 KB free in your browser for email, websites, and forms.", "How to reduce an image to 500 KB", "The 500 KB target is preselected for images that need useful detail under a file-size limit.", ["Choose the image to compress", "Use the 500 KB target", "Compare the sizes and download"]]
  },
  {
    slug: "heic-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง HEIC เป็น JPG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง HEIC เป็น JPG ฟรี", "แปลงรูป HEIC และ HEIF จาก iPhone เป็น JPG ฟรีใน browser โดยไม่อัปโหลดรูป", "วิธีแปลง HEIC เป็น JPG", "เปิดรูป HEIC หรือ HEIF จาก iPhone แล้วแปลงเป็น JPG สำหรับเว็บไซต์ แบบฟอร์ม และโปรแกรมทั่วไป", ["เลือกไฟล์ HEIC หรือ HEIF", "รอ browser ถอดรหัสและแสดงภาพ", "ประมวลผลแล้วดาวน์โหลด JPG"]],
    en: ["Convert HEIC to JPG Free Online | DJAI Image Tools", "Convert HEIC to JPG for free", "Convert iPhone HEIC and HEIF photos to JPG free in your browser without uploading images to a server.", "How to convert HEIC to JPG", "Open an iPhone HEIC or HEIF photo and create a compatible JPG for websites, forms, and common applications.", ["Choose a HEIC or HEIF file", "Let the browser decode and preview it", "Process and download the JPG"]]
  },
  {
    slug: "remove-image-metadata", mode: "dimensions",
    th: ["ลบ Metadata รูปภาพฟรี แบบ Private | DJAI Image Tools", "ลบ Metadata จากรูปภาพฟรี", "ลบ EXIF และ metadata จาก JPG PNG WebP หรือ HEIC ด้วยการสร้างสำเนาใหม่ใน browser โดยไม่ upload รูป", "วิธีลบ Metadata จากรูปภาพ", "เครื่องมือจะ decode และสร้างไฟล์รูปใหม่ผ่าน browser canvas ทำให้ metadata เดิมไม่ติดไปกับไฟล์ผลลัพธ์", ["เลือกรูปที่ต้องการทำให้เป็นส่วนตัว", "คงขนาดและ format ที่ต้องการ", "ประมวลผลและดาวน์โหลดสำเนาใหม่"]],
    en: ["Remove Image Metadata Free and Privately | DJAI Image Tools", "Remove metadata from an image for free", "Remove EXIF and metadata from JPG, PNG, WebP, or HEIC by creating a new browser-processed copy without uploading it.", "How to remove image metadata", "The tool decodes the image and creates a new file through browser canvas, preventing original metadata from being carried into the result.", ["Choose the image to make privacy-safe", "Keep the dimensions and preferred format", "Process and download the new copy"]]
  }
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function render(template, preset, language) {
  const [title, h1, description, guideTitle, intro, steps] = preset[language];
  const thaiUrl = `${siteRoot}/${preset.slug}/`;
  const englishUrl = `${siteRoot}/${preset.slug}/en/`;
  const canonical = language === "th" ? thaiUrl : englishUrl;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "SoftwareApplication", name: h1, url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
      { "@type": "HowTo", name: guideTitle, description: intro, step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: language === "th" ? "https://www.djai.academy/" : "https://www.djai.academy/en/" },
        { "@type": "ListItem", position: 2, name: "Image Tools", item: language === "th" ? `${siteRoot}/` : `${siteRoot}/en/` },
        { "@type": "ListItem", position: 3, name: h1, item: canonical }
      ] }
    ]
  };
  const attrs = [`data-preset="${preset.slug}"`, `data-preset-mode="${preset.mode}"`];
  if (preset.format) attrs.push(`data-preset-format="${preset.format}"`);
  if (preset.targetKb) attrs.push(`data-preset-target="${preset.targetKb}"`);
  if (preset.percent) attrs.push(`data-preset-percent="${preset.percent}"`);
  const switchUrl = language === "th" ? englishUrl : thaiUrl;
  const guide = `<section class="seo-guide section-shell" aria-labelledby="seo-guide-heading"><div><span class="section-kicker">${language === "th" ? "คู่มือเครื่องมือ" : "TOOL GUIDE"}</span><h2 id="seo-guide-heading">${escapeHtml(guideTitle)}</h2><p>${escapeHtml(intro)}</p></div><ol>${steps.map((step) => `<li><span>${escapeHtml(step)}</span></li>`).join("")}</ol></section>`;

  return template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<link rel="alternate" hreflang="th" href="[^"]*">/, `<link rel="alternate" hreflang="th" href="${thaiUrl}">`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${englishUrl}">`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*">/, `<link rel="alternate" hreflang="x-default" href="${thaiUrl}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(description)}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace("<body>", `<body ${attrs.join(" ")}>`)
    .replace(/<h1>.*?<\/h1>/s, `<h1>${escapeHtml(h1)}</h1>`)
    .replace(/<p class="hero-description">.*?<\/p>/s, `<p class="hero-description">${escapeHtml(description)}</p>`)
    .replace(/<a href="https:\/\/www\.djai\.academy\/tools\/resizeimg\/(?:en\/)?" hreflang="(?:en|th)">(?:EN|ไทย)<\/a>/, `<a href="${switchUrl}" hreflang="${language === "th" ? "en" : "th"}">${language === "th" ? "EN" : "ไทย"}</a>`)
    .replace("    <section class=\"how-section\">", `    ${guide}\n\n    <section class="how-section">`);
}

const templates = { th: readFileSync(join(publicDir, "index.html"), "utf8"), en: readFileSync(join(publicDir, "en", "index.html"), "utf8") };
for (const preset of presets) {
  for (const language of ["th", "en"]) {
    const directory = join(publicDir, preset.slug, ...(language === "en" ? ["en"] : []));
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "index.html"), render(templates[language], preset, language));
  }
}
console.log(`Generated ${presets.length * 2} bilingual image-tool SEO pages.`);
