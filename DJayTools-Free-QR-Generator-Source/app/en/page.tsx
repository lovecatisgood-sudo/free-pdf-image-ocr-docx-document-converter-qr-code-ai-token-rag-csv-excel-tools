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
  url: "https://www.djai.academy/tools/qrgen/en/",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web browser",
  description:
    "A free browser-based QR code generator for creating custom PNG and SVG QR codes with no account and no watermark.",
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
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Dots", value: "dots" },
];

const cornerStyles: { label: string; value: CornerSquareType }[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "extra-rounded" },
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
      setError("Enter a valid website address, such as https://example.com");
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
        <a className="brand" href="#top" aria-label="DJayTools home">
          <img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" decoding="async" />
          <span><strong>DJayTools</strong><small>by DJAI Academy</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#profile">Profile</a>
          <a href="https://www.djai.academy/en/" target="_blank" rel="noopener noreferrer">DJAI Academy <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/development/en/" target="_blank" rel="noopener noreferrer">Develop with us <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/tools/resizeimg/en/" target="_blank" rel="noopener noreferrer">Image tools <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/blog/en/" target="_blank" rel="noopener noreferrer">Blog <span className="external-mark">↗</span></a>
          <a href="https://www.djai.academy/tools/qrgen/" hrefLang="th">ไทย</a>
          <a className="nav-cta" href="https://www.djai.academy/course/en/#community" target="_blank" rel="noopener noreferrer">Join community</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span>100% free</span> · No sign-up required</div>
        <h1>Turn any link into a<br /><em>beautiful QR code.</em></h1>
        <p>Create, customize, and download a high-quality QR code in seconds. Private, unlimited, and completely free.</p>
        <a className="developer-credit" href="https://www.djai.academy/siamese_cat/dev/en/" target="_blank" rel="noopener noreferrer" aria-label="Learn more about Siamese Cat Dev">
          <img src={assetPath("siamese-cat-dev-logo.webp")} alt="Siamese Cat Dev" width="900" height="900" loading="lazy" decoding="async" />
          <span><small>APP DEVELOPED BY</small><strong>Siamese Cat Dev</strong></span>
        </a>
        <button className="primary hero-button" onClick={scrollToGenerator}>Create your free QR code <span>↘</span></button>
        <div className="hero-note"><span>✓</span> Unlimited QR codes <span>✓</span> PNG &amp; SVG downloads <span>✓</span> Works forever</div>
      </section>

      <section className="generator-shell" id="generator">
        <div className="generator-head">
          <div>
            <span className="step-tag">FREE QR GENERATOR</span>
            <h2>Create yours in seconds</h2>
          </div>
          <p>No account. No watermark. No expiry.</p>
        </div>

        <div className="generator-card">
          <div className="controls">
            <div className="control-block">
              <label htmlFor="destination"><b>1</b> Enter your destination</label>
              <div className={`url-field ${error ? "has-error" : ""}`}>
                <span aria-hidden="true">↗</span>
                <input id="destination" value={url} onChange={(e) => { setUrl(e.target.value); setError(""); }} onBlur={validate} placeholder="https://example.com/your-link" inputMode="url" />
              </div>
              {error && <p className="error" role="alert">{error}</p>}
            </div>

            <div className="control-block split-options">
              <fieldset>
                <legend><b>2</b> Pattern</legend>
                <div className="option-row">
                  {dotStyles.map((item) => <button key={item.value} aria-label={`${item.label} QR pattern`} aria-pressed={dots === item.value} onClick={() => setDots(item.value)} className={`pattern-option ${dots === item.value ? "selected" : ""}`}><span className={`pattern-preview ${item.value}`} /></button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend>Corners</legend>
                <div className="option-row">
                  {cornerStyles.map((item) => <button key={item.value} aria-label={`${item.label} QR corners`} aria-pressed={corners === item.value} onClick={() => setCorners(item.value)} className={`corner-option ${corners === item.value ? "selected" : ""}`}><span className={item.value} /></button>)}
                </div>
              </fieldset>
            </div>

            <fieldset className="control-block">
              <legend><b>3</b> Choose your color</legend>
              <div className="colors">
                {COLORS.map((item) => <button key={item} aria-label={`Use color ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} className={color === item ? "selected" : ""} style={{ backgroundColor: item }} />)}
              </div>
            </fieldset>

            <fieldset className="control-block">
              <legend><b>4</b> Add a frame <span>(optional)</span></legend>
              <div className="frame-options">
                <button className={frame === "none" ? "selected" : ""} onClick={() => setFrame("none")} aria-pressed={frame === "none"}><span className="no-frame">×</span><small>None</small></button>
                <button className={frame === "simple" ? "selected" : ""} onClick={() => setFrame("simple")} aria-pressed={frame === "simple"}><span className="simple-frame" /><small>Simple</small></button>
                <button className={frame === "label" ? "selected" : ""} onClick={() => setFrame("label")} aria-pressed={frame === "label"}><span className="label-frame">SCAN ME</span><small>Label</small></button>
              </div>
            </fieldset>
          </div>

          <div className="preview-panel">
            <div className="preview-top"><span>LIVE PREVIEW</span><i><span /> Ready to scan</i></div>
            <div className={`qr-frame frame-${frame}`}>
              <div ref={qrMount} className="qr-mount" aria-label="QR code preview" />
              {frame === "label" && <strong>SCAN ME</strong>}
            </div>
            <p>This static QR code never expires.</p>
            <div className="download-controls">
              <div className="format-switch" aria-label="Download format">
                <button className={format === "png" ? "active" : ""} onClick={() => setFormat("png")}>PNG</button>
                <button className={format === "svg" ? "active" : ""} onClick={() => setFormat("svg")}>SVG</button>
              </div>
              <button className="primary download" onClick={download}>Download QR <span>↓</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Product benefits">
        <div><b>∞</b><span><strong>Unlimited</strong><small>Create as many as you need</small></span></div>
        <div><b>◌</b><span><strong>Private by design</strong><small>Your links stay in your browser</small></span></div>
        <div><b>↯</b><span><strong>Instant download</strong><small>Print-ready PNG and SVG</small></span></div>
      </section>

      <section className="how-section" id="how">
        <div className="section-intro">
          <span className="step-tag">HOW IT WORKS</span>
          <h2>From link to QR in<br />three simple steps.</h2>
          <p>No learning curve. No complicated settings. Just a useful tool that gets out of your way.</p>
        </div>
        <div className="steps">
          <article><span>01</span><div className="step-icon">↗</div><h3>Paste your link</h3><p>Add any website, menu, social profile, form, or online destination.</p></article>
          <article><span>02</span><div className="step-icon">✦</div><h3>Make it yours</h3><p>Choose a pattern, corners, color, and frame that fit your style.</p></article>
          <article><span>03</span><div className="step-icon">↓</div><h3>Download &amp; share</h3><p>Save a crisp PNG or scalable SVG ready for screen or print.</p></article>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="feature-copy">
          <span className="step-tag light">BUILT FOR EVERYDAY USE</span>
          <h2>Simple on purpose.<br /><em>Powerful where it matters.</em></h2>
          <p>DJayTools gives you professional output without subscriptions, accounts, or unnecessary steps.</p>
          <ul>
            <li><span>✓</span><div><strong>High-resolution output</strong><small>Sharp enough for business cards, posters, packaging, and menus.</small></div></li>
            <li><span>✓</span><div><strong>Your QR codes work forever</strong><small>Static codes go directly to your link and never depend on our servers.</small></div></li>
            <li><span>✓</span><div><strong>Nothing to manage</strong><small>No login, dashboard, trial period, or surprise paywall.</small></div></li>
          </ul>
        </div>
        <div className="feature-art" aria-hidden="true">
          <div className="poster-card"><span>POINT. SCAN.<br /><b>DISCOVER.</b></span><div className="mini-qr">▦</div><small>CREATED WITH DJAYTOOLS</small></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <span className="spark spark-a">✦</span><span className="spark spark-b">✦</span>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="step-tag">READY WHEN YOU ARE</span>
          <h2>Your next QR code<br />is only seconds away.</h2>
        </div>
        <button className="primary" onClick={scrollToGenerator}>Create a free QR code <span>↗</span></button>
      </section>

      <section className="developer-profile" id="profile">
        <div className="developer-logo-stage">
          <a href="https://www.djai.academy/siamese_cat/dev/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Siamese Cat Dev profile">
            <img src={assetPath("siamese-cat-dev-logo.webp")} alt="Siamese Cat Dev logo" width="900" height="900" loading="lazy" decoding="async" />
          </a>
        </div>
        <div className="developer-profile-copy">
          <span className="step-tag">MEET THE DEVELOPER</span>
          <h2>Built with care by<br /><em><a href="https://www.djai.academy/siamese_cat/dev/en/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev.</a></em></h2>
          <p><a className="inline-profile-link" href="https://www.djai.academy/siamese_cat/dev/en/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev</a> is a product designer, project manager, and software development partner with close to 10 years of experience building digital products. He has spent the past decade leading his own development team and working closely with businesses to design, build, and launch practical software solutions.</p>
          <p>He is also a student of DJAI Academy and now serves as a development and training partner, helping turn ideas into useful, real-world products.</p>
          <div className="developer-tags"><span>Product Design</span><span>Project Management</span><span>Software Development</span><span>Training</span></div>
        </div>
      </section>

      <footer>
        <div className="footer-identity">
          <a className="brand footer-brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" loading="lazy" decoding="async" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a>
          <p>Useful digital tools, thoughtfully made for the community.</p>
        </div>
        <nav className="footer-links" aria-label="DJAI and partner links">
          <div>
            <strong>DJAI</strong>
            <a href="https://www.djai.academy/en/" target="_blank" rel="noopener noreferrer">DJAI Academy</a>
            <a href="https://www.djai.academy/tools/en/" target="_blank" rel="noopener noreferrer">Free DJAI Tools</a>
            <a href="https://www.djai.academy/service/en/" target="_blank" rel="noopener noreferrer">Develop With Us</a>
          </div>
          <div>
            <strong>Builder Partners</strong>
            <a href="https://www.djai.academy/siamese_cat/dev/en/" target="_blank" rel="noopener noreferrer">Siamese Cat Dev</a>
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
