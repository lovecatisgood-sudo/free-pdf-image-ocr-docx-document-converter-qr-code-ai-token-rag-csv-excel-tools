import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "../../category-page";
import { categories, categoryHref, categoryOrder, type Category } from "../../tool-data";

export const dynamicParams = false;
export function generateStaticParams() { return categoryOrder.map((category) => ({ category })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!categoryOrder.includes(category as Category)) return {};
  const key = category as Category;
  return { title: `${categories[key].title.en} | DJTools`, description: categories[key].description.en, alternates: { canonical: categoryHref(key, "en"), languages: { th: categoryHref(key, "th"), en: categoryHref(key, "en"), "x-default": categoryHref(key, "th") } } };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categoryOrder.includes(category as Category)) notFound();
  return <CategoryPage category={category as Category} language="en" />;
}
