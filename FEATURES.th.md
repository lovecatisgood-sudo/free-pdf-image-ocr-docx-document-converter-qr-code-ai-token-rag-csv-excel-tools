# รายการฟีเจอร์เครื่องมือ PDF รูปภาพ OCR และแปลงเอกสาร

[English technical inventory](FEATURES.md) · [ทดลองใช้ทุกเครื่องมือ](LIVE_DEMOS.md) · [กลับไป README ภาษาไทย](README.th.md)

Repository นี้มีเครื่องมือหรือ workspace หลัก 32 รายการ:

- เครื่องมือสร้าง QR Code 1 รายการ
- Workspace จัดการรูปภาพ 1 รายการ พร้อมหน้าเฉพาะงาน 12 หน้า
- เครื่องมือ PDF 11 รายการ
- เครื่องมือเอกสาร 7 รายการ
- เครื่องมือ AI และ Context 5 รายการ
- เครื่องมือ Spreadsheet และข้อมูล 7 รายการ

## 1. สร้าง QR Code

- สร้าง QR Code แบบ static จาก URL และเติม `https://` ให้อัตโนมัติเมื่อจำเป็น
- ตรวจสอบ URL และแสดงข้อผิดพลาดเมื่อรูปแบบไม่ถูกต้อง
- Preview เปลี่ยนทันทีเมื่อปรับตัวเลือก
- เลือกลาย QR แบบสี่เหลี่ยม มุมมน หรือจุด และเลือกรูปแบบมุมได้
- มีสีสำเร็จรูป 8 สี และกรอบแบบไม่มีกรอบ กรอบธรรมดา หรือ `SCAN ME`
- ใช้ error correction ระดับ `Q`
- ดาวน์โหลดเป็น PNG หรือ SVG
- ไม่ต้องสมัครบัญชี ไม่มีลายน้ำ ไม่หมดอายุ และประมวลผลใน browser
- รองรับ interface ภาษาไทยและอังกฤษ

หมายเหตุ: กรอบที่เลือกใช้กับ preview บนหน้าเว็บ แต่ฟังก์ชันดาวน์โหลดปัจจุบันดาวน์โหลด QR object ด้านใน จึงอาจไม่รวมกรอบในไฟล์ที่ดาวน์โหลด

## 2. เครื่องมือรูปภาพ

### Format และการจัดการไฟล์

- รับ JPG/JPEG, PNG, WebP, HEIC และ HEIF
- ส่งออก JPG, PNG, WebP หรือ format เดิมที่ browser รองรับ
- Decode HEIC/HEIF ใน browser
- เลือกไฟล์หรือ drag-and-drop ได้ สูงสุด 20 รูป
- จำกัด 50 MB ต่อรูปและ 200 MB ต่อ batch
- แสดงชื่อไฟล์ ขนาด มิติ ลำดับ และองศาการหมุน
- เลือก ลบ หรือหมุนแต่ละรูปแยกกันครั้งละ 90 องศา

### Resize และบีบอัด

- ตั้งขนาดเป้าหมาย 5–50,000 KB พร้อม preset 50, 100, 200 และ 500 KB
- ค้นหาคุณภาพ JPG/WebP ที่เหมาะกับขนาดเป้าหมาย และลดมิติเมื่อจำเป็น
- เลือกคงมิติเดิมได้ และแสดงขนาดก่อน/หลัง
- Resize ตั้งแต่ 5% ถึง 200% พร้อม preset 25%, 50%, 75% และ 100%
- กำหนด width/height เป็น pixel และล็อกอัตราส่วนภาพเป็นค่าเริ่มต้น
- รองรับมิติสูงสุด 20,000 pixel และ canvas สูงสุด 100 ล้าน pixel
- มี preset Instagram Square, Instagram Portrait, Instagram Story, YouTube Thumbnail และ Facebook Post
- ปรับคุณภาพ 45%–100% พร้อม preset 65%, 82% และ 94%

### Transparency, Preview และ Download

- ตรวจและรักษาความโปร่งใสสำหรับ PNG/WebP
- เติมพื้นขาวเมื่อแปลงภาพโปร่งใสเป็น JPG
- Preview รูปต้นฉบับและผลลัพธ์ พร้อม slider เปรียบเทียบก่อน/หลัง
- แสดง format, มิติ, ขนาดรวม และเปอร์เซ็นต์ที่ลดได้
- ดาวน์โหลดทีละรูปหรือรวมหลายผลลัพธ์เป็น ZIP
- สร้างชื่อไฟล์ผลลัพธ์ที่ปลอดภัย

หน้าเฉพาะงาน 12 หน้า: JPG to PNG, PNG to JPG, JPG to WebP, PNG to WebP, WebP to JPG, WebP to PNG, Compress Image, Resize Image, Image to 100 KB, Image to 500 KB, HEIC to JPG และ Remove Image Metadata

