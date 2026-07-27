import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPage from "../../../tool-page";
import { findTool, toolHref, tools } from "../../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return tools.map((tool) => ({ category: tool.category, tool: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> {
  const { category, tool: slug } = await params; const tool = findTool(category, slug); if (!tool) return {};
  return { title: `${tool.title.en} | DJTools`, description: tool.description.en, keywords: tool.keywords.en, alternates: { canonical: toolHref(tool, "en"), languages: { th: toolHref(tool, "th"), en: toolHref(tool, "en"), "x-default": toolHref(tool, "th") } }, openGraph: { title: tool.title.en, description: tool.description.en, url: toolHref(tool, "en"), siteName: "DJAI Academy", images: ["/tools/djai-assets/djai-academy-logo.webp"], type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ category: string; tool: string }> }) {
  const { category, tool: slug } = await params; const tool = findTool(category, slug); if (!tool) notFound();
  return <ToolPage tool={tool} language="en" />;
}
