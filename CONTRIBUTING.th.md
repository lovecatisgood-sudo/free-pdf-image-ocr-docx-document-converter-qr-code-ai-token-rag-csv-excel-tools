# การร่วมพัฒนาเครื่องมือ PDF รูปภาพ OCR และแปลงเอกสาร

[English](CONTRIBUTING.md) · [README ภาษาไทย](README.th.md)

ขอบคุณที่ช่วยพัฒนาชุดเครื่องมือ PDF รูปภาพ OCR และแปลงเอกสาร

## ก่อนเริ่มงาน

1. ค้นหา issue และ pull request เดิมก่อน
2. เปิด issue ก่อนทำการเปลี่ยน architecture ขนาดใหญ่
3. ให้หนึ่ง pull request แก้ปัญหาหรือเพิ่มฟีเจอร์ที่ชัดเจนหนึ่งเรื่อง
4. ห้ามส่ง secret, เอกสารส่วนตัว, ข้อมูลลูกค้า หรือ asset ที่ไม่มีสิทธิ์เผยแพร่

## ติดตั้งสำหรับพัฒนา

```bash
git clone https://github.com/lovecatisgood-sudo/free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools.git
cd free-pdf-image-ocr-docx-document-converter-qr-code-ai-token-rag-csv-excel-tools
npm run setup
```

ดูคำสั่งเปิดแต่ละ application ใน [README.th.md](README.th.md)

## การตรวจสอบก่อนส่ง Pull Request

```bash
npm run build
npm run lint
npm test
```

เมื่อแก้เครื่องมือ ควรเพิ่มหรือปรับ test สำหรับ processing, export, validation และ route ภาษาไทย/อังกฤษที่เกี่ยวข้อง

## Pull Request ที่ดีควรมี

- ชื่อที่อธิบายการเปลี่ยนแปลงชัดเจน
- ปัญหาของผู้ใช้และเหตุผลของวิธีแก้
- รายการคำสั่ง build/test ที่รันแล้ว
- Screenshot เมื่อเปลี่ยน interface
- ผลกระทบต่อ privacy, security, accessibility, compatibility, memory หรือ file format
- ไม่มี dependency หรือ formatting change ที่ไม่เกี่ยวข้อง

## แนวทางโค้ด

- ทำตามรูปแบบ JavaScript, TypeScript, React และ CSS ของ package ที่แก้
- รักษาการประมวลผลใน browser หากฟีเจอร์ไม่จำเป็นต้องใช้ server
- รักษาความเท่าเทียมของ interface ภาษาไทยและอังกฤษ
- ระบุ file-size และ memory limit ให้ชัดเจน
- ไม่เพิ่ม runtime dependency จาก CDN หากสามารถ pin และ bundle package ใน repository ได้

## License ของ Contribution

เมื่อส่ง contribution คุณยอมรับว่า contribution สามารถเผยแพร่ภายใต้ MIT License ของ repository นี้ได้ อย่าส่งโค้ดหรือสื่อที่คุณไม่มีสิทธิ์ให้ license

Dependency หรือ material ที่นำมาใช้ต้องมี license ที่เข้ากันได้ และควรบันทึกใน [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) เมื่อจำเป็น

การเข้าร่วมโครงการอยู่ภายใต้ [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
