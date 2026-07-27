import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PdfToolsApp from "../PdfToolsApp";
import { SITE_URL, toolCopy, toolHref, toolSlugs, type ToolSlug } from "../tool-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return toolSlugs.map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  if (!toolSlugs.includes(tool as ToolSlug)) return {};
  const slug = tool as ToolSlug;
  const copy = toolCopy.th[slug];
  return {
    title: `${copy.title} | DJTools by DJAI Academy`,
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      canonical: toolHref(slug, "th"),
      languages: {
        th: toolHref(slug, "th"),
        en: toolHref(slug, "en"),
        "x-default": toolHref(slug, "th")
      }
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${SITE_URL}/${slug}/`,
      siteName: "DJAI Academy",
      images: ["/tools/PDFTools/djai-academy-logo.webp"],
      type: "website"
    }
  };
}

export default async function ThaiToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  if (!toolSlugs.includes(tool as ToolSlug)) notFound();
  return <PdfToolsApp language="th" initialTool={tool as ToolSlug} />;
}
