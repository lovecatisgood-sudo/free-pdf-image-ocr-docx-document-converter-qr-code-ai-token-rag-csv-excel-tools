import type { Metadata } from "next";
import PdfToolsApp from "../PdfToolsApp";
import { pdfAliasHref, pdfSeoAliases } from "../seo-alias-data";

const alias = pdfSeoAliases["jpg-to-pdf"];
const copy = alias.copy.th;

export const metadata: Metadata = {
  title: `${copy.title} | DJTools by DJAI Academy`,
  description: copy.description,
  keywords: alias.keywords.th,
  alternates: { canonical: pdfAliasHref(alias, "th"), languages: { th: pdfAliasHref(alias, "th"), en: pdfAliasHref(alias, "en"), "x-default": pdfAliasHref(alias, "th") } },
  openGraph: { title: copy.title, description: copy.description, url: pdfAliasHref(alias, "th"), siteName: "DJAI Academy", images: ["/tools/PDFTools/djai-academy-logo.webp"], type: "website" }
};

export default function JpgToPdfPage() {
  return <PdfToolsApp language="th" initialTool={alias.tool} seoPage={copy} />;
}
