import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { auth, isAuthConfigured } from "@/lib/auth";
import { formatPrice, getProducts, getUnitLabel } from "@/lib/catalog";

export const instant = false;

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  let session;
  if (!isAuthConfigured()) redirect("/signin?authUnavailable=1");
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    redirect("/signin?authUnavailable=1");
  }
  if (!session) redirect("/signin?redirected=1");

  const minimum = Math.min(...product.markets.map((market) => market.min));
  const maximum = Math.max(...product.markets.map((market) => market.max));
  const average = Math.round(product.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) / product.markets.length);

  return <main className="min-h-[calc(100vh-120px)] pt-[34px] pb-0">
    <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1180px] min-[641px]:w-[calc(100%_-_3rem)]">
      <Link className="inline-flex items-center gap-2 text-[0.86rem] font-bold text-green" href="/"><FaArrowLeft /> সব পণ্য</Link>
      <section className="mt-7 grid grid-cols-[120px_1fr_auto] items-center gap-6 rounded-[5px] border border-line bg-white p-6 max-[760px]:grid-cols-[82px_1fr] max-[760px]:gap-[15px] max-[760px]:p-[17px]">
        <div className="relative grid size-28 place-items-center rounded bg-[#edf2e4] text-[3.6rem] max-[760px]:size-[78px] max-[760px]:text-[2.5rem]"><span>{product.image || product.categoryIcon || "🧺"}</span><Image className="absolute right-[6px] bottom-[6px] size-[25px] object-contain max-[760px]:size-5" src="/logo-icon.png" alt="" width={30} height={30} /></div>
        <div>
          <div><Link className="inline-flex rounded-[3px] bg-soft-leaf px-2 py-1 text-[0.72rem] font-extrabold text-green" href={`/category/${product.category}`}>{product.categoryNameBn}</Link></div>
          <h1 className="mt-2 mb-1 text-[1.8rem] font-black text-green-deep max-[760px]:text-2xl">{product.nameBn}</h1>
          <p className="mb-[9px] mt-0 text-[0.86rem] text-muted">আজকের বাজারদরের সারাংশ ও বিভিন্ন বাজারের দামের তুলনা দেখুন।</p>
          <span className="text-[0.79rem] font-extrabold text-green">{getUnitLabel(product.unit)}</span>
        </div>
        <div className="grid justify-items-end gap-1 border-l border-line pl-[25px] max-[760px]:col-span-full max-[760px]:justify-items-start max-[760px]:border-t max-[760px]:border-l-0 max-[760px]:pt-[13px] max-[760px]:pl-0">
          <span className="text-[0.76rem] text-muted">আজকের গড় দাম</span><strong className="whitespace-nowrap text-[1.45rem] text-green-deep">{formatPrice(product.today)}</strong><small className="text-[0.76rem] text-up">গতকালের তুলনায় {product.change?.pct > 0 ? "+" : ""}{Number(product.change?.pct || 0).toLocaleString("bn-BD")}٪</small>
        </div>
      </section>
      <section className="my-[18px] mb-[38px] grid grid-cols-3 gap-3 max-[500px]:gap-[7px]">
        <div className="grid gap-[7px] rounded border border-line bg-white px-[18px] py-4 max-[500px]:px-[9px] max-[500px]:py-3"><span className="text-[0.78rem] text-muted max-[500px]:text-[0.69rem]">সর্বনিম্ন</span><strong className="text-[1.12rem] text-green-deep max-[500px]:text-[0.87rem]">{formatPrice(minimum)}</strong></div>
        <div className="grid gap-[7px] rounded border border-line bg-white px-[18px] py-4 max-[500px]:px-[9px] max-[500px]:py-3"><span className="text-[0.78rem] text-muted max-[500px]:text-[0.69rem]">সর্বোচ্চ</span><strong className="text-[1.12rem] text-green-deep max-[500px]:text-[0.87rem]">{formatPrice(maximum)}</strong></div>
        <div className="grid gap-[7px] rounded border border-line bg-white px-[18px] py-4 max-[500px]:px-[9px] max-[500px]:py-3"><span className="text-[0.78rem] text-muted max-[500px]:text-[0.69rem]">গড় দাম</span><strong className="text-[1.12rem] text-green-deep max-[500px]:text-[0.87rem]">{formatPrice(average)}</strong></div>
      </section>
      <section className="mb-[50px]">
        <div className="mb-4 flex items-end justify-between gap-4"><div><span className="text-[0.78rem] font-extrabold text-green">বাজার অনুযায়ী</span><h2 className="mt-[3px] mb-0 text-[1.35rem] font-extrabold">বাজারভিত্তিক আজকের দাম</h2></div><span className="text-[0.76rem] text-muted">{product.markets.length.toLocaleString("bn-BD")}টি বাজার</span></div>
        <div className="overflow-x-auto rounded border border-line bg-white"><table className="w-full border-collapse text-left whitespace-nowrap"><thead className="bg-[#f1f3e9] text-[#4d5d50]"><tr><th className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-extrabold">বাজার</th><th className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-extrabold">বিভাগ</th><th className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-extrabold">সর্বনিম্ন</th><th className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-extrabold">সর্বোচ্চ</th></tr></thead><tbody>{product.markets.map((market) => <tr key={`${market.market}-${market.division}`}><td className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem]">{market.market}</td><td className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem]">{market.division}</td><td className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-bold text-green-deep">{formatPrice(market.min)}</td><td className="border-b border-[#edf0e9] px-4 py-[13px] text-[0.81rem] font-bold text-green-deep">{formatPrice(market.max)}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  </main>;
}