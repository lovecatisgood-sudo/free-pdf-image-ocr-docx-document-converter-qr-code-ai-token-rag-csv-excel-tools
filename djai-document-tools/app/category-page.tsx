import { ArrowRight, FileText, ScanText, Sparkles, TableProperties } from "lucide-react";
import Image from "next/image";
import { categories, categoryHref, categoryOrder, toolHref, toolsFor, type Category, type Language, type ToolDefinition } from "./tool-data";

const icons = { document: FileText, ai: Sparkles, spreadsheet: TableProperties };

export default function CategoryPage({ category, language }: { category: Category; language: Language }) {
  const en = language === "en";
  const copy = categories[category];
  const selectedTools = toolsFor(category);
  const Icon = icons[category];
  const canonical = `https://www.djai.academy${categoryHref(category, language)}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title[language],
      url: canonical,
      description: copy.description[language],
      hasPart: selectedTools.map((tool) => ({
        "@type": "SoftwareApplication",
        name: tool.title[language],
        url: `https://www.djai.academy${toolHref(tool, language)}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" },
        { "@type": "ListItem", position: 2, name: en ? "All Tools" : "เครื่องมือทั้งหมด", item: en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" },
        { "@type": "ListItem", position: 3, name: copy.title[language], item: canonical }
      ]
    }
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SuiteHeader category={category} language={language} />
      <section className="suite-hero">
        <div>
          <p className="eyebrow">DJTOOLS BY DJAI ACADEMY</p>
          <h1>{copy.title[language]}</h1>
          <p>{copy.description[language]}</p>
          <a className="primary-button" href="#available-tools">{en ? "Choose a tool" : "เลือกเครื่องมือ"}<ArrowRight /></a>
        </div>
        <div className="hero-emblem"><Icon /><strong>{category.toUpperCase()}</strong><span>PRIVATE · FREE</span></div>
      </section>
      <section className="trust-strip">
        <span>{en ? "Free to use" : "ใช้ฟรี"}</span><span>{en ? "No account" : "ไม่ต้องสมัคร"}</span><span>{en ? "Local processing" : "ประมวลผลในเครื่อง"}</span><span>{en ? "No watermark" : "ไม่มี watermark"}</span>
      </section>
      <section className="tool-directory" id="available-tools">
        <div className="section-heading"><p className="eyebrow">{en ? "AVAILABLE NOW" : "พร้อมใช้งาน"}</p><h2>{en ? "Choose the job you need to complete" : "เลือกงานที่คุณต้องการทำ"}</h2></div>
        <div className="directory-grid">
          {selectedTools.map((tool, index) => (
            <a className="directory-item" href={toolHref(tool, language)} key={tool.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span><div><h2>{tool.label[language]}</h2><p>{tool.intent[language]}</p></div><ArrowRight />
            </a>
          ))}
        </div>
      </section>
      <ServiceBands language={language} category={category} />
      <SuiteFooter language={language} />
    </main>
  );
}

export function SuiteHeader({ category, language, tool }: { category: Category; language: Language; tool?: ToolDefinition }) {
  const en = language === "en";
  const languageTarget = tool ? toolHref(tool, en ? "th" : "en") : categoryHref(category, en ? "th" : "en");
  return <header className="suite-header">
    <a className="suite-brand" href={categoryHref(category, language)}><Image src="/tools/djai-assets/djai-academy-logo-small.webp" alt="DJAI Academy" width={84} height={45} loading="eager" /><span><strong>DJTools</strong><small>{en ? "Free browser tools" : "เครื่องมือฟรีบน browser"}</small></span></a>
    <nav aria-label="Tool categories">
      <a href={en ? "/tools/PDFTools/en/" : "/tools/PDFTools/"}>PDF</a>
      <a href={en ? "/tools/resizeimg/en/" : "/tools/resizeimg/"}>{en ? "Image" : "รูปภาพ"}</a>
      {categoryOrder.map((item) => <a className={item === category ? "active" : ""} href={categoryHref(item, language)} key={item}>{item === "document" ? (en ? "Document" : "เอกสาร") : item === "ai" ? "AI" : (en ? "Spreadsheet" : "ตารางข้อมูล")}</a>)}
      <a href={en ? "/tools/en/" : "/tools/"}>{en ? "All tools" : "ทั้งหมด"}</a>
      <a className="language-switch" href={languageTarget}>{en ? "ไทย" : "EN"}</a>
    </nav>
  </header>;
}

