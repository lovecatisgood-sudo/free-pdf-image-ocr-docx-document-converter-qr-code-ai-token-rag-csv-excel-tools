import type { Metadata } from "next";
import PdfToolsApp from "../../PdfToolsApp";
import { pdfAliasHref, pdfSeoAliases } from "../../seo-alias-data";

const alias = pdfSeoAliases["jpg-to-pdf"];
const copy = alias.copy.en;

export const metadata: Metadata = {
  title: `${copy.title} | DJTools by DJAI Academy`,
  description: copy.description,
  keywords: alias.keywords.en,
  alternates: { canonical: pdfAliasHref(alias, "en"), languages: { th: pdfAliasHref(alias, "th"), en: pdfAliasHref(alias, "en"), "x-default": pdfAliasHref(alias, "th") } },
  openGraph: { title: copy.title, description: copy.description, url: pdfAliasHref(alias, "en"), siteName: "DJAI Academy", images: ["/tools/PDFTools/djai-academy-logo.webp"], type: "website" }
};

export default function JpgToPdfEnglishPage() {
  return <PdfToolsApp language="en" initialTool={alias.tool} seoPage={copy} />;
}
