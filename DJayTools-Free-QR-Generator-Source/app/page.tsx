"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CornerSquareType, DotType } from "qr-code-styling";

const COLORS = ["#D97757", "#0B32A4", "#00BFD8", "#5630C8", "#071E3D", "#F2A65A", "#2E8B57", "#D7467D"];
const BASE_PATH = "/tools/qrgen";
const assetPath = (path: string) => `${BASE_PATH}/${path}`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DJayTools Free QR Generator",
  url: "https://www.djai.academy/tools/qrgen/",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web browser",
  description:
    "เครื่องมือสร้าง QR code ฟรีใน browser สำหรับดาวน์โหลด QR code เป็น PNG หรือ SVG โดยไม่ต้องสมัครบัญชีและไม่มี watermark",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/",
  },
};

const dotStyles: { label: string; value: DotType }[] = [
  { label: "สี่เหลี่ยม", value: "square" },
  { label: "มน", value: "rounded" },
  { label: "จุด", value: "dots" },
];

const cornerStyles: { label: string; value: CornerSquareType }[] = [
  { label: "สี่เหลี่ยม", value: "square" },
  { label: "มน", value: "extra-rounded" },
];

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default function Home() {
  const qrMount = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<import("qr-code-styling").default | null>(null);
  const [url, setUrl] = useState("https://www.djai.academy");
  const [dots, setDots] = useState<DotType>("rounded");
  const [corners, setCorners] = useState<CornerSquareType>("extra-rounded");
  const [color, setColor] = useState(COLORS[0]);
  const [frame, setFrame] = useState<"none" | "simple" | "label">("label");
  const [format, setFormat] = useState<"png" | "svg">("png");
  const [error, setError] = useState("");

  const normalizedUrl = useMemo(() => normalizeUrl(url), [url]);

  useEffect(() => {
    let active = true;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!active || !qrMount.current) return;
      const instance = new QRCodeStyling({
        width: 280,
        height: 280,
        type: "svg",
        data: normalizedUrl || "https://www.djai.academy",
        margin: 12,
        qrOptions: { errorCorrectionLevel: "Q" },
        dotsOptions: { type: dots, color },
        cornersSquareOptions: { type: corners, color },
        cornersDotOptions: { type: "dot", color },
        backgroundOptions: { color: "#ffffff" },
      });
      qrMount.current.innerHTML = "";
      instance.append(qrMount.current);
      qrInstance.current = instance;
    });
    return () => {
      active = false;
    };
  }, [normalizedUrl, dots, corners, color]);

  function validate() {
    try {
      const parsed = new URL(normalizedUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
      setError("");
      return true;
    } catch {
      setError("กรุณาใส่ URL ที่ถูกต้อง เช่น https://example.com");
      return false;
    }
  }

  function download() {
    if (!validate() || !qrInstance.current) return;
    qrInstance.current.download({ name: "DJayTools-QR-Code", extension: format });
  }

  function scrollToGenerator() {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="หน้าแรก DJayTools">
          <img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" decoding="async" />
          <span><strong>DJayTools</strong><small>by DJAI Academy</small></span>
        </a>
        <nav aria-label="เมนูหลัก">
          <a href="#profile">ผู้พัฒนา</a>
          <a href="https://www.djai.academy/" target="_blank" rel="noopener noreferrer">DJAI Academy <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/development/" target="_blank" rel="noopener noreferrer">พัฒนาโปรเจกต์ <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/tools/resizeimg/" target="_blank" rel="noopener noreferrer">เครื่องมือรูปภาพ <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/blog/" target="_blank" rel="noopener noreferrer">บล็อก <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/tools/qrgen/en/" hrefLang="en">EN</a>
          <a className="nav-cta" href="https://www.djai.academy/course/#community" target="_blank" rel="noopener noreferrer">เข้าร่วมชุมชน</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span>ฟรี 100%</span> · ไม่ต้องสมัครบัญชี</div>
        <h1>เปลี่ยนทุกลิงก์ให้เป็น<br /><em>QR code ที่สวยและพร้อมใช้</em></h1>
        <p>สร้าง ปรับแต่ง และดาวน์โหลด QR code คุณภาพสูงได้ในไม่กี่วินาที เป็นส่วนตัว ใช้ได้ไม่จำกัด และฟรี</p>
        <a className="developer-credit" href="https://www.djai.academy/siamese_cat/dev/" target="_blank" rel="noopener noreferrer" aria-label="ดูข้อมูลเพิ่มเติมเกี่ยวกับ Siamese Cat Dev">
          <img src={assetPath("siamese-cat-dev-logo.webp")} alt="Siamese Cat Dev" width="900" height="900" loading="lazy" decoding="async" />
          <span><small>พัฒนาแอปโดย</small><strong>Siamese Cat Dev</strong></span>
        </a>
        <button className="primary hero-button" onClick={scrollToGenerator}>สร้าง QR code ฟรี <span>↘</span></button>
        <div className="hero-note"><span>✓</span> สร้างได้ไม่จำกัด <span>✓</span> ดาวน์โหลด PNG &amp; SVG <span>✓</span> ใช้งานได้ถาวร</div>
      </section>

      <section className="generator-shell" id="generator">
        <div className="generator-head">
          <div>
            <span className="step-tag">เครื่องมือสร้าง QR ฟรี</span>
            <h2>สร้าง QR code ได้ในไม่กี่วินาที</h2>
          </div>
          <p>ไม่ต้องมีบัญชี ไม่มี watermark ไม่มีวันหมดอายุ</p>
        </div>

        <div className="generator-card">
          <div className="controls">
            <div className="control-block">
              <label htmlFor="destination"><b>1</b> ใส่ลิงก์ปลายทาง</label>
              <div className={`url-field ${error ? "has-error" : ""}`}>
                <span aria-hidden="true">↗</span>
                <input id="destination" value={url} onChange={(e) => { setUrl(e.target.value); setError(""); }} onBlur={validate} placeholder="https://example.com/your-link" inputMode="url" />
              </div>
              {error && <p className="error" role="alert">{error}</p>}
            </div>

            <div className="control-block split-options">
              <fieldset>
                <legend><b>2</b> รูปแบบลาย</legend>
                <div className="option-row">
                  {dotStyles.map((item) => <button key={item.value} aria-label={`เลือกลาย QR แบบ${item.label}`} aria-pressed={dots === item.value} onClick={() => setDots(item.value)} className={`pattern-option ${dots === item.value ? "selected" : ""}`}><span className={`pattern-preview ${item.value}`} /></button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend>มุม</legend>
                <div className="option-row">
                  {cornerStyles.map((item) => <button key={item.value} aria-label={`เลือกมุม QR แบบ${item.label}`} aria-pressed={corners === item.value} onClick={() => setCorners(item.value)} className={`corner-option ${corners === item.value ? "selected" : ""}`}><span className={item.value} /></button>)}
                </div>
              </fieldset>
            </div>

            <fieldset className="control-block">
              <legend><b>3</b> เลือกสี</legend>
              <div className="colors">
                {COLORS.map((item) => <button key={item} aria-label={`ใช้สี ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} className={color === item ? "selected" : ""} style={{ backgroundColor: item }} />)}
              </div>
            </fieldset>

            <fieldset className="control-block">
              <legend><b>4</b> เพิ่มกรอบ <span>(ไม่บังคับ)</span></legend>
              <div className="frame-options">
                <button className={frame === "none" ? "selected" : ""} onClick={() => setFrame("none")} aria-pressed={frame === "none"}><span className="no-frame">×</span><small>ไม่มี</small></button>
                <button className={frame === "simple" ? "selected" : ""} onClick={() => setFrame("simple")} aria-pressed={frame === "simple"}><span className="simple-frame" /><small>เรียบง่าย</small></button>
                <button className={frame === "label" ? "selected" : ""} onClick={() => setFrame("label")} aria-pressed={frame === "label"}><span className="label-frame">SCAN ME</span><small>มีป้าย</small></button>
              </div>
            </fieldset>
          </div>

          <div className="preview-panel">
            <div className="preview-top"><span>ตัวอย่างแบบสด</span><i><span /> พร้อมสแกน</i></div>
            <div className={`qr-frame frame-${frame}`}>
              <div ref={qrMount} className="qr-mount" aria-label="ตัวอย่าง QR code" />
              {frame === "label" && <strong>SCAN ME</strong>}
            </div>
            <p>QR code แบบ static นี้ไม่มีวันหมดอายุ</p>
            <div className="download-controls">
              <div className="format-switch" aria-label="รูปแบบไฟล์ดาวน์โหลด">
                <button className={format === "png" ? "active" : ""} onClick={() => setFormat("png")}>PNG</button>
                <button className={format === "svg" ? "active" : ""} onClick={() => setFormat("svg")}>SVG</button>
              </div>
              <button className="primary download" onClick={download}>ดาวน์โหลด QR <span>↓</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="ประโยชน์ของเครื่องมือ">
        <div><b>∞</b><span><strong>ไม่จำกัด</strong><small>สร้างได้เท่าที่ต้องการ</small></span></div>
        <div><b>◌</b><span><strong>เป็นส่วนตัว</strong><small>ลิงก์ของคุณอยู่ใน browser</small></span></div>
        <div><b>↯</b><span><strong>ดาวน์โหลดทันที</strong><small>ไฟล์ PNG และ SVG พร้อมใช้งาน</small></span></div>
      </section>

      <section className="how-section" id="how">
        <div className="section-intro">
          <span className="step-tag">วิธีใช้งาน</span>
          <h2>จากลิงก์เป็น QR<br />ใน 3 ขั้นตอนง่ายๆ</h2>
          <p>ไม่ซับซ้อน ไม่ต้องเรียนรู้เยอะ แค่เครื่องมือที่ทำหน้าที่ของมันให้ดี</p>
        </div>
        <div className="steps">
          <article><span>01</span><div className="step-icon">↗</div><h3>วางลิงก์</h3><p>ใส่เว็บไซต์ เมนู social profile ฟอร์ม หรือปลายทางออนไลน์ที่ต้องการ</p></article>
          <article><span>02</span><div className="step-icon">✦</div><h3>ปรับแต่ง</h3><p>เลือกลาย มุม สี และกรอบให้เหมาะกับสไตล์ของคุณ</p></article>
          <article><span>03</span><div className="step-icon">↓</div><h3>ดาวน์โหลดและแชร์</h3><p>บันทึกเป็น PNG หรือ SVG สำหรับใช้บนหน้าจอหรือพิมพ์</p></article>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="feature-copy">
          <span className="step-tag light">สร้างมาเพื่อใช้งานจริง</span>
          <h2>เรียบง่ายโดยตั้งใจ<br /><em>แต่แข็งแรงในจุดที่สำคัญ</em></h2>
          <p>DJayTools ให้ผลลัพธ์ระดับมืออาชีพโดยไม่ต้องสมัคร ไม่ต้องจ่าย และไม่มีขั้นตอนเกินจำเป็น</p>
          <ul>
            <li><span>✓</span><div><strong>ไฟล์ความละเอียดสูง</strong><small>คมพอสำหรับนามบัตร poster packaging และเมนู</small></div></li>
            <li><span>✓</span><div><strong>QR code ใช้งานได้ถาวร</strong><small>Static code วิ่งตรงไปที่ลิงก์ของคุณโดยไม่พึ่ง server ของเรา</small></div></li>
            <li><span>✓</span><div><strong>ไม่มีอะไรให้จัดการเพิ่ม</strong><small>ไม่มี login ไม่มี dashboard ไม่มี trial และไม่มี paywall แอบซ่อน</small></div></li>
          </ul>
        </div>
        <div className="feature-art" aria-hidden="true">
          <div className="poster-card"><span>ชี้กล้อง สแกน<br /><b>เปิดปลายทาง</b></span><div className="mini-qr">▦</div><small>สร้างด้วย DJAYTOOLS</small></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <span className="spark spark-a">✦</span><span className="spark spark-b">✦</span>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="step-tag">พร้อมเมื่อคุณพร้อม</span>
          <h2>QR code ถัดไปของคุณ<br />อยู่ห่างแค่ไม่กี่วินาที</h2>
        </div>
        <button className="primary" onClick={scrollToGenerator}>สร้าง QR code ฟรี <span>↗</span></button>
      </section>

      <section className="developer-profile" id="profile">
        <div className="developer-logo-stage">
          <a href="https://www.djai.academy/siamese_cat/dev/" target="_blank" rel="noopener noreferrer" aria-label="ดูโปรไฟล์ Siamese Cat Dev">
            <img src={assetPath("siamese-cat-dev-logo.webp")} alt="Siamese Cat Dev logo" width="900" height="900" loading="lazy" decoding="async" />
          </a>
        </div>
        <div className="developer-profile-copy">
          <span className="step-tag">ผู้พัฒนา</span>
          <h2>สร้างด้วยความตั้งใจโดย<br /><em><a href="https://www.djai.academy/siamese_cat/dev/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev.</a></em></h2>
          <p><a className="inline-profile-link" href="https://www.djai.academy/siamese_cat/dev/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev</a> เป็น product designer, project manager และ software development partner ที่มีประสบการณ์เกือบ 10 ปีในการสร้าง digital product ให้ธุรกิจจริง</p>
          <p>เขายังเป็นนักเรียนของ DJAI Academy และเป็น partner ด้าน development/training ที่ช่วยเปลี่ยนไอเดียให้เป็น product ที่ใช้งานได้จริง</p>
          <div className="developer-tags"><span>Product Design</span><span>Project Management</span><span>Software Development</span><span>Training</span></div>
        </div>
      </section>

      <footer>
        <div className="footer-identity">
          <a className="brand footer-brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" loading="lazy" decoding="async" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a>
          <p>เครื่องมือดิจิทัลที่มีประโยชน์ สร้างเพื่อชุมชนและคนทำงานจริง</p>
        </div>
        <nav className="footer-links" aria-label="ลิงก์ของ DJAI และ partner">
          <div>
            <strong>DJAI</strong>
            <a href="https://www.djai.academy/" target="_blank" rel="noopener noreferrer">DJAI Academy</a>
            <a href="https://www.djai.academy/tools/" target="_blank" rel="noopener noreferrer">เครื่องมือฟรีจาก DJAI</a>
            <a href="https://www.djai.academy/service/" target="_blank" rel="noopener noreferrer">พัฒนาโปรเจกต์กับเรา</a>
          </div>
          <div>
            <strong>พาร์ทเนอร์ผู้พัฒนา</strong>
            <a href="https://www.djai.academy/siamese_cat/dev/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev</a>
            <a href="https://creative.siamesecat.cafe" target="_blank" rel="noopener noreferrer">Siamese Cat Creative Club</a>
          </div>
          <div>
            <strong>Siamese Cat Group</strong>
            <a href="https://siamesecat.cafe" target="_blank" rel="noopener noreferrer">Siamese Cat Cafe</a>
            <a href="https://hotel.siamesecat.cafe" target="_blank" rel="noopener noreferrer">Siamese Cat Hotel</a>
          </div>
        </nav>
        <p className="copyright">© 2026 DJAI Academy</p>
      </footer>
    </main>
  );
}