## 3. เครื่องมือ PDF

ฟีเจอร์ร่วม: ประมวลผลใน browser, จำกัด 100 MB ต่อไฟล์, drag-and-drop, ดาวน์โหลดในเครื่อง, ไม่มีบัญชีหรือลายน้ำ และรองรับไทย/อังกฤษ

### 3.1 Merge PDF

- รวม PDF ตั้งแต่สองไฟล์ขึ้นไป
- จัดลำดับไฟล์ก่อนรวม คัดลอกทุกหน้าตามลำดับ และรายงานจำนวนหน้ารวม

### 3.2 Split PDF

- ดึงหน้าด้วยรูปแบบ `1-3, 5, 8`
- สร้างหลายกลุ่มด้วย semicolon เช่น `1-3; 4-6; 8`
- แบ่งทุก N หน้า และดาวน์โหลดหลายไฟล์เป็น ZIP
- ตรวจช่วงหน้าและตัดเลขหน้าซ้ำภายในกลุ่ม

### 3.3 Compress PDF

- Light mode จัดโครงสร้างใหม่โดยไม่ตั้งใจลดคุณภาพ
- Recommended และ Strong mode render หน้าเป็นภาพ JPEG ด้วยความละเอียด/คุณภาพต่างกัน
- เก็บไฟล์ที่เล็กกว่าระหว่างต้นฉบับและผลลัพธ์
- โหมดที่ render เป็นภาพอาจทำให้ text search, link, form, annotation และ accessibility structure หายไป

### 3.4 Images to PDF

- รวม JPG, PNG และ WebP เป็น PDF ตามลำดับ
- เลือกขนาดหน้า Auto, A4 หรือ Letter และแนว Auto, Portrait หรือ Landscape
- จัดภาพกึ่งกลางโดยไม่ crop

### 3.5 PDF to Images

- แปลงทุกหน้าเป็น JPG หรือ PNG
- เลือกความละเอียด 1x, 1.5x หรือ 2x
- หน้าเดียวดาวน์โหลดเป็นรูป หลายหน้าดาวน์โหลดเป็น ZIP

### 3.6 Rotate PDF

- หมุน 90, 180 หรือ 270 องศา ทั้งเอกสารหรือเฉพาะช่วงหน้า
- รักษาหน้าที่ไม่ได้เลือกไว้เหมือนเดิม

### 3.7 Watermark PDF

- ใส่ลายน้ำข้อความหรือรูป PNG/JPG
- เลือกตำแหน่ง ขนาด ความโปร่งใส และช่วงหน้า
- รักษาอัตราส่วนของรูปลายน้ำ

### 3.8 Protect PDF

- เข้ารหัส AES-256 ด้วยรหัสผ่านขั้นต่ำ 8 ตัวอักษรใน interface
- กำหนดสิทธิ์พิมพ์ คัดลอก แก้ไข annotation ประกอบเอกสาร และกรอก form
- DJAI ไม่สามารถกู้รหัสผ่านที่ลืมได้

### 3.9 Organize PDF

- เรียง ลบ หรือทำซ้ำหน้าด้วย sequence เช่น `3, 1-2, 5`
- สร้าง PDF ใหม่โดยไม่แก้ไฟล์ต้นฉบับ

### 3.10 Add Page Numbers

- ใส่เลขทุกหน้า เลือกเลขเริ่มต้น ตำแหน่งบน/ล่าง และซ้าย/กลาง/ขวา

### 3.11 Remove PDF Metadata

- ลบ title, author, subject, keywords, creator และ producer
- สร้างสำเนาใหม่โดยไม่เปลี่ยนเนื้อหาที่มองเห็น

## 4. เครื่องมือเอกสาร

ฟีเจอร์ร่วม: จำกัด 40 MB ต่อไฟล์, สูงสุด 20 ไฟล์สำหรับงานหลายไฟล์, ประมวลผลใน browser และมี preview/copy/download ตามประเภทเครื่องมือ

### 4.1 DOCX to PDF

- Preview DOCX แล้วสร้าง PDF ในเครื่อง
- เลือก A4, Letter หรือ Legal, margin 3 ระดับ และเลขหน้า
- Layout ซับซ้อน สมการ วัตถุลอย และ custom font อาจแตกต่างจาก Word

### 4.2 DOCX to HTML

- แปลงเป็น semantic HTML พร้อม heading, paragraph, list, link และ table
- Sanitize ด้วย DOMPurify และลบ script, iframe, form, embedded object และ event handler
- Preview, copy และดาวน์โหลด HTML

### 4.3 DOCX to Markdown

- แปลง HTML ที่ทำความสะอาดแล้วเป็น Markdown
- รักษา heading, list, link และ table ที่รองรับ
- Preview, copy และดาวน์โหลด `.md`

### 4.4 DOCX to Text

