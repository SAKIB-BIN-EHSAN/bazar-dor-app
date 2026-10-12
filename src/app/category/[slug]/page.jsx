import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import ProductGrid from "@/components/product-grid";
import { getCategories, getCategoryProducts } from "@/lib/catalog";

export const instant = false;

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getCategoryProducts(slug)]);
  const category = categories.find((item) => item.slug === slug || item.id === slug);
  if (!category) notFound();

    return <main className="min-h-[calc(100vh-120px)] pt-[34px]">
        <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1180px] min-[641px]:w-[calc(100%_-_3rem)]">
            <Link className="inline-flex items-center gap-2 text-[0.86rem] font-bold text-green" href="/">
                <FaArrowLeft /> সব পণ্য
            </Link>
            <div className="my-7 mb-[25px] flex items-center gap-[17px]">
                <span className="grid size-16 place-items-center rounded bg-[#e8eedb] text-[2rem]">{category.icon}</span>
                <div>
                    <span className="text-[0.78rem] font-extrabold text-green">পণ্যের বিভাগ</span>
                    <h1 className="my-px text-[2rem] font-black text-green-deep">{category.nameBn}</h1>
                    <p className="m-0 text-[0.86rem] text-muted">এই বিভাগের পণ্যের আজকের বাজারদর</p>
                </div>
            </div>
            <ProductGrid products={products} />
        </div>
    </main>;
}