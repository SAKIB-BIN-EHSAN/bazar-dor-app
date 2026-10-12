"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import ProductCard from "@/components/product-card";

export default function ProductGrid({ products }) {
  const [sort, setSort] = useState("default");
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "ascending") return Number(a.today) - Number(b.today);
    if (sort === "descending") return Number(b.today) - Number(a.today);
    return Number(a.id) - Number(b.id);
  });

  return <>
    <div className="mb-[14px] flex items-center justify-between gap-3 text-[0.78rem] text-muted max-[500px]:items-start max-[500px]:flex-col">
      <span>{products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে</span>
      <label className="inline-flex items-center gap-[9px] font-bold text-ink max-[500px]:w-full max-[500px]:justify-between">সাজান
        <span className="relative inline-flex items-center">
          <select className="min-h-10 appearance-none rounded-[3px] border border-line bg-white py-0 pr-9 pl-[11px] text-[0.78rem] text-ink max-[500px]:min-w-[205px]" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="পণ্যের দাম অনুযায়ী সাজান"><option value="default">ডিফল্ট</option><option value="ascending">দাম: কম থেকে বেশি</option><option value="descending">দাম: বেশি থেকে কম</option></select>
          <FaChevronDown className="pointer-events-none absolute right-3 text-[0.7rem]" aria-hidden="true" />
        </span>
      </label>
    </div>
    {sortedProducts.length ? <div className="grid grid-cols-1 gap-4 min-[371px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 max-[640px]:gap-[10px]">{sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="grid min-h-[310px] content-center justify-items-center px-[18px] py-[45px] text-center"><span className="text-[2.2rem]">🧺</span><h2 className="my-[10px] text-[1.45rem]">এখানে কোনো পণ্য পাওয়া যায়নি</h2><p className="mb-5 mt-0 text-muted">এই বিভাগের পণ্যের তথ্য পরে আবার দেখুন।</p><Link className="rounded-[3px] bg-green px-[17px] py-3 font-extrabold text-white" href="/">হোম পেজে ফিরে যান</Link></div>}
  </>;
}