- ดึงข้อความล้วน ตัด formatting และรายงานคำกับ token โดยประมาณ
- Copy หรือดาวน์โหลด TXT

### 4.5 PDF to Text

- ดึง selectable text จากทุกหน้าหรือช่วงหน้าที่เลือก
- เลือกรักษา line break หรือจัดกลุ่มตามตำแหน่งแนวตั้ง
- รายงานหน้า คำ และ token โดยประมาณ

### 4.6 PDF to Word

- ดึงข้อความจากช่วงหน้าที่เลือกและสร้าง DOCX แบบ page-by-page
- เน้นข้อความและไม่รับประกัน layout เหมือนต้นฉบับ

### 4.7 Document OCR

- OCR scanned PDF, JPG และ PNG เป็นภาษาไทยหรืออังกฤษด้วย Tesseract.js
- ใช้ language data ในเครื่องและประมวลผล PDF ทีละหน้าเพื่อลด memory
- สร้าง TXT ที่ค้นหาและ copy ได้ พร้อมสถิติหน้า คำ และ token

## 5. เครื่องมือ AI และ Context

### 5.1 Token Counter

- รับข้อความ clipboard, drag-and-drop และไฟล์สูงสุด 10 ไฟล์
- รองรับ DOCX, selectable PDF, TXT, Markdown, CSV, JSON, code, HTML, CSS, XML และ YAML
- รองรับ tokenizer `o200k_base`, `cl100k_base` และ `p50k_base`
- นับ token, คำหลายภาษา, grapheme, ตัวอักษร, sentence, paragraph, line และ UTF-8 byte
- ประเมินเวลาอ่านและ context window 8K, 32K, 128K, 200K และ 1M
- คำนวณ context ที่ใช้ token ที่เหลือ และต้นทุน input ตามราคาที่ผู้ใช้ใส่
- Copy/Download รายงานและประมวลผลทั้งหมดใน browser

### 5.2 PDF to AI-Ready Markdown

- ดึงหน้าที่เลือก ใส่ page reference และทำความสะอาด header/footer ซ้ำ
- ซ่อมคำที่ถูกตัดด้วย hyphen, line wrap และช่องว่างเกิน
- สร้าง Markdown พร้อมสถิติหน้า คำ และ token สำหรับ ChatGPT, Claude, Cursor, Codex และ RAG

### 5.3 Context Optimizer

- รับข้อความหรือเอกสารและลบ header/footer, เลขหน้า, spacing และ line break ที่ไม่จำเป็น
- เปรียบเทียบ token ก่อน/หลัง พร้อม preview, copy และ download

### 5.4 RAG Chunk Calculator

- ตั้ง chunk 100–8,000 token และ overlap ตามต้องการ
- Preview chunk พร้อม ID, token count และข้อความ
- รายงานจำนวน chunk และ export เป็น JSONL สำหรับ embedding/knowledge base

### 5.5 Prompt Packager

- รวมหลายไฟล์และข้อความเสริม โดยติดชื่อไฟล์ให้แต่ละ section
- เลือกขอบเขตแบบ Markdown heading หรือ XML tag
- สร้าง prompt package เดียว พร้อมจำนวนไฟล์ คำ และ token โดยประมาณ

## 6. เครื่องมือ Spreadsheet และข้อมูล

- **CSV to JSON:** ใช้ header เป็น property สร้าง JSON array พร้อม preview/copy/download
- **JSON to CSV:** แปลง array ของ object เป็น column CSV
- **CSV Cleaner:** trim ค่า ลบแถวว่าง และลบข้อมูลซ้ำโดยรักษา header
- **Merge CSV:** รวมหลายไฟล์โดยจับคู่ชื่อ column แม้ลำดับ column ต่างกัน
- **Split CSV:** แบ่งตามจำนวนแถว 10–100,000 แถว รักษา header และดาวน์โหลด ZIP
- **CSV to XLSX:** สร้าง Excel workbook/worksheet พร้อม header และข้อมูล
- **XLSX to CSV:** เลือก worksheet และส่งออกเป็น CSV ใน browser

## 7. ฟีเจอร์ร่วม

- Interface และ metadata ภาษาไทย/อังกฤษ
- canonical URL และ `hreflang`
- Layout รองรับมือถือ
- ประมวลผลไฟล์ใน browser โดยไม่ต้องมีบัญชี
- ไม่มี upload backend สำหรับเครื่องมือแปลงไฟล์และไม่มีลายน้ำผลลัพธ์
- Drag-and-drop, validation, download ผ่าน Blob และ filename sanitization
- สถิติก่อน/หลัง, copy-to-clipboard และ reset
- โหลด processing library เมื่อจำเป็น และรองรับ static export สำหรับเครื่องมือส่วนใหญ่
- Structured data ประเภท SoftwareApplication, FAQ และ HowTo
- Internal link ระหว่างเครื่องมือที่เกี่ยวข้องและข้อความอธิบาย privacy
