import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ToolPage from "../../tool-page";
import { categoryOrder, findTool, toolHref, tools } from "../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return tools.map((tool) => ({ category: tool.category, tool: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> {
  const { category, tool: slug } = await params; const tool = findTool(category, slug); if (!tool) return {};
  return { title: `${tool.title.th} | DJTools`, description: tool.description.th, keywords: tool.keywords.th, alternates: { canonical: toolHref(tool, "th"), languages: { th: toolHref(tool, "th"), en: toolHref(tool, "en"), "x-default": toolHref(tool, "th") } }, openGraph: { title: tool.title.th, description: tool.description.th, url: toolHref(tool, "th"), siteName: "DJAI Academy", images: ["/tools/djai-assets/djai-academy-logo.webp"], type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ category: string; tool: string }> }) {
  const { category, tool: slug } = await params;
  if (category === "document" && slug === "word-to-pdf") permanentRedirect("/tools/document/docx-to-pdf/");
  if (!categoryOrder.includes(category as never)) notFound(); const tool = findTool(category, slug); if (!tool) notFound();
  return <ToolPage tool={tool} language="th" />;
}