export function ServiceBands({ language, category }: { language: Language; category: Category }) {
  const en = language === "en";
  const service = category === "spreadsheet"
    ? { title: en ? "Need a dashboard instead of spreadsheets?" : "ต้องการ dashboard แทน spreadsheet?", text: en ? "DJAI builds operations platforms, CRM systems, reporting dashboards, and automated data workflows." : "DJAI พัฒนาระบบ operation, CRM, dashboard และ workflow ข้อมูลอัตโนมัติ" }
    : category === "ai"
      ? { title: en ? "Building a private AI knowledge base?" : "กำลังสร้าง AI knowledge base สำหรับองค์กร?", text: en ? "We design private RAG systems, company chatbots, document search, and AI automation around real business data." : "เราพัฒนา private RAG, chatbot องค์กร, document search และ AI automation จากข้อมูลธุรกิจจริง" }
      : { title: en ? "Processing documents repeatedly?" : "ต้องจัดการเอกสารซ้ำทุกวัน?", text: en ? "DJAI builds automated quotations, invoices, contracts, certificates, reports, and document portals." : "DJAI พัฒนาระบบใบเสนอราคา invoice สัญญา certificate report และ document portal อัตโนมัติ" };
  return <>
    <section className="service-band"><div><p className="eyebrow">{en ? "BUILD WITH DJAI" : "พัฒนากับ DJAI"}</p><h2>{service.title}</h2><p>{service.text}</p></div><a className="primary-button" href={en ? "/development/en/" : "/development/"}>{en ? "Discuss your system" : "คุยเรื่องระบบของคุณ"}<ArrowRight /></a></section>
    <section className="course-band"><ScanText /><div><p className="eyebrow">VIBE CODING</p><h2>{en ? "Learn to turn a workflow into a working product" : "เรียนเปลี่ยน workflow ให้เป็น product ที่ใช้งานได้"}</h2><p>{en ? "Build websites, applications, and automation with AI through a practical one-day workshop." : "สร้างเว็บไซต์ application และ automation ด้วย AI ใน workshop ที่ลงมือทำจริง"}</p></div><a href={en ? "/course/detail/en/" : "/course/detail/"}>{en ? "Explore the course" : "ดูรายละเอียดคอร์ส"}<ArrowRight /></a></section>
  </>;
}

export function SuiteFooter({ language }: { language: Language }) {
  const en = language === "en";
  const devHref = en ? "/siamese_cat/dev/en/" : "/siamese_cat/dev/";
  return <footer className="suite-footer"><div><a href={devHref} aria-label={en ? "Meet Siamese Cat Dev" : "รู้จัก Siamese Cat Dev"}><Image src="/tools/djai-assets/siamese-cat-dev-logo.webp" alt="Siamese Cat Dev" width={130} height={109} loading="lazy" /></a><p>{en ? <>Created with intention by <a href={devHref}>Siamese Cat Dev</a>, DJAI Academy&apos;s product and development partner.</> : <>สร้างด้วยความตั้งใจโดย <a href={devHref}>Siamese Cat Dev</a> พันธมิตรด้าน product และ development ของ DJAI Academy</>}</p></div><div><strong>DJAI</strong><a href={en ? "/en/" : "/"}>DJAI Academy</a><a href={en ? "/service/en/" : "/service/"}>{en ? "Services" : "บริการ"}</a><a href={en ? "/portfolio/en/" : "/portfolio/"}>{en ? "Portfolio" : "ผลงาน"}</a></div><div><strong>{en ? "TOOLS" : "เครื่องมือ"}</strong><a href={categoryHref("document", language)}>{en ? "Document tools" : "เครื่องมือเอกสาร"}</a><a href={categoryHref("ai", language)}>AI Tools</a><a href={categoryHref("spreadsheet", language)}>{en ? "Spreadsheet tools" : "เครื่องมือตารางข้อมูล"}</a></div><small>© 2026 DJAI Academy · {en ? "Files are processed locally unless clearly stated otherwise." : "ไฟล์ประมวลผลในอุปกรณ์ เว้นแต่มีการแจ้งอย่างชัดเจน"}</small></footer>;
}
