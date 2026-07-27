import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { ServiceBands, SuiteFooter, SuiteHeader } from "./category-page";
import ToolWorkspace from "./ToolWorkspace";
import { categoryHref, toolHref, toolsFor, type Language, type ToolDefinition } from "./tool-data";

export default function ToolPage({ tool, language }: { tool: ToolDefinition; language: Language }) {
  const en = language === "en";
  const canonical = `https://www.djai.academy${toolHref(tool, language)}`;
  const tokenCounter = tool.slug === "token-counter";
  const steps = tokenCounter
    ? (en ? ["Paste text or import a supported document", "Choose a tokenizer encoding and context size", "Review live tokens, words, characters, context use, and cost"] : ["วางข้อความหรือนำเข้าเอกสารที่รองรับ", "เลือก tokenizer encoding และขนาด context", "ดู token คำ ตัวอักษร context และค่าใช้จ่ายแบบ live"])
    : (en ? ["Choose a supported file or paste text", "Review the relevant settings", "Process locally and download or copy the result"] : ["เลือกไฟล์ที่รองรับหรือวางข้อความ", "ตรวจตัวเลือกที่เกี่ยวข้อง", "ประมวลผลในเครื่องแล้วดาวน์โหลดหรือคัดลอกผลลัพธ์"]);
  const faq = tokenCounter ? (en ? [
    ["Does the token counter upload my text?", "No. Text and imported documents are read and counted locally in your browser."],
    ["Why is a token count different from a word count?", "AI tokenizers split text into model-readable units. One word can use one or several tokens, and the ratio varies by language and content."],
    ["Can it count Thai, Chinese, Japanese, and English words?", "Yes. Word and character statistics use browser language segmentation for multilingual text, while AI tokens use the selected tokenizer encoding."],
    ["Which tokenizer should I choose?", "Use o200k_base for a modern OpenAI-compatible estimate, cl100k_base for earlier GPT-era workflows, or p50k_base for legacy content. Always confirm the tokenizer used by your target model or API."]
  ] : [
    ["เครื่องมือนี้ upload ข้อความหรือไม่?", "ไม่ ข้อความและเอกสารที่นำเข้าจะถูกอ่านและนับใน browser ของคุณ"],
    ["ทำไมจำนวน token ไม่เท่ากับจำนวนคำ?", "AI tokenizer แบ่งข้อความเป็นหน่วยที่ model อ่านได้ หนึ่งคำอาจใช้หนึ่งหรือหลาย token และสัดส่วนจะแตกต่างตามภาษาและเนื้อหา"],
    ["นับคำภาษาไทย จีน ญี่ปุ่น และอังกฤษได้หรือไม่?", "ได้ สถิติคำและตัวอักษรใช้ระบบแบ่งภาษาของ browser ส่วน AI token ใช้ tokenizer encoding ที่คุณเลือก"],
    ["ควรเลือก tokenizer ใด?", "ใช้ o200k_base สำหรับค่าประมาณแบบ OpenAI รุ่นใหม่ cl100k_base สำหรับ workflow รุ่นก่อน หรือ p50k_base สำหรับระบบเก่า และควรตรวจ tokenizer ของ model หรือ API ที่ใช้งานจริงเสมอ"]
  ]) : (en ? [
    ["Are my files uploaded?", "No. This tool processes files in browser memory on your device."],
    ["Is the tool free?", "Yes. Core processing is free, requires no account, and adds no watermark."],
    ["Why can formatting change?", "Document formats store layout differently. Browser conversion prioritizes privacy and practical output over exact reconstruction."]
  ] : [
    ["ไฟล์ถูก upload หรือไม่?", "ไม่ เครื่องมือนี้ประมวลผลไฟล์ใน memory ของ browser บนอุปกรณ์ของคุณ"],
    ["ใช้งานฟรีหรือไม่?", "ใช้งานฟรี ไม่ต้องสมัคร และไม่มี watermark"],
    ["ทำไม formatting อาจเปลี่ยน?", "แต่ละ format เก็บ layout ต่างกัน การแปลงใน browser เน้น privacy และผลลัพธ์ที่ใช้งานได้มากกว่าการจำลองต้นฉบับแบบสมบูรณ์"]
  ]);
  const related = toolsFor(tool.category).filter((candidate) => candidate.slug !== tool.slug).slice(0, 4);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.title[language], description: tool.description[language], url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
    { "@context": "https://schema.org", "@type": "HowTo", name: tool.title[language], totalTime: "PT3M", step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, name: text, text })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "DJAI Academy", item: en ? "https://www.djai.academy/en/" : "https://www.djai.academy/" }, { "@type": "ListItem", position: 2, name: en ? "All Tools" : "เครื่องมือทั้งหมด", item: en ? "https://www.djai.academy/tools/en/" : "https://www.djai.academy/tools/" }, { "@type": "ListItem", position: 3, name: tool.category, item: `https://www.djai.academy${categoryHref(tool.category, language)}` }, { "@type": "ListItem", position: 4, name: tool.title[language], item: canonical }] }
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SuiteHeader category={tool.category} language={language} tool={tool} />
    <section className="tool-intro"><a href={categoryHref(tool.category, language)}><ArrowLeft />{en ? `Back to ${tool.category} tools` : "กลับไปหน้าเครื่องมือ"}</a><p className="eyebrow">{tool.label[language]}</p><h1>{tool.title[language]}</h1><p>{tool.description[language]}</p><div><span><ShieldCheck />{en ? "Private browser processing" : "ประมวลผลแบบ private ใน browser"}</span><span>{en ? "No account" : "ไม่ต้องสมัคร"}</span><span>{en ? "Free" : "ใช้ฟรี"}</span></div></section>
    <ToolWorkspace tool={tool} language={language} />
    <section className="how-to"><div><p className="eyebrow">HOW TO</p><h2>{en ? `How to use ${tool.label.en}` : `วิธีใช้ ${tool.label.th}`}</h2><p>{tool.intent[language]}</p></div><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
    <section className="related-tools"><div className="section-heading"><p className="eyebrow">{en ? "CONTINUE WITH" : "ทำงานต่อ"}</p><h2>{en ? "Related free tools" : "เครื่องมือฟรีที่เกี่ยวข้อง"}</h2></div><div>{related.map((item) => <a href={toolHref(item, language)} key={item.slug}><strong>{item.label[language]}</strong><span>{item.intent[language]}</span><ArrowRight /></a>)}</div></section>
    <section className="faq-section"><div><p className="eyebrow">FAQ</p><h2>{en ? "Common questions" : "คำถามที่พบบ่อย"}</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <ServiceBands language={language} category={tool.category} /><SuiteFooter language={language} />
  </main>;
}
