import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa6";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/catalog";

export default async function HomePage() {
  const products = await getProducts();
  const risers = products.filter((product) => product.change?.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = products.filter((product) => product.change?.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <main>
      <section className="overflow-hidden border-b border-line bg-[#f1f2e8]">
        <div className="mx-auto grid min-h-[450px] w-[calc(100%_-_2rem)] max-w-[1180px] grid-cols-[0.95fr_1.05fr] items-center gap-[34px] py-[34px] min-[641px]:w-[calc(100%_-_3rem)] max-[1020px]:gap-[22px] max-[760px]:grid-cols-1 max-[760px]:gap-[22px] max-[760px]:py-[34px]">
          <div className="relative z-[1] py-5 animate-rise-in max-[760px]:py-0">
            <span className="relative inline-flex items-center gap-2 text-[0.85rem] font-extrabold text-green before:h-0.5 before:w-5 before:bg-orange before:content-['']">প্রতিদিনের বাজার, এক ঠিকানায়</span>
            <h1 className="my-[17px] mb-[15px] text-[4.1rem] font-black leading-[1.22] text-green-deep max-[1020px]:text-[3rem] max-[760px]:text-[3.2rem] max-[500px]:text-[2.15rem]">বাজারের দাম জানুন,<br /><em className="not-italic text-green">সিদ্ধান্ত নিন নিশ্চিন্তে।</em></h1>
            <p className="m-0 max-w-[450px] text-base leading-[1.9] text-[#617066]">বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারভিত্তিক তুলনা এখন আপনার হাতেই।</p>
            <Link className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-[3px] bg-green px-[19px] text-[0.92rem] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-green-deep" href="#সব-পণ্য">আজকের দাম দেখুন <FaArrowRight aria-hidden="true" /></Link>
            <div className="mt-5 flex items-center gap-2 text-[0.78rem] text-muted"><span className="size-2 rounded-full bg-[#6ea66e] shadow-[0_0_0_3px_#6ea66e22]" /> আজকের বাজারদর, এক নজরে</div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[5px] bg-[#dfe9d1] animate-rise-in max-[760px]:min-h-[300px]">
            <div className="absolute top-[18px] left-[18px] z-[1] grid size-[66px] rotate-[-7deg] content-center justify-items-center rounded-full border-2 border-white bg-orange text-white leading-tight"><span className="text-[0.64rem]">আজকের</span><strong className="text-[0.9rem]">বাজার</strong></div>
            <Image className="object-cover object-center" src="/bazar-hero.png" alt="তাজা শাকসবজি ও বাজারের ঝুড়ি" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
            <div className="absolute right-4 bottom-4 grid gap-1 rounded-[3px] bg-[#fffefaed] px-[13px] py-[10px]"><span className="text-[0.62rem] font-black text-orange">FRESH MARKET</span><b className="text-[0.8rem] text-green-deep">প্রতিদিনের নির্ভরযোগ্য দর</b></div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-[calc(100%_-_2rem)] max-w-[1180px] py-[54px] pb-[60px] min-[641px]:w-[calc(100%_-_3rem)] max-[760px]:py-10">
        <div className="flex items-end justify-between gap-[18px] max-[500px]:items-start"><div><span className="mb-[7px] inline-block text-[0.78rem] font-extrabold text-green">আজকের বাজার</span><h2 className="m-0 text-[2rem] font-extrabold leading-[1.35] max-[500px]:text-[1.45rem]">দামের ওঠানামা</h2></div><span className="inline-flex items-center gap-[9px] pb-[5px] text-[0.76rem] text-muted max-[500px]:whitespace-nowrap max-[500px]:pt-[6px] max-[500px]:text-[0.68rem]"><span className="size-2 rounded-full bg-[#6ea66e] shadow-[0_0_0_3px_#6ea66e22]" /> লাইভ বাজার তথ্য</span></div>
        <div className="mt-[23px] grid grid-cols-1 gap-[18px]">
          <section className="grid grid-cols-1 min-[371px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 max-[640px]:gap-[10px] gap-[10px] rounded-[5px] border border-line p-4 max-[500px]:gap-2 max-[500px]:p-3"><div className="col-span-full flex items-center gap-[11px] px-px pt-[3px] pb-[9px]"><span className="grid size-[38px] shrink-0 place-items-center rounded-[3px] bg-leaf text-green"><FaArrowUp /></span><div><h3 className="m-0 text-[1.04rem] font-extrabold">আজ দাম বেড়েছে</h3><p className="mt-[3px] mb-0 text-[0.76rem] text-muted">গতকালের তুলনায় বেশি</p></div></div>{risers.length ? risers.map((product) => <ProductCard key={product.id} product={product} />) : <p className="col-span-full text-[0.85rem] text-muted">এই মুহূর্তে কোনো পরিবর্তন নেই।</p>}</section>
          <section className="grid grid-cols-1 min-[371px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 max-[640px]:gap-[10px] gap-[10px] rounded-[5px] border border-line p-4 max-[500px]:gap-2 max-[500px]:p-3"><div className="col-span-full flex items-center gap-[11px] px-px pt-[3px] pb-[9px]"><span className="grid size-[38px] shrink-0 place-items-center rounded-[3px] bg-down-soft text-down"><FaArrowDown /></span><div><h3 className="m-0 text-[1.04rem] font-extrabold">আজ দাম কমেছে</h3><p className="mt-[3px] mb-0 text-[0.76rem] text-muted">গতকালের তুলনায় কম</p></div></div>{fallers.length ? fallers.map((product) => <ProductCard key={product.id} product={product} />) : <p className="col-span-full text-[0.85rem] text-muted">এই মুহূর্তে কোনো পরিবর্তন নেই।</p>}</section>
        </div>
      </section>
      <section id="সব-পণ্য" className="scroll-mt-5 border-t border-line bg-[#f0f2e9] py-[52px] pb-[68px] max-[760px]:py-10 max-[760px]:pb-[50px]">
        <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1180px] min-[641px]:w-[calc(100%_-_3rem)]">
          <div className="mb-[23px] flex items-end justify-between gap-[18px] max-[500px]:items-start"><div><span className="mb-[7px] inline-block text-[0.78rem] font-extrabold text-green">নিত্যপ্রয়োজনীয় পণ্য</span><h2 className="m-0 text-[2rem] font-extrabold leading-[1.35] max-[500px]:text-[1.45rem]">সব পণ্য</h2><p className="mt-[0.45rem] mb-0 text-[0.94rem] text-muted">বাজারের হালনাগাদ দাম ও পরিবর্তন দেখে নিন।</p></div><span className="whitespace-nowrap rounded-[3px] border border-[#dce3d6] bg-white px-[11px] py-2 text-[0.78rem] text-muted max-[500px]:px-2 max-[500px]:py-[6px] max-[500px]:text-[0.7rem]">{products.length.toLocaleString("bn-BD")}টি পণ্য</span></div>
          {products.length ? <div className="grid grid-cols-1 gap-4 min-[371px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 max-[640px]:gap-[10px]">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="grid min-h-[180px] content-center justify-items-center gap-2 text-muted"><p className="m-0">পণ্যের তথ্য এখন পাওয়া যাচ্ছে না।</p><Link className="inline-flex items-center gap-[7px] font-extrabold text-green" href="#সব-পণ্য">আবার দেখুন <FaArrowRight /></Link></div>}
        </div>
      </section>
    </main>
  );
}
