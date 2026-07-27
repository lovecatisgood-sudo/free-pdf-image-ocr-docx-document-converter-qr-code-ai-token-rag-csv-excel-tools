# เครื่องมือ PDF แปลงและบีบอัดรูป OCR แปลง DOCX สร้าง QR นับ Token/RAG และจัดการ CSV/Excel ฟรี

[![CI](https://github.com/lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](README.md) · [ภาษาไทย](README.th.md) · [ทดลองใช้เครื่องมือ](https://www.djai.academy/tools/) · [รายการฟีเจอร์](FEATURES.th.md)

เครื่องมือ PDF ฟรี แปลงและบีบอัดรูป OCR ภาษาไทย-อังกฤษ แปลง DOCX สร้าง QR Code นับ Token และเตรียม RAG สำหรับ AI รวมถึงเครื่องมือ CSV/Excel ทั้งหมดทำงานแบบ private ใน browser และเปิดซอร์สภายใต้ MIT License

> ไฟล์อยู่ในอุปกรณ์ของคุณ เครื่องมือแปลงไฟล์ในชุดนี้ไม่บังคับสมัครบัญชี ไม่อัปโหลดไฟล์ไปยัง backend สำหรับประมวลผล และไม่ใส่ลายน้ำในไฟล์ผลลัพธ์

## ติดตาม Siamese Cat Dev

หากต้องการติดตามเครื่องมือที่รักษาความเป็นส่วนตัว open-source release และข่าวงานพัฒนาของนักพัฒนาอิสระ สามารถอ่าน [ประวัติ Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/), [ติดตาม @lovecatisgood-sudo บน GitHub](https://github.com/lovecatisgood-sudo) หรือติดตามผ่าน social media:

<p>
  <a href="https://x.com/siamesecatdev"><img src="assets/social/x.png" alt="" width="28"> <strong>X: @siamesecatdev</strong></a>&nbsp;&nbsp;
  <a href="https://www.instagram.com/djcatdev/"><img src="assets/social/instagram.png" alt="" width="28"> <strong>Instagram: @djcatdev</strong></a>&nbsp;&nbsp;
  <a href="https://www.facebook.com/people/Siamese-Cat-Dev/61592514145429/"><img src="assets/social/facebook.png" alt="" width="28"> <strong>Facebook</strong></a>
</p>

การติดตามและแชร์ไม่ใช่ข้อบังคับ แต่ช่วยให้ผู้คนค้นพบเครื่องมือ DJAI Academy และงานชุมชนที่เชื่อมโยงกับ [Siamese Cat Cafe](https://siamesecat.cafe/) ได้มากขึ้น

## ทดลองใช้เครื่องมือ

| หมวดเครื่องมือ | ภาษาไทย | English | โฟลเดอร์ซอร์สโค้ด |
| --- | --- | --- | --- |
| เครื่องมือทั้งหมด | [เปิด](https://www.djai.academy/tools/) | [Open](https://www.djai.academy/tools/en/) | repository นี้ |
| สร้าง QR Code | [เปิด](https://www.djai.academy/tools/qrgen/) | [Open](https://www.djai.academy/tools/qrgen/en/) | `DJayTools-Free-QR-Generator-Source/` |
| เครื่องมือรูปภาพ | [เปิด](https://www.djai.academy/tools/resizeimg/) | [Open](https://www.djai.academy/tools/resizeimg/en/) | `djai-image-resizer/` |
| เครื่องมือ PDF | [เปิด](https://www.djai.academy/tools/PDFTools/) | [Open](https://www.djai.academy/tools/PDFTools/en/) | `djai-pdf-tools/` |
| เครื่องมือเอกสาร | [เปิด](https://www.djai.academy/tools/document/) | [Open](https://www.djai.academy/tools/document/en/) | `djai-document-tools/` |
| เครื่องมือ AI และ Context | [เปิด](https://www.djai.academy/tools/ai/) | [Open](https://www.djai.academy/tools/ai/en/) | `djai-document-tools/` |
| เครื่องมือ Spreadsheet | [เปิด](https://www.djai.academy/tools/spreadsheet/) | [Open](https://www.djai.academy/tools/spreadsheet/en/) | `djai-document-tools/` |

## รายการเครื่องมือและฟีเจอร์ทั้งหมด

### QR Code

- [สร้าง QR Code](https://www.djai.academy/tools/qrgen/) — สร้าง QR แบบ static ปรับลาย มุม สี และกรอบ พร้อมดาวน์โหลด PNG/SVG

### แปลง บีบอัด และ Resize รูปภาพ

- [JPG เป็น PNG](https://www.djai.academy/tools/resizeimg/jpg-to-png/)
- [PNG เป็น JPG](https://www.djai.academy/tools/resizeimg/png-to-jpg/)
- [JPG เป็น WebP](https://www.djai.academy/tools/resizeimg/jpg-to-webp/)
- [PNG เป็น WebP](https://www.djai.academy/tools/resizeimg/png-to-webp/)
- [WebP เป็น JPG](https://www.djai.academy/tools/resizeimg/webp-to-jpg/)
- [WebP เป็น PNG](https://www.djai.academy/tools/resizeimg/webp-to-png/)
- [บีบอัดรูป](https://www.djai.academy/tools/resizeimg/compress-image/) — ลด JPG/PNG/WebP ตามขนาด KB เป้าหมาย
- [Resize รูป](https://www.djai.academy/tools/resizeimg/resize-image/) — ปรับตาม pixel, เปอร์เซ็นต์ หรือ preset social media
- [ลดรูปให้ใกล้ 100 KB](https://www.djai.academy/tools/resizeimg/image-to-100kb/)
- [ลดรูปให้ใกล้ 500 KB](https://www.djai.academy/tools/resizeimg/image-to-500kb/)
- [HEIC/HEIF เป็น JPG](https://www.djai.academy/tools/resizeimg/heic-to-jpg/)
- [ลบ Metadata รูป](https://www.djai.academy/tools/resizeimg/remove-image-metadata/)
- ฟีเจอร์ร่วม: batch สูงสุด 20 รูป, drag-and-drop, หมุนรูป, ปรับ quality, ล็อกอัตราส่วน, เปรียบเทียบก่อน/หลัง และดาวน์โหลด ZIP

### เครื่องมือ PDF

- [รวม PDF](https://www.djai.academy/tools/PDFTools/merge-pdf/) — รวมหลายไฟล์และจัดลำดับ
- [แยก PDF](https://www.djai.academy/tools/PDFTools/split-pdf/) — ดึงช่วงหน้า สร้างหลายกลุ่ม หรือแบ่งทุก N หน้า
- [บีบอัด PDF](https://www.djai.academy/tools/PDFTools/compress-pdf/) — เลือก Light, Recommended หรือ Strong
- [รูปเป็น PDF](https://www.djai.academy/tools/PDFTools/images-to-pdf/) — รวม JPG/PNG/WebP พร้อมเลือกขนาดและแนวกระดาษ
- [PDF เป็น JPG/PNG](https://www.djai.academy/tools/PDFTools/pdf-to-images/) — ส่งออกทุกหน้าและดาวน์โหลด ZIP
- [หมุน PDF](https://www.djai.academy/tools/PDFTools/rotate-pdf/) — หมุนทุกหน้าหรือช่วงที่เลือก
- [ใส่ Watermark PDF](https://www.djai.academy/tools/PDFTools/watermark-pdf/) — ใส่ข้อความ โลโก้ หรือรูป พร้อมปรับตำแหน่งและ opacity
- [ใส่รหัสผ่าน PDF](https://www.djai.academy/tools/PDFTools/protect-pdf/) — เข้ารหัส AES-256 และกำหนด permission
- [จัดหน้า PDF](https://www.djai.academy/tools/PDFTools/organize-pdf/) — เรียง ลบ หรือทำซ้ำหน้า
- [ใส่เลขหน้า PDF](https://www.djai.academy/tools/PDFTools/add-page-numbers/) — เลือกเลขเริ่ม ตำแหน่ง และ alignment
- [ลบ Metadata PDF](https://www.djai.academy/tools/PDFTools/remove-pdf-metadata/)

### แปลงเอกสารและ OCR

- [DOCX เป็น PDF](https://www.djai.academy/tools/document/docx-to-pdf/) — เลือกขนาดกระดาษ margin และเลขหน้า
- [DOCX เป็น HTML](https://www.djai.academy/tools/document/docx-to-html/) — สร้าง semantic HTML ที่ผ่านการ sanitize
- [DOCX เป็น Markdown](https://www.djai.academy/tools/document/docx-to-markdown/) — รักษา heading, list, link และ table ที่รองรับ
- [DOCX เป็น Text](https://www.djai.academy/tools/document/docx-to-text/) — ดึงข้อความล้วนพร้อมนับคำและ token
- [PDF เป็น Text](https://www.djai.academy/tools/document/pdf-to-text/) — ดึง selectable text จากทุกหน้าหรือช่วงหน้า
- [PDF เป็น Word](https://www.djai.academy/tools/document/pdf-to-word/) — สร้าง DOCX ที่แก้ไขข้อความได้
- [OCR ภาษาไทย-อังกฤษ](https://www.djai.academy/tools/document/ocr/) — อ่าน scanned PDF, JPG และ PNG เป็นข้อความใน browser

### เครื่องมือ AI Token, Context และ RAG

- [นับ Token AI](https://www.djai.academy/tools/ai/token-counter/) — นับ token คำหลายภาษา ตัวอักษร byte และ context-window usage
- [PDF เป็น AI Markdown](https://www.djai.academy/tools/ai/pdf-to-ai-markdown/) — เตรียม Markdown สำหรับ ChatGPT, Claude, Cursor, Codex และ RAG
- [AI Context Optimizer](https://www.djai.academy/tools/ai/context-optimizer/) — ลบ header/footer เลขหน้า บรรทัดแตก และ spacing เกิน
- [RAG Chunk Calculator](https://www.djai.academy/tools/ai/rag-chunk-calculator/) — ตั้ง chunk/overlap, preview และ export JSONL
- [Prompt Packager](https://www.djai.academy/tools/ai/prompt-packager/) — รวม requirement, document, code และ reference เป็น prompt package เดียว

### เครื่องมือ CSV, JSON และ Excel

- [CSV เป็น JSON](https://www.djai.academy/tools/spreadsheet/csv-to-json/)
- [JSON เป็น CSV](https://www.djai.academy/tools/spreadsheet/json-to-csv/)
- [ทำความสะอาด CSV](https://www.djai.academy/tools/spreadsheet/csv-cleaner/) — trim, ลบแถวว่าง และลบข้อมูลซ้ำ
- [รวม CSV](https://www.djai.academy/tools/spreadsheet/merge-csv/) — รวมหลายไฟล์โดยจับคู่ชื่อ column
- [แบ่ง CSV](https://www.djai.academy/tools/spreadsheet/split-csv/) — แบ่งตามจำนวนแถวและดาวน์โหลด ZIP
- [CSV เป็น Excel XLSX](https://www.djai.academy/tools/spreadsheet/csv-to-xlsx/)
- [Excel XLSX เป็น CSV](https://www.djai.academy/tools/spreadsheet/xlsx-to-csv/)

ดู [LIVE_DEMOS.md](LIVE_DEMOS.md) สำหรับ URL หน้าเครื่องมือภาษาไทย 51 หน้าและภาษาอังกฤษ 51 หน้า รวมถึงหน้าสำหรับงานเฉพาะทุกหน้า

## เกี่ยวกับ DJAI Academy, Siamese Cat Dev และ Siamese Cat Cafe

- [DJAI Academy](https://www.djai.academy/) พัฒนาการเรียนรู้ด้านเทคโนโลยี บริการซอฟต์แวร์ และเครื่องมือดิจิทัลฟรีที่นำไปใช้งานจริงได้
- [Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/) คือนักพัฒนาอิสระและผู้สร้างผลิตภัณฑ์เบื้องหลัง open-source release นี้ โดยตั้งใจสร้างซอฟต์แวร์ที่มีประโยชน์ รักษาความเป็นส่วนตัว และไม่บังคับ subscription หรือ upload ไฟล์โดยไม่จำเป็น
- [Siamese Cat Cafe](https://siamesecat.cafe/) คือธุรกิจชุมชนที่เชื่อมโยงกับโครงการ ช่วยสนับสนุนการรับเลี้ยงแมวและงานสร้างสรรค์ของนักพัฒนาอิสระ สามารถดู [ข้อมูลคาเฟ่บน Google](https://share.google/I0Zp942t2DRuUzrIZ)

การกด Star, contribution, feedback, การมาเยี่ยมคาเฟ่ และรีวิวจากประสบการณ์จริง ล้วนช่วยสนับสนุนทั้งซอฟต์แวร์และภารกิจชุมชน

## ภายใน repository มีอะไรบ้าง

- เครื่องมือสร้าง QR Code ปรับรูปแบบและสี พร้อมดาวน์โหลด PNG และ SVG
- แปลงและ Resize รูป บีบอัดตามขนาด KB รองรับ HEIC ลบ metadata ทำงานแบบ batch และดาวน์โหลด ZIP
- เครื่องมือ PDF 11 รายการ สำหรับรวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ เข้ารหัส จัดหน้า ใส่เลขหน้า และลบ metadata
- เครื่องมือเอกสาร 7 รายการ สำหรับ DOCX, HTML, Markdown, Text, PDF และ OCR ภาษาไทย/อังกฤษ
- เครื่องมือ AI Context 5 รายการ สำหรับนับ Token เตรียม Markdown ทำความสะอาด Context วางแผน RAG Chunk และรวมไฟล์เป็น Prompt
- เครื่องมือ CSV, JSON และ Excel 7 รายการ สำหรับแปลง ทำความสะอาด รวม และแบ่งข้อมูล
- Interface, metadata, canonical URL และ language alternate สำหรับภาษาไทยและอังกฤษ

รวมทั้งหมดเป็นเครื่องมือหรือ workspace หลัก 32 รายการ และหน้าเครื่องมือรูปภาพเฉพาะงานอีก 12 หน้า อ่านรายละเอียดได้ที่ [FEATURES.th.md](FEATURES.th.md) และข้อมูลเชิง implementation ฉบับเต็มที่ [FEATURES.md](FEATURES.md)

## หลักการของโครงการ

- **Private by default:** ไฟล์ที่รองรับประมวลผลในหน่วยความจำของ browser
- **ไม่ต้องมีบัญชี:** ใช้งานได้โดยไม่สมัครสมาชิก
- **ไม่มีลายน้ำ:** ไม่ใส่ลายน้ำในไฟล์ที่สร้าง
- **สองภาษา:** ภาษาไทยและอังกฤษอยู่ใน codebase เดียวกัน
- **Fork ได้ง่าย:** ปิด analytics เป็นค่าเริ่มต้นจนกว่าผู้ deploy จะตั้งค่าเอง
- **นำไปใช้ได้กว้าง:** MIT อนุญาตให้นำไปใช้ แก้ไข แจกจ่าย และใช้เชิงพาณิชย์

## ความต้องการของระบบ

- แนะนำ Node.js 22.13 ขึ้นไปสำหรับทั้งชุด
- npm ที่รองรับ lockfile
- browser สมัยใหม่ที่รองรับ Canvas, Web Worker, PDF, OCR และ File API

## ติดตั้งทุกโปรเจกต์

```bash
git clone https://github.com/lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools.git
cd free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools
npm run setup
```

แต่ละ application มี lockfile ของตัวเอง คำสั่ง root จะเรียก `npm ci` ในทุก application

## เปิดแต่ละโปรเจกต์ในเครื่อง

```bash
# QR Generator
npm run dev --prefix DJayTools-Free-QR-Generator-Source

# Image Tools
npm run dev --prefix djai-image-resizer

# PDF Tools
npm run dev --prefix djai-pdf-tools

# Document, AI และ Spreadsheet Tools
npm run dev --prefix djai-document-tools
```

หาก deploy ไปยัง URL หรือใช้แบรนด์อื่น อ่าน [CUSTOMIZING.md](CUSTOMIZING.md)

## Build, Lint และ Test

```bash
npm run build
npm run lint
npm test
```

GitHub Actions จะติดตั้ง dependency ใหม่และตรวจแต่ละ application แยกกัน

## ความเป็นส่วนตัวและ Analytics

การแปลงไฟล์ทำงานใน browser แต่ deployment ยังได้รับ request ปกติสำหรับ HTML, JavaScript, CSS, font และรูปภาพ ผู้ที่ fork สามารถเปลี่ยน privacy model ได้ จึงควรตรวจสอบ deployment ที่ใช้งานจริง

Google Analytics ถูกปิดเป็นค่าเริ่มต้น สามารถเปิดใน Next.js application ด้วย `NEXT_PUBLIC_GA_ID` ระหว่าง build:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX npm run build
```

## การร่วมพัฒนา

ยินดีรับ bug report, ฟีเจอร์ใหม่, คำแปล, งาน accessibility, test และเครื่องมือใหม่ที่รักษาความเป็นส่วนตัว

- อ่าน [CONTRIBUTING.th.md](CONTRIBUTING.th.md)
- ปฏิบัติตาม [Code of Conduct](CODE_OF_CONDUCT.md)
- อ่านวิธีขอความช่วยเหลือใน [SUPPORT.th.md](SUPPORT.th.md)
- แจ้งช่องโหว่ตาม [SECURITY.md](SECURITY.md) และอย่าเปิดเป็น public issue
- ดูแนวทางพัฒนาใน [ROADMAP.md](ROADMAP.md)

## License และการให้เครดิต

ชุดเครื่องมือ PDF รูปภาพ OCR และแปลงเอกสารนี้ใช้ [MIT License](LICENSE) คุณสามารถใช้งาน คัดลอก แก้ไข รวม เผยแพร่ แจกจ่าย sublicense หรือจำหน่ายซอฟต์แวร์ รวมถึงใช้ในสินค้าปิดซอร์สและเชิงพาณิชย์ได้ โดยต้องเก็บ copyright notice และข้อความอนุญาตของ MIT ไว้ในสำเนาหรือส่วนสำคัญของซอฟต์แวร์

การให้ backlink **ไม่ใช่เงื่อนไขของ MIT License** แต่เราขอบคุณอย่างยิ่งหากคุณสะดวกให้เครดิต:

- ผู้สร้าง: [Siamese Cat Dev ที่ DJAI Academy](https://www.djai.academy/siamese_cat/dev/)
- เครื่องมือออนไลน์: [เครื่องมือ PDF รูปภาพ OCR เอกสาร AI และข้อมูล](https://www.djai.academy/tools/)
- ธุรกิจชุมชน: [Siamese Cat Cafe](https://siamesecat.cafe/)

ตัวอย่างข้อความให้เครดิตอยู่ใน [ATTRIBUTION.md](ATTRIBUTION.md)

## สนับสนุนโครงการและภารกิจช่วยหาบ้านให้แมว

โครงการนี้ดูแลโดยนักพัฒนาอิสระที่เชื่อมโยงกับ Siamese Cat Cafe ซึ่งมีภารกิจชุมชนในการช่วยสนับสนุนการรับเลี้ยงแมวและงานสร้างสรรค์ของนักพัฒนาอิสระ คุณช่วยเราได้โดย:

- กด Star และแชร์ repository นี้
- ร่วมเขียนโค้ด เอกสาร Test หรือคำแปลภาษาไทย
- ใช้และอ้างอิงเครื่องมือออนไลน์เมื่อนำไปช่วยผู้ใช้งานของคุณได้
- เยี่ยมชมหรือสนับสนุน [Siamese Cat Cafe](https://siamesecat.cafe/) หรือดู [ข้อมูลคาเฟ่บน Google](https://share.google/I0Zp942t2DRuUzrIZ)
- เขียนรีวิว Google ตามประสบการณ์จริง หากคุณเคยมาเยี่ยมคาเฟ่

## ผู้ดูแล

- GitHub: [@lovecatisgood-sudo](https://github.com/lovecatisgood-sudo)
- โปรไฟล์นักพัฒนา: [Siamese Cat Dev](https://www.djai.academy/siamese_cat/dev/)
- X: [@siamesecatdev](https://x.com/siamesecatdev)
- Instagram: [@djcatdev](https://www.instagram.com/djcatdev/)
- Facebook: [Siamese Cat Dev บน Facebook](https://www.facebook.com/people/Siamese-Cat-Dev/61592514145429/)
- เว็บไซต์: [DJAI Academy](https://www.djai.academy/)